import { test } from '@playwright/test';
//import { userData } from '../utils/testData';
import { AdministrationPage } from '../pages/admin';
//import userData from '../testdata/adminpage.json';
import fs from 'fs'

const jsonPath = "testdata/adminpage.json";
const userData:any=JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));


test.describe("Login Tests", () => {
  test('Create Admin - District Municipality', async ({ page }) => {
    const admin = new AdministrationPage(page);
    const adminData = userData[0];

    await page.goto('/inceis/dashboard#!',{ waitUntil: 'networkidle' });

    await admin.admin_menu(
      adminData.email,
      adminData.firstname,
      adminData.surname,
      adminData.gender,
      adminData.cellNumber,
      adminData.Designation,
      adminData.Associate_Department,
      adminData.province.index,
      adminData.Government,
      adminData.Institution,
      adminData.District_Municipalitys,
      adminData.Local_Municipality,
      adminData.Metros
    );

    await admin.selectArea(
      'District_Municipality',
      adminData.District_Municipalitys,
      adminData.Local_Municipality,
      ''
    );
  });
});

test('Create Admin - Metro', async ({ page }) => {
  const admin = new AdministrationPage(page);
  const adminData = userData[1];

  await page.goto('/inceis/dashboard#!');

  await admin.admin_menu(
    adminData.email,
    adminData.firstname,
    adminData.surname,
    adminData.gender,
    adminData.cellNumber,
    adminData.Designation,
    adminData.Associate_Department,
    adminData.province.index,
    adminData.Government,
    adminData.Institution,
    adminData.District_Municipalitys,
    adminData.Local_Municipality,
    adminData.Metros
  );

  await admin.selectArea(
    'Metro',
    '',
    '',
    adminData.Metros
  );



});