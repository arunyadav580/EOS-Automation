const { test, expect, makeAPICall, playwright } = require('@playwright/test');

import { CalculatorPage } from '../../../pageobjects';

const explicitWait = 2000;

const baseUrl = process.env.QA_URL_WEBSITE

async function scrollPage(page, iterations) {
    for (let i = 0; i < iterations; i++) {
        page.keyboard.down('PageDown');
    }
}

test.describe("Increasing Contribution", () => {

    test('Go to Increasing Contribution Calculators landing page and assert response ', async ({ page }) => {
        const calculatorPage = new CalculatorPage(page);
        await page.goto(baseUrl + "calculator/increasing-contribution");
        expect(calculatorPage.increasingContributionTitle).toHaveText("Increasing Contribution Calculator");
    });

    test('Fill in all the details for Increasing Contribution Calculator and check for every functionality', async ({ page }) => {
        const calculatorPage = new CalculatorPage(page);
        await page.goto(baseUrl + "calculator/increasing-contribution");
        await (calculatorPage.increasingContributionInvestmentAmount).fill("10000");
        await (calculatorPage.increasingContributionAnnualStepUp).fill("29");
        await (calculatorPage.increasingContributionRateOfReturn).fill("25");
        await (calculatorPage.increasingContributionTimePeriod).fill("40");
        await (calculatorPage.calculateButton).click();
        await expect(calculatorPage.increasingContributionResultPage).toHaveText("Investment Corpus Value")
    });

    test('Click on the Read More link and assert response', async({page}) =>{
        const calculatorPage = new CalculatorPage(page);
        await page.goto(baseUrl + "calculator/increasing-contribution");
        await scrollPage(page, 1);
        await calculatorPage.readMore.click();
    })

    test('Click on the FAQ questions and assert response', async({page}) =>{
        const calculatorPage = new CalculatorPage(page);
        await page.goto(baseUrl + "calculator/increasing-contribution");
        await scrollPage(page, 1);
        await calculatorPage.firstTile.click();
        await calculatorPage.secondTile.click();
        await calculatorPage.thirdTile.click();
        await calculatorPage.fourthTile.click();
        await calculatorPage.fifthTile.click();
        await calculatorPage.sixthTile.click();
        await calculatorPage.seventhTile.click();
        await calculatorPage.eighthTile.click();
    })

    test('Click on Download the App and assert response', async({page}) =>{
        const calculatorPage = new CalculatorPage(page);
        await page.goto(baseUrl + "calculator/increasing-contribution");
        await scrollPage(page, 2);
        await calculatorPage.downloadTheApp.click();
        await expect(calculatorPage.downloadTheAppTitle).toHaveText("Download 1 Finance");
    })

    test('Click on cancel button present on Download the App and assert response', async({page}) =>{
        const calculatorPage = new CalculatorPage(page);
        await page.goto(baseUrl + "calculator/increasing-contribution");
        await scrollPage(page, 2);
        await calculatorPage.downloadTheApp.click();
        await calculatorPage.cancelButton.click();
    })

    test('Click on Other Calculators in Try our calculators section and assert response', async({page}) =>{
        const calculatorPage = new CalculatorPage(page);
        await page.goto(baseUrl + "calculator/increasing-contribution");
        await scrollPage(page, 2);
        await calculatorPage.tryOtherCal.click();
        await expect(page).toHaveURL( baseUrl + "calculator/portfolio-review")
    })

    test('Click on Try our calculators and assert response', async({page}) =>{
        const calculatorPage = new CalculatorPage(page);
        await page.goto(baseUrl + "calculator/increasing-contribution");
        await scrollPage(page, 2);
        await calculatorPage.tryOtherCalculatorSection.click();
        await expect(page).toHaveURL(baseUrl + "calculator")
    })

    test('Click on Share Button and assert response', async({page}) =>{
        const calculatorPage = new CalculatorPage(page);
        await page.goto(baseUrl + "calculator/increasing-contribution");
        await calculatorPage.shareButton.click();
    })

    test('Click on calculators button to go back to the landing page and assert response', async({page}) =>{
        const calculatorPage = new CalculatorPage(page);
        await page.goto(baseUrl + "calculator/increasing-contribution");
        await calculatorPage.calcBackIncreasingContribution.click();
        await expect (page).toHaveURL(baseUrl + "calculator")
    })
    
})
