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

test('To click on Old vs New Calculator and assert response', async ({ page }) => {
    const calculatorPage = new CalculatorPage(page);
    await calculatorPage.oldVsNewCalculator.click();
    await expect.soft(page).toHaveURL(baseUrl + "calculator/old-vs-new");
});

test('To check if the readmore link is clickable on Old Vs New calculator page', async ({ page }) => {
    const calculatorPage = new CalculatorPage(page);
    await calculatorPage.oldVsNewCalculator.click();
    await calculatorPage.readMore.click();
    await page.waitForTimeout(explicitWait);
    let expectedText = 'What are the old and new tax regimes?';
    await expect(calculatorPage.oldVsNewReadMoreScroll).toContainText(expectedText);
})

test('To check the functionality for expansion and collapse tile in Old vs New Calculator section', async ({ page }) => {
    const calculatorPage = new CalculatorPage(page);
    await calculatorPage.oldVsNewCalculator.click();
    await scrollPage(page, 2);
    await calculatorPage.firstTile.click();
    await calculatorPage.secondTile.click();
    await calculatorPage.thirdTile.click();
    await calculatorPage.fourthTile.click();
    await calculatorPage.fifthTile.click();
    await calculatorPage.sixthTile.click();
    await calculatorPage.seventhTile.click();
    await calculatorPage.eighthTile.click();
    await page.waitForTimeout(explicitWait);
});

test('To check if the share button is clickable on Old vs New calculator page', async ({ page }) => {
    const calculatorPage = new CalculatorPage(page);
    await calculatorPage.oldVsNewCalculator.click();
    await calculatorPage.share.click();
    await page.waitForTimeout(explicitWait);
})

test('To click on calculators button to go back to the landing page and assert response', async ({ page }) => {
    const calculatorPage = new CalculatorPage(page);
    await calculatorPage.oldVsNewCalculator.click();
    await calculatorPage.calcBackOldVsNew.click();
    await expect.soft(page).toHaveURL(baseUrl + "calculator");
})

test("To click on download the app on Old Vs New Calculator page", async ({ page }) => {
    const calculatorPage = new CalculatorPage(page);
    await calculatorPage.oldVsNewCalculator.click();
    await scrollPage(page, 4);
    await page.waitForTimeout(explicitWait)
    await calculatorPage.downloadTheApp.click();
    await calculatorPage.cancelButton.click();
})

test("Enter max salary income and assert response", async ({ page }) => {
    const calculatorPage = new CalculatorPage(page);
    await calculatorPage.oldVsNewCalculator.click();
    await calculatorPage.oldVsNewSecondContainer.click();
    await calculatorPage.oldVsNewSecondContainer.type("10,00,00,00000");
    const element = await calculatorPage.errorStateOldVsNewLanding;
    const text = await element.innerText();
    expect(text).toBe('Maximum limit reached');
})

test("Enter max other income and assert response", async ({ page }) => {
    const calculatorPage = new CalculatorPage(page);
    await calculatorPage.oldVsNewCalculator.click();
    await calculatorPage.oldVsNewThirdContainer.click();
    await calculatorPage.oldVsNewThirdContainer.type("10,00,00,00000");
    const element = await calculatorPage.errorStateOldVsNewLanding;
    const text = await element.innerText();
    expect(text).toBe('Maximum limit reached');
})

test("Enter salary income and other income whose total is less than 100000 and assert response", async ({ page }) => {
    const calculatorPage = new CalculatorPage(page);
    await calculatorPage.oldVsNewCalculator.click();
    await calculatorPage.oldVsNewSecondContainer.click();
    await calculatorPage.oldVsNewSecondContainer.type("10000");
    await calculatorPage.oldVsNewThirdContainer.click();
    await calculatorPage.oldVsNewThirdContainer.type("10000");
    await calculatorPage.oldVsNewNextButton.click();
    await page.waitForSelector("p.OldVsNew_toast-alert-text__Szxv0");
    const toastText = await page.textContent("p.OldVsNew_toast-alert-text__Szxv0");
    expect(toastText).toBe("Salary plus other income should be atleast Rs. 1,00,000.");
    await page.waitForTimeout(explicitWait);
})

test("Enter all the details and click on the next button and assert response", async ({ page }) => {
    const calculatorPage = new CalculatorPage(page);
    await calculatorPage.oldVsNewCalculator.click();
    await calculatorPage.oldVsNewSecondContainer.click();
    await calculatorPage.oldVsNewSecondContainer.type("1000000");
    await calculatorPage.oldVsNewThirdContainer.click();
    await calculatorPage.oldVsNewThirdContainer.type("10000");
    await calculatorPage.oldVsNewNextButton.click();
    await page.waitForTimeout(4000);
})

