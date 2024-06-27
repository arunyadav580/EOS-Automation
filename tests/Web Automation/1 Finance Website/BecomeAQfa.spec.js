const { test, expect, makeAPICall, playwright } = require('@playwright/test');

import { BecomeQfaPage } from '../../../pageobjects';

const explicitWait = 1000;

const baseUrl = process.env.QA_URL_WEBSITE

async function scrollPage(page, iterations) {
  for (let i = 0; i < iterations; i++) {
    page.keyboard.down('PageDown');
  }
}

test.beforeEach(async ({ page }) => {
  await page.goto(baseUrl);
  await page.waitForTimeout(explicitWait);
});

test('Scroll down to footer and click on become a QFA', async({page})=>{
  const becomeQFA = new BecomeQfaPage(page);
  await scrollPage(page, 5);
  await page.waitForTimeout(explicitWait);
  await becomeQFA.becomeQfa.click();
  await page.waitForTimeout(explicitWait);
})

test('Click on Join Now button', async ({ page }) => {
  const becomeQFA = new BecomeQfaPage(page);
  await scrollPage(page, 5);
  await becomeQFA.becomeQfa.click();
  await page.waitForTimeout(explicitWait);
  await becomeQFA.joinNow.click();
  await page.waitForTimeout(explicitWait);
})

test('Fill in full name and press tab button to switch the tab ', async ({ page }) => {
  const becomeQFA = new BecomeQfaPage(page);
  await scrollPage(page, 5);
  await becomeQFA.becomeQfa.click();
  await page.waitForTimeout(explicitWait);
  await becomeQFA.joinNow.click();
  await page.waitForTimeout(explicitWait);
  await becomeQFA.fullName.type("Runali Painaik");
  await page.waitForTimeout(explicitWait);
  await becomeQFA.fullName.press("Tab"); 
  await page.waitForTimeout(explicitWait);
})

test('Fill in email address and press tab button to switch the tab ', async ({ page }) => {
  const becomeQFA = new BecomeQfaPage(page);
  await scrollPage(page, 5);
  await becomeQFA.becomeQfa.click();
  await page.waitForTimeout(explicitWait);
  await becomeQFA.joinNow.click();
  await page.waitForTimeout(explicitWait);
  await becomeQFA.emailId.type("runalipainaik@gmail.com");
  await page.waitForTimeout(explicitWait);
  await becomeQFA.fullName.press("Tab"); 
  await page.waitForTimeout(explicitWait);
})

test('Fill in mobile number and press tab button to switch the tab', async ({ page }) => {
  const becomeQFA = new BecomeQfaPage(page);
  await scrollPage(page, 5);
  await becomeQFA.becomeQfa.click();
  await page.waitForTimeout(explicitWait);
  await becomeQFA.joinNow.click();
  await page.waitForTimeout(explicitWait);
  await becomeQFA.mobileNumber.type('8291684040');
  await page.waitForTimeout(explicitWait);
  await becomeQFA.fullName.press("Tab"); 
  await page.waitForTimeout(explicitWait);
})

test('Fill in city and press tab button to switch the tab', async ({ page }) => {
  const becomeQFA = new BecomeQfaPage(page);
  await scrollPage(page, 5);
  await becomeQFA.becomeQfa.click();
  await page.waitForTimeout(explicitWait);
  await becomeQFA.joinNow.click();
  await page.waitForTimeout(explicitWait);
  await becomeQFA.city.type('Thane');
  await page.waitForTimeout(explicitWait);
  await becomeQFA.fullName.press("Tab"); 
  await page.waitForTimeout(explicitWait);
})

test('Fill all the details and enable all the checkboxes and click submit button --Function', async ({ page }) => {
  const becomeQFA = new BecomeQfaPage(page);
  await becomeQFA.allDetails();
  await page.waitForTimeout(explicitWait);
})

test('Fill all the details and enable all the checkboxes and click submit button', async ({ page }) => {
  const becomeQFA = new BecomeQfaPage(page);
  await scrollPage(page, 5);
  await becomeQFA.becomeQfa.click();
  await becomeQFA.joinNow.click();
  await becomeQFA.fullName.type("Runali Painaik");
  await becomeQFA.fullName.press("Tab"); 
  await becomeQFA.emailId.type("runalipainaik@gmail.com");
  await becomeQFA.fullName.press("Tab"); 
  await becomeQFA.mobileNumber.type('8291684040');
  await becomeQFA.fullName.press("Tab"); 
  await becomeQFA.city.type('Thane');
  await becomeQFA.fullName.press("Tab"); 
  await becomeQFA.ca.click();
  await becomeQFA.cfa.click();
  await becomeQFA.cfp.click();
  await becomeQFA.cwm.click();
  await becomeQFA.nism.click();
  await becomeQFA.qpfp.click();
  await becomeQFA.sebi.click();
  await becomeQFA.others.click();
  await becomeQFA.ans.type("Answer");
  await becomeQFA.submitButton.click();
  await page.waitForTimeout(explicitWait);
})

