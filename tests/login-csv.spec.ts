import { test, expect } from '../fixtures/auth.fixture';
import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse/sync';
import { LoginPage } from '../pages/LoginPage';

const dataPath = path.resolve(process.cwd(), 'testdata', 'loginData.csv');

const csvData = fs.readFileSync(dataPath, 'utf-8');

type LoginData = {
  email: string;
  password: string;
  validity: string;
};

const loginData = parse<LoginData>(csvData, {
  columns: true,
  skip_empty_lines: true,
  trim: true
});


test.describe('Login data driven test - CSV', () => {

  for (const { email, password, validity } of loginData) {

    test(`Login test with email: "${email}" and password: "${password}"`,
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
