/*
Test Script Name: CallbackRequestPriority.spec.js
Description: 
Git Link:
Prameters: 
*/

const { test, expect } = require('@playwright/test');

import { EOSLoginPage } from '../../../pageobjects';
import { EOSDashboardPage } from '../../../pageobjects';
//import { MemberDetailsPage } from '../../../pageobjects';
import {EOSCallbackRequestPage} from '../../../pageobjects';

const baseUrl = process.env.QA_EOS_URL_APP;
//const coustomerId = '28b915c7-f656-483f-bac9-a14f32174b1f';

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

  test('To Click on Callback Request Tab', async () => {
    const eOSDashboardPage = new EOSDashboardPage(page);
    await page.waitForTimeout(2000);
    await eOSDashboardPage.callbackRequestPageButton.click();
    await page.waitForTimeout(1000);
    await expect(page).toHaveURL(baseUrl+'callbackRequest');
    await page.waitForTimeout(2000);
  });

  test('To Select to Prority List from the dropdown', async () => {
    const callbackRequestPage = new EOSCallbackRequestPage(page);
    await callbackRequestPage.requestPageDropdown.click();
    await page.waitForTimeout(1000);
    await callbackRequestPage.priorityListOption.click();
    await page.waitForTimeout(2000);
  });

  test('To click on first edit button', async () => { 
    const callbackRequestPage = new EOSCallbackRequestPage(page);
    await callbackRequestPage.editButton.click();
    await page.waitForTimeout(2000);
  });

  test('To add comment', async () => { 
    const callbackRequestPage = new EOSCallbackRequestPage(page);
    await callbackRequestPage.commentBox.fill("test");
    await callbackRequestPage.saveButton.click();
    await page.waitForTimeout(1000);
    await expect(callbackRequestPage.alertMessageBox).toContainText('Comments Added!');

  });
  
});
