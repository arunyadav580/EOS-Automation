const { test, expect, makeAPICall, playwright } = require('@playwright/test');

import { CalculatorPage } from '../../../pageobjects';;

const prompt = require('prompt-sync')();

const explicitWait = 3000;

const baseUrl = process.env.QA_URL_WEBSITE

export async function scrollPage(page, iterations) {
    for (let i = 0; i < iterations; i++) {
        page.keyboard.down('PageDown');
        await page.waitForTimeout(explicitWait);
    }
}

test.beforeEach(async ({ page }) => {
    const calculatorPage = new CalculatorPage(page);
    baseUrl = baseURLs[1];
    await page.goto(baseUrl);
    await calculatorPage.calculator.click();
});

test('To click on Loan Refinance Calculator and assert response', async ({ page }) => {
    const calculatorPage = new CalculatorPage(page);
    await calculatorPage.lfcCalculator.click();
    await expect.soft(page).toHaveURL(baseUrl + "calculator/loan-refinance");
});

test('To check if the readmore link is clickable on LFC calculator page', async ({ page }) => {
    const calculatorPage = new CalculatorPage(page);
    await calculatorPage.lfcCalculator.click();
    await calculatorPage.readMore.click();
    await page.waitForTimeout(explicitWait);
    let expectedText = 'Common Types of Loan Refinancing';
    await expect(calculatorPage.lfcReadMoreScroll).toContainText(expectedText);
})

test('To check the functionality for expansion and collapse tile in RCC Calculator section', async ({ page }) => {
    const calculatorPage = new CalculatorPage(page);
    await calculatorPage.lfcCalculator.click();
    await scrollPage(page, 2);
    await calculatorPage.firstTile.click();
    await calculatorPage.secondTile.click();
    await calculatorPage.thirdTile.click();
    await calculatorPage.fourthTile.click();
    await calculatorPage.fifthTile.click();
    await calculatorPage.sixthTile.click();
    await page.waitForTimeout(explicitWait);
});

test('To check if the share button is clickable on RCC calculator page', async ({ page }) => {
    const calculatorPage = new CalculatorPage(page);
    await calculatorPage.lfcCalculator.click();
    await calculatorPage.share.click();
})

test('To click on calculators button to go back to the landing page and assert response', async ({ page }) => {
    const calculatorPage = new CalculatorPage(page);
    await calculatorPage.lfcCalculator.click();
    await calculatorPage.calcBackLfc.click();
    await expect.soft(page).toHaveURL(baseUrl + "calculator");
})

test("To click on download the app on Lfc Calculator page", async ({ page }) => {
    const calculatorPage = new CalculatorPage(page);
    await calculatorPage.lfcCalculator.click();
    await scrollPage(page, 4);
    await page.waitForTimeout(explicitWait)
    await calculatorPage.downloadTheApp.click();
    await calculatorPage.cancelButton.click();
})

test("To click on Whatsapp icon", async({page})=>{
    const calculatorPage = new CalculatorPage(page);
    await calculatorPage.lfcCalculator.click();
    await calculatorPage.lfcFirstContainer.click();
    await calculatorPage.lfcFirstContainer.type("2000000");
    await calculatorPage.lfcFirstContainer.press("Tab");
    await calculatorPage.lfcSecondContainer.type("10");
    await calculatorPage.lfcSecondContainer.press("Tab");
    await calculatorPage.lfcThirdContainer.type("9");
    await calculatorPage.nextButton.click();
    await page.waitForTimeout(explicitWait);
    await calculatorPage.lfcFirstContainer.click();
    await calculatorPage.lfcFirstContainer.type("2000000");
    await calculatorPage.lfcFirstContainer.press("Tab");
    await calculatorPage.lfcSecondContainer.type("10");
    await calculatorPage.lfcSecondContainer.press("Tab");
    await calculatorPage.lfcThirdContainer.type("9");
    await calculatorPage.calculateButton.click();
    await scrollPage(page,2);
    await calculatorPage.whatsapp.click();
})

test("Keep years to Current Loan section blank and assert response", async ({ page }) => {
    const calculatorPage = new CalculatorPage(page);
    await calculatorPage.lfcCalculator.click();
    await calculatorPage.lfcFirstContainer.click();
    await calculatorPage.lfcFirstContainer.press("Tab");
    const element = await calculatorPage.errorStateLfcLanding;
    const text = await element.innerText();
    expect(text).toBe('Value should be greater than 1000');
})

