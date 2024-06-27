const { test, expect, browser } = require('@playwright/test');

import { table } from 'console';
import { HomePage } from '../../../pageobjects';
import { CalculatorPage } from '../../../pageobjects';
import { ScoringAndRanking } from '../../../pageobjects';
import { MoneysignPage } from '../../../pageobjects';
import { MagazinePage } from '../../../pageobjects';
import { OurStoryPage } from '../../../pageobjects';
import { Careers } from '../../../pageobjects';
import { BlogPage } from '../../../pageobjects';
import { CommunityPage } from '../../../pageobjects';
import { MasterclassPage } from '../../../pageobjects';
import { SupportPage } from '../../../pageobjects';
import { BecomeQfaPage } from '../../../pageobjects';
import { GfpSummit } from '../../../pageobjects';
import { SitemapPage } from '../../../pageobjects';
import { LegalAndRegulatoryPage } from '../../../pageobjects';
import { TermsOfUsePage } from '../../../pageobjects';
import { PrivacyPolicyPage } from '../../../pageobjects';
import { BlogsPage } from '../../../pageobjects';

const explicitWait = 1000;

const baseUrl = process.env.QA_URL_WEBSITE

async function scrollPage(page, iterations) {
    for (let i = 0; i < iterations; i++) {
        page.keyboard.down('PageDown');
        await page.waitForTimeout(1000);
    }
}

