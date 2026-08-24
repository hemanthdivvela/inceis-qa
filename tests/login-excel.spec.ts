import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';
import XLSX from 'xlsx';
import { LoginPage } from '../pages/LoginPage';

const projectRootCandidates = [
  process.cwd(),
  path.resolve(__dirname, '..'),
  path.resolve(__dirname, '..', '..'),
  path.resolve(__dirname),
  path.resolve(__dirname, '..', '..', '..'),
  path.resolve(process.cwd(), 'tests'),
  path.resolve(process.cwd(), '..')
];

const excelFileNames = ['loginData.xlsx', 'login-data.xlsx', 'LoginData.xlsx'];

const candidateDataPaths = [...new Set(
  projectRootCandidates.flatMap((root) => {
    const folders = [
      path.join(root, 'testdata'),
      path.join(root, 'tests', 'testdata'),
      path.join(root, 'data'),
      path.join(root),
      path.join(root, 'tests')
    ];

    return folders.flatMap((folder) =>
      excelFileNames.map((fileName) => path.join(folder, fileName))
    );
  })
)];

const resolvedDataPath =
  candidateDataPaths.find((filePath) => fs.existsSync(filePath)) ??
  (() => {
    const searchRoots = [...new Set(projectRootCandidates.flatMap((root) => [
      root,
      path.resolve(root, '..')
    ]))];

    for (const root of searchRoots) {
      if (!fs.existsSync(root)) continue;

      const stack = [root];

      while (stack.length) {
        const current = stack.pop();
        if (!current || !fs.existsSync(current)) continue;

        const entries = fs.readdirSync(current, { withFileTypes: true });

        for (const entry of entries) {
          const fullPath = path.join(current, entry.name);

          if (entry.isDirectory()) {
            stack.push(fullPath);
          } else if (
            excelFileNames.some((fileName) =>
              entry.name.toLowerCase() === fileName.toLowerCase()
            )
          ) {
            return fullPath;
          }
        }
      }
    }

    return undefined;
  })();

if (!resolvedDataPath) {
  throw new Error(
    `Excel file not found. Looked in:\n- ${candidateDataPaths.join('\n- ')}`
  );
}

// Read Excel file
const workbook = XLSX.readFile(resolvedDataPath);

// Get first sheet
const sheetName = workbook.SheetNames[0];
const worksheet = workbook.Sheets[sheetName];

// Convert Excel sheet to JSON
type LoginData = {
  email: string;
  password: string;
  validity: string;
};

const loginData = XLSX.utils.sheet_to_json<LoginData>(worksheet, {
  defval: ''
});

test.describe('Login data driven test - Excel', () => {

  for (const { email, password, validity } of loginData) {

    test(
      `Login test with email: "${email}" and password: "${password}"`,
      async ({ page }) => {

        const loginPage = new LoginPage(page);

        await loginPage.goto();

        await loginPage.login(email, password);

        if (validity.toLowerCase() === 'valid') {

          await expect(loginPage.dashboardText).toBeVisible();

        } else {

          await expect(loginPage.errorMsg).toBeVisible();

          await loginPage.goto();
        }
      }
    );
  }
});
