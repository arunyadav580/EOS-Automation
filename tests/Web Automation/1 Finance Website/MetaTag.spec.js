const { test, expect } = require('@playwright/test');
const baseUrl = process.env.PROD_URL_WEBSITE;
import excelToJson from '../../../XlToJs/xlToJsonMetaTags';

const excelFilePath = "C:/Users/ADMIN/Playwright/XlToJs/metaTags.xlsx";
const response = excelToJson(excelFilePath);

test("Hit all the URLs and get Meta Tags", async ({ page }) => {
    for (let i = 0; i < response.length; i++) {
        debugger;
        const object = response[i];
        if (object) {
            const urlExtension = object.url;
            if (urlExtension) {
                const newUrl = baseUrl + urlExtension;
                await page.goto(newUrl);
                // console.log("Url Launched --> ", newUrl);
                // await page.waitForTimeout(1000);

                try {
                    let actualTitle = await page.title();
                    let expectedTitle = object.title;
                    const normalizedTitle = expectedTitle.replace(/’/g, "'");


                    try {
                        expect.soft(actualTitle).toContain(normalizedTitle);
                    } catch (error) {
                        console.error(`Assertion failed for title of URL: ${newUrl}`, error);
                        console.log("Title coming from the website --> ", actualTitle);
                        console.log("Title coming from the sheet -->", expectedTitle);
                    }
                } catch (error) {
                    console.error(`Title not found for the URL: ${newUrl}`, error);
                }

                try {
                    let actualDescription = await page.$eval('meta[name="description"]', meta => meta.getAttribute('content'));
                    let expectedDescription = object.description;
                    const normalizedExpected = expectedDescription.replace(/’/g, "'");

                    try {
                        expect.soft(actualDescription).toContain(normalizedExpected);
                    } catch (error) {
                        console.error(`Assertion failed for description of URL: ${newUrl}`, error);
                        console.log("Description coming from the website --> ", actualDescription);
                        console.log("Description coming from the sheet -->", normalizedExpected);
                    }
                } catch (error) {
                    console.error(`Description not found for the URL: ${newUrl}`, error);
                }
            } else {
                console.log('URL is undefined or empty for entry:', object);
            }
        } else {
            console.log('Entry is undefined at index:', i);
        }
    }
});
