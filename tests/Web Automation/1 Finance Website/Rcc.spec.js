const { test, expect, makeAPICall, playwright } = require('@playwright/test');

import { CalculatorPage } from '../../../pageobjects';

const prompt = require('prompt-sync')();

const explicitWait = 2000;

const baseUrl = process.env.QA_URL_WEBSITE

export async function scrollPage(page, iterations) {
    for (let i = 0; i < iterations; i++) {
        page.keyboard.down('PageDown');
        await page.waitForTimeout(explicitWait);
    }
}

test.beforeEach(async ({ page }) => {
    const calculatorPage = new CalculatorPage(page);
    await page.goto(baseUrl);
    await calculatorPage.calculator.click();
});

test('To click on Retirement Corpus Calculator and assert response', async ({ page }) => {
    const calculatorPage = new CalculatorPage(page);
    await calculatorPage.rccCalculator.click();
    await expect.soft(page).toHaveURL(baseUrl + "calculator/retirement-corpus");
});

test('To check if the readmore link is clickable on RCC calculator page', async ({ page }) => {
    const calculatorPage = new CalculatorPage(page);
    await calculatorPage.rccCalculator.click();
    await calculatorPage.readMore.click();
    await page.waitForTimeout(explicitWait);
    let expectedText = 'How will this Retirement Corpus Calculator help you?';
    await expect(calculatorPage.rccReadMoreScroll).toContainText(expectedText);
})

test('To check the functionality for expansion and collapse tile in RCC Calculator section', async ({ page }) => {
    const calculatorPage = new CalculatorPage(page);
    await calculatorPage.rccCalculator.click();
    await scrollPage(page, 2);
    await calculatorPage.firstTile.click();
    await calculatorPage.secondTile.click();
    await calculatorPage.thirdTile.click();
    await calculatorPage.fourthTile.click();
    await calculatorPage.fifthTile.click();
    await calculatorPage.sixthTile.click();
    await calculatorPage.seventhTile.click();
    await page.waitForTimeout(explicitWait);
});

test('To check if the share button is clickable on RCC calculator page', async ({ page }) => {
    const calculatorPage = new CalculatorPage(page);
    await calculatorPage.rccCalculator.click();
    await calculatorPage.share.click();
    await page.waitForTimeout(explicitWait);
})

test('To click on calculators button to go back to the landing page and assert response', async ({ page }) => {
    const calculatorPage = new CalculatorPage(page);
    await calculatorPage.rccCalculator.click();
    await calculatorPage.calcBackRcc.click();
    await expect.soft(page).toHaveURL(baseUrl + "calculator");
})

test("To click on download the app on Rcc Calculator page", async ({ page }) => {
    const calculatorPage = new CalculatorPage(page);
    await calculatorPage.rccCalculator.click();
    await scrollPage(page, 4);
    await page.waitForTimeout(explicitWait)
    await calculatorPage.downloadTheApp.click();
    await calculatorPage.cancelButton.click();
})

test("Keep years to retirement section blank and assert response", async ({ page }) => {
    const calculatorPage = new CalculatorPage(page);
    await calculatorPage.rccCalculator.click();
    await calculatorPage.rccFirstContainer.click();
    await calculatorPage.rccFirstContainer.press("Tab");
    const element = await calculatorPage.errorStateRccLanding;
    const text = await element.innerText();
    expect(text).toBe('Minimum limit is 1');
})

test("Enter maximum limit in years or retirement section and assert response", async ({ page }) => {
    const calculatorPage = new CalculatorPage(page);
    await calculatorPage.rccCalculator.click();
    await calculatorPage.rccFirstContainer.click();
    await calculatorPage.rccFirstContainer.type("100");
    await calculatorPage.rccFirstContainer.press("Tab");
    const element = await calculatorPage.errorStateRccLanding;
    const text = await element.innerText();
    expect(text).toBe('Years can’t exceed 80');
})

test("Enter annual expense less than 100 and assert response", async ({ page }) => {
    const calculatorPage = new CalculatorPage(page);
    await calculatorPage.rccCalculator.click();
    await calculatorPage.rccSecondContainer.click();
    await calculatorPage.rccSecondContainer.press("Tab");
    const element = await calculatorPage.errorStateRccLanding;
    const text = await element.innerText();
    expect(text).toBe('Value should be greater than 1000');
})

test("Exceed maximum annual expense and assert response", async ({ page }) => {
    const calculatorPage = new CalculatorPage(page);
    await calculatorPage.rccCalculator.click();
    await calculatorPage.rccSecondContainer.click();
    await calculatorPage.rccSecondContainer.type("10000000000000000");
    await calculatorPage.rccSecondContainer.press("Tab");
    const element = await calculatorPage.errorStateRccLanding;
    const text = await element.innerText();
    expect(text).toBe("You can't enter the Current Annual Expenses more than 10,00,00,000");
})

