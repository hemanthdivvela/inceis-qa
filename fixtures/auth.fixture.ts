import { test as base, expect } from '@playwright/test';
import fs from 'fs' with { type: 'module' };

// @ts-ignore

// Read saved session storage
const sessionFile = '.auth/user.json';

export const test = base.extend<{
  authenticatedPage: void;
}>({
  // This fixture runs before every test
  authenticatedPage: [async ({ page }, use) => {
    // Check if session storage file exists
    if (!fs.existsSync(sessionFile)) {
      throw new Error(
        `Session storage file not found at ${sessionFile}. Run auth.setup.ts first!`
      );
    }

    // Read and inject session storage BEFORE any navigation
    const sessionStorageData = JSON.parse(fs.readFileSync(sessionFile, 'utf-8'));

    // Inject session storage into the page
    await page.addInitScript((data) => {
      for (const [key, value] of Object.entries(data)) {
        sessionStorage.setItem(key, value as string);
      }
    }, sessionStorageData);

    // Now run the actual test
    await use();
  }, { auto: true }], // auto: true = runs automatically for every test
});

export { expect };