const { test, expect } = require('@playwright/test');

import { MagazinePage } from '../../../pageobjects';

const baseUrl = process.env.QA_URL_WEBSITE

const explicitWait = 1000;

export async function scrollPage(page, iterations) {
    for (let i = 0; i < iterations; i++) {
        page.keyboard.down('PageDown');
    }
}

test.beforeEach(async ({ page }) => {
    const magazinePage = new MagazinePage(page);
    baseUrl = baseURLs[1];
    await page.goto(baseUrl);
    await magazinePage.magazine.click();
});

test('Grab the title for magazine page', async ({ page }) => {
    await expect.soft(page).toHaveTitle('1 Finance Magazine') || test.fail('Title assertion failed');
});

test('Click on Ask a QFA and assert title and fetch URL', async ({ page }) => {
    const magazinePage = new MagazinePage(page);
    await magazinePage.askAQFA.click();
    await expect.soft(page).toHaveTitle('Ask a QFA Archives – 1 Finance Magazine');
    await expect.soft(page).toHaveURL(baseUrl + "magazine/category/ask-a-qfa/");
});

test('Click on Dispatch from 1 Finance and assert title and fetch URL', async ({ page }) => {
    const magazinePage = new MagazinePage(page);
    await magazinePage.dispatchOneFinance.click();
    await expect.soft(page).toHaveTitle('Dispatch from 1 Finance Archives – 1 Finance Magazine');
    await expect.soft(page).toHaveURL(baseUrl + "magazine/category/dispatch-from-1-finance/");
});

test('Click on Long Story Short and assert title and fetch URL', async ({ page }) => {
    const magazinePage = new MagazinePage(page);
    await magazinePage.longStoryShort.click();
    await expect.soft(page).toHaveTitle('Long Story Short Archives – 1 Finance Magazine');
    await expect.soft(page).toHaveURL(baseUrl + "magazine/category/long-story-short/");
});

test('Click on Personal essay and assert title and fetch URL', async ({ page }) => {
    const magazinePage = new MagazinePage(page);
    await magazinePage.personalEssay.click();
    await expect.soft(page).toHaveTitle('Personal Essays Archives – 1 Finance Magazine');
    await expect.soft(page).toHaveURL(baseUrl + "magazine/category/personal-essays/");
});

test('Click on The Thing About Money and assert title and fetch URL', async ({ page }) => {
    const magazinePage = new MagazinePage(page);
    await magazinePage.thingAboutMoney.click();
    await expect.soft(page).toHaveTitle('The Thing About Money Archives – 1 Finance Magazine');
    await expect.soft(page).toHaveURL(baseUrl + "magazine/category/the-thing-about-money/");
});


test('Scroll Down and click on the next arrow of Ask a QFA section', async ({ page }) => {
    const magazinePage = new MagazinePage(page);
    await scrollPage(page, 1);
    await magazinePage.viewAllQfa.click();
    await expect(page).toHaveURL(baseUrl + "magazine/category/ask-a-qfa/");
});

test('Scroll Down and click on the next arrow of The Thing About Money section', async ({ page }) => {
    const magazinePage = new MagazinePage(page);
    await scrollPage(page, 3);
    await magazinePage.viewAllAboutMoney.click();
    await expect(page).toHaveURL(baseUrl + "magazine/category/the-thing-about-money/");
});

test('Scroll Down and click on the next arrow of Personal Essay section', async ({ page }) => {
    const magazinePage = new MagazinePage(page);
    await page.evaluate(() => {
        window.scrollBy(0, 3000);
    });
    await magazinePage.viewAllPersonalEssay.click();
    await expect(page).toHaveURL(baseUrl + "magazine/category/personal-essays/");
});

test('Scroll Down and click on the next arrow of Long Story Short section', async ({ page }) => {
    const magazinePage = new MagazinePage(page);
    await page.evaluate(() => {
        window.scrollBy(0, 3500);
    });
    await magazinePage.viewAllLongStory.click();
    await expect(page).toHaveURL(baseUrl + "magazine/category/long-story-short/");
});

test('Scroll Down and click on the next arrow of Dispatch from 1 Finance section', async ({ page }) => {
    const magazinePage = new MagazinePage(page);
    await page.evaluate(() => {
        window.scrollBy(0, 4000);
    });
    await magazinePage.viewAllDispatch.click();
    await expect(page).toHaveURL(baseUrl + "magazine/category/dispatch-from-1-finance/");
});

test('Scroll Down and click on "Download the App" button and click on cross button', async ({ page }) => {
    const magazinePage = new MagazinePage(page);
    await page.evaluate(() => {
        window.scrollBy(0, 4300);
    });
    await magazinePage.downloadTheApp.click();
    await magazinePage.cancel.click();
});

test('Enter email address inside 1 Fin Magazine Keep it in personal section', async ({ page }) => {
    const magazinePage = new MagazinePage(page);
    await page.evaluate(() => {
        window.scrollBy(0, 2000);
    });
    await magazinePage.emailSection.type("runali.painaik@atriina.com");
});

test('Click on Ask a QFA on Magazine Section', async ({ page }) => {
    const magazinePage = new MagazinePage(page);
    await page.pause();
    await page.evaluate(() => {
        window.scrollBy(0, 5700);
    });
    await magazinePage.askAQFASection.click();
    await expect.soft(page).toHaveURL(baseUrl + "magazine/category/ask-a-qfa/");
});

test('Click on The thing about money on Magazine Section', async ({ page }) => {
    const magazinePage = new MagazinePage(page);
    await page.pause();
    await page.evaluate(() => {
        window.scrollBy(0, 5700);
    });
    await magazinePage.thingAboutMoneySection.click();
    await expect.soft(page).toHaveURL(baseUrl + "magazine/category/the-thing-about-money/");
});

test('Click on Personal Essays on Magazine Section', async ({ page }) => {
    const magazinePage = new MagazinePage(page);
    await page.pause();
    await page.evaluate(() => {
        window.scrollBy(0, 5700);
    });
    await magazinePage.personalEssay.click();
    await expect.soft(page).toHaveURL(baseUrl + "magazine/category/personal-essays/");
});

test('Click on Long Story Short on Magazine Section', async ({ page }) => {
    const magazinePage = new MagazinePage(page);
    await page.pause();
    await page.evaluate(() => {
        window.scrollBy(0, 5700);
    });
    await magazinePage.longStoryShortSection.click();
    await expect.soft(page).toHaveURL(baseUrl + "magazine/category/long-story-short/");
});

test('Click on Dispatch on 1 Finance on Magazine Section', async ({ page }) => {
    const magazinePage = new MagazinePage(page);
    await page.pause();
    await page.evaluate(() => {
        window.scrollBy(0, 5700);
    });
    await magazinePage.dispatchOneFinanceSection.click();
    await expect.soft(page).toHaveURL(baseUrl + "magazine/category/dispatch-from-1-finance/");
});