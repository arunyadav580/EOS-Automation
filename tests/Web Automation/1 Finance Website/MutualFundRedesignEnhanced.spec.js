const { test, expect, page } = require('@playwright/test')

// import AllMutualFunds from '../../pageobjects/Scoring&RankingPage/MFScoringRedesign';

const baseUrl = process.env.QA_URL_WEBSITE

const explicitWait = 2000;

const urlExtension = ["/product-scoring/mutual-funds/browse-by-fund?type=equity", "/product-scoring/mutual-funds/browse-by-fund?type=tax"];

export async function scrollPage(page, iterations) {
    for (let i = 0; i < iterations; i++) {
        await page.keyboard.down('PageDown');
        await page.waitForTimeout(explicitWait);
    }
}

async function pageWiseFilter(allFunds, category, page, pageNumber) {
    
    const apiPolicyDetail = await allFunds.mfAllFilter(category, pageNumber, 5);
    
    await scrollPage(page, 2);

    const buttons = [];

    for (let i = 1; i <= pageNumber; i++) {
        const button = await allFunds.allPurposeButton.locator(`text=${i}`);
        // const buttonText = await button.innerText();
        buttons.push(button);
    }

    let currentButton;

    for (let i = buttons.length - 1; i >= 0; i--) {
        currentButton = buttons[i];

        if (await currentButton.isVisible()) {
            await currentButton.click();
            await scrollPage(page, 2);
            break;
        } else {
            debugger;
            for (let j = 1; j < buttons.length - 1; j ++) { // Starting from index 1, and incrementing by 2
                const potentialNextButton = buttons[j];
                
                if (await potentialNextButton.isVisible()) {
                    await potentialNextButton.click();
                    await scrollPage(page, 2);
                
                    if (await currentButton.isVisible()) {
                        await currentButton.click();
                        await scrollPage(page, 2);
                        break;
                    }
                }
            }
            // Break out of the loop after the first iteration
            break;
        }
    }

    const uiPolicyDetail = await allFunds.zerothObject();

    for (let i = 0; i < uiPolicyDetail.length; i++) {
        const { schemeName, oneFinanceScore, fundCategory } = uiPolicyDetail[i];
        const apiSchemeName = apiPolicyDetail.data[i].title;
        const apiOneFinanceScore = apiPolicyDetail.data[i].fund_score;
        const apiFundCategory = apiPolicyDetail.data[i].category;

        expect(schemeName).toBe(apiSchemeName);
        expect(oneFinanceScore).toBe(apiOneFinanceScore);
        expect(fundCategory).toBe(apiFundCategory);
    }
}

test("Mutual Fund :: Equity", async ({ page }) => {
    // debugger;
    await page.pause();
    const equityUrl = baseUrl + urlExtension[0];
    await page.goto(equityUrl);

    const allFunds = new AllMutualFunds(baseUrl, page);
    for (let pageNumber = 1; pageNumber <= 85; pageNumber++) {
        await pageWiseFilter(allFunds,"-1",page, pageNumber);
    }

});

// test("Mutual Fund :: Tax Saver", async ({ page }) => {
//     // debugger;
//     const taxSaverUrl = baseUrl + urlExtension[1];
//     await page.goto(taxSaverUrl);

//     const allFunds = new AllMutualFunds(baseUrl, page);
//     for (let pageNumber = 1; pageNumber <= 8; pageNumber++) {
//         await pageWiseFilter(allFunds,"Equity Linked Savings Scheme",page,pageNumber);
//     }
// });

