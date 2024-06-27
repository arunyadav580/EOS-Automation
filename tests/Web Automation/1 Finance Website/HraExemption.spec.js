const { test, expect, makeAPICall, playwright } = require('@playwright/test');

import { CalculatorPage } from '../../../pageobjects';

const explicitWait = 2000;

const baseUrl = process.env.QA_URL_WEBSITE

export async function scrollPage(page, iterations) {
    for (let i = 0; i < iterations; i++) {
        page.keyboard.down('PageDown');
    }
}

test.beforeEach(async ({ page }) => {
    const calculatorPage = new CalculatorPage(page);
    baseUrl = baseURLs[2];
    await page.goto(baseUrl);
    await calculatorPage.calculator.click();
});


test('To click on HRA Exemption and assert response', async ({ page }) => {
    const calculatorPage = new CalculatorPage(page);
    await calculatorPage.hraExemption.click();
    await expect.soft(page).toHaveURL(baseUrl + "calculator/hra-exemption");
});

test('To click on calculators button to go back to the landing page and assert response', async ({ page }) => {
    const calculatorPage = new CalculatorPage(page);
    await calculatorPage.hraExemption.click();
    await calculatorPage.calcBack.click();
    await expect.soft(page).toHaveURL(baseUrl + "calculator");
  })

test('To check if the readmore link is clickable on HRA Exemption page', async ({ page }) => {
    const calculatorPage = new CalculatorPage(page);
    await calculatorPage.hraExemption.click();
    await calculatorPage.readMore.click();
    await page.waitForTimeout(explicitWait);

    const expectedText = 'What is a HRA Calculator?';
    await expect(calculatorPage.targetElement).toContainText(expectedText);
})

test("To check if the first expansion tile on HRA Exemption page", async ({ page }) => {
    const calculatorPage = new CalculatorPage(page);
    await calculatorPage.hraExemption.click();
    await scrollPage(page, 1);
    await calculatorPage.firstTile.click();
    await calculatorPage.secondTile.click();
    await calculatorPage.thirdTile.click();
    await calculatorPage.fourthTile.click();
    await page.waitForTimeout(explicitWait);
})

test("To click on download the app on HRA Exemption page", async ({ page }) => {
    const calculatorPage = new CalculatorPage(page);
    await calculatorPage.hraExemption.click();
    await scrollPage(page, 3);
    await calculatorPage.downloadTheApp.click();
    await calculatorPage.cancelButton.click();
})

test("Click on NPS of 'Try our other calculators' section of HRA exemption", async ({ page }) => {
    const calculatorPage = new CalculatorPage(page);
    await calculatorPage.hraExemption.click();
    await page.waitForTimeout(explicitWait);
    await scrollPage(page, 4);
    await calculatorPage.npsCal.click();
    await expect.soft(page).toHaveURL(baseUrl + "calculator/nps");
})

test("Click on Insurance of 'Try our other calculators' section of HRA exemption", async ({ page }) => {
    const calculatorPage = new CalculatorPage(page);
    await calculatorPage.hraExemption.click();
    await page.waitForTimeout(explicitWait);
    await scrollPage(page, 4);
    await calculatorPage.insuranceCal.click();
    await expect.soft(page).toHaveURL(baseUrl + "calculator/insurance");
})

test("Click on Mutual Funds of 'Try our other calculators' section of HRA exemption", async ({ page }) => {
    const calculatorPage = new CalculatorPage(page);
    await calculatorPage.hraExemption.click();
    await page.waitForTimeout(explicitWait);
    await scrollPage(page, 4);
    await calculatorPage.mutualFundCal.click();
    await expect.soft(page).toHaveURL(baseUrl + "calculator/mutual-funds");
})

test("Click on Loan Refinance of 'Try our other calculators' section of HRA exemption", async ({ page }) => {
    const calculatorPage = new CalculatorPage(page);
    await calculatorPage.hraExemption.click();
    await page.waitForTimeout(explicitWait);
    await scrollPage(page, 4);
    await calculatorPage.loanRefinanceCal.click();
    await expect.soft(page).toHaveURL(baseUrl + "calculator/loan-refinance");
})

