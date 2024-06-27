const { test, expect, makeAPICall, playwright } = require('@playwright/test');

import { CalculatorPage } from '../../../pageobjects';

const explicitWait = 2000;

let baseUrl = process.env.QA_URL_WEBSITE

export async function scrollPage(page, iterations) {
  for (let i = 0; i < iterations; i++) {
    page.keyboard.down('PageDown');
  }
}

test.beforeEach(async ({ page }) => {
  debugger;
  const calculatorPage = new CalculatorPage(page);
  baseUrl = baseURLs[2];
  await page.goto(baseUrl);
  await calculatorPage.calculator.click();
});

test('To check the title on Calculator Page', async ({ page }) => {
  await expect(page).toHaveTitle('Commission Calculator - How to Calculate Commission on MFs & Insurance');
});

test('To click on HRA Exemption and assert response', async ({ page }) => {
  debugger;
  const calculatorPage = new CalculatorPage(page);
  await calculatorPage.hraExemption.click();
  await expect.soft(page).toHaveURL(baseUrl + "calculator/hra-exemption");
});

test('To click on NPS Calculator and assert response', async ({ page }) => {
  const calculatorPage = new CalculatorPage(page);
  await calculatorPage.npsCalculator.click();
  await expect.soft(page).toHaveURL(baseUrl + "calculator/nps");
});

test('To click on Insurance and assert response', async ({ page }) => {
  const calculatorPage = new CalculatorPage(page);
  await scrollPage(page, 1);
  await calculatorPage.insurance.click();
  await expect.soft(page).toHaveURL(baseUrl + "calculator/insurance")
})

test('To click on Mutual Funds and assert response', async ({ page }) => {
  const calculatorPage = new CalculatorPage(page);
  await scrollPage(page, 1);
  await calculatorPage.mutualFund.click();
  await expect.soft(page).toHaveURL(baseUrl + "calculator/mutual-funds");
})

test('To click on Loan Refinance and assert response', async ({ page }) => {
  const calculatorPage = new CalculatorPage(page);
  await scrollPage(page, 2);
  await calculatorPage.loanRefinance.click();
  await expect.soft(page).toHaveURL(baseUrl + "calculator/loan-refinance");
})