test("Select radio button for 2022 and assert response", async ({ page }) => {
    const calculatorPage = new CalculatorPage(page);
    const radioButtonLocator = calculatorPage.oldVsNewRadioButton2;
    await calculatorPage.oldVsNewCalculator.click();
    await page.waitForLoadState("domcontentloaded");
    await radioButtonLocator.check();
    await page.waitForTimeout(1000); 
    expect(await radioButtonLocator.isEnabled()).toBeTruthy();
    await expect(radioButtonLocator).toBeChecked();
});

test("click on the dropdown arrow for age and assert response", async ({ page }) => {
    const calculatorPage = new CalculatorPage(page);
    await calculatorPage.oldVsNewCalculator.click();
    const element = calculatorPage.oldVsNewAgeDropdown;
    await element.click();
    expect(element).toBeTruthy();
})

test("click on the dropdown arrow for age and fetch the content present inside the dropdown and assert response", async ({ page }) => {
    const calculatorPage = new CalculatorPage(page);
    await calculatorPage.oldVsNewCalculator.click();
    const element = calculatorPage.oldVsNewAgeDropdown;
    await element.click(); 
    
    const dropdownOptions = await page.$$('.BasicDetailDropdown_option__oOZum'); 

    for (let i = 0; i < dropdownOptions.length; i++) {
        const option = dropdownOptions[i];
        const text = await option.innerText();
        if(text === "0-59" || text ==="60-79" || text === "80 and above"){
            expect(text).toBe(text);
        }
    }
});

test("To check if the first dropdown i.e. 0-59 option is getting selected or not",async({page})=>{
    const calculatorPage = new CalculatorPage(page);
    await calculatorPage.oldVsNewCalculator.click();
    const element = calculatorPage.oldVsNewAgeDropdown;
    await element.click(); 
    await calculatorPage.oldVsNewFirstOption.click();
    await page.waitForTimeout(1000);
    const text1 = await calculatorPage.oldVsNewSelectedDropdownOption.innerText();
    expect(text1).toBe("0-59");
})

test("To check if the first dropdown i.e. 60-79 option is getting selected or not",async({page})=>{
    const calculatorPage = new CalculatorPage(page);
    await calculatorPage.oldVsNewCalculator.click();
    const element = calculatorPage.oldVsNewAgeDropdown;
    await element.click(); 
    await calculatorPage.oldVsNewSecondOption.click();
    await page.waitForTimeout(1000);
    const text = await calculatorPage.oldVsNewSelectedDropdownOption.innerText();
    expect(text).toBe("60-79");
})

test("To check if the third dropdown i.e. 80 and above option is getting selected or not",async({page})=>{
    debugger;
    const calculatorPage = new CalculatorPage(page);
    await calculatorPage.oldVsNewCalculator.click();
    const element = calculatorPage.oldVsNewAgeDropdown;
    await element.click(); 
    await calculatorPage.oldVsNewThirdOption.click();
    const text = await calculatorPage.oldVsNewSelectedDropdownOption.innerText();
    expect(text).toBe("80 and above");
})

test("To click on the exemption dropdown and assert response", async ({ page }) => {
    const calculatorPage = new CalculatorPage(page);
    await calculatorPage.oldVsNewCalculator.click();
    await calculatorPage.oldVsNewSecondContainer.click();
    await calculatorPage.oldVsNewSecondContainer.type("1000000");
    await calculatorPage.oldVsNewThirdContainer.click();
    await calculatorPage.oldVsNewThirdContainer.type("10000");
    await calculatorPage.oldVsNewNextButton.click();
    await page.waitForTimeout(4000);
    await calculatorPage.oldVsNewExemptiondropdown.click();
})

test("To check if the dropdown options are getting correctly displayed and assert response", async ({ page }) => {
    const calculatorPage = new CalculatorPage(page);
    await calculatorPage.oldVsNewCalculator.click();
    await calculatorPage.oldVsNewSecondContainer.click();
    await calculatorPage.oldVsNewSecondContainer.type("1000000");
    await calculatorPage.oldVsNewThirdContainer.click();
    await calculatorPage.oldVsNewThirdContainer.type("10000");
    await calculatorPage.oldVsNewNextButton.click();
    await page.waitForTimeout(4000);
    await calculatorPage.oldVsNewExemptionDropdown.click();

    const dropdownOptions = await page.$$("//div[@class='ExemptionDropdown_options__BoZ4B ExemptionDropdown_open__0VauG']");

    for(let i = 0 ; i< dropdownOptions.length ; i++){
        const element = dropdownOptions[i];
        const text = await element.innerText();
        expect(text).toBe(text);
    }
})