test("Assert alert response for no input in Basic Salary Section for Monthly", async ({ page }) => {
    const calculatorPage = new CalculatorPage(page);
    await calculatorPage.hraExemption.click();
    await calculatorPage.basicHra.click();
    await calculatorPage.basicHra.press('Tab');
    await page.waitForTimeout(explicitWait);
    const element = await calculatorPage.errorStateBasicOne;
    const text = await element.innerText();
    expect(text).toBe('Value should be greater than 100');
});

test("Assert alert response for Alphabet in Basic Salary Section for Monthly", async ({ page }) => {
    const calculatorPage = new CalculatorPage(page);
    await calculatorPage.hraExemption.click();
    await calculatorPage.basicHra.click();
    await calculatorPage.basicHra.type("ABC");
    const element = await calculatorPage.errorStateBasicOne;
    const text = await element.innerText();
    expect(text).toBe('Only numbers allowed');
});

test("Assert alert response for maximum limit in Basic Salary Section for Monthly", async ({ page }) => {
    const calculatorPage = new CalculatorPage(page);
    await calculatorPage.hraExemption.click();
    await calculatorPage.basicHra.click();
    await calculatorPage.basicHra.type("10000000000");
    const element = await calculatorPage.errorStateBasicOne;
    const text = await element.innerText();
    expect(text).toBe('Maximum limit reached');
});

test("Assert alert response for no input in 'HRA Received' Section for Monthly", async ({ page }) => {
    await page.pause();
    const calculatorPage = new CalculatorPage(page);
    await calculatorPage.hraExemption.click();
    await calculatorPage.hra.click();
    await calculatorPage.hra.press('Tab');
    await page.waitForTimeout(explicitWait);
    const element = await calculatorPage.errorStateHra;
    const text = await element.innerText();
    expect(text).toBe('Value should be greater than 100');
});

test("Assert alert response for Alphabet 'HRA Received' Section for Monthly", async ({ page }) => {
    const calculatorPage = new CalculatorPage(page);
    await calculatorPage.hraExemption.click();
    await calculatorPage.hra.click();
    await calculatorPage.hra.type("ABC");
    const element = await calculatorPage.errorStateHra;
    const text = await element.innerText();
    expect(text).toBe('Only numbers allowed');
});

test("Assert alert response for maximum limit in 'HRA Received' Section for Monthly", async ({ page }) => {
    const calculatorPage = new CalculatorPage(page);
    await calculatorPage.hraExemption.click();
    await calculatorPage.hra.click();
    await calculatorPage.hra.type("10000000000");
    const element = await calculatorPage.errorStateHra;
    const text = await element.innerText();
    expect(text).toBe('Maximum limit reached');
});

test("Assert alert response for Alphabetical input in 'Rent Paid' Section for Monthly", async ({ page }) => {
    const calculatorPage = new CalculatorPage(page);
    await calculatorPage.hraExemption.click();
    await calculatorPage.rentPaid.click();
    await calculatorPage.rentPaid.type("AAAAA");
    const element = await calculatorPage.errorStateHra;
    const text = await element.innerText();
    expect(text).toBe('Only numbers allowed');
});

test("Assert alert response for Yearly", async ({ page }) => {
    const calculatorPage = new CalculatorPage(page);
    await calculatorPage.hraExemption.click();
    await calculatorPage.yearly.click();
});

test("Assert alert response for no input in Basic Salary Section for Yearly", async ({ page }) => {
    const calculatorPage = new CalculatorPage(page);
    await calculatorPage.hraExemption.click();
    await calculatorPage.yearly.click();
    await calculatorPage.basicHra.click();
    await calculatorPage.basicHra.press('Tab');
    await page.waitForTimeout(explicitWait);

    const element = await calculatorPage.errorStateBasicOne;
    const text = await element.innerText();

    expect(text).toBe('Value should be greater than 1000');
});