test("Keep expected inflation section blank and assert response", async ({ page }) => {
    const calculatorPage = new CalculatorPage(page);
    await calculatorPage.rccCalculator.click();
    await calculatorPage.rccThirdContainer.click();
    await calculatorPage.rccThirdContainer.press("Tab");
    const element = await calculatorPage.errorStateRccLanding;
    const text = await element.innerText();
    expect(text).toBe("Minimum limit is 1%")
})

test("Set the expected inflation section to max i.e 100 and assert response", async ({ page }) => {
    const calculatorPage = new CalculatorPage(page);
    await calculatorPage.rccCalculator.click();
    await calculatorPage.rccThirdContainer.click();
    await calculatorPage.rccThirdContainer.type("555");
    await calculatorPage.rccThirdContainer.press("Tab");
    const element = await calculatorPage.errorStateRccLanding;
    const text = await element.innerText();
    expect(text).toBe("Maximum limit is 100%")
})

test("Enter alphabets in expected inflation section and assert response", async ({ page }) => {
    const calculatorPage = new CalculatorPage(page);
    await calculatorPage.rccCalculator.click();
    await calculatorPage.rccThirdContainer.click();
    await calculatorPage.rccThirdContainer.type("aaaaaa");
    await calculatorPage.rccThirdContainer.press("Tab");
    const element = await calculatorPage.errorStateRccLanding;
    const text = await element.innerText();
    expect(text).toBe("Only numbers allowed")
})

test("Click on the know more of Annual Expense and assert response", async ({ page }) => {
    const calculatorPage = new CalculatorPage(page);
    await calculatorPage.rccCalculator.click();
    await calculatorPage.rccKnowMore1.click();
    await page.waitForTimeout(explicitWait);
    await calculatorPage.rccCloseButton.click();
})

test("Click on the know more for expected inflation and assert response", async ({ page }) => {
    const calculatorPage = new CalculatorPage(page);
    await calculatorPage.rccCalculator.click();
    await calculatorPage.rccKnowMore2.click();
    await page.waitForTimeout(explicitWait);
    await calculatorPage.rccCloseButton.click();
})

test("Fill in all the details and click on the next button", async ({ page }) => {
    const calculatorPage = new CalculatorPage(page);
    await calculatorPage.rccCalculator.click();
    await calculatorPage.rccFirstContainer.click();
    await calculatorPage.rccFirstContainer.type("50");
    await calculatorPage.rccFirstContainer.press("Tab");
    await calculatorPage.rccSecondContainer.type("10000000");
    await calculatorPage.rccSecondContainer.press("Tab");
    await calculatorPage.rccThirdContainer.type("50");
    await calculatorPage.nextButton.click();
    await page.waitForTimeout(explicitWait);
})

test("To check minimum life expense after retirement and assert response", async ({ page }) => {
    const calculatorPage = new CalculatorPage(page);
    await calculatorPage.rccCalculator.click();
    await calculatorPage.rccFirstContainer.click();
    await calculatorPage.rccFirstContainer.type("50");
    await calculatorPage.rccFirstContainer.press("Tab");
    await calculatorPage.rccSecondContainer.type("10000000");
    await calculatorPage.rccSecondContainer.press("Tab");
    await calculatorPage.rccThirdContainer.type("50");
    await calculatorPage.nextButton.click();
    await page.waitForTimeout(explicitWait);
    await calculatorPage.rccFirstContainer.click();
    await calculatorPage.rccFirstContainer.press("Tab");
    const element = await calculatorPage.errorStateRccLanding;
    const text = await element.innerText();
    expect(text).toBe("Minimum limit is 1")
})

test("To check maximum life expense after retirement and assert response", async ({ page }) => {
    const calculatorPage = new CalculatorPage(page);
    await calculatorPage.rccCalculator.click();
    await calculatorPage.rccFirstContainer.click();
    await calculatorPage.rccFirstContainer.type("50");
    await calculatorPage.rccFirstContainer.press("Tab");
    await calculatorPage.rccSecondContainer.type("10000000");
    await calculatorPage.rccSecondContainer.press("Tab");
    await calculatorPage.rccThirdContainer.type("50");
    await calculatorPage.nextButton.click();
    await page.waitForTimeout(explicitWait);
    await calculatorPage.rccFirstContainer.click();
    await calculatorPage.rccFirstContainer.type("100000");
    await calculatorPage.rccFirstContainer.press("Tab");
    const element = await calculatorPage.errorStateRccLanding;
    const text = await element.innerText();
    expect(text).toBe("Years can’t exceed 80")
})

