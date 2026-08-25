import { test as base, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

type AuthFixtures = {
  authenticatedPage: void;
};

export const test = base.extend<AuthFixtures>({
  authenticatedPage: async ({ page }, use) => {
    await page.goto(process.env.BASE_URL!, {waitUntil:"networkidle"});
    async function login(username: string, password: string): Promise<void> {
      await page.getByRole('textbox', { name: 'User Name' }).pressSequentially(username);;
      await page.getByPlaceholder('Password', { exact: true }).pressSequentially(password);
      await page.getByRole('button', { name: 'Login' }).click();
    }

    await login(process.env.TEST_USERNAME!, process.env.TEST_PASSWORD!);

    await page.locator("//a[@id='dropdownProfile']//img[@title='eCasManagementSystem.']").click();

    await use();
  },
});

export { expect };

