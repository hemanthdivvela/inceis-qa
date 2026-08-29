import { test as base, expect } from '@playwright/test';

type AuthFixtures = {
  authenticatedPage: void;
};

export const test = base.extend<AuthFixtures>({
  authenticatedPage: async ({ page }, use) => {
    const baseUrl = process.env.APP_URL!;
    const username = process.env.USERNAME!;
    const password = process.env.PASSWORD!;
    
    if (!baseUrl) {
      throw new Error('BASE_URL environment variable is not defined');
    }

    if (!username) {
      throw new Error('USERNAME environment variable is not defined');
    }

    if (!password) {
      throw new Error('PASSWORD environment variable is not defined');
    }

    await page.goto(baseUrl, {waitUntil: 'networkidle'});

    async function login(username: string, password: string): Promise<void> {

      await page.getByRole('textbox', { name: 'User Name' }).pressSequentially(username);

      await page.getByPlaceholder('Password', { exact: true }).pressSequentially(password);

      await page.getByRole('button', { name: 'Login' }).click();
    }

    await login(username, password);

    await page.locator("//a[@id='dropdownProfile']//img[@title='eCasManagementSystem.']").click();

    await use();
  },
});

export { expect };

