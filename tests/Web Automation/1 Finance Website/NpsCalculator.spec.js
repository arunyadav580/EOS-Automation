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
    baseUrl = baseURLs[1];
    await page.goto(baseUrl);
    await calculatorPage.calculator.click();
});

test('To click on NPS Calculator and assert response', async ({ page }) => {
    const calculatorPage = new CalculatorPage(page);
    await calculatorPage.npsCalculator.click();
    await expect.soft(page).toHaveURL(baseUrl + "calculator/nps");
});

test('To check the functionality for expansion and collapse tile in NPS section', async ({ page }) => {
    const calculatorPage = new CalculatorPage(page);
    await calculatorPage.npsCalculator.click();
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

test('To check if the readmore link is clickable on NPS calculator page', async ({ page }) => {
    const calculatorPage = new CalculatorPage(page);
    await calculatorPage.npsCalculator.click();
    await calculatorPage.readMore.click();
    await page.waitForTimeout(explicitWait);
    const expectedText = 'More about NPS';
    await expect(calculatorPage.moreAboutNps).toContainText(expectedText);
})

test('To check if the share button is clickable on NPS calculator page', async ({ page }) => {
    const calculatorPage = new CalculatorPage(page);
    await calculatorPage.npsCalculator.click();
    await calculatorPage.share.click();
})

test('To click on calculators button to go back to the landing page and assert response', async ({ page }) => {
    const calculatorPage = new CalculatorPage(page);
    await calculatorPage.npsCalculator.click();
    await calculatorPage.calcBackNps.click();
    await expect.soft(page).toHaveURL(baseUrl + "calculator");
})

test("To click on download the app on NPS Calculator page", async ({ page }) => {
    const calculatorPage = new CalculatorPage(page);
    await calculatorPage.npsCalculator.click();
    await scrollPage(page, 4);
    await page.waitForTimeout(explicitWait)
    await calculatorPage.downloadTheApp.click();
    await calculatorPage.cancelButton.click();
})

test("Keep age section blank and assert response", async ({ page }) => {
    const calculatorPage = new CalculatorPage(page);
    await calculatorPage.npsCalculator.click();
    await calculatorPage.currentAge.click();
    await calculatorPage.currentAge.press("Tab");
    const element = await calculatorPage.errorStateCurrentAge;
    const text = await element.innerText();
    expect(text).toBe('Age can only be either greater than or equal to 18');
})

test("Enter current age less than 18 and assert response", async ({ page }) => {
    const calculatorPage = new CalculatorPage(page);
    await calculatorPage.npsCalculator.click();
    await calculatorPage.currentAge.click();
    await calculatorPage.currentAge.type("12");
    await calculatorPage.currentAge.press("Tab");
    const element = await calculatorPage.errorStateCurrentAge;
    const text = await element.innerText();
    expect(text).toBe('Age can only be either greater than or equal to 18');
})

test("Enter current age more than 60 and assert response", async ({ page }) => {
    const calculatorPage = new CalculatorPage(page);
    await calculatorPage.npsCalculator.click();
    await calculatorPage.currentAge.click();
    await calculatorPage.currentAge.type("70");
    await calculatorPage.currentAge.press("Tab");
    const element = await calculatorPage.errorStateCurrentAge;
    const text = await element.innerText();
    expect(text).toBe('Age limit is 59 years');
})

test("To check if the value is auto-polulated after entering current age assert response", async ({ page }) => {
    const calculatorPage = new CalculatorPage(page);
    await calculatorPage.npsCalculator.click();
    await calculatorPage.currentAge.type("60");
    await calculatorPage.currentAge.press("Tab")
    const element = await calculatorPage.investmentYears;
    const text = element.innerText();
    expect(text).toBeTruthy();
})

test("Keep year section blank and assert response", async ({ page }) => {
    const calculatorPage = new CalculatorPage(page);
    await calculatorPage.npsCalculator.click();
    await calculatorPage.currentAge.click();
    await calculatorPage.currentAge.type("34");
    await calculatorPage.currentAge.press("Tab");
    await calculatorPage.investmentYears.click({ clickCount: 3 });
    await calculatorPage.investmentYears.press('Backspace');
    const element = await calculatorPage.errorStateInvestmentYears;
    const text = await element.innerText();
    expect(text).toBe("Minimum limit is 1 year")
})

test("To increase the auto-populated pending years to retirement number and assert response", async ({ page }) => {
    const calculatorPage = new CalculatorPage(page);
    await calculatorPage.npsCalculator.click();
    await calculatorPage.currentAge.click();
    await calculatorPage.currentAge.type("34");
    await calculatorPage.currentAge.press("Tab");
    await calculatorPage.investmentYears.click({ clickCount: 3 });
    await calculatorPage.investmentYears.press('Backspace');
    await calculatorPage.investmentYears.type("60");
    const element = await calculatorPage.errorStateInvestmentYears;
    const text = await element.innerText();
    expect(text).toBe("Maximum limit is 26 years")
})

test("To fill the age and investment years and click on the next button and assert response", async ({ page }) => {
    const calculatorPage = new CalculatorPage(page);
    await calculatorPage.npsCalculator.click();
    await calculatorPage.currentAge.click();
    await calculatorPage.currentAge.type("34");
    await calculatorPage.currentAge.press("Tab");
    await calculatorPage.nextButton.click();
})

test("To click on monthly and assert response", async ({ page }) => {
    const calculatorPage = new CalculatorPage(page);
    await calculatorPage.npsCalculator.click();
    await calculatorPage.currentAge.click();
    await calculatorPage.currentAge.type("34");
    await calculatorPage.currentAge.press("Tab");
    await calculatorPage.nextButton.click();
    await calculatorPage.monthlyNps.click();
})

test("To click on Yearly and assert response", async ({ page }) => {
    const calculatorPage = new CalculatorPage(page);
    await calculatorPage.npsCalculator.click();
    await calculatorPage.currentAge.click();
    await calculatorPage.currentAge.type("34");
    await calculatorPage.currentAge.press("Tab");
    await calculatorPage.nextButton.click();
    await calculatorPage.monthlyNps.click();
    await calculatorPage.yearlyNps.click();
})

test("To keep NPS Investment Amount empty and assert response", async ({ page }) => {
    const calculatorPage = new CalculatorPage(page);
    await calculatorPage.npsCalculator.click();
    await calculatorPage.currentAge.click();
    await calculatorPage.currentAge.type("34");
    await calculatorPage.currentAge.press("Tab");
    await calculatorPage.nextButton.click();
    await calculatorPage.npsAmount.click();
    await calculatorPage.npsAmount.press("Tab");
    const element = await calculatorPage.errorStateNpsAmount;
    const text = await element.innerText();
    expect(text).toBe("Value should be greater than 1000");
})

test("To enter NPS Investment Amount less than 1000 and assert response for yearly", async ({ page }) => {
    const calculatorPage = new CalculatorPage(page);
    await calculatorPage.npsCalculator.click();
    await calculatorPage.currentAge.click();
    await calculatorPage.currentAge.type("34");
    await calculatorPage.currentAge.press("Tab");
    await calculatorPage.nextButton.click();
    await calculatorPage.npsAmount.click();
    await calculatorPage.npsAmount.type("100");
    await calculatorPage.npsAmount.press("Tab");
    const element = await calculatorPage.errorStateNpsAmount;
    const text = await element.innerText();
    expect(text).toBe("Value should be greater than 1000");
})

test("To enter NPS Investment Amount less than 100 and assert response for Monthly", async ({ page }) => {
    const calculatorPage = new CalculatorPage(page);
    await calculatorPage.npsCalculator.click();
    await calculatorPage.currentAge.click();
    await calculatorPage.currentAge.type("34");
    await calculatorPage.currentAge.press("Tab");
    await calculatorPage.nextButton.click();
    await calculatorPage.npsAmount.click();
    await calculatorPage.monthlyNps.click();
    await calculatorPage.npsAmount.click();
    await calculatorPage.npsAmount.type("10");
    await calculatorPage.npsAmount.press("Tab");
    const element = await calculatorPage.errorStateNpsAmount;
    const text = await element.innerText();
    expect(text).toBe("Value should be greater than 100");
})

test("To enter maximum amount for NPS Investment and assert response for Monthly", async ({ page }) => {
    const calculatorPage = new CalculatorPage(page);
    await calculatorPage.npsCalculator.click();
    await calculatorPage.currentAge.click();
    await calculatorPage.currentAge.type("34");
    await calculatorPage.currentAge.press("Tab");
    await calculatorPage.nextButton.click();
    await calculatorPage.monthlyNps.click();
    await calculatorPage.npsAmount.click();
    await calculatorPage.npsAmount.type("100000");
    await calculatorPage.npsAmount.press("Tab");
    const element = await calculatorPage.errorStateNpsAmount;
    const text = await element.innerText();
    expect(text).toBe("Maximum amount that can be invested is ₹62,500");
})

test("To enter maximum amount for NPS Investment and assert response for Yearly", async ({ page }) => {
    const calculatorPage = new CalculatorPage(page);
    await calculatorPage.npsCalculator.click();
    await calculatorPage.currentAge.click();
    await calculatorPage.currentAge.type("34");
    await calculatorPage.currentAge.press("Tab");
    await calculatorPage.nextButton.click();
    await calculatorPage.npsAmount.click();
    await calculatorPage.npsAmount.type("1000000");
    await calculatorPage.npsAmount.press("Tab");
    const element = await calculatorPage.errorStateNpsAmount;
    const text = await element.innerText();
    expect(text).toBe("Maximum amount that can be invested is ₹7.5 lakhs");
})

test("To enter maximum amount for NPS Investment and assert response", async ({ page }) => {
    const calculatorPage = new CalculatorPage(page);
    await calculatorPage.npsCalculator.click();
    await calculatorPage.currentAge.click();
    await calculatorPage.currentAge.type("34");
    await calculatorPage.currentAge.press("Tab");
    await calculatorPage.nextButton.click();
    await calculatorPage.npsAmount.click();
    await calculatorPage.npsAmount.type("10000000");
    await calculatorPage.npsAmount.press("Tab");
    await page.waitForTimeout(explicitWait);
    const element = await calculatorPage.errorStateMaxLimit;
    const text = await element.innerText();
    expect(text).toBe("Maximum limit reached");
})

test("To move the slider and assert response", async ({ page }) => {
    debugger;
    const calculatorPage = new CalculatorPage(page);
    await calculatorPage.npsCalculator.click();
    await calculatorPage.currentAge.click();
    await calculatorPage.currentAge.type("34");
    await calculatorPage.currentAge.press("Tab");
    await scrollPage(page, 0.5);
    await calculatorPage.nextButton.click();
    await calculatorPage.npsAmount.click();
    await calculatorPage.npsAmount.type("100000");

    // Start from 0% and move to 25%, 50%, 75%, and 100%
    let targetInvestments = ["0%", "25%", "50%", "75%", "100%"];
    let isCompleted = false;

    let npsSliderOverallWidth = await calculatorPage.npsSliderOverallWidth;
    let npsSliderContainer = await calculatorPage.npsSliderContainer;
    let tooltipElement = await calculatorPage.tooltipElement;

    if (npsSliderContainer) {
        let totalSliderWidth = await npsSliderOverallWidth.boundingBox();

        if (totalSliderWidth) {
            for (const targetInvestment of targetInvestments) {
                let percentage = parseFloat(targetInvestment) / 100;
                let newX = totalSliderWidth.x + totalSliderWidth.width * percentage;

                // Move the slider to the new position using page.mouse
                await page.mouse.move(newX, totalSliderWidth.y + totalSliderWidth.height / 2);
                await page.mouse.down();
                await page.mouse.move(newX + 15, totalSliderWidth.y + totalSliderWidth.height / 2);
                await page.mouse.up();

                // Wait for a brief moment to allow the tooltip to update
                await page.waitForTimeout(500);

                // Check if the current investment matches the target
                const newInvestment = await tooltipElement.innerText();
                console.log("Current Investment:", newInvestment);
            }

            isCompleted = true;
        }
    }
    expect(isCompleted).toBeTruthy();
});

test("Click on the next button and go to page 3 and assert response", async ({ page }) => {
    const calculatorPage = new CalculatorPage(page);
    await calculatorPage.npsCalculator.click();
    await calculatorPage.currentAge.click();
    await calculatorPage.currentAge.type("34");
    await calculatorPage.currentAge.press("Tab");
    await calculatorPage.nextButton.click();
    await calculatorPage.npsAmount.click();
    await calculatorPage.npsAmount.type("100000");
    await calculatorPage.npsNextButton2.click();
    await page.waitForTimeout(explicitWait);
})

test("Select 5% from the dropdown for Tax Slab", async ({ page }) => {
    const calculatorPage = new CalculatorPage(page);
    await calculatorPage.npsCalculator.click();
    await calculatorPage.currentAge.click();
    await calculatorPage.currentAge.type("34");
    await calculatorPage.currentAge.press("Tab");
    await calculatorPage.nextButton.click();
    await calculatorPage.npsAmount.click();
    await calculatorPage.npsAmount.type("100000");
    await calculatorPage.npsNextButton2.click();
    await page.waitForTimeout(explicitWait);
    await calculatorPage.npsDropdownTaxSlab.click(); 
    await calculatorPage.npsDropdown5.click();
})

test("Select 10% from the dropdown for Tax Slab", async ({ page }) => {
    const calculatorPage = new CalculatorPage(page);
    await calculatorPage.npsCalculator.click();
    await calculatorPage.currentAge.click();
    await calculatorPage.currentAge.type("34");
    await calculatorPage.currentAge.press("Tab");
    await calculatorPage.nextButton.click();
    await calculatorPage.npsAmount.click();
    await calculatorPage.npsAmount.type("100000");
    await calculatorPage.npsNextButton2.click();
    await page.waitForTimeout(explicitWait);
    await calculatorPage.npsDropdownTaxSlab.click(); 
    await calculatorPage.npsDropdown10.click();
})

test("Select 15% from the dropdown for Tax Slab", async ({ page }) => {
    const calculatorPage = new CalculatorPage(page);
    await calculatorPage.npsCalculator.click();
    await calculatorPage.currentAge.click();
    await calculatorPage.currentAge.type("34");
    await calculatorPage.currentAge.press("Tab");
    await calculatorPage.nextButton.click();
    await calculatorPage.npsAmount.click();
    await calculatorPage.npsAmount.type("100000");
    await calculatorPage.npsNextButton2.click();
    await page.waitForTimeout(explicitWait);
    await calculatorPage.npsDropdownTaxSlab.click(); 
    await calculatorPage.npsDropdown15.click();
})

test("Select 20% from the dropdown for Tax Slab", async ({ page }) => {
    const calculatorPage = new CalculatorPage(page);
    await calculatorPage.npsCalculator.click();
    await calculatorPage.currentAge.click();
    await calculatorPage.currentAge.type("34");
    await calculatorPage.currentAge.press("Tab");
    await calculatorPage.nextButton.click();
    await calculatorPage.npsAmount.click();
    await calculatorPage.npsAmount.type("100000");
    await calculatorPage.npsNextButton2.click();
    await page.waitForTimeout(explicitWait);
    await calculatorPage.npsDropdownTaxSlab.click(); 
    await calculatorPage.npsDropdown20.click();
})

test("Select 30% from the dropdown for Tax Slab", async ({ page }) => {
    const calculatorPage = new CalculatorPage(page);
    await calculatorPage.npsCalculator.click();
    await calculatorPage.currentAge.click();
    await calculatorPage.currentAge.type("34");
    await calculatorPage.currentAge.press("Tab");
    await calculatorPage.nextButton.click();
    await calculatorPage.npsAmount.click();
    await calculatorPage.npsAmount.type("100000");
    await calculatorPage.npsNextButton2.click();
    await page.waitForTimeout(explicitWait);
    await calculatorPage.npsDropdownTaxSlab.click(); 
    await calculatorPage.npsDropdown30.click();
});

test("Click on Equity for 'Expected Returns'", async ({ page }) => {
    const calculatorPage = new CalculatorPage(page);
    await calculatorPage.npsCalculator.click();
    await calculatorPage.currentAge.click();
    await calculatorPage.currentAge.type("34");
    await calculatorPage.currentAge.press("Tab");
    await calculatorPage.nextButton.click();
    await calculatorPage.npsAmount.click();
    await calculatorPage.npsAmount.type("100000");
    await calculatorPage.npsNextButton2.click();
    await page.waitForTimeout(explicitWait);
    await calculatorPage.npsRadioButtonEquity.click();
    await page.waitForTimeout(explicitWait);
});

test("Click on PPF for 'Expected Returns'", async ({ page }) => {
    const calculatorPage = new CalculatorPage(page);
    await calculatorPage.npsCalculator.click();
    await calculatorPage.currentAge.click();
    await calculatorPage.currentAge.type("34");
    await calculatorPage.currentAge.press("Tab");
    await calculatorPage.nextButton.click();
    await calculatorPage.npsAmount.click();
    await calculatorPage.npsAmount.type("100000");
    await calculatorPage.npsNextButton2.click();
    await page.waitForTimeout(explicitWait);
    await calculatorPage.npsRadioButtonPpf.click();
    await page.waitForTimeout(explicitWait);
});

test("Click on Debt for 'Expected Returns'", async ({ page }) => {
    const calculatorPage = new CalculatorPage(page);
    await calculatorPage.npsCalculator.click();
    await calculatorPage.currentAge.click();
    await calculatorPage.currentAge.type("34");
    await calculatorPage.currentAge.press("Tab");
    await calculatorPage.nextButton.click();
    await calculatorPage.npsAmount.click();
    await calculatorPage.npsAmount.type("100000");
    await calculatorPage.npsNextButton2.click();
    await page.waitForTimeout(explicitWait);
    await calculatorPage.npsRadioButtonDebt.click();
    await page.waitForTimeout(explicitWait);
});

test("Click on Others for 'Expected Returns'", async ({ page }) => {
    const calculatorPage = new CalculatorPage(page);
    await calculatorPage.npsCalculator.click();
    await calculatorPage.currentAge.click();
    await calculatorPage.currentAge.type("34");
    await calculatorPage.currentAge.press("Tab");
    await calculatorPage.nextButton.click();
    await calculatorPage.npsAmount.click();
    await calculatorPage.npsAmount.type("100000");
    await calculatorPage.npsNextButton2.click();
    await page.waitForTimeout(explicitWait);
    await calculatorPage.npsRadioButtonOthers.click();
    await page.waitForTimeout(explicitWait);
});

test("Click on the Tool Tip present on Others section", async ({ page }) => {
    const calculatorPage = new CalculatorPage(page);
    await calculatorPage.npsCalculator.click();
    await calculatorPage.currentAge.click();
    await calculatorPage.currentAge.type("34");
    await calculatorPage.currentAge.press("Tab");
    await calculatorPage.nextButton.click();
    await calculatorPage.npsAmount.click();
    await calculatorPage.npsAmount.type("100000");
    await calculatorPage.npsNextButton2.click();
    await page.waitForTimeout(explicitWait);
    await calculatorPage.npsOthersToolTip.click();
    await page.waitForTimeout(explicitWait);
});

test("Click on the Know More for NPS investment", async ({ page }) => {
    const calculatorPage = new CalculatorPage(page);
    await calculatorPage.npsCalculator.click();
    await calculatorPage.currentAge.click();
    await calculatorPage.currentAge.type("34");
    await calculatorPage.currentAge.press("Tab");
    await calculatorPage.nextButton.click();
    await calculatorPage.npsKnowMore1.click();
    await page.waitForTimeout(explicitWait);
    let content = await calculatorPage.npsKnowMoreContent1.innerText();
    expect(content).toEqual('Tax deductions on NPS');   
});

test("Click on the cancel button of Know More for NPS investment", async ({ page }) => {
    const calculatorPage = new CalculatorPage(page);
    await calculatorPage.npsCalculator.click();
    await calculatorPage.currentAge.click();
    await calculatorPage.currentAge.type("34");
    await calculatorPage.currentAge.press("Tab");
    await calculatorPage.nextButton.click();
    await calculatorPage.npsKnowMore1.click();
    await page.waitForTimeout(explicitWait);
    await calculatorPage.npsKnowMoreCancelButton1.click();
});

test("Click on the Know More for Expected Returns", async ({ page }) => {
    await page.pause();
    const calculatorPage = new CalculatorPage(page);
    await calculatorPage.npsCalculator.click();
    await calculatorPage.currentAge.click();
    await calculatorPage.currentAge.type("34");
    await calculatorPage.currentAge.press("Tab");
    await calculatorPage.nextButton.click();
    await calculatorPage.npsKnowMore2.click();
    await page.waitForTimeout(explicitWait);
    let content = await calculatorPage.npsKnowMoreContent2.innerText();
    expect(content).toEqual('Expected Return On Investment');   
});

test("Click on the cancel button of Know More for Expected Returns", async ({ page }) => {
    const calculatorPage = new CalculatorPage(page);
    await calculatorPage.npsCalculator.click();
    await calculatorPage.currentAge.click();
    await calculatorPage.currentAge.type("34");
    await calculatorPage.currentAge.press("Tab");
    await calculatorPage.nextButton.click();
    await calculatorPage.npsKnowMore2.click();
    await page.waitForTimeout(explicitWait);
    await calculatorPage.npsKnowMoreCancelButton2.click();
});

test("Click on the Know More section for current slab and assert response", async ({ page }) => {
    const calculatorPage = new CalculatorPage(page);
    await calculatorPage.npsCalculator.click();
    await calculatorPage.currentAge.click();
    await calculatorPage.currentAge.type("34");
    await calculatorPage.currentAge.press("Tab");
    await calculatorPage.nextButton.click();
    await calculatorPage.npsAmount.click();
    await calculatorPage.npsAmount.type("100000");
    await calculatorPage.npsNextButton2.click();
    await page.waitForTimeout(explicitWait);
    await calculatorPage.npsKnowMore3.click();
    await page.waitForTimeout(explicitWait);
    let content = await calculatorPage.npsKnowMoreContent3.innerText();
    expect(content).toEqual('Income Tax Slab');     
});

test("Click on the cancel button of Know More for current slab", async ({ page }) => {
    const calculatorPage = new CalculatorPage(page);
    await calculatorPage.npsCalculator.click();
    await calculatorPage.currentAge.click();
    await calculatorPage.currentAge.type("34");
    await calculatorPage.currentAge.press("Tab");
    await calculatorPage.nextButton.click();
    await calculatorPage.npsAmount.click();
    await calculatorPage.npsAmount.type("100000");
    await calculatorPage.npsNextButton2.click();
    await page.waitForTimeout(explicitWait);
    await calculatorPage.npsKnowMore3.click();
    await page.waitForTimeout(explicitWait);
    await calculatorPage.npsKnowMoreCancelButton3.click();
});

test("Click on the Know More section for Other Investment and assert response", async ({ page }) => {
    const calculatorPage = new CalculatorPage(page);
    await calculatorPage.npsCalculator.click();
    await calculatorPage.currentAge.click();
    await calculatorPage.currentAge.type("34");
    await calculatorPage.currentAge.press("Tab");
    await calculatorPage.nextButton.click();
    await calculatorPage.npsAmount.click();
    await calculatorPage.npsAmount.type("100000");
    await calculatorPage.npsNextButton2.click();
    await page.waitForTimeout(explicitWait);
    await calculatorPage.npsKnowMore4.click();
    await page.waitForTimeout(explicitWait);
    let content = await calculatorPage.npsKnowMoreContent4.innerText();
    expect(content).toEqual('Return on Other Investments');     
});

test("Click on the cancel button of Know More for Other Investment section", async ({ page }) => {
    const calculatorPage = new CalculatorPage(page);
    await calculatorPage.npsCalculator.click();
    await calculatorPage.currentAge.click();
    await calculatorPage.currentAge.type("34");
    await calculatorPage.currentAge.press("Tab");
    await calculatorPage.nextButton.click();
    await calculatorPage.npsAmount.click();
    await calculatorPage.npsAmount.type("100000");
    await calculatorPage.npsNextButton2.click();
    await page.waitForTimeout(explicitWait);
    await calculatorPage.npsKnowMore4.click();
    await page.waitForTimeout(explicitWait);
    await calculatorPage.npsKnowMoreCancelButton4.click();
});

test("Click on the Calculate button and check for the response", async ({ page }) => {
    const calculatorPage = new CalculatorPage(page);
    await calculatorPage.npsCalculator.click();
    await calculatorPage.currentAge.click();
    await calculatorPage.currentAge.type("34");
    await calculatorPage.currentAge.press("Tab");
    await calculatorPage.nextButton.click();
    await calculatorPage.npsAmount.click();
    await calculatorPage.npsAmount.type("100000");
    await calculatorPage.npsNextButton2.click();
    await page.waitForTimeout(explicitWait);
    await calculatorPage.calculateButton.click();
    await page.waitForTimeout(explicitWait);   
});
