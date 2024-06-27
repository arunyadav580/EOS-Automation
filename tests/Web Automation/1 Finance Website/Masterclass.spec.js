const { test, expect, makeAPICall, playwright } = require('@playwright/test');

import MasterclassPage from '../../pageobjects/MasterclassPage/Masterclass';

const explicitWait = 1000;

const baseUrl = process.env.QA_URL_WEBSITE

export async function scrollPage(page, iterations) {
  for (let i = 0; i < iterations; i++) {
    page.keyboard.down('PageDown');
  }
}

test.beforeEach(async ({ page }) => {
  const masterclassPage = new MasterclassPage(page);
  await page.goto(baseUrl);
  await scrollPage(page, 5);
  await masterclassPage.masterclass.click();
});

test('Click on share button for Masterclass', async ({ page }) => {
  const masterclassPage = new MasterclassPage(page);
  const title = await page.title();
  await masterclassPage.shareButton.click();
});

test('Click on enroll now button if users not enrolled', async ({ page }) => {
  const masterclassPage = new MasterclassPage(page);
  await masterclassPage.enrollNow.click();
});

test('Enter numeric input in name field and assert alert message', async ({ page }) => {
  const masterclassPage = new MasterclassPage(page);
  await masterclassPage.enrollNow.click();
  await masterclassPage.name.type("123");
  await masterclassPage.name.press("Tab");
  let text = await masterclassPage.nameToast.textContent();
  expect(text).toBe('This is an invalid name');
});

test('Enter special characters in name field and assert alert message', async ({ page }) => {
  const masterclassPage = new MasterclassPage(page);
  await masterclassPage.enrollNow.click();
  await masterclassPage.name.type("$$&");
  await masterclassPage.name.press("Tab");
  let text = await masterclassPage.nameToast.textContent();
  expect(text).toBe('This is an invalid name');
});

test('Enter single alphabet in name field and assert alert message', async ({ page }) => {
  const masterclassPage = new MasterclassPage(page);
  await masterclassPage.enrollNow.click();
  await masterclassPage.name.type("A");
  await masterclassPage.name.press("Tab");
  let text = await masterclassPage.nameToast.textContent();
  expect(text).toBe('This is an invalid name');
});

test('Keep name section empty and assert alert message', async ({ page }) => {
  const masterclassPage = new MasterclassPage(page);
  await masterclassPage.enrollNow.click();
  await masterclassPage.name.type("");
  await masterclassPage.name.press("Tab");
  await masterclassPage.name.press("Tab");
  let text = await masterclassPage.nameToast2.textContent();
  expect(text).toBe('Name cannot be empty');
});

test('Enter valid name and press tab button to go to the next field', async ({ page }) => {
  const masterclassPage = new MasterclassPage(page);
  await masterclassPage.enrollNow.click();
  await masterclassPage.name.type("Runali");
  await masterclassPage.name.press("Tab");
});

test('Enter invalid email address with 2 @ and assert alert message', async ({ page }) => {
  const masterclassPage = new MasterclassPage(page);
  await masterclassPage.enrollNow.click();
  await masterclassPage.name.type("Runali");
  await masterclassPage.name.press("Tab");
  await masterclassPage.email.type("Runali@painaik@gmail.com");
  await masterclassPage.name.press("Tab");
  let text = await masterclassPage.emailToast.textContent();
  expect(text).toBe('Please enter a valid email address');
});

test('Enter invalid email address with _ and assert alert message', async ({ page }) => {
  const masterclassPage = new MasterclassPage(page);
  await masterclassPage.enrollNow.click();
  await masterclassPage.name.type("Runali");
  await masterclassPage.name.press("Tab");
  await masterclassPage.email.type("Runali_pa#in*aik&@gmail.com");
  await masterclassPage.name.press("Tab");
  let text = await masterclassPage.emailToast.textContent();
  expect(text).toBe('Please enter a valid email address');
});

test('Enter invalid email address with special characters and assert alert message', async ({ page }) => {
  const masterclassPage = new MasterclassPage(page);
  await masterclassPage.enrollNow.click();
  await masterclassPage.name.type("Runali");
  await masterclassPage.name.press("Tab");
  await masterclassPage.email.type("Runali$$painaik@gmail.com");
  await masterclassPage.name.press("Tab");
  let text = await masterclassPage.emailToast.textContent();
  expect(text).toBe('Please enter a valid email address');
});

test('Enter invalid email address with 2 dots in email field and assert alert message', async ({ page }) => {
  const masterclassPage = new MasterclassPage(page);
  await masterclassPage.enrollNow.click();
  await masterclassPage.name.type("Runali");
  await masterclassPage.name.press("Tab");
  await masterclassPage.email.type("Runali.pai.naik@gmail.com");
  await masterclassPage.name.press("Tab");
  let text = await masterclassPage.emailToast.textContent();
  expect(text).toBe('Please enter a valid email address');
});

