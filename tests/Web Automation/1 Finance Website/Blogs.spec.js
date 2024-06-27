 const {test, expect} = require('@playwright/test');

 import { BlogPage } from '../../../pageobjects';

async function scrollPage(page, iterations) {
  for (let i = 0; i < iterations; i++) {
    await page.keyboard.down('PageDown');
  }
  await page.waitForTimeout(1000);
}

test.beforeEach(async ({page})=>{
  await page.goto('https://1finance.co.in/');
  await page.waitForTimeout(1000);
  await expect(page).toHaveURL('https://1finance.co.in/');
  await scrollPage(page, 35);
  await page.waitForTimeout(1000);
  await page.click("//a[normalize-space()='Blog']");
  await page.waitForTimeout(3000);
})

test.afterEach(async ({page})=>{
  await page.close();
});

test("Assert Blog Title",async ({page})=>{
  await expect.soft(page).toHaveURL("https://1finance.co.in/blog/");
  await expect.soft(page).toHaveTitle("1 Finance Blog");
})

test("Pagination",async({page})=>{
  await scrollPage(page,2);
  await page.waitForTimeout(1000);
  await page.click("//a[normalize-space()='>']");
  await page.waitForTimeout(1000);
  await expect.soft(page).toHaveURL("https://1finance.co.in/blog/page/2/");
  await page.click("//a[normalize-space()='<']");
  await page.waitForTimeout(1000);
})

test("Download the app link",async({page})=>{
  await scrollPage(page,3);
  await page.click("//img[@class='download-img lazyloaded']");
})

test("Click on the first card and check if download the app is clickable or not",async ({page})=> {
  await page.click("//h2[contains(text(),'Active vs Passive Mutual fund: Which is best for y')]")
  await page.click("//img[@class='download-img lazyloaded']");
  await page.click("//button[@id='close']");
})

test("To click on every card and check for the functionality of every link on that page",async ({page}) =>{
  const array =  await page.$$('[class^=blog_card] div'); 

  for (let i = 0; i < array.length; i++){
    let card = array[i];
    console.log(card);
    // let firstblog = card.getAttribute()
  }
})