test("To check minimum expected inflation after retirement and assert response", async ({ page }) => {
    const calculatorPage = new CalculatorPage(page);
    await calculatorPage.rccCalculator.click();
    await calculatorPage.rccFirstContainer.click();
    await calculatorPage.rccFirstContainer.type("50");
    await calculatorPage.rccFirstContainer.press("Tab");
    await calculatorPage.rccSecondContainer.type("10000000");
    await calculatorPage.rccSecondContainer.press("Tab");
    await calculatorPage.rccThirdContainer.type("50");
    await calculatorPage.nextButton.click();
    await page.waitForTimeout(explicitWait);
    await calculatorPage.rccSecondContainer.click();
    await calculatorPage.rccSecondContainer.type("0");
    await calculatorPage.rccSecondContainer.press("Tab");
    const element = await calculatorPage.errorStateRccLanding;
    const text = await element.innerText();
    expect(text).toBe("Minimum limit is 1%")
})

test("To check maximum expected inflation after retirement and assert response", async ({ page }) => {
    const calculatorPage = new CalculatorPage(page);
    await calculatorPage.rccCalculator.click();
    await calculatorPage.rccFirstContainer.click();
    await calculatorPage.rccFirstContainer.type("50");
    await calculatorPage.rccFirstContainer.press("Tab");
    await calculatorPage.rccSecondContainer.type("10000000");
    await calculatorPage.rccSecondContainer.press("Tab");
    await calculatorPage.rccThirdContainer.type("50");
    await calculatorPage.nextButton.click();
    await page.waitForTimeout(explicitWait);
    await calculatorPage.rccSecondContainer.click();
    await calculatorPage.rccSecondContainer.type("20000");
    await calculatorPage.rccSecondContainer.press("Tab");
    const element = await calculatorPage.errorStateRccLanding;
    const text = await element.innerText();
    expect(text).toBe("Maximum limit is 100%")
})

test("To check minimum expected returns after retirement and assert response", async ({ page }) => {
    const calculatorPage = new CalculatorPage(page);
    await calculatorPage.rccCalculator.click();
    await calculatorPage.rccFirstContainer.click();
    await calculatorPage.rccFirstContainer.type("50");
    await calculatorPage.rccFirstContainer.press("Tab");
    await calculatorPage.rccSecondContainer.type("10000000");
    await calculatorPage.rccSecondContainer.press("Tab");
    await calculatorPage.rccThirdContainer.type("50");
    await calculatorPage.nextButton.click();
    await page.waitForTimeout(explicitWait);
    await calculatorPage.rccSecondContainer.click();
    await calculatorPage.rccSecondContainer.type("0");
    await calculatorPage.rccSecondContainer.press("Tab");
    const element = await calculatorPage.errorStateRccLanding;
    const text = await element.innerText();
    expect(text).toBe("Minimum limit is 1%")
})

test("To check maximum expected returns after retirement and assert response", async ({ page }) => {
    const calculatorPage = new CalculatorPage(page);
    await calculatorPage.rccCalculator.click();
    await calculatorPage.rccFirstContainer.click();
    await calculatorPage.rccFirstContainer.type("50");
    await calculatorPage.rccFirstContainer.press("Tab");
    await calculatorPage.rccSecondContainer.type("10000000");
    await calculatorPage.rccSecondContainer.press("Tab");
    await calculatorPage.rccThirdContainer.type("50");
    await calculatorPage.nextButton.click();
    await page.waitForTimeout(explicitWait);
    await calculatorPage.rccThirdContainer.click();
    await calculatorPage.rccThirdContainer.type("2000");
    await calculatorPage.rccThirdContainer.press("Tab");
    const element = await calculatorPage.errorStateRccLanding;
    const text = await element.innerText();
    expect(text).toBe("Maximum limit is 100%")
})

test("To check if the us button is getting clicked assert response", async ({ page }) => {
    const calculatorPage = new CalculatorPage(page);
    await calculatorPage.rccCalculator.click();
    await calculatorPage.rccFirstContainer.click();
    await calculatorPage.rccFirstContainer.type("50");
    await calculatorPage.rccFirstContainer.press("Tab");
    await calculatorPage.rccSecondContainer.type("10000000");
    await calculatorPage.rccSecondContainer.press("Tab");
    await calculatorPage.rccThirdContainer.type("50");
    await calculatorPage.nextButton.click();
    await page.waitForTimeout(explicitWait);
    await calculatorPage.nextButton.click();
})