test.describe('Homepage', () => {

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

    test('Click on download the App on Home Page and assert response', async ({ page }) => {
        const homePage = new HomePage(page);
        await homePage.downloadAppButton.click();
        expect(homePage.downloadTheAppContent).toContainText("Download 1 Finance");
    });

    test('Click on cancel button present on download the App and assert response', async ({ page }) => {
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

test.describe('Calculators Landing Page', () => {

    test.beforeEach('Launch URL', async ({ page }) => {
        await page.goto(baseUrl + "calculator");
    })

    test.afterEach('Close the browser', async ({ page }) => {
        await page.close();
    })

    test('Visit calculators landing page and assert response', async ({ page }) => {
        const calculatorPage = new CalculatorPage(page);
        expect(calculatorPage.titleContent).toContainText("Calculators")
    });

    //Calculators landing page --> pending as new calculators are suppose to be added
})

test.describe('Calculators --> all calculators', () => {

    test.afterEach('Close the browser', async ({ page }) => {
        await page.close();
    });

    test('Fill in all the details in HRA Exemption calculator and check for every functionality', async ({ page }) => {
        const calculatorPage = new CalculatorPage(page);
        await page.goto(baseUrl + "calculator/hra-exemption");
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
        await scrollPage(page, 1);
        await calculatorPage.downloadTheApp.click();
        await calculatorPage.cancelButton.click();
    });

    test('Fill in all the details for Old vs New calculator and check for every functionality', async ({ page }) => {
        const calculatorPage = new CalculatorPage(page);
        await page.goto(baseUrl + "calculator/old-vs-new");
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
        await scrollPage(page, 1);
        await calculatorPage.downloadTheApp.click();
        await calculatorPage.cancelButton.click();
    });

    test('Fill in all the details for Loan Refinance calculator and check for every functionality', async ({ page }) => {
        const calculatorPage = new CalculatorPage(page);
        await page.goto(baseUrl + "calculator/loan-refinance");
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
        await calculatorPage.firstTile.click();
        await calculatorPage.secondTile.click();
        await calculatorPage.thirdTile.click();
        await calculatorPage.fourthTile.click();
        await calculatorPage.fifthTile.click();
        await calculatorPage.sixthTile.click();
        await page.waitForTimeout(explicitWait);
        await calculatorPage.downloadTheApp.click();
        await calculatorPage.cancelButton.click();
    });

    test('Fill in all the details for Retirement Corpus calculator and check for every functionality', async ({ page }) => {
        const calculatorPage = new CalculatorPage(page);
        await page.goto(baseUrl + "calculator/retirement-corpus");
        await calculatorPage.rccFirstContainer.click();
        await calculatorPage.rccFirstContainer.type("50");
        await calculatorPage.rccFirstContainer.press("Tab");
        await calculatorPage.rccSecondContainer.type("10000000");
        await calculatorPage.rccSecondContainer.press("Tab");
        await calculatorPage.rccThirdContainer.type("50");
        await calculatorPage.nextButton.click();
        await calculatorPage.rccFirstContainer.click();
        await calculatorPage.rccFirstContainer.type("20");
        await calculatorPage.rccFirstContainer.press("Tab");
        await calculatorPage.rccSecondContainer.type("20");
        await calculatorPage.rccSecondContainer.press("Tab");
        await calculatorPage.rccThirdContainer.type("70");
        await calculatorPage.calculateButton.click();
        await scrollPage(page, 1);
        await calculatorPage.firstTile.click();
        await calculatorPage.secondTile.click();
        await calculatorPage.thirdTile.click();
        await calculatorPage.fourthTile.click();
        await calculatorPage.fifthTile.click();
        await calculatorPage.sixthTile.click();
        await calculatorPage.seventhTile.click();
        await calculatorPage.downloadTheApp.click();
        await calculatorPage.cancelButton.click();
    });

    test('Fill in all the details for NPS calculator and check for every functionality', async ({ page }) => {
        const calculatorPage = new CalculatorPage(page);
        await page.goto(baseUrl + "calculator/nps");
        await calculatorPage.currentAge.click();
        await calculatorPage.currentAge.type("34");
        await calculatorPage.currentAge.press("Tab");
        await calculatorPage.nextButton.click();
        await calculatorPage.npsAmount.click();
        await calculatorPage.npsAmount.type("100000");
        await calculatorPage.npsNextButton2.click();
        await calculatorPage.calculateButton.click();
        await page.waitForTimeout(explicitWait);
        await calculatorPage.firstTile.click();
        await calculatorPage.secondTile.click();
        await calculatorPage.thirdTile.click();
        await calculatorPage.fourthTile.click();
        await calculatorPage.fifthTile.click();
        await calculatorPage.sixthTile.click();
        await calculatorPage.seventhTile.click();
        await page.waitForTimeout(explicitWait);
        await calculatorPage.downloadTheApp.click();
        await calculatorPage.cancelButton.click();
        await page.waitForTimeout(explicitWait);
    });

    test('Go to Insurance Calculator landing page and assert response ', async ({ page }) => {
        const calculatorPage = new CalculatorPage(page);
        await page.goto(baseUrl + "calculator/insurance");
        expect(calculatorPage.insuranceTitle).toHaveText("Type of insurance");
    });

    test('Go to Mutual Fund Calculator landing page and assert response ', async ({ page }) => {
        const calculatorPage = new CalculatorPage(page);
        await page.goto(baseUrl + "calculator/mutual-funds");
        expect(calculatorPage.mutualFundTitle).toHaveText("Mutual fund");
    });

    test('Go to Mutual Fund Portfolio Overlap landing page and assert response ', async ({ page }) => {
        const calculatorPage = new CalculatorPage(page);
        await page.goto(baseUrl + "calculator/portfolio-review");
        expect(calculatorPage.mutualFundPortfolioOverlapTitle).toHaveText("Mutual Fund Portfolio Overlap");
    });

    // test('Fill in all the details for Mutual Fund Portfolio Overlap calculator and check for every functionality', async ({ page }) => {
    //     const calculatorPage = new CalculatorPage(page);
    //     await page.goto(baseUrl + "calculator/portfolio-review");
    //     await calculatorPage.mFPortfolioCurrentFund.click();
    //     await page.toHaveURL("https://website-frontend-qa.1finance.co.in/calculator/portfolio-review?type=auto");  
    // });

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

})

test.describe('Scoring and Ranking landing page', () => {

    test.beforeEach('Launch URL', async ({ page }) => {
        await page.goto(baseUrl + "product-scoring");
    })

    test.afterEach('Close the browser', async ({ page }) => {
        await page.close();
    })

    test('Visit Product Scoring landing page and assert response', async ({ page }) => {
        const scoringAndRanking = new ScoringAndRanking(page);
        expect(scoringAndRanking.titleContent).toHaveText("Scoring and Ranking");
    });

    test('To check if the global search is functional and all the sections are clickable on Scoring and ranking landing page', async ({ page }) => {
        const mfScoring = new MutualFunds(page);
        await page.goto("https://1finance.co.in/product-scoring");
        await scrollPage(page, 2);
        await mfScoring.firstTile.click();
        await mfScoring.secondTile.click();
        await mfScoring.thirdTile.click();
        await mfScoring.fourthTile.click();
        await mfScoring.fifthTile.click();
        await mfScoring.sixthTile.click();
        await mfScoring.globalSearchOption.click();
        await page.waitForTimeout(explicitWait);
        await mfScoring.termInsurance.click();
        await page.waitForTimeout(explicitWait);
        await mfScoring.healthInsurance.click();
        await page.waitForTimeout(explicitWait);
        await mfScoring.creditCard.click();
        await page.waitForTimeout(explicitWait);
        await mfScoring.mutualFunds.click();
        await page.waitForTimeout(explicitWait);
    });

    //Scoring and Ranking landing page --> pending as new modules are getting added

})

test.describe('Scoring and Ranking --> all modules', () => {

    test('Go to Term Insurance and check for the overall functionality ', async ({ page }) => {
        const scoringAndRanking = new ScoringAndRanking(page);
        await page.goto(baseUrl + "product-scoring/term-insurance");
        await scrollPage(page, 3);
        await scoringAndRanking.ourMethodologyTermIns.click();
        await scoringAndRanking.methodologyCloseButton.click();
        await scoringAndRanking.firstTileScoringRanking.click();
        await scoringAndRanking.secondTileScoringRanking.click();
        await scoringAndRanking.thirdTileScoringRanking.click();
        await scoringAndRanking.fourthTileScoringRanking.click();
        await scoringAndRanking.fifthTileScoringRanking.click();
        await scoringAndRanking.sixthTileScoringRanking.click();
        await scoringAndRanking.seventhTileScoringRanking.click();
    });

    test('Go to Term Insurance Input page and check for the overall functionality ', async ({ page }) => {
        const scoringAndRanking = new ScoringAndRanking(page);
        await page.goto(baseUrl + "product-scoring/term-insurance/browse-by-policy?age_group=30-34&gender=Male&sum_assured=1");
        await scrollPage(page, 2);
        await scoringAndRanking.secondPageTermIns.click();
    });

    test('Go to Term Insurance detail page and check for the overall functionality ', async ({ page }) => {
        const scoringAndRanking = new ScoringAndRanking(page);
        await page.goto(baseUrl + "product-scoring/term-insurance");
        await scoringAndRanking.viewDetailTermIns.click();
        await scrollPage(page, 2);
        await scoringAndRanking.positiveFeedbackTermIns.click();
        await page.waitForTimeout(1000);
        await scrollPage(page, 1);
        await scoringAndRanking.downloadButton.click();
        await scoringAndRanking.closeButton.click();
        await scoringAndRanking.viewMoreTermIns.click();
    });

    test('Go to Health Insurance landing page and check for the overall functionality ', async ({ page }) => {
        const scoringAndRanking = new ScoringAndRanking(page);
        await page.goto(baseUrl + "product-scoring/health-insurance?gender=male&age=36-40&family=self-&sum=10+Lacs");
        await scrollPage(page, 3);
        await scoringAndRanking.firstTileScoringRanking.click();
        await scoringAndRanking.secondTileScoringRanking.click();
        await scoringAndRanking.thirdTileScoringRanking.click();
        await scoringAndRanking.fourthTileScoringRanking.click();
        await scoringAndRanking.fifthTileScoringRanking.click();
        await scoringAndRanking.sixthTileScoringRanking.click();
        await scoringAndRanking.seventhTileScoringRanking.click();
        await scoringAndRanking.eighthTileScoringRanking.click();
        await scoringAndRanking.ninthTileScoringRanking.click();
        await scoringAndRanking.tenthTileScoringRanking.click();
        await scoringAndRanking.viewDetailHealthIns.click();
    });

    test('Go to Health Insurance Input page and check for the overall functionality ', async ({ page }) => {
        const scoringAndRanking = new ScoringAndRanking(page);
        await page.goto(baseUrl + "product-scoring/health-insurance/browse-by-policy?gender=male&age=36-40&family=self-&sum=10+Lacs");
        await scrollPage(page, 2);
        await scoringAndRanking.secondPageTermIns.click();
    });

    test('Go to Health Insurance detail page and check for the overall functionality ', async ({ page }) => {
        const scoringAndRanking = new ScoringAndRanking(page);
        await page.goto(baseUrl + "product-scoring/health-insurance/manipal-cigna-pro-health-prime-protect?gender=male&age=36-40&family=self-&sum=10%20Lacs");
        await scrollPage(page, 3);
        await scoringAndRanking.positiveFeedbackHealthIns.click();
        await scoringAndRanking.viewMoreHealthIns.click();
    });

    test('Go to Credit Card landing page and check for the overall functionality ', async ({ page }) => {
        const scoringAndRanking = new ScoringAndRanking(page);
        await page.goto(baseUrl + "product-scoring/credit-card");
        await scrollPage(page, 7);
        await scoringAndRanking.firstTileScoringRanking.click();
        await scoringAndRanking.secondTileScoringRanking.click();
        await scoringAndRanking.thirdTileScoringRanking.click();
        await scoringAndRanking.fourthTileScoringRanking.click();
        await scoringAndRanking.fifthTileScoringRanking.click();
        await scoringAndRanking.sixthTileScoringRanking.click();
        await scoringAndRanking.seventhTileScoringRanking.click();
        await scoringAndRanking.eighthTileScoringRanking.click();
        await scoringAndRanking.ninthTileScoringRanking.click();
        await scoringAndRanking.tenthTileScoringRanking.click();
    });

    test('Go to Credit Card detail page and check for the overall functionality ', async ({ page }) => {
        const scoringAndRanking = new ScoringAndRanking(page);
        await page.goto(baseUrl + "product-scoring/credit-card/hdfc-infinia-metal-card?score=84")
        await scrollPage(page, 3);
        await scoringAndRanking.positiveFeedbackCreditCard.click();
        await scrollPage(page, 1);
        await scoringAndRanking.downloadButtonCreditCard.click();
        await scoringAndRanking.closeButton.click();
    });

    test('Go to Mutual funds landing page and check for the overall functionality ', async ({ page }) => {
        const scoringAndRanking = new ScoringAndRanking(page);
        await page.goto(baseUrl + "product-scoring/mutual-funds?type=equity");
        await scrollPage(page, 3);
        await scoringAndRanking.firstTileScoringRanking.click();
        await scoringAndRanking.secondTileScoringRanking.click();
        await scoringAndRanking.thirdTileScoringRanking.click();
        await scoringAndRanking.fourthTileScoringRanking.click();
        await scoringAndRanking.fifthTileScoringRanking.click();
    });

    test('Go to Mutual Funds detail page and check for the overall functionality ', async ({ page }) => {
        const scoringAndRanking = new ScoringAndRanking(page);
        await page.goto(baseUrl + "product-scoring/mutual-funds/parag-parikh-flexi-cap-fundg-direct-plan?type=equity")
        await scrollPage(page, 1);
        await scoringAndRanking.positiveFeedbackMutualFunds.click();
        await scrollPage(page, 1);
        await scoringAndRanking.downloadButtonCreditCard.click();
        await scoringAndRanking.closeButton.click();
    });

    test('Go to Crypto landing page and check for the overall functionality ', async ({ page }) => {
        const scoringAndRanking = new ScoringAndRanking(page);
        await page.goto(baseUrl + "product-scoring/crypto");
        await scrollPage(page, 13);
        await scoringAndRanking.firstTileCrypto.click();
        await scoringAndRanking.secondTileCrypto.click();
        await scoringAndRanking.thirdTileCrypro.click();
        await scoringAndRanking.fourthTileCrypto.click();
        await scoringAndRanking.fifthTileCrypto.click();
        await scoringAndRanking.sixthTileCrypto.click();
        await scoringAndRanking.seventhTileCrypto.click();
        await scoringAndRanking.eighthTileCrypto.click();
        await scoringAndRanking.ninthTileCrypto.click();
    });
})

test.describe('MoneySign Guide', () => {

    test('Go to MoneySign Guide page and check for the overall functionality ', async ({ page }) => {
        const homePage = new HomePage(page);
        const moneysignPage = new MoneysignPage(page);
        await page.goto(baseUrl + "moneysign-guide");
        await scrollPage(page, 1);
        await expect(page).toHaveURL(baseUrl + "moneysign-guide")
        await moneysignPage.vigilantTurtle.click();
        await moneysignPage.closeCard.click();
        await moneysignPage.persistantHorse.click();
        await moneysignPage.closeCard.click();
        await moneysignPage.farsightedEagle.click();
        await moneysignPage.closeCard.click();
        await moneysignPage.opportunisticLion.click();
        await moneysignPage.closeCard.click();
        await moneysignPage.virtuousElephant.click();
        await moneysignPage.closeCard.click();
        await moneysignPage.enlightenedWhale.click();
        await moneysignPage.closeCard.click();
        await moneysignPage.tacticalTiger.click();
        await moneysignPage.closeCard.click();
        await moneysignPage.stealthyShark.click();
        await moneysignPage.closeCard.click();

        await moneysignPage.vigilantTurtle.click();
        await moneysignPage.nextPage();
        await moneysignPage.closeCard.click();

        await moneysignPage.stealthyShark.click();
        await moneysignPage.previousPage();
        await moneysignPage.closeCard.click();

        await scrollPage(page, 1);

        await moneysignPage.downloadTheApp.click();
        await homePage.closeDownloadScreen.click();

        await scrollPage(page, 1);

        await moneysignPage.readMore.click();
        await expect(page).toHaveURL(baseUrl + "blogs/science-behind-moneysign")
    });
})

test.describe('Magazine Page', () => {

    test('Go to Magazine Landing pagecredit and check for the overall functionality ', async ({ page }) => {
        const magazinePage = new MagazinePage(page);
        await page.goto(baseUrl + "magazine/");
        await expect.soft(page).toHaveTitle("Home – 1 Finance Magazine");
        await magazinePage.askAQFA.click();
        await expect.soft(page).toHaveTitle("Ask a QFA Archives – 1 Finance Magazine");
        await page.goBack();
        await magazinePage.dispatchOneFinance.click();
        await expect.soft(page).toHaveTitle("Dispatch from 1 Finance Archives – 1 Finance Magazine");
        await page.goBack();
        await magazinePage.longStoryShort.click();
        await expect.soft(page).toHaveTitle("Long Story Short Archives – 1 Finance Magazine");
        await page.goBack();
        await magazinePage.personalEssay.click();
        await expect.soft(page).toHaveTitle("Personal Essays Archives – 1 Finance Magazine");
        await page.goBack();
        await magazinePage.thingAboutMoney.click();
        await expect.soft(page).toHaveTitle("The Thing About Money Archives – 1 Finance Magazine");
        await page.goBack();
    });
})

test.describe('Our Story', () => {

    test('Go to Our Story and check for the overall functionality ', async ({ page, browser }) => {
        const ourStory = new OurStoryPage(page);
        await page.goto(baseUrl + "story");
        await scrollPage(page, 4);
        await ourStory.firstExpansionTile.click();
        await ourStory.secondExpansionTile.click();
        await ourStory.thirdExpansionTile.click();
        await ourStory.fourthExpansionTile.click();
        await scrollPage(page, 3);

        await ourStory.firstStoryCard.click();
        await page.waitForTimeout(explicitWait);

    });
})

test.describe('Circle of Trust', () => {

    test('Go to Circle of Trust and check for the overall functionality ', async ({ page }) => {
        const ourStory = new OurStoryPage(page);
        await page.pause();
        await page.goto(baseUrl + "circle-of-trust");
        await scrollPage(page, 3);
        await ourStory.loadMore.click();
    });
})

test.describe('Careers Page', () => {
    test('Go to Careers landing page and check for the overall functionality ', async ({ page }) => {
        const careers = new Careers(page);
        await page.goto(baseUrl + "careers");
        await careers.exploreOpportunities.click();
        await expect.soft(page).toHaveURL(baseUrl + "positions");
    });

    test('Go to Featured Position of Careers and check if every page is loading correctly ', async ({ page }) => {
        const careers = new Careers(page);
        await page.goto(baseUrl + "positions");
        await careers.firstTeam.click();
        await expect.soft(page).toHaveURL(baseUrl + "jobrole?RequestID=301&RequestNo=RA-2923-1074&Department=Strategy&SubDepartment=&DesignationName=Investment+Strategist&RoleName=Strategy+-+Team");
        await page.goBack();
        await careers.secondTeam.click();
        await expect.soft(page).toHaveURL(baseUrl + "jobrole?RequestID=308&RequestNo=RA-0823-1081&Department=Performance+Marketing&SubDepartment=&DesignationName=Performance+Marketing+Manager&RoleName=Performance+Marketing-+Team");
        await page.goBack();
        await careers.thirdTeam.click();
        await expect.soft(page).toHaveURL(baseUrl + "jobrole?RequestID=311&RequestNo=RA-2623-1084&Department=Performance+Marketing&SubDepartment=&DesignationName=Community+Manager&RoleName=Performance+Marketing-+Team");
        await page.goBack();
        await careers.fourthTeam.click();
        await expect.soft(page).toHaveURL(baseUrl + "jobrole?RequestID=313&RequestNo=RA-1323-1086&Department=Marketing&SubDepartment=&DesignationName=Creative+Head&RoleName=Marketing++-+Team");
        await page.goBack();
        await careers.fifthTeam.click();
        await expect.soft(page).toHaveURL(baseUrl + "jobrole?RequestID=314&RequestNo=RA-1323-1087&Department=Marketing&SubDepartment=&DesignationName=SEO+Content+Writer&RoleName=Marketing++-+Team");
        await page.goBack();
        await careers.sixthTeam.click();
        await expect.soft(page).toHaveURL(baseUrl + "jobrole?RequestID=316&RequestNo=RA-2123-1089&Department=Partner+Success&SubDepartment=&DesignationName=Business+Development+Executive&RoleName=Partner+Success+-+Team");
        await page.goBack();
        await careers.seventhTeam.click();
        await expect.soft(page).toHaveURL(baseUrl + "jobrole?RequestID=319&RequestNo=RA-0623-1092&Department=Member+Success&SubDepartment=&DesignationName=Customer+Service+Representative&RoleName=Member+Success+-+Team");
        await page.goBack();
        await careers.eighthTeam.click();
        await expect.soft(page).toHaveURL(baseUrl + "jobrole?RequestID=327&RequestNo=RA-1423-1100&Department=Quantitative+Research&SubDepartment=&DesignationName=Senior+-+Quantitative+Research+Analyst&RoleName=Quantitative+Research+-+Team");
        await careers.apply.click();
        await expect.soft(page).toHaveURL(baseUrl + "apply");
    });

})

test.describe('Blog Page', () => {
    test('Go to Blog landing page and check for the overall functionality ', async ({ page }) => {
        const blog = new BlogPage(page);
        await page.goto(baseUrl + "blog/");
        await blog.all.click();
        await expect.soft(page).toHaveURL(baseUrl + "blog/");
        await blog.mutualFund.click();
        await expect.soft(page).toHaveURL(baseUrl + "blog/category/mutual-fund/");
        await page.goBack();
        await blog.investing.click();
        await expect.soft(page).toHaveURL(baseUrl + "blog/category/investing/");
        await page.goBack();
        await blog.liabilityPlanning.click();
        await expect.soft(page).toHaveURL(baseUrl + "blog/category/liability-planning/");
        await page.goBack();
        await blog.crypto.click();
        await expect.soft(page).toHaveURL(baseUrl + "blog/category/crypto/");
        await page.goBack();
        await blog.taxPlanning.click();
        await expect.soft(page).toHaveURL(baseUrl + "blog/category/tax-planning/");
        await page.goBack();
        await blog.creditCard.click();
        await expect.soft(page).toHaveURL(baseUrl + "blog/category/credit-cards/");
        await page.goBack();
        await blog.personalFinance.click();
        await expect.soft(page).toHaveURL(baseUrl + "blog/category/personal-finance/");
        await page.goBack();
        await blog.temparament.click();
        await expect.soft(page).toHaveURL(baseUrl + "blog/category/temperament/");
        await page.goBack();
    });
})

test.describe("Community", () => {
    test('Go to Community landing page and check for the overall functionality ', async ({ page }) => {
        const community = new CommunityPage(page);
        await page.goto("https://community.1finance.co.in/");
        await expect.soft(page).toHaveURL("https://community.1finance.co.in/");
        await community.oneFinLogo.click();
        await expect.soft(page).toHaveURL("https://1finance.co.in/");
    });
})

test.describe("Masterclass", () => {
    test('Go to Masterclass landing page and check for the overall functionality ', async ({ page }) => {
        const masterclass = new MasterclassPage(page);
        await page.goto(baseUrl + "masterclass");
        //scroll down to FAQ questions 
        await scrollPage(page, 2);
        await masterclass.firstCard.click();
        await expect.soft(page).toHaveURL(baseUrl + "masterclass/guide-for-salaried-entrepreneurs-decoding-advance-tax");
        await page.goBack();
        await scrollPage(page, 4);
        await masterclass.firstTile.click();
        await masterclass.secondTile.click();
        await masterclass.thirdTile.click();
        await masterclass.fourthTile.click();
        await masterclass.fifthTile.click();
        await masterclass.sixthTile.click();
        await masterclass.seventhTile.click();
        await masterclass.eighthTile.click();
        await masterclass.ninethTile.click();
        await masterclass.tenthTile.click();
        await masterclass.eleventhTile.click();
    });

    test('Go to Masterclass detail page and check for the overall functionality ', async ({ page }) => {
        const masterclass = new MasterclassPage(page);
        await page.goto(baseUrl + "masterclass");
        await scrollPage(page, 2);
        await masterclass.firstCard.click();
        await masterclass.watchFullMasterclass.click();
        await masterclass.name.type("Runali");
        await masterclass.name.press("Tab");
        await masterclass.email.type("runalipainaik@gmail.com");
        await masterclass.name.press("Tab");
        await masterclass.mobileNumber.type("99999999999");
        await scrollPage(page, 2);
        await masterclass.positiveFeedback.click();
        await masterclass.viewAllMasterclasses.click();
        await expect.soft(page).toHaveURL(baseUrl + "masterclass?scroll=catchUp");
    });
})

test.describe("Story", () => {
    test('Go to Story landing page and assert response  ', async ({ page }) => {
        const story = new OurStoryPage(page);
        await page.goto(baseUrl + "story");
        expect(story.storyTitle).toContainText("Our mission");
    });
})

test.describe("Support", () => {
    test('Go to support landing page and assert response', async ({ page }) => {
        const support = new SupportPage(page);
        await page.goto(baseUrl + "support");
        expect(support.supportTitle).toContainText("How can we assist you?");
    });
})

test.describe("Become a QFA", () => {
    test('Go to Become a QFA landing page and assert response ', async ({ page }) => {
        const becomeAQfa = new BecomeQfaPage(page);
        await page.goto(baseUrl + "become-a-qfa");
        expect(becomeAQfa.becomeAQfaTitle).toContainText("Partner as a Qualified Financial Advisor");
        await becomeAQfa.joinNow.click();
        await becomeAQfa.fullName.type("Runali Painaik");
        await becomeAQfa.fullName.press("Tab");
        await becomeAQfa.emailId.type("runalipainaik@gmail.com");
        await becomeAQfa.fullName.press("Tab");
        await becomeAQfa.mobileNumber.type('8291684040');
        await becomeAQfa.fullName.press("Tab");
        await becomeAQfa.city.type('Thane');
        await becomeAQfa.fullName.press("Tab");
        await becomeAQfa.ca.click();
        await becomeAQfa.cfa.click();
        await becomeAQfa.cfp.click();
        await becomeAQfa.cwm.click();
        await becomeAQfa.nism.click();
        await becomeAQfa.qpfp.click();
        await becomeAQfa.sebi.click();
        await becomeAQfa.others.click();
        await becomeAQfa.ans.type("Answer");
        await becomeAQfa.submitButton.click();
        await page.waitForTimeout(explicitWait);
    });
})

test.describe("GFP Summit", () => {
    test('Go to GFP Summit 2023 landing page and assert response ', async ({ page }) => {
        const gfpSummit = new GfpSummitPage(page);
        await page.goto("https://gfpsummit.com/");
        expect(gfpSummit.title).toHaveText("Global Financial Planners Summit 2023");
        await gfpSummit.watchNow.click();
        await page.waitForTimeout(explicitWait);
        await gfpSummit.fullName.click();
        await gfpSummit.fullName.type("Runali Ashok Painaik");
        await gfpSummit.fullName.press("Tab");
        await gfpSummit.email.type("runalipainaik@gmail.com");
        await gfpSummit.fullName.press("Tab");
        await gfpSummit.mobileNumber.type("8291684040");
        await gfpSummit.mobileNumber.press("Tab");
        await gfpSummit.companyName.type("Atriina Technologies");
        await gfpSummit.fullName.press("Tab");
        await gfpSummit.designation.type("Automation Engineer");
        await gfpSummit.fullName.press("Tab");
        await gfpSummit.currentCity.type("Airoli");
        await gfpSummit.submitButton.click();
        await page.waitForTimeout(5000);
    });
})

test.describe("Sitemap", () => {
    test('Go to Sitemap landing page and assert response ', async ({ page }) => {
        const sitemap = new SitemapPage(page);
        await page.goto(baseUrl + "sitemap");
        expect(sitemap.title).toHaveText("Sitemap Links");
    });
})

test.describe("Legal and Regulatory", () => {

    test('Go to Legal & Regulatory landing page and assert response ', async ({ page }) => {
        const legalAndRegulatory = new LegalAndRegulatoryPage(page);
        await page.goto(baseUrl + "legal-and-regulatory");
        expect(legalAndRegulatory.title).toHaveText("Legal & Regulatory");
    });

    test('Go to Legal & Regulatory and check if all the agreement pages can be visited', async ({ page }) => {
        const legalAndRegulatory = new LegalAndRegulatoryPage(page);
        await page.goto(baseUrl + "legal-and-regulatory");
        await legalAndRegulatory.sebiInvestment.click();
        await expect.soft(page).toHaveURL(baseUrl + "legal-and-regulatory/investor");
        await page.goBack();
        await legalAndRegulatory.complaintStatus.click();
        await page.bringToFront();
        await legalAndRegulatory.dosAndDonts.click();
        await expect.soft(page).toHaveURL(baseUrl + "legal-and-regulatory/dosdont")
        await page.goBack();
        await legalAndRegulatory.clientInvestmentAdvisory.click();
        await expect.soft(page).toHaveURL(baseUrl + "legal-and-regulatory/advisory");
        await page.goBack();
        await legalAndRegulatory.GreviancePolicy.click();
        await expect.soft(page).toHaveURL(baseUrl + "legal-and-regulatory/policy");
        await page.goBack();
        await legalAndRegulatory.annualReturns.click();
        await expect.soft(page).toHaveURL(baseUrl + "legal-and-regulatory/annual-return");
    });
})

test.describe("Terms of use", () => {
    test('Go to Terms of Use landing page and assert response ', async ({ page }) => {
        const termsOfUsePage = new TermsOfUsePage(page);
        await page.goto(baseUrl + "terms-of-use");
        expect(termsOfUsePage.title).toHaveText("Terms Of Use");
    });
})

test.describe("Privacy Policy", () => {
    test('Go to Privacy Policy landing page and assert response ', async ({ page }) => {
        const privacyPolicyPage = new PrivacyPolicyPage(page);
        await page.goto(baseUrl + "privacy-policy");
        expect(privacyPolicyPage.title).toHaveText("Privacy Policy");
    });
})

test.describe("Blogs", () => {
    test('Go to Blogs landing page and assert response ', async ({ page }) => {
        const blogsPage = new BlogsPage(page);
        await page.goto("https://1finance.co.in/blogs/science-behind-moneysign");
        expect(blogsPage.scienceBehindMs).toHaveText("The Science behind MoneySign®");
    });
})

test.describe("Health Insurance", () => {
    test('Select age range 35-40 and assert response', async ({ page }) => {

        const scoringAndRanking = new ScoringAndRanking(page);

        await page.goto(baseUrl + "product-scoring/health-insurance?gender=male&family=self-")

        await scoringAndRanking.healthInsuranceDropdown.click();

        const options = await page.$$('ul.CustomDropdown_option-list__KzI1d li.CustomDropdown_option-item__ZJcH2');

        const age = ['26-30', '31-35', '36-40', '41-45', '46-50', '51-55', '56-60'];

        for (let i = 0; i < options.length; i++) {
            debugger;
            const optionText = await options[i].innerText();
            expect(optionText).toEqual(age[i]);
        }
    });
})






