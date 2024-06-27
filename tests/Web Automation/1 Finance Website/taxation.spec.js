const { test, expect, makeAPICall, playwright } = require('@playwright/test');

async function login(page){
    await page.goto("https://newqa-tax.eos.onefin.app/taxation/personal-info/basic-details/3062d779-d784-4b72-80f6-d67496e7d186");
    await page.locator("[class^='btn g-btn']").click();
    await page.locator("//input[@id='identifierId']").click();
    await page.locator("//input[@id='identifierId']").fill("testuser2@1finance.co.in");
    await page.locator("//button[@class='VfPpkd-LgbsSe VfPpkd-LgbsSe-OWXEXe-k8QpJ VfPpkd-LgbsSe-OWXEXe-dgl2Hf nCP5yc AjY5Oe DuMIQc LQeN7 qIypjc TrZEUc lw1w4b']//div[@class='VfPpkd-RLmnJb']").click();
    await page.locator("//input[@name='Passwd']").click();
    await page.locator("//input[@name='Passwd']").fill("1Finance@Testuser");
    await page.locator("//button[@class='VfPpkd-LgbsSe VfPpkd-LgbsSe-OWXEXe-k8QpJ VfPpkd-LgbsSe-OWXEXe-dgl2Hf nCP5yc AjY5Oe DuMIQc LQeN7 qIypjc TrZEUc lw1w4b']//div[@class='VfPpkd-RLmnJb']").click();
    await page.waitForTimeout(2000)
}

test.only("To check functionality of Date of Birth field", async({page})=>
{
    await login(page);
    await page.pause();
    await page.click("//input[@placeholder='DD-MM-YYYY']");
    await page.locator("//input[@placeholder='DD-MM-YYYY']").click();
    await page.locator("//input[@placeholder='DD-MM-YYYY']").fill("09-09-1998");
});