// IMPORT FROM YOUR CUSTOM FIXTURE, NOT @playwright/test
import { test, expect } from '../fixtures/auth.fixture';
import fs from 'fs'
import path from 'path';
import { LoginPage } from '../pages/LoginPage';

const dataPath = path.resolve(__dirname, '../testdata/data.json');
const loginData = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));


//const loginData:any = JSON.parse(fs.readFileSync('testdata/data.json', 'utf-8'));
test.describe('Login data driven test', async() => {

  for (const { email, password, validity } of  loginData)  {

    test(`Login test with email: "${email}" and password: "${password}"`, async({ page }) => {
      const loginPage = new LoginPage(page);
      await loginPage.goto()

      await loginPage.login(email, password);

      if (validity.toLowerCase() == "valid"){
        await loginPage.dashboardText.click()
      }else{
        await expect(loginPage.errorMsg).toBeVisible();
        await loginPage.goto()
      }

    });
  }
});