test('To assert toast for email which already exists', async ({ page }) => {
  const becomeQFA = new BecomeQfaPage(page);
  await scrollPage(page, 5);
  await becomeQFA.becomeQfa.click();
  await becomeQFA.joinNow.click();
  await becomeQFA.fullName.type("Runali Painaik");
  await becomeQFA.fullName.press("Tab"); 
  await becomeQFA.emailId.type("runalipainaik@gmail.com");
  await becomeQFA.fullName.press("Tab"); 
  await becomeQFA.mobileNumber.type('8291684040');
  await becomeQFA.fullName.press("Tab"); 
  await becomeQFA.city.type('Thane');
  await becomeQFA.fullName.press("Tab"); 
  await becomeQFA.ca.click();
  await becomeQFA.cfp.click();
  await becomeQFA.cwm.click();
  await becomeQFA.nism.click();
  await becomeQFA.qpfp.click();
  await becomeQFA.sebi.click();
  await becomeQFA.others.click();
  await becomeQFA.ans.type("Answer");
  await becomeQFA.submitButton.click();
  await page.waitForTimeout(explicitWait);
  const toastElement = await (becomeQFA.phoneNoEmailErrorToast).textContent();
  const expectedToastMessage = 'Your email is already registered !';
  expect.soft(toastElement).toEqual(expectedToastMessage);
  // if (toastElement.includes(expectedToastMessage)) {
  //   console.log('Toast message assertion passed.');
  // } else {
  //   console.error('Toast message assertion failed.');
  // }
})

test('To assert toast for success message', async ({ page }) => {
  const becomeQFA = new BecomeQfaPage(page);
  await scrollPage(page, 5);
  await becomeQFA.becomeQfa.click();
  await becomeQFA.joinNow.click();
  await becomeQFA.fullName.type("Runali Painaik");
  await becomeQFA.fullName.press("Tab"); 
  await becomeQFA.emailId.type("runalipainaik123@gmail.com");
  await becomeQFA.fullName.press("Tab"); 
  await becomeQFA.mobileNumber.type('8245684040');
  await becomeQFA.fullName.press("Tab"); 
  await becomeQFA.city.type('Thane');
  await becomeQFA.fullName.press("Tab"); 
  await becomeQFA.ca.click();
  await becomeQFA.cfa.click();
  await becomeQFA.cfp.click();
  await becomeQFA.cwm.click();
  await becomeQFA.nism.click();
  await becomeQFA.qpfp.click();
  await becomeQFA.sebi.click();
  await becomeQFA.others.click();
  await becomeQFA.ans.type("Answer");
  await becomeQFA.submitButton.click();
  const toastElement = await becomeQFA.SuccessToast.textContent();
  const expectedToastMessage = 'Form submitted successfully';
  expect.soft(toastElement).toEqual(expectedToastMessage);
  await becomeQFA.cancelButton.click();
  await page.waitForTimeout(explicitWait);
})

test('To check the functionality for expansion and collapse tile', async ({ page }) => {
  const becomeQFA = new BecomeQfaPage(page);
  await scrollPage(page, 4);
  await page.waitForTimeout(explicitWait);
  await becomeQFA.becomeQfa.click();
  await page.waitForTimeout(explicitWait);
  await scrollPage(page, 4);
  await page.waitForTimeout(explicitWait);
  await becomeQFA.faqFirstTile.click();
  await page.waitForTimeout(explicitWait); 
  await scrollPage(page, 1);  
  await becomeQFA.faqSecondTile.click();
  await page.waitForTimeout(explicitWait);
  await scrollPage(page, 1); 
  await becomeQFA.faqThirdTile.click(); 
  await page.waitForTimeout(explicitWait);
  await becomeQFA.faqFourthTile.click(); 
  await page.waitForTimeout(explicitWait);
  await becomeQFA.faqFifthTile.click(); 
  await page.waitForTimeout(explicitWait);
  await becomeQFA.faqSixthTile.click(); 
  await page.waitForTimeout(explicitWait);
  await becomeQFA.faqSeventhTile.click(); 
  await page.waitForTimeout(explicitWait);
  await becomeQFA.faqEighthTile.click(); 
  await page.waitForTimeout(explicitWait);
  await becomeQFA.faqEighthTile.click(); 
  await page.waitForTimeout(explicitWait);
  await becomeQFA.faqNinthTile.click(); 
  await page.waitForTimeout(explicitWait);
})









 





