const { test, expect } = require('@playwright/test');

import { HomePage } from '../../../pageobjects';

const baseUrl = process.env.QA_URL_WEBSITE

async function scrollPage(page, iterations) {
    for (let i = 0; i < iterations; i++) {
        page.keyboard.down('PageDown');
        await page.waitForTimeout(1000);
    }
}

test.describe.only('Homepage', () => {

    test.beforeEach('Hit URL', async ({ page }) => {
        await page.goto(baseUrl);
    })

    test.afterEach('Close the Web', async ({ page }) => {
        await page.close();
    })

    test('Go to home page and assert response', async ({ page }) => {
        const homePage = new HomePage(page);
        expect(homePage.titleContent).toContainText("Get Holistic Financial Planning")
    });

    test('Click on download the App on Home Page', async ({ page }) => {
        const homePage = new HomePage(page);
        await homePage.downloadAppButton.click();
        expect(homePage.downloadTheAppContent).toContainText("Download 1 Finance");
        await homePage.closeDownloadScreen.click();
    });

    test('Click on cashflow planning and assert response', async ({ page }) => {
        const homePage = new HomePage(page);
        await scrollPage(page, 1);
        await homePage.cashFlowPlanning.click();
        await page.waitForTimeout(1000);
        expect(homePage.cashFlowContent).toContainText("Cashflow Planning");
    });

    test('Click on liability planning and assert response', async ({ page }) => {
        const homePage = new HomePage(page);
        await scrollPage(page, 1);
        await homePage.liabilityPlanning.click();
        await page.waitForTimeout(1000);
        expect(homePage.liabilityContent).toContainText("Liability Planning");
    });

    test('Click on tax planning and assert response', async ({ page }) => {
        const homePage = new HomePage(page);
        await scrollPage(page, 1);
        await homePage.taxPlanning.click();
        await page.waitForTimeout(1000);
        expect(homePage.taxContent).toContainText("Tax Planning");
    });

    test('Click on insurance planning and assert response', async ({ page }) => {
        const homePage = new HomePage(page);
        await scrollPage(page, 1);
        await homePage.insurancePlanning.click();
        await page.waitForTimeout(1000);
        expect(homePage.insuranceContent).toContainText("Insurance Planning");
    });

    test('Click on investment planning and assert response', async ({ page }) => {
        const homePage = new HomePage(page);
        await scrollPage(page, 1);
        await homePage.investmentPlanning.click();
        await page.waitForTimeout(1000);
        expect(homePage.investmentContent).toContainText("Investment Planning");
    });

    test('Click on will planning and assert response', async ({ page }) => {
        const homePage = new HomePage(page);
        await scrollPage(page, 1);
        await homePage.willPlanning.click();
        await page.waitForTimeout(1000);
        expect(homePage.willContent).toContainText("Will & Estate Planning");
    });

    test('Click on download the app in How it Works ? section', async ({ page }) => {
        const homePage = new HomePage(page);
        await scrollPage(page, 2);
        await homePage.downloadAppButtonTwo.click();
        expect(homePage.downloadTheAppContent).toContainText("Download 1 Finance");
        await homePage.closeDownloadScreen.click();
    });

    test('Click on download the app of FWP section', async ({ page }) => {
        const homePage = new HomePage(page);
        await scrollPage(page, 3);
        await homePage.downloadAppButtonThree.click();
        expect(homePage.downloadTheAppContent).toContainText("Download 1 Finance");
        await homePage.closeDownloadScreen.click();
    });

    test('To check expansion and collapse tile in FAQ section', async ({ page }) => {
        const homePage = new HomePage(page);
        await homePage.faqFirstTile.click();
        await homePage.faqSecondTile.click();
        await homePage.faqThirdTile.click();
        await homePage.faqFourthTile.click();
        await homePage.faqFifthTile.click();
    });
})