test("Assert alert response for Alphabet in Basic Salary Section for Yearly", async ({ page }) => {
    const calculatorPage = new CalculatorPage(page);
    await calculatorPage.hraExemption.click();
    await calculatorPage.yearly.click();
    await calculatorPage.basicHra.click();
    await calculatorPage.basicHra.type("ABC");
    const element = await calculatorPage.errorStateBasicOne;
    const text = await element.innerText();
    expect(text).toBe('Only numbers allowed');
});

test("Assert alert response for maximum limit in Basic Salary Section for Yearly", async ({ page }) => {
    const calculatorPage = new CalculatorPage(page);
    await calculatorPage.hraExemption.click();
    await calculatorPage.yearly.click();
    await calculatorPage.basicHra.click();
    await calculatorPage.basicHra.type("10000000000");
    const element = await calculatorPage.errorStateBasicOne;
    const text = await element.innerText();
    expect(text).toBe('Maximum limit reached');
});

test("Assert alert response for no input in 'HRA Received' Section for Yearly", async ({ page }) => {
    await page.pause();
    const calculatorPage = new CalculatorPage(page);
    await calculatorPage.hraExemption.click();
    await calculatorPage.yearly.click();
    await calculatorPage.hra.click();
    await calculatorPage.hra.press('Tab');
    await page.waitForTimeout(explicitWait);
    const element = await calculatorPage.errorStateHra;
    const text = await element.innerText();
    expect(text).toBe('Value should be greater than 1000');
});

test("Assert alert response for Alphabet 'HRA Received' Section for Yearly", async ({ page }) => {
    const calculatorPage = new CalculatorPage(page);
    await calculatorPage.hraExemption.click();
    await calculatorPage.yearly.click();
    await calculatorPage.hra.click();
    await calculatorPage.hra.type("ABC");
    const element = await calculatorPage.errorStateHra;
    const text = await element.innerText();
    expect(text).toBe('Only numbers allowed');
});

test("Assert alert response for maximum limit in 'HRA Received' Section for yearly", async ({ page }) => {
    const calculatorPage = new CalculatorPage(page);
    await calculatorPage.hraExemption.click();
    await calculatorPage.yearly.click();
    await calculatorPage.hra.click();
    await calculatorPage.hra.type("10000000000");
    const element = await calculatorPage.errorStateHra;
    const text = await element.innerText();
    expect(text).toBe('Maximum limit reached');
});

test("Assert alert response for Alphabetical input in 'Rent Paid' Section for Yearly", async ({ page }) => {
    const calculatorPage = new CalculatorPage(page);
    await calculatorPage.hraExemption.click();
    await calculatorPage.yearly.click();
    await calculatorPage.rentPaid.click();
    await calculatorPage.rentPaid.type("AAAAA");
    const element = await calculatorPage.errorStateHra;
    const text = await element.innerText();
    expect(text).toBe('Only numbers allowed');
});

test("Fill all the details and click on calculate button for Monthly and assert response", async ({ page }) => {
    const calculatorPage = new CalculatorPage(page);
    await calculatorPage.hraExemption.click();
    await calculatorPage.basicHra.click();
    await calculatorPage.basicHra.type("120000");
    await calculatorPage.basicHra.press('Tab');
    await calculatorPage.hra.click();
    await calculatorPage.hra.type("6000");
    await calculatorPage.hra.press('Tab');
    await calculatorPage.rentPaid.click();
    await calculatorPage.rentPaid.type('4500')
    await calculatorPage.noRadioButton.click();
    await calculatorPage.calculateButton.click();
    await page.waitForTimeout(explicitWait);
    const chartElement = await calculatorPage.donut
    expect(await chartElement.isVisible()).toBeTruthy();
});

test("To click on 'See how is it calculated' section and assert response", async ({ page }) => {
    const calculatorPage = new CalculatorPage(page);
    await calculatorPage.hraExemption.click();
    await calculatorPage.basicHra.click();
    await calculatorPage.basicHra.type("120000");
    await calculatorPage.basicHra.press('Tab');
    await calculatorPage.hra.click();
    await calculatorPage.hra.type("6000");
    await calculatorPage.hra.press('Tab');
    await calculatorPage.rentPaid.click();
    await calculatorPage.rentPaid.type('4500')
    await calculatorPage.noRadioButton.click();
    await calculatorPage.calculateButton.click();
    await calculatorPage.calculated.click();
});

