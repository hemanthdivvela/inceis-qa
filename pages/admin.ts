import { Page, expect } from '@playwright/test';

import * as fs from 'fs/promises';
export class AdministrationPage {
  readonly page: Page; 
  
  constructor(page: Page) {
    this.page = page;
  }

    // Locators
    AdminMenu = () => this.page.getByText('Administration', { exact: true });
    usersMenu = () => this.page.locator('a').filter({ hasText: 'Users' });
    Emailinput = () => this.page.getByPlaceholder('Email');
    Firstnameinput = () => this.page.getByPlaceholder('First Name');
    surnameinput = () => this.page.getByPlaceholder('Surname');
    Genderdropdown = () => this.page.locator("//select[@name='Gender']");
    cellnumberinput = () => this.page.getByPlaceholder('Cell No', { exact: true });
    Designation = () => this.page.locator("//select[@name='designation']");
    province = () => this.page.locator("#province");
    SphereofGovernment = () => this.page.locator("//select[@name='SphereOfGovernmentId']")
    Institution = () => this.page.locator("//select[@name='aEInstitution']");
    District_Municipality = () => this.page.locator("//span[normalize-space()='District Municipality']");
    Metro = () => this.page.locator("//span[normalize-space()='Metro']");
    Municipalitys = () => this.page.locator('select[name="districtmun"]')
    Local_Municipality  =() =>this.page.locator("//select[@name='localmun']");
    Metros = () =>  this.page.locator("//select[@name='metromun']");
    Associate_Department = () => this.page.locator("//select[@name='AssosicateDepartmentId']")
    Savebutton = () => this.page.getByRole('button', { name: /Save/i })



    async adminMenuClick() {
      await this.AdminMenu().click();
    }

    async usersMenuClick() {

      await this.usersMenu().click();
    }

    async enterEmail(email: string) {
      await this.Emailinput().fill(email);
    }

    async enterFirstname(firstname: string) {
      await this.Firstnameinput().fill(firstname);
    }

    async entersurname(surname: string) {
      await this.surnameinput().fill(surname);
    }

    async selectGender(gender: string) {
      await this.Genderdropdown().selectOption({ label: gender });
    }
    async enterCellNumber(cellNumber: string) {
      await this.cellnumberinput().fill(cellNumber);
    }

   async enterDesignation(designations: string[]) {
      await this.Designation().selectOption(designations);
    }

    async enterAssociate_Department(Associate_Department: string[]) {
      await this.Associate_Department().selectOption(Associate_Department);
    }

    async enterprovince(province: number){
          await this.province().selectOption({ index: province });
    }

    async enterSphereofGovernment(Government:string){
      await this.SphereofGovernment().selectOption({label:Government});
    }

    async enterInstitution(Institution:string){
      await this.Institution().selectOption({ label: Institution });
    }

    async selectArea( type: 'District_Municipality' | 'Metro', Municipalitys?: string, Local_Municipality?: string, Metros? :string) {
  if (type === 'District_Municipality') {
    await this.District_Municipality().check();
    await expect(this.District_Municipality()).toBeChecked();

    if (Municipalitys) {
      await this.Municipalitys().selectOption({ label: Municipalitys });
    }

    if (Local_Municipality) {
      await this.Local_Municipality().selectOption({ label: Local_Municipality });
    }
    } else {
      await this.Metro().check();
      await expect(this.Metro()).toBeChecked();

      if (Metros){
        await this.Metros().selectOption({ label:Metros })
      }
    }
  }


    async SaveClick() {
      await this.Savebutton().click();
      //await this.AdminMenu().click();
    }

    

    async admin_menu(email: string, firstname: string, surname: string, gender: string, cellNumber: string, Designation:string[], Associate_Department:string[],province:number, Government:string, Institution:string, Municipalitys:string, Local_Municipality:string, Metros:string ) {
      await this.adminMenuClick();
      await this.usersMenuClick()
      await this.enterEmail(email);
      await this.enterFirstname(firstname);
      await this.entersurname(surname);
      await this.selectGender(gender);
      await this.enterCellNumber(cellNumber);
      await this.enterDesignation(Designation);
      await this.enterAssociate_Department(Associate_Department);
      await this.enterprovince(province);
      await this.enterSphereofGovernment(Government);
      await this.enterInstitution(Institution);
      await this.selectArea('District_Municipality')
      await this.selectArea('Metro')
      await this.SaveClick();


    }

}