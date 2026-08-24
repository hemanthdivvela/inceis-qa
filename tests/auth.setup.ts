

/// <reference types="node" />
import { test as setup, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import fs from 'fs';
import path from 'path';



const sessionFile = '.auth/user.json';


setup('authenticate', async ({ page }) => {
 
 fs.mkdirSync(path.dirname(sessionFile), { recursive: true });

  // Read credentials from environment variables
  const Email = process.env.TEST_USERNAME;
  const password = process.env.TEST_PASSWORD;

  // Validate credentials exist
  if (!Email || !password) {
    throw new Error('TEST_USERNAME and TEST_PASSWORD must be set in environment variables');
  }

  const loginPage = new LoginPage(page);
  
  await loginPage.goto();
  
  await loginPage.login(Email, password);
  

  
  await page.locator("//a[@id='dropdownProfile']//img[@title='eCasManagementSystem.']").click({delay:1000});

  


  // Save sessionStorage
  const sessionStorageData = await page.evaluate(() => {
    const json: Record<string, string> = {};

    for (let i = 0; i < sessionStorage.length; i++) {
      const key = sessionStorage.key(i)!;
      json[key] = sessionStorage.getItem(key)!;
    }

    return json;
  });

  fs.writeFileSync(
    sessionFile,
    JSON.stringify(sessionStorageData, null, 2)
  );


  
  console.log('Session Storage Saved');

});