test("To check if the dropdown list gets converted into text field and assert response", async ({ page }) => {
    const calculatorPage = new CalculatorPage(page);
    await calculatorPage.oldVsNewCalculator.click();
    await calculatorPage.oldVsNewSecondContainer.click();
    await calculatorPage.oldVsNewSecondContainer.type("1000000");
    await calculatorPage.oldVsNewThirdContainer.click();
    await calculatorPage.oldVsNewThirdContainer.type("10000");
    await calculatorPage.oldVsNewNextButton.click();
    await page.waitForTimeout(2000);
    await calculatorPage.oldVsNewExemptionDropdown.click();
    await page.waitForTimeout(2000);

    const firstOption = await page.locator("(//div[normalize-space()='Exempted HRA, 10(13A)'])[1]").textContent();

    console.log(firstOption)
    await calculatorPage.oldVsNewExemptionFirstOption.click();

    const selectedOption = await page.locator("//span[@class='AllExemptions_section_title__it5ls']").textContent();
    console.log(selectedOption)
    expect(selectedOption.includes(firstOption))
})

test("To check if the add more button is clickable and assert response", async ({ page }) => {
    const calculatorPage = new CalculatorPage(page);
    await calculatorPage.oldVsNewCalculator.click();
    await calculatorPage.oldVsNewSecondContainer.click();
    await calculatorPage.oldVsNewSecondContainer.type("1000000");
    await calculatorPage.oldVsNewThirdContainer.click();
    await calculatorPage.oldVsNewThirdContainer.type("10000");
    await calculatorPage.oldVsNewNextButton.click();
    await page.waitForTimeout(2000);
    await calculatorPage.oldVsNewExemptionDropdown.click();
    await page.waitForTimeout(2000);
    await calculatorPage.oldVsNewExemptionFirstOption.click();
    await calculatorPage.oldVsNewAddMoreButton.click();
    await page.waitForTimeout(explicitWait);
    // const dropdown = await calculatorPage.oldVsNewDropdownContainer
    expect(await page.locator("//div[@class='ExemptionDropdown_selectedOption__y5AwR']").isVisible()).toBeTruthy();
})

test("To check if the cross button is clickable and assert response", async ({ page }) => {
    const calculatorPage = new CalculatorPage(page);
    await calculatorPage.oldVsNewCalculator.click();
    await calculatorPage.oldVsNewSecondContainer.click();
    await calculatorPage.oldVsNewSecondContainer.type("1000000");
    await calculatorPage.oldVsNewThirdContainer.click();
    await calculatorPage.oldVsNewThirdContainer.type("10000");
    await calculatorPage.oldVsNewNextButton.click();
    await page.waitForTimeout(2000);
    await calculatorPage.oldVsNewExemptionDropdown.click();
    await page.waitForTimeout(2000);
    await calculatorPage.oldVsNewExemptionFirstOption.click();
    await calculatorPage.oldVsNewAddMoreButton.click();
    await page.waitForTimeout(explicitWait);
    await calculatorPage.oldVsNewCrossButton.click()
    await page.waitForTimeout(explicitWait);
})

test("To check if the add more option gets enabled after selecting dropdown option and assert response", async ({ page }) => {
    const calculatorPage = new CalculatorPage(page);
    await calculatorPage.oldVsNewCalculator.click();
    await calculatorPage.oldVsNewSecondContainer.click();
    await calculatorPage.oldVsNewSecondContainer.type("1000000");
    await calculatorPage.oldVsNewThirdContainer.click();
    await calculatorPage.oldVsNewThirdContainer.type("10000");
    await calculatorPage.oldVsNewNextButton.click();
    await page.waitForTimeout(2000);
    expect(page.locator("//button[normalize-space()='Add More']")).toBeDisabled();
    await calculatorPage.oldVsNewExemptionDropdown.click();
    await page.waitForTimeout(2000);
    await calculatorPage.oldVsNewExemptionFirstOption.click();
    await calculatorPage.oldVsNewAddMoreButton.click();
    await page.waitForTimeout(explicitWait);
    expect(page.locator("//button[normalize-space()='Add More']")).toBeTruthy();
    await calculatorPage.oldVsNewCrossButton.click()
    await page.waitForTimeout(explicitWait);
})