test("Enter maximum limit in Current Loan section and assert response", async ({ page }) => {
    const calculatorPage = new CalculatorPage(page);
    await calculatorPage.lfcCalculator.click();
    await calculatorPage.lfcFirstContainer.click();
    await calculatorPage.lfcFirstContainer.type("100101010101010");
    await calculatorPage.lfcFirstContainer.press("Tab");
    const element = await calculatorPage.errorStateLfcLanding;
    const text = await element.innerText();
    expect(text).toBe("Limit can't exceed 10,00,00,000");
})

test("Enter minimum current interest rate and assert response", async ({ page }) => {
    const calculatorPage = new CalculatorPage(page);
    await calculatorPage.lfcCalculator.click();
    await calculatorPage.lfcSecondContainer.click();
    await calculatorPage.lfcSecondContainer.press("Tab");
    const element = await calculatorPage.errorStateLfcLanding;
    const text = await element.innerText();
    expect(text).toBe('Minimum limit is 1%');
})

test("Keep the Loan tenure section blank and assert response", async ({ page }) => {
    const calculatorPage = new CalculatorPage(page);
    await calculatorPage.lfcCalculator.click();
    await calculatorPage.lfcThirdContainer.click();
    await calculatorPage.lfcThirdContainer.press("Tab");
    const element = await calculatorPage.errorStateLfcLanding;
    const text = await element.innerText();
    expect(text).toBe("Minimum limit is 1%")
})

test("Set the Loan tenure section to min i.e 0 and assert response", async ({ page }) => {
    const calculatorPage = new CalculatorPage(page);
    await calculatorPage.lfcCalculator.click();
    await calculatorPage.lfcThirdContainer.click();
    await calculatorPage.lfcThirdContainer.type("0");
    await calculatorPage.lfcThirdContainer.press("Tab");
    const element = await calculatorPage.errorStateLfcLanding;
    const text = await element.innerText();
    expect(text).toBe("Minimum limit is 1")
})

test("Set the Loan tenure section to max i.e 500 and assert response", async ({ page }) => {
    const calculatorPage = new CalculatorPage(page);
    await calculatorPage.lfcCalculator.click();
    await calculatorPage.lfcThirdContainer.click();
    await calculatorPage.lfcThirdContainer.type("500");
    await calculatorPage.lfcThirdContainer.press("Tab");
    const element = await calculatorPage.errorStateLfcLanding;
    const text = await element.innerText();
    expect(text).toBe("Maximum limit is 479 months")
})

test("Enter alphabets in Loan Tenure section and assert response", async ({ page }) => {
    const calculatorPage = new CalculatorPage(page);
    await calculatorPage.lfcCalculator.click();
    await calculatorPage.lfcThirdContainer.click();
    await calculatorPage.lfcThirdContainer.type("aaaaaa");
    await calculatorPage.lfcFirstContainer.click();
    const element = await calculatorPage.errorStateLfcLanding2;
    const text = await element.innerText();
    expect(text).toBe("Only numbers allowed")
})

test("Fill in all the details and click on the next button", async ({ page }) => {
    const calculatorPage = new CalculatorPage(page);
    await calculatorPage.lfcCalculator.click();
    await calculatorPage.lfcFirstContainer.click();
    await calculatorPage.lfcFirstContainer.type("2000000");
    await calculatorPage.lfcFirstContainer.press("Tab");
    await calculatorPage.lfcSecondContainer.type("10");
    await calculatorPage.lfcSecondContainer.press("Tab");
    await calculatorPage.lfcThirdContainer.type("9");
    await calculatorPage.nextButton.click();
    await page.waitForTimeout(explicitWait);
})

test("To keep the New Loan section blank and assert response", async ({ page }) => {
    const calculatorPage = new CalculatorPage(page);
    await calculatorPage.lfcCalculator.click();
    await calculatorPage.lfcFirstContainer.click();
    await calculatorPage.lfcFirstContainer.type("2000000");
    await calculatorPage.lfcFirstContainer.press("Tab");
    await calculatorPage.lfcSecondContainer.type("10");
    await calculatorPage.lfcSecondContainer.press("Tab");
    await calculatorPage.lfcThirdContainer.type("9");
    await calculatorPage.nextButton.click();
    await page.waitForTimeout(explicitWait);
    await calculatorPage.lfcFirstContainer.click();
    await calculatorPage.lfcFirstContainer.press("Tab");
    const element = await calculatorPage.errorStateLfcLanding;
    const text = await element.innerText();
    expect(text).toBe("Value should be greater than 1000")
})

