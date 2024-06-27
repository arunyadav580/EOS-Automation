const { test, expect, makeAPICall, playwright } = require('@playwright/test');

import { HomePage} from '../../../pageobjects';
import { MoneysignPage } from '../../../pageobjects';

const baseUrl = process.env.QA_URL_WEBSITE

export async function scrollPage(page, iterations) {
  for (let i = 0; i < iterations; i++) {
    page.keyboard.down('PageDown');
  }
}

test.beforeEach(async ({ page }) => {
  await page.goto(baseUrl + "moneysign-guide");
});

test('To check the title of Moneysign page', async ({ page }) => {
  await page.waitForTimeout(1000);
  await expect(page).toHaveTitle('MoneySign® - Smart & Accurate Personal Financial Solutions App| 1Finance');
});

test('To scroll down to MS profile section and then click on vigilant turtle and then close the card', async ({ page }) => {
  const moneysignPage = new MoneysignPage(page);
  moneysignPage.commonStepsToScroll();
  await moneysignPage.vigilantTurtle.click();
  await moneysignPage.closeCard.click();
});

test('Click on Persistant Horse and close the card', async ({ page }) => {
  const moneysignPage = new MoneysignPage(page);
  await moneysignPage.commonStepsToScroll();
  await moneysignPage.persistantHorse.click();
  await moneysignPage.closeCard.click();
});

test('Click on Far-Sighted Eagle and close the card', async ({ page }) => {
  const moneysignPage = new MoneysignPage(page);
  await moneysignPage.commonStepsToScroll();
  await moneysignPage.farsightedEagle.click();
  await moneysignPage.closeCard.click();
});

test('Click on Opportunistic Lion and close the card', async ({ page }) => {
  const moneysignPage = new MoneysignPage(page);
  await moneysignPage.commonStepsToScroll();
  await moneysignPage.opportunisticLion.click();
  await moneysignPage.closeCard.click();
});

test('Click on Virtuous Elephant and close the card', async ({ page }) => {
  const moneysignPage = new MoneysignPage(page);
  await moneysignPage.commonStepsToScroll();
  await moneysignPage.virtuousElephant.click();
  await moneysignPage.closeCard.click();
});

test('Click on Enlightened Whale and close the card', async ({ page }) => {
  const moneysignPage = new MoneysignPage(page);
  await moneysignPage.commonStepsToScroll();
  await moneysignPage.enlightenedWhale.click();
  await moneysignPage.closeCard.click();
});

test('Click on Tactical Tiger and close the card', async ({ page }) => {
  const moneysignPage = new MoneysignPage(page);
  await moneysignPage.commonStepsToScroll();
  await moneysignPage.tacticalTiger.click();
  await moneysignPage.closeCard.click();
});

test('Click on Stealthy Shark and close the card', async ({ page }) => {
  const moneysignPage = new MoneysignPage(page);
  await moneysignPage.commonStepsToScroll();
  await moneysignPage.stealthyShark.click();
  await moneysignPage.closeCard.click();
});

test('Check the functionality for next button in 8 MS profile section', async ({ page }) => {
  const moneysignPage = new MoneysignPage(page);
  await moneysignPage.commonStepsToScroll();
  await moneysignPage.vigilantTurtle.click();
  await moneysignPage.nextPage();
});

test('Check the functionality for previous button in 8 MS profile section', async ({ page }) => {
  const moneysignPage = new MoneysignPage(page);
  await moneysignPage.commonStepsToScroll();
  await moneysignPage.stealthyShark.click();
  await moneysignPage.previousPage();
});

test('Scroll down and click on download the app section', async ({ page }) => {
  const moneysignPage = new MoneysignPage(page);
  const homePage = new HomePage(page);
  await scrollPage(page, 3);
  await moneysignPage.downloadTheApp.click();
  await homePage.closeDownloadScreen.click();
})

test('Click on read more link', async ({ page }) => {
  const moneysignPage = new MoneysignPage(page);
  await scrollPage(page, 4);
  await moneysignPage.readMore.click();
})