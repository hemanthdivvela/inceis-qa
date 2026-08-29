import { defineConfig, devices } from '@playwright/test';
import { config as dotenvConfig } from 'dotenv';
import path from 'path';


dotenvConfig({ path: path.resolve(__dirname, '.env') });

export default defineConfig({
  testDir: './tests',
  testMatch: '**/*.spec.ts',

  timeout: 5 * 60 * 1000, // Global test timeout (default is 30000ms)
  expect: {
    timeout: 10000, // Assertion timeout
    toMatchSnapshot: {
      maxDiffPixels: 10,
    },
  },
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : parseInt(process.env.Retries ?? "0", 10),
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : parseInt(process.env.Workers ?? "1", 10),
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [['html', { open: 'never', outputDir: 'test-results' }], ['list'], ['line'],['allure-playwright']],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    // Base URL to use in actions like `await page.goto('')`. 
    baseURL: process.env.APP_URL,
    actionTimeout: 70000,   // click, fill, etc.
    navigationTimeout: 30000, // goto, reload, etc.
    //viewport: { width: 1280, height: 720 }, // Fixed size
    screenshot: 'only-on-failure',
    video: 'retain-on-failure-and-retries',
    
    

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
    
    
    
    ignoreHTTPSErrors: true,
    headless: true
  
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'setup',
      testMatch: /auth\.setup\.ts/,
      
    },
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 1520, height: 720 },
        
      },
      dependencies: ['setup'],
      
    },
/*
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'],
        viewport: { width: 1480, height: 720 }

      },
      dependencies: ['setup'],
      
    },
*/  
/*
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'],
        viewport: { width: 1480, height: 720 }
      },
      dependencies: ['setup'],
      
    },
*/
    /* Test against mobile viewports. */
     //{
      //name: 'Mobile Chrome',
      // use: { ...devices['Pixel 5'] },dependencies: ['setup'],
     //},
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
