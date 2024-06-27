/*
Test Script Name: RIADashboard.spec.js
Description: 
Git Link:
Prameters: 
*/

const { test, expect } = require('@playwright/test');

import { EOSLoginPage } from '../../../pageobjects';
import { EOSDashboardPage } from '../../../pageobjects';
import { RIADashboardPage } from '../../../pageobjects';

const baseUrl = process.env.QA_EOS_URL_APP;
const coustmerName = 'ANIRUDDH RAJENDRA TAVASHIKAR';

test.describe("test", () => {
  let context;
  let page;

  test.beforeAll(async ({ browser }) => {
    context = await browser.newContext();
    page = await context.newPage();
  });

  test.afterAll(async () => {
    await context.close();
  });

  test('Navigate to EOS URL', async () => {
    await page.goto(baseUrl);
  });

  test('To check the title of EOS Login page', async () => {
    await expect(page).toHaveTitle('1Finance EOS');
  });

  test('To Click on the Google Login button', async () => {
    const eOSLoginPage = new EOSLoginPage(page);
    await eOSLoginPage.googleLoginButton.click();
    await page.waitForTimeout(1000);
    await expect(page).toHaveTitle('Sign in - Google Accounts');
    await page.waitForTimeout(2000);
  });

  test('Enter Email id and password', async () => {
    const eOSLoginPage = new EOSLoginPage(page);
    await page.waitForTimeout(2000);
    await eOSLoginPage.googleLoginEmail.fill("testuser2@1finance.co.in");
    await page.waitForTimeout(1000);
    await eOSLoginPage.googleLoginNextButton.click();
    await eOSLoginPage.googleLoginPassword.fill("1Finance@Testuser");
    await eOSLoginPage.googleLoginNextButton.click();
    await page.waitForTimeout(5000);
    await expect(page).toHaveTitle('Dashboard');
    await page.waitForTimeout(2000);

  });

  test('To Click on RIA Dashboard Tab', async () => {
    const eOSDashboardPage = new EOSDashboardPage(page);
    await page.waitForTimeout(2000);
    await eOSDashboardPage.rIADashboardPageButton.click();
    await page.waitForTimeout(1000);
    await expect(page).toHaveURL(baseUrl+'riadashboard');
    await page.waitForTimeout(2000);
  });

  test('Search Customer by Name', async () => {
    const riadashboardPage = new RIADashboardPage(page);
    await riadashboardPage.searchTextBox.click();
    await page.waitForTimeout(1000);
    await riadashboardPage.searchTextBox.fill(coustmerName);
    await page.keyboard.press('Enter');
    await page.waitForTimeout(2000);
  });

  test('To click on telephonic button', async () => { 
    const riadashboardPage = new RIADashboardPage(page);
    await riadashboardPage.telephonicButton.click();
    await page.waitForTimeout(2000);
  });

  test('To add comment', async () => { 
    const riadashboardPage = new RIADashboardPage(page);
    await riadashboardPage.commentBox.fill("This is a automated comment for Customer Call request");
    await riadashboardPage.saveButton.click();
    await page.waitForTimeout(1000);
    await expect(riadashboardPage.alertMessageBox).toContainText('Comments Added!');
  });
  
});
