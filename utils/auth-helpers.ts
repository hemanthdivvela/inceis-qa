import { BrowserContext, Page } from '@playwright/test';

export async function restoreSessionStorage(page: Page, storageState: any) {
  // Manually inject session storage items if Playwright's default isn't enough
  await page.evaluate((state) => {
    state.origins.forEach((origin: any) => {
      if (origin.origin === window.location.origin) {
        origin.sessionStorage.forEach((item: any) => {
          sessionStorage.setItem(item.name, item.value);
        });
      }
    });
  }, storageState);
}

// Alternative: If session storage is cleared on page load, use this approach
export async function injectAuthHeaders(context: BrowserContext, token: string) {
  await context.setExtraHTTPHeaders({
    'Authorization': `Bearer ${token}`
  });
}