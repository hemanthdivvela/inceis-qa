import { Page, Locator,expect } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';
import { text } from 'stream/consumers';

dotenv.config({ path: path.resolve(__dirname, '.env') });



export class LoginPage {
  readonly page: Page;
  readonly Email: Locator;
  readonly password: Locator;
  readonly submitButton: Locator;
  readonly errorMsg:  Locator;
  readonly dashboardText: Locator;

  constructor(page: Page) {
    this.page = page;
    this.Email = page.getByRole('textbox', { name: 'User Name' });
    this.password = page.getByPlaceholder('Password', { exact: true });
    this.submitButton = page.getByRole('button', { name: 'Login' });
    this.errorMsg = page.locator('.error-messages') || page.getByText('User name required', { exact: true }) || page.getByRole('heading', { name: 'Invalid Email Address.' })
  //dashboardText = () => this.page.locator('div.tran-form-container').locator('div').nth(1)
    this.dashboardText = page.locator("//a[@id='dropdownProfile']//img[@title='eCasManagementSystem.']") ;
  }

  async goto() { 
    const baseurl = process.env.BASE_URL;
    if (!baseurl) {
      throw new Error ('Base_url env variable is not defined');
    }
  await this.page.goto(baseurl, { waitUntil: 'commit' });
    //await this.page.waitForLoadState('networkidle');

  }
  


  async login(username: string, password: string) {
    await this.Email.pressSequentially(username);
    await this.password.pressSequentially(password);
    await this.submitButton.click();
    
     
  }
  async verifyLoginSuccess() {
    await this.dashboardText.click();
  }

  async verifyLoginFailure() {
    await expect.soft(this.errorMsg).toBeVisible();

    console.log("Test continues even if assertion fails");
  }
}