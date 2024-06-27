/*
Test Script Name: EOSDashBoard.spec.js
Description: 
Git Link:
Prameters: 
*/

const { test, expect } = require('@playwright/test');

import { EOSLoginPage } from '../../../pageobjects';
import { EOSDashboardPage } from '../../../pageobjects';

const baseUrl = process.env.QA_EOS_URL_APP;

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

  test('To Click on Member List Tab', async () => {
    const eOSDashboardPage = new EOSDashboardPage(page);
    await eOSDashboardPage.memberListButton.click();
    await page.waitForTimeout(1000);
    await expect(page).toHaveURL(baseUrl+'memberdetails');
    await page.waitForTimeout(2000);
  });

  test('To Click on Callback Request Tab', async () => {
    const eOSDashboardPage = new EOSDashboardPage(page);
    await page.waitForTimeout(2000);
    await eOSDashboardPage.callbackRequestPageButton.click();
    await page.waitForTimeout(1000);
    await expect(page).toHaveURL(baseUrl+'callbackRequest');
    await page.waitForTimeout(2000);
  });

  test('To Click on Customer Mapping Tab', async () => {
    const eOSDashboardPage = new EOSDashboardPage(page);
    await page.waitForTimeout(2000);
    await eOSDashboardPage.customerMappingPageButton.click();
    await page.waitForTimeout(1000);
    await expect(page).toHaveURL(baseUrl+'customermapping');
    await page.waitForTimeout(2000);
  });

  test('To Click on RIA dashboard Tab', async () => {
    const eOSDashboardPage = new EOSDashboardPage(page);
    await page.waitForTimeout(2000);
    await eOSDashboardPage.rIADashboardPageButton.click();
    await page.waitForTimeout(1000);
    await expect(page).toHaveURL(baseUrl+'riadashboard');
    await page.waitForTimeout(2000);
  });

});