test("To click on 'Download Result' section and assert response", async ({ page }) => {
    const calculatorPage = new CalculatorPage(page);
    await calculatorPage.hraExemption.click();
    await calculatorPage.basicHra.click();
    await calculatorPage.basicHra.type("120000");
    await calculatorPage.basicHra.press('Tab');
    await calculatorPage.hra.click();
    await calculatorPage.hra.type("6000");
    await calculatorPage.hra.press('Tab');
    await calculatorPage.rentPaid.click();
    await calculatorPage.rentPaid.type('4500')
    await calculatorPage.noRadioButton.click();
    await calculatorPage.calculateButton.click();
    await scrollPage(page, 1);
    await calculatorPage.downloadResult.click();
});

test("To click on 'View More' section and assert response", async ({ page }) => {
    const calculatorPage = new CalculatorPage(page);
    await calculatorPage.hraExemption.click();
    await calculatorPage.basicHra.click();
    await calculatorPage.basicHra.type("120000");
    await calculatorPage.basicHra.press('Tab');
    await calculatorPage.hra.click();
    await calculatorPage.hra.type("6000");
    await calculatorPage.hra.press('Tab');
    await calculatorPage.rentPaid.click();
    await calculatorPage.rentPaid.type('4500')
    await calculatorPage.noRadioButton.click();
    await calculatorPage.calculateButton.click();
    await scrollPage(page, 2);
    await page.waitForTimeout(explicitWait);
    await calculatorPage.viewMore.click();
    await page.waitForTimeout(explicitWait);
});

test("To click on 'Edit Detail' section and assert response", async ({ page }) => {
    const calculatorPage = new CalculatorPage(page);
    await calculatorPage.hraExemption.click();
    await calculatorPage.basicHra.click();
    await calculatorPage.basicHra.type("120000");
    await calculatorPage.basicHra.press('Tab');
    await calculatorPage.hra.click();
    await calculatorPage.hra.type("6000");
    await calculatorPage.hra.press('Tab');
    await calculatorPage.rentPaid.click();
    await calculatorPage.rentPaid.type('4500')
    await calculatorPage.noRadioButton.click();
    await calculatorPage.calculateButton.click();
    await calculatorPage.editButton.click();
});

test("Fill in details and then click on 'Edit Detail' section to change Basic Salary, HRA, and Rent paid and assert response", async ({ page }) => {
    const calculatorPage = new CalculatorPage(page);

    // Fill in initial details
    await calculatorPage.hraExemption.click();
    await calculatorPage.basicHra.click();
    await calculatorPage.basicHra.type("12000");
    await calculatorPage.basicHra.press('Tab');
    await calculatorPage.hra.click();
    await calculatorPage.hra.type("6000");
    await calculatorPage.hra.press('Tab');
    await calculatorPage.rentPaid.click();
    await calculatorPage.rentPaid.type('45000');
    await calculatorPage.calculateButton.click();

    // Click on 'Edit' and change details
    await calculatorPage.editButton.click();
    await calculatorPage.basicHra.click({ clickCount: 3 });
    await calculatorPage.basicHra.press('Backspace');
    await calculatorPage.basicHra.type('12493');
    await calculatorPage.basicHra.press('Tab');
    await calculatorPage.hra.click({ clickCount: 3 });
    await calculatorPage.hra.press('Backspace');
    await calculatorPage.hra.type("3212");
    await calculatorPage.hra.press('Tab');
    await calculatorPage.rentPaid.click({ clickCount: 3 })
    await calculatorPage.rentPaid.press('Backspace');
    await calculatorPage.rentPaid.type('40549');
    await calculatorPage.calculateAgain.click();
    await page.waitForTimeout(explicitWait);
    const chartElement = await calculatorPage.donut
    expect(await chartElement.isVisible()).toBeTruthy();
});


