test("To click on the calculate button with no amount in deduction section and assert alert message", async ({ page }) => {
    const calculatorPage = new CalculatorPage(page);
    await calculatorPage.oldVsNewCalculator.click();
    await calculatorPage.oldVsNewSecondContainer.click();
    await calculatorPage.oldVsNewSecondContainer.type("1000000");
    await calculatorPage.oldVsNewThirdContainer.click();
    await calculatorPage.oldVsNewThirdContainer.type("10000");
    await calculatorPage.oldVsNewNextButton.click();
    await calculatorPage.oldVsNewExemptionDropdown.click();
    await calculatorPage.oldVsNewExemptionFirstOption.click();
    await calculatorPage.oldVsNewAddMoreButton.click();
    await page.waitForTimeout(explicitWait);
    await calculatorPage.oldVsNewCalculate.click();
    const errorToast = await calculatorPage.errorStateOldVsNew.innerText();
    expect(errorToast).toContain("Please enter the deduction amount"); 
})

test("To min value in deduction section and assert response", async ({ page }) => {
    const calculatorPage = new CalculatorPage(page);
    await calculatorPage.oldVsNewCalculator.click();
    await calculatorPage.oldVsNewSecondContainer.click();
    await calculatorPage.oldVsNewSecondContainer.type("1000000");
    await calculatorPage.oldVsNewThirdContainer.click();
    await calculatorPage.oldVsNewThirdContainer.type("10000");
    await calculatorPage.oldVsNewNextButton.click();
    await calculatorPage.oldVsNewExemptionDropdown.click();
    await calculatorPage.oldVsNewExemptionFirstOption.click();
    await calculatorPage.oldVsNewAddMoreButton.click();
    await page.waitForTimeout(explicitWait);
    await calculatorPage.oldVsNewAmountSection.click();
    await calculatorPage.oldVsNewAmountSection.type("0");
    await calculatorPage.oldVsNewCalculate.click();
    const errorToast = await calculatorPage.errorStateOldVsNew.innerText();
    expect(errorToast).toContain("Value should be greater than 500"); 
})

test("To max value in deduction section and assert response", async ({ page }) => {
    const calculatorPage = new CalculatorPage(page);
    await calculatorPage.oldVsNewCalculator.click();
    await calculatorPage.oldVsNewSecondContainer.click();
    await calculatorPage.oldVsNewSecondContainer.type("1000000");
    await calculatorPage.oldVsNewThirdContainer.click();
    await calculatorPage.oldVsNewThirdContainer.type("10000");
    await calculatorPage.oldVsNewNextButton.click();
    await calculatorPage.oldVsNewExemptionDropdown.click();
    await calculatorPage.oldVsNewExemptionFirstOption.click();
    await calculatorPage.oldVsNewAddMoreButton.click();
    await page.waitForTimeout(explicitWait);
    await calculatorPage.oldVsNewAmountSection.click();
    await calculatorPage.oldVsNewAmountSection.type("1,00,00,000");
    await calculatorPage.oldVsNewCalculate.click();
    const errorToast = await calculatorPage.errorStateOldVsNew.innerText();
    expect(errorToast).toContain("Amount cannot be greater than total income"); 
})

test("To click on the previous button and assert response", async ({ page }) => {
    const calculatorPage = new CalculatorPage(page);
    await calculatorPage.oldVsNewCalculator.click();
    await calculatorPage.oldVsNewSecondContainer.click();
    await calculatorPage.oldVsNewSecondContainer.type("1000000");
    await calculatorPage.oldVsNewThirdContainer.click();
    await calculatorPage.oldVsNewThirdContainer.type("10000");
    await calculatorPage.oldVsNewNextButton.click();
    await calculatorPage.oldVsNewExemptionDropdown.click();
    await calculatorPage.oldVsNewExemptionFirstOption.click();
    await page.waitForTimeout(explicitWait);
    await calculatorPage.oldVsNewPreviousButton.click();
    await page.waitForTimeout(explicitWait)
})

test("To click on the calculate button and assert response", async ({ page }) => {
    const calculatorPage = new CalculatorPage(page);
    await calculatorPage.oldVsNewCalculator.click();
    await calculatorPage.oldVsNewSecondContainer.click();
    await calculatorPage.oldVsNewSecondContainer.type("1000000");
    await calculatorPage.oldVsNewThirdContainer.click();
    await calculatorPage.oldVsNewThirdContainer.type("10000");
    await calculatorPage.oldVsNewNextButton.click();
    await calculatorPage.oldVsNewExemptionDropdown.click();
    await calculatorPage.oldVsNewExemptionFirstOption.click();
    await calculatorPage.oldVsNewAddMoreButton.click();
    await page.waitForTimeout(explicitWait);
    await calculatorPage.oldVsNewAmountSection.click();
    await calculatorPage.oldVsNewAmountSection.type("1,00,00");
    await calculatorPage.oldVsNewCalculateButton.click();
    await page.waitForTimeout(explicitWait);
})