test("To enter maximum value in the New Loan section blank and assert response", async ({ page }) => {
    const calculatorPage = new CalculatorPage(page);
    await calculatorPage.lfcCalculator.click();
    await calculatorPage.lfcFirstContainer.click();
    await calculatorPage.lfcFirstContainer.type("2000000");
    await calculatorPage.lfcFirstContainer.press("Tab");
    await calculatorPage.lfcSecondContainer.type("10");
    await calculatorPage.lfcSecondContainer.press("Tab");
    await calculatorPage.lfcThirdContainer.type("9");
    await calculatorPage.nextButton.click();
    await page.waitForTimeout(explicitWait);
    await calculatorPage.lfcFirstContainer.click();
    await calculatorPage.lfcFirstContainer.type("1000000000000");
    await calculatorPage.lfcFirstContainer.press("Tab");
    const element = await calculatorPage.errorStateLfcLanding;
    const text = await element.innerText();
    expect(text).toBe( "Limit can't exceed 10,00,00,000")
})

test("To check new minimum interest rate and assert response", async ({ page }) => {
    const calculatorPage = new CalculatorPage(page);
    await calculatorPage.lfcCalculator.click();
    await calculatorPage.lfcFirstContainer.click();
    await calculatorPage.lfcFirstContainer.type("2000000");
    await calculatorPage.lfcFirstContainer.press("Tab");
    await calculatorPage.lfcSecondContainer.type("10");
    await calculatorPage.lfcSecondContainer.press("Tab");
    await calculatorPage.lfcThirdContainer.type("9");
    await calculatorPage.nextButton.click();
    await page.waitForTimeout(explicitWait);
    await calculatorPage.lfcSecondContainer.click();
    await calculatorPage.lfcSecondContainer.type("0");
    await calculatorPage.lfcSecondContainer.press("Tab");
    const element = await calculatorPage.errorStateLfcLanding;
    const text = await element.innerText();
    expect(text).toBe("Minimum limit is 1%")
})

test("To assert response for minimum New loan tenure", async ({ page }) => {
    const calculatorPage = new CalculatorPage(page);
    await calculatorPage.lfcCalculator.click();
    await calculatorPage.lfcFirstContainer.click();
    await calculatorPage.lfcFirstContainer.type("2000000");
    await calculatorPage.lfcFirstContainer.press("Tab");
    await calculatorPage.lfcSecondContainer.type("10");
    await calculatorPage.lfcSecondContainer.press("Tab");
    await calculatorPage.lfcThirdContainer.type("9");
    await calculatorPage.nextButton.click();
    await page.waitForTimeout(explicitWait);
    await calculatorPage.lfcThirdContainer.click();
    await calculatorPage.lfcThirdContainer.type("0");
    await calculatorPage.lfcThirdContainer.press("Tab");
    const element = await calculatorPage.errorStateLfcLanding;
    const text = await element.innerText();
    expect(text).toBe("Minimum limit is 1");
})

test("To check maximum Loan Tenure and assert response", async ({ page }) => {
    const calculatorPage = new CalculatorPage(page);
    await calculatorPage.lfcCalculator.click();
    await calculatorPage.lfcFirstContainer.click();
    await calculatorPage.lfcFirstContainer.type("2000000");
    await calculatorPage.lfcFirstContainer.press("Tab");
    await calculatorPage.lfcSecondContainer.type("10");
    await calculatorPage.lfcSecondContainer.press("Tab");
    await calculatorPage.lfcThirdContainer.type("9");
    await calculatorPage.nextButton.click();
    await page.waitForTimeout(explicitWait);
    await calculatorPage.lfcThirdContainer.click();
    await calculatorPage.lfcThirdContainer.type("500");
    await calculatorPage.lfcThirdContainer.press("Tab");
    const element = await calculatorPage.errorStateLfcLanding;
    const text = await element.innerText();
    expect(text).toBe("Maximum limit is 479 months");
})

test("To check if the previous button is getting clicked assert response", async ({ page }) => {
    const calculatorPage = new CalculatorPage(page);
    await calculatorPage.lfcCalculator.click();
    await calculatorPage.lfcFirstContainer.click();
    await calculatorPage.lfcFirstContainer.type("2000000");
    await calculatorPage.lfcFirstContainer.press("Tab");
    await calculatorPage.lfcSecondContainer.type("10");
    await calculatorPage.lfcSecondContainer.press("Tab");
    await calculatorPage.lfcThirdContainer.type("9");
    await calculatorPage.nextButton.click();
    await calculatorPage.nextButton.click();
    await page.waitForTimeout(explicitWait);
})