test("To click on the Know More for Inflation assert response", async ({ page }) => {
    const calculatorPage = new CalculatorPage(page);
    await calculatorPage.rccCalculator.click();
    await calculatorPage.rccFirstContainer.click();
    await calculatorPage.rccFirstContainer.type("50");
    await calculatorPage.rccFirstContainer.press("Tab");
    await calculatorPage.rccSecondContainer.type("10000000");
    await calculatorPage.rccSecondContainer.press("Tab");
    await calculatorPage.rccThirdContainer.type("50");
    await calculatorPage.nextButton.click();
    await page.waitForTimeout(explicitWait);
    await calculatorPage.rccKnowMore1.click();
    await calculatorPage.rccCloseButton.click();
})

test("To click on the Know More for Expected Returns assert response", async ({ page }) => {
    const calculatorPage = new CalculatorPage(page);
    await calculatorPage.rccCalculator.click();
    await calculatorPage.rccFirstContainer.click();
    await calculatorPage.rccFirstContainer.type("50");
    await calculatorPage.rccFirstContainer.press("Tab");
    await calculatorPage.rccSecondContainer.type("10000000");
    await calculatorPage.rccSecondContainer.press("Tab");
    await calculatorPage.rccThirdContainer.type("50");
    await calculatorPage.nextButton.click();
    await page.waitForTimeout(explicitWait);
    await calculatorPage.rccKnowMore2.click();
    await calculatorPage.rccCloseButton.click();
})

test("To click on calculate button and assert response", async ({ page }) => {
    const calculatorPage = new CalculatorPage(page);
    await calculatorPage.rccCalculator.click();
    await calculatorPage.rccFirstContainer.click();
    await calculatorPage.rccFirstContainer.type("50");
    await calculatorPage.rccFirstContainer.press("Tab");
    await calculatorPage.rccSecondContainer.type("10000000");
    await calculatorPage.rccSecondContainer.press("Tab");
    await calculatorPage.rccThirdContainer.type("50");
    await calculatorPage.nextButton.click();
    await page.waitForTimeout(explicitWait);
    await calculatorPage.rccFirstContainer.click();
    await calculatorPage.rccFirstContainer.type("20");
    await calculatorPage.rccFirstContainer.press("Tab");
    await calculatorPage.rccSecondContainer.type("20");
    await calculatorPage.rccSecondContainer.press("Tab");
    await calculatorPage.rccThirdContainer.type("70");
    await calculatorPage.calculateButton.click();
    await page.waitForTimeout(explicitWait);
})

test("To check if you can edit the details and assert response", async ({ page }) => {
    const calculatorPage = new CalculatorPage(page);
    await calculatorPage.rccCalculator.click();
    await calculatorPage.rccFirstContainer.click();
    await calculatorPage.rccFirstContainer.type("50");
    await calculatorPage.rccFirstContainer.press("Tab");
    await calculatorPage.rccSecondContainer.type("10000000");
    await calculatorPage.rccSecondContainer.press("Tab");
    await calculatorPage.rccThirdContainer.type("50");
    await calculatorPage.nextButton.click();
    await page.waitForTimeout(explicitWait);
    await calculatorPage.rccFirstContainer.click();
    await calculatorPage.rccFirstContainer.type("20");
    await calculatorPage.rccFirstContainer.press("Tab");
    await calculatorPage.rccSecondContainer.type("20");
    await calculatorPage.rccSecondContainer.press("Tab");
    await calculatorPage.rccThirdContainer.type("70");
    await calculatorPage.calculateButton.click();
    await calculatorPage.rccEditButton.click();
    await page.waitForTimeout(explicitWait);
})

test("To check if the calculate again button is clickable and assert response", async ({ page }) => {
    const calculatorPage = new CalculatorPage(page);
    await calculatorPage.rccCalculator.click();
    await calculatorPage.rccFirstContainer.click();
    await calculatorPage.rccFirstContainer.type("50");
    await calculatorPage.rccFirstContainer.press("Tab");
    await calculatorPage.rccSecondContainer.type("10000000");
    await calculatorPage.rccSecondContainer.press("Tab");
    await calculatorPage.rccThirdContainer.type("50");
    await calculatorPage.nextButton.click();
    await page.waitForTimeout(explicitWait);
    await calculatorPage.rccFirstContainer.click();
    await calculatorPage.rccFirstContainer.type("20");
    await calculatorPage.rccFirstContainer.press("Tab");
    await calculatorPage.rccSecondContainer.type("20");
    await calculatorPage.rccSecondContainer.press("Tab");
    await calculatorPage.rccThirdContainer.type("70");
    await calculatorPage.calculateButton.click();
    await calculatorPage.rccEditButton.click();
    await calculatorPage.calculateAgainButton.click();
    await page.waitForTimeout(explicitWait);
})