test('Keep email section empty and assert alert message', async ({ page }) => {
  const masterclassPage = new MasterclassPage(page);
  await masterclassPage.enrollNow.click();
  await masterclassPage.name.type("Runali");
  await masterclassPage.name.press("Tab");
  await masterclassPage.name.press("Tab");
  let text = await masterclassPage.emailToast2.textContent();
  expect(text).toBe('Email address cannot be empty');
});

test('Enter invalid Mobile number starting from 1 in mobile number field and assert alert message', async ({ page }) => {
  const masterclassPage = new MasterclassPage(page);
  await masterclassPage.enrollNow.click();
  await masterclassPage.name.type("Runali");
  await masterclassPage.name.press("Tab");
  await masterclassPage.email.type("runalipainaik@gmail.com");
  await masterclassPage.name.press("Tab");
  await masterclassPage.mobileNumber.type("1111111111");
  await masterclassPage.name.press("Tab");
  let text = await masterclassPage.mobileNumberToast.textContent();
  expect(text).toBe('This is an invalid number');
});

test('Enter invalid Mobile number starting from 2 in mobile number field and assert alert message', async ({ page }) => {
  const masterclassPage = new MasterclassPage(page);
  await masterclassPage.enrollNow.click();
  await masterclassPage.name.type("Runali");
  await masterclassPage.name.press("Tab");
  await masterclassPage.email.type("runalipainaik@gmail.com");
  await masterclassPage.name.press("Tab");
  await masterclassPage.mobileNumber.type("22222222222");
  await masterclassPage.name.press("Tab");
  let text = await masterclassPage.mobileNumberToast.textContent();
  expect(text).toBe('This is an invalid mobile number');
});

test('Enter invalid Mobile number starting from 3 in mobile number field and assert alert message', async ({ page }) => {
  const masterclassPage = new MasterclassPage(page);
  await masterclassPage.enrollNow.click();
  await masterclassPage.name.type("Runali");
  await masterclassPage.name.press("Tab");
  await masterclassPage.email.type("runalipainaik@gmail.com");
  await masterclassPage.name.press("Tab");
  await masterclassPage.mobileNumber.type("3333333333");
  await masterclassPage.name.press("Tab");
  let text = await masterclassPage.mobileNumberToast.textContent();
  expect(text).toBe('This is an invalid number');
});

test('Enter invalid Mobile number starting from 4 in mobile number field and assert alert message', async ({ page }) => {
  const masterclassPage = new MasterclassPage(page);
  await masterclassPage.enrollNow.click();
  await masterclassPage.name.type("Runali");
  await masterclassPage.name.press("Tab");
  await masterclassPage.email.type("runalipainaik@gmail.com");
  await masterclassPage.name.press("Tab");
  await masterclassPage.mobileNumber.type("4444444444");
  await masterclassPage.name.press("Tab");
  let text = await masterclassPage.mobileNumberToast.textContent();
  expect(text).toBe('This is an invalid number');
});

test('Enter invalid Mobile number starting from 5 in mobile number field and assert alert message', async ({ page }) => {
  const masterclassPage = new MasterclassPage(page);
  await masterclassPage.enrollNow.click();
  await masterclassPage.name.type("Runali");
  await masterclassPage.name.press("Tab");
  await masterclassPage.email.type("runalipainaik@gmail.com");
  await masterclassPage.name.press("Tab");
  await masterclassPage.mobileNumber.type("5555555555");
  await masterclassPage.name.press("Tab");
  let text = await masterclassPage.mobileNumberToast.textContent();
  expect(text).toBe('This is an invalid number');
});

test('Keep mobile number field empty and assert alert message', async ({ page }) => {
  const masterclassPage = new MasterclassPage(page);
  await masterclassPage.enrollNow.click();
  await masterclassPage.name.type("Runali");
  await masterclassPage.name.press("Tab");
  await masterclassPage.email.type("runalipainaik@gmail.com");
  await masterclassPage.name.press("Tab");
  await masterclassPage.name.press("Tab");
  await masterclassPage.mobileNumber.type("");
  let text = await masterclassPage.mobileNumberToast2.textContent();
  expect(text).toBe('Phone number cannot be empty');

});

test('To deselect checkbox and check if its clickable or not', async ({ page }) => {
  const masterclassPage = new MasterclassPage(page);
  await masterclassPage.enrollNow.click();
  await masterclassPage.checkbox.click();
});

test.only('Enter valid details and click on the submit button assert response', async ({ page }) => {
  const masterclassPage = new MasterclassPage(page);
  await masterclassPage.enrollNow.click();
  await masterclassPage.name.type("Runali");
  await masterclassPage.name.press("Tab");
  await masterclassPage.email.type("runalipainaik@gmail.com");
  await masterclassPage.name.press("Tab");
  await masterclassPage.mobileNumber.type("8291684040");
  await masterclassPage.submitButton.click();
  await scrollPage(page,2);
});