test("To click on calculate button and assert response", async ({ page }) => {
    const calculatorPage = new CalculatorPage(page);
    await calculatorPage.lfcCalculator.click();
    await calculatorPage.lfcFirstContainer.click();
    await calculatorPage.lfcFirstContainer.type("2000000");
    await calculatorPage.lfcFirstContainer.press("Tab");
    await calculatorPage.lfcSecondContainer.type("10");
    await calculatorPage.lfcSecondContainer.press("Tab");
    await calculatorPage.lfcThirdContainer.type("9");
    await calculatorPage.nextButton.click();
    await page.waitForTimeout(explicitWait);
    await calculatorPage.lfcFirstContainer.click();
    await calculatorPage.lfcFirstContainer.type("2000000");
    await calculatorPage.lfcFirstContainer.press("Tab");
    await calculatorPage.lfcSecondContainer.type("10");
    await calculatorPage.lfcSecondContainer.press("Tab");
    await calculatorPage.lfcThirdContainer.type("9");
    await calculatorPage.calculateButton.click();
    await page.waitForTimeout(explicitWait);
})

test("To check if you can edit the details and assert response", async ({ page }) => {
    const calculatorPage = new CalculatorPage(page);
    await calculatorPage.lfcCalculator.click();
    await calculatorPage.lfcFirstContainer.click();
    await calculatorPage.lfcFirstContainer.type("2000000");
    await calculatorPage.lfcFirstContainer.press("Tab");
    await calculatorPage.lfcSecondContainer.type("10");
    await calculatorPage.lfcSecondContainer.press("Tab");
    await calculatorPage.lfcThirdContainer.type("9");
    await calculatorPage.nextButton.click();
    await page.waitForTimeout(explicitWait);
    await calculatorPage.lfcFirstContainer.click();
    await calculatorPage.lfcFirstContainer.type("2000000");
    await calculatorPage.lfcFirstContainer.press("Tab");
    await calculatorPage.lfcSecondContainer.type("10");
    await calculatorPage.lfcSecondContainer.press("Tab");
    await calculatorPage.lfcThirdContainer.type("9");
    await calculatorPage.calculateButton.click();
    await calculatorPage.lfcEditButton.click();
    await page.waitForTimeout(explicitWait);
})

test("To check if the calculate again button is clickable and assert response", async ({ page }) => {
    const calculatorPage = new CalculatorPage(page);
    await calculatorPage.lfcCalculator.click();
    await calculatorPage.lfcFirstContainer.click();
    await calculatorPage.lfcFirstContainer.type("2000000");
    await calculatorPage.lfcFirstContainer.press("Tab");
    await calculatorPage.lfcSecondContainer.type("10");
    await calculatorPage.lfcSecondContainer.press("Tab");
    await calculatorPage.lfcThirdContainer.type("9");
    await calculatorPage.nextButton.click();
    await page.waitForTimeout(explicitWait);
    await calculatorPage.lfcFirstContainer.click();
    await calculatorPage.lfcFirstContainer.type("2000000");
    await calculatorPage.lfcFirstContainer.press("Tab");
    await calculatorPage.lfcSecondContainer.type("10");
    await calculatorPage.lfcSecondContainer.press("Tab");
    await calculatorPage.lfcThirdContainer.type("9");
    await calculatorPage.calculateButton.click();
    await calculatorPage.lfcEditButton.click();
    await page.waitForTimeout(explicitWait);
    await calculatorPage.calculateAgainButton.click();
})

test("To check if the expansion arrow on result chart is clickable and assert response", async ({ page }) => {
    const calculatorPage = new CalculatorPage(page);
    await calculatorPage.lfcCalculator.click();
    await calculatorPage.lfcFirstContainer.click();
    await calculatorPage.lfcFirstContainer.type("2000000");
    await calculatorPage.lfcFirstContainer.press("Tab");
    await calculatorPage.lfcSecondContainer.type("10");
    await calculatorPage.lfcSecondContainer.press("Tab");
    await calculatorPage.lfcThirdContainer.type("9");
    await calculatorPage.nextButton.click();
    await page.waitForTimeout(explicitWait);
    await calculatorPage.lfcFirstContainer.click();
    await calculatorPage.lfcFirstContainer.type("2000000");
    await calculatorPage.lfcFirstContainer.press("Tab");
    await calculatorPage.lfcSecondContainer.type("10");
    await calculatorPage.lfcSecondContainer.press("Tab");
    await calculatorPage.lfcThirdContainer.type("9");
    await calculatorPage.calculateButton.click();
    await page.waitForTimeout(explicitWait);
    await calculatorPage.lfcChartExpansion.click();
    await page.waitForTimeout(explicitWait);
})

