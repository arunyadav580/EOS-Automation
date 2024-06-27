const {test, expect} = require('@playwright/test');
// const { expect } = require('chai');

// const { test, expect: playwrightExpect } = require('@playwright/test');

test.beforeEach(async ({page})=>{
  await page.goto('https://1finance.co.in/');
  await page.waitForTimeout(1000);
  await expect(page).toHaveURL('https://1finance.co.in/');
  await page.click("div[class='headerStyles_navLinks__CEkii'] a:nth-child(1)");
  await page.waitForTimeout(1000);
  let delta_x =''
  let delta_y =''
  await page.mouse.wheel(delta_x=0,delta_y=6000);
  await page.waitForTimeout(1000) ;
  await page.click(".lrCenter");
  await page.waitForTimeout(1000) ;
})

test.afterEach(async ({page})=>{
  await page.close();
});



test("To click on SEBI Investment Charter: Investment Advisor ", async({page})=> {
  await page.click("div[class='legal-and-regulatory_legalAndRegulatory_tabsdata__887Ab'] div:nth-child(1)");
  await page.waitForTimeout(1000);
  await expect(page).toHaveURL("https://1finance.co.in/legal-and-regulatory/component/Investors");

})

test("To press system back button and expect landing page of legal&Regulatory ",async ({page})=> {
  await page.click("body > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > img:nth-child(2)");
  await page.waitForTimeout(1000);
  await page.goBack();
  await page.waitForLoadState('networkidle');
  await expect(page).toHaveURL('https://1finance.co.in/legal-and-regulatory');
});

test("To click on the second tab (Complaint Status: Investment Advisor) and assert link for the new tab", async ({ page, context }) => {
  // Click on the link to open it in a new tab
  await page.click("body > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(2) > img:nth-child(2)");

  // Wait for the new tab to open and retrieve the page
  const newPage = await context.waitForEvent('page');

  // Get the URL of the new tab
  const newPageURL = newPage.url();
  
  // Assert the URL with the expected URL
  await expect(newPageURL).toBe("https://imaages-hosting-1fin.s3.ap-south-1.amazonaws.com/assets/documents/Complaint+Stauts.pdf");

  // Switch back to the previous tab
  await page.bringToFront();
  // await page.goto("https://1finance.co.in/legal-and-regulatory");
  await expect(page).toHaveURL("https://1finance.co.in/legal-and-regulatory");
});


test("To click on the third tab (Do’s & Don’ts while dealing with Investment Advisors ) and to assert each and every text from that page",async ({page})=> {
  await page.click("//div[@class='legal-and-regulatory_wrapper__9WXqY']//div[3]");
  await page.pause();
  await page.waitForTimeout(1000);
  await expect.soft(page).toHaveURL('https://1finance.co.in/legal-and-regulatory/component/Dosdont');
  await expect.soft(page.locator("//h1[contains(text(),'Do’s & Don’ts while dealing with Investment Adviso')]")).toHaveText("Do’s & Don’ts while dealing with Investment Advisors"); 
  await expect.soft(page.locator("//p[contains(text(),'Do’s')]")).toHaveText("Do’s"); 
  await expect.soft(page.locator("//li[contains(text(),'Always deal with SEBI registered Investment Advise')]")).toHaveText("Always deal with SEBI registered Investment Advisers."); 
  await expect.soft(page.locator("//li[contains(text(),'Check for SEBI registration number. Please refer t')]")).toHaveText("Check for SEBI registration number. Please refer to the list of all SEBI registered Investment Advisers which is available on SEBI website."); 
  await expect.soft(page.locator("//li[contains(text(),'Ensure that the Investment Adviser has a valid reg')]")).toHaveText("Ensure that the Investment Adviser has a valid registration certificate"); 
  await expect.soft(page.locator("//li[contains(text(),'Pay only advisory fees to your Investment Adviser.')]")).toHaveText("Pay only advisory fees to your Investment Adviser. Make payments of advisory fees through banking channels only and maintain duly signed receipts mentioning the details of your payments."); 
  await expect.soft(page.locator("//li[contains(text(),'Always ask for your risk profiling before acceptin')]")).toHaveText("Always ask for your risk profiling before accepting investment advice. Insist that Investment Adviser provides advisory strictly on the basis of your risk profiling and take into account available investment alternatives."); 
  await expect.soft(page.locator("//li[contains(text(),'Ask all relevant questions and clear your doubts w')]")).toHaveText("Ask all relevant questions and clear your doubts with your Investment Adviser before acting on advice."); 
  await expect.soft(page.locator("//li[contains(text(),'Assess the risk–return profile of the investment a')]")).toHaveText("Assess the risk–return profile of the investment as well as the liquidity and safety aspects before making investments."); 
  await expect.soft(page.locator("//li[contains(text(),'Insist on getting the terms and conditions in writ')]")).toHaveText("Insist on getting the terms and conditions in writing duly signed and stamped. Read these terms and conditions carefully particularly regarding advisory fees, advisory plans, category of recommendations etc. before dealing with any Investment Adviser."); 
  await expect.soft(page.locator("//li[normalize-space()='Be vigilant in your transactions.']")).toHaveText("Be vigilant in your transactions."); 
  await expect.soft(page.locator("//li[contains(text(),'Approach the appropriate authorities for redressal')])")).toHaveText("Approach the appropriate authorities for redressal of your doubts / grievances. Inform SEBI about Investment Advisers offering assured or guaranteed returns."); 
  await expect.soft(page.locator("//p[contains(text(),'Don’ts')]")).toHaveText("Don’ts");
  await expect.soft(page.locator("//li[normalize-space()='Do not deal with unregistered entities.']")).toHaveText("Do not deal with unregistered entities.");
  await expect.soft(page.locator("//li[contains(text(),'Don’t fall for stock tips offered under the pretex')]")).toHaveText("Don’t fall for stock tips offered under the pretext of investment advice.");
  await expect.soft(page.locator("//li[contains(text(),'Do not give your money for investment to the Inves')]")).toHaveText("Do not give your money for investment to the Investment Adviser.");
  await expect.soft(page.locator("//li[contains(text(),'Don’t fall for the promise of indicative or exorbi')]")).toHaveText("Don’t fall for the promise of indicative or exorbitant or assured returns by the Investment Advisers. Don’t let greed overcome rational investment decisions.");
  await expect.soft(page.locator("//li[contains(text(),'Don’t get carried away by luring advertisements or')]")).toHaveText("Don’t get carried away by luring advertisements or market rumours.");
  await expect.soft(page.locator("//li[contains(text(),'Avoid doing transactions only on the basis of phon')]")).toHaveText("Avoid doing transactions only on the basis of phone calls or messages from any Investment Adviser or its representatives.");
  await expect.soft(page.locator("//li[contains(text(),'Don’t take decisions just because of repeated mess')]")).toHaveText("Don’t take decisions just because of repeated messages and calls by Investment Advisers.");
  await expect.soft(page.locator("//li[contains(text(),'Do not fall prey to limited period discount or oth')]")).toHaveText("Do not fall prey to limited period discount or other incentive, gifts, etc. offered by Investment Advisers.");
  await expect.soft(page.locator("//li[contains(text(),'Don’t rush into making investments that do not mat')]")).toHaveText("Don’t rush into making investments that do not match your risk taking appetite and investment goals.");
});


test("To navigate back to the landing page and click on the 4th tab (Client Investment Advisory Agreement) ",async ({page})=> {
  await page.click("//div[@class='legal-and-regulatory_wrapper__9WXqY']//div[4]");
  await expect.soft(page).toHaveURL('https://1finance.co.in/legal-and-regulatory/component/Advisory');
});


test("To navigate back and to click on the 5th tab Grievance Policy and assert each value",async ({page})=> {
  await page.click("//div[@class='legal-and-regulatory_wrapper__9WXqY']//div[5]");
  await expect.soft(page).toHaveURL('https://1finance.co.in/legal-and-regulatory/component/Policy');
  await expect.soft(page.locator("//h1[normalize-space()='Grievance Redressal Policy']")).toHaveText("Grievance Redressal Policy"); 
  await expect.soft(page.locator("//p[contains(text(),'A key component of sustained business growth is re')]")).toHaveText("A key component of sustained business growth is responsible Member service. As a result, we work to ensure that our Members receive exemplary service at various touchpoints. It is vital for us to maintain existing relationships by providing prompt and efficient service, so Member satisfaction is an important factor for us."); 
  await expect.soft(page.locator("//p[contains(text(),'A structured grievance redressal framework is outl')]")).toHaveText("A structured grievance redressal framework is outlined in this policy, for the handling of Members’ queries and complaints. The process is supported by a review mechanism, to minimise the likelihood of similar issues recurring in the future."); 
  await expect.soft(page.locator("//h2[contains(text(),'We follow the following grievance redressal princi')]")).toHaveText("We follow the following grievance redressal principles:"); 
  await expect.soft(page.locator("//li[contains(text(),'Fair and equitable treatment is to be provided to ')]")).toHaveText("Fair and equitable treatment is to be provided to Members at all times. "); 
  await expect.soft(page.locator("//li[contains(text(),'Member complaints are to be handled promptly and c')]")).toHaveText("Member complaints are to be handled promptly and courteously. "); 
  await expect.soft(page.locator("//li[contains(text(),'Queries and complaints are to be treated efficient')]")).toHaveText("Queries and complaints are to be treated efficiently and with fairness."); 
  await expect.soft(page.locator("//h2[normalize-space()='Grievance Redressal Mechanism']")).toHaveText("Grievance Redressal Mechanism "); 
  await expect.soft(page.locator("//h3[normalize-space()='Level 1']")).toHaveText("Level 1"); 
  await expect.soft(page.locator("//p[contains(text(),'If a Member has any concerns or grievances, the Me')]")).toHaveText("If a Member has any concerns or grievances, the Member can write an email to care@1finance.co.in."); 
  await expect.soft(page.locator("//h3[normalize-space()='Level 2']")).toHaveText("Level 2"); 
  await expect.soft(page.locator("//p[contains(text(),'Members whose grievances remain unresolved after 7')]")).toHaveText("Members whose grievances remain unresolved after 7 (seven) working days from the date of raising the issue at Level 1, or who are dissatisfied with the response provided at Level 1, are entitled to write to the Compliance Officer at grievance@1finance.co.in."); 
  await expect.soft(page.locator("//h3[normalize-space()='Level 3']")).toHaveText("Level 3"); 
  await expect.soft(page.locator("//p[contains(text(),'If the Member’s issue is not resolved after 7 (sev')]")).toHaveText("If the Member’s issue is not resolved after 7 (seven) business days after contacting the Compliance Officer as described in Level 2, the Member may write to the Principal Officer at po@1finance.co.in."); 
  await expect.soft(page.locator("//h3[normalize-space()='Level 4']")).toHaveText("Level 4"); 
  await expect.soft(page.locator("//p[contains(text(),'Members who are not satisfied with our response ca')]")).toHaveText("Members who are not satisfied with our response can file a complaint with the Securities and Exchange Board of India at https://scores.gov.in."); 
  await expect.soft(page.locator("//h5[normalize-space()='Note:']")).toHaveText("Notes:"); 
  await expect.soft(page.locator("//li[contains(text(),'Any query or complaint that requires additional ti')]")).toHaveText("Any query or complaint that requires additional time will be explained by the company to the Member, along with the expected timeframe for resolving it."); 
  await expect.soft(page.locator("//li[contains(text(),'Member here means all the clients who are register')]")).toHaveText("Member here means all the clients who are registered with 1 Finance."); 

  // await expect.soft(page.locator("")).toHaveText(""); 
});

test("To navigate back and click on 6th tab (Annual Returns) and assert link for the tab",async ({page, context})=> {

  await page.click("(//div[@class='legal-and-regulatory_legalAndRegulatory_tab___suEx'])[6]");
  const newPage = await context.waitForEvent('page');
  const newPageURL = newPage.url();
  await expect(newPageURL).toBe("https://imaages-hosting-1fin.s3.ap-south-1.amazonaws.com/assets/documents/annual+return.pdf");
  await page.bringToFront();
  await expect(page).toHaveURL("https://1finance.co.in/legal-and-regulatory");
});

test("To click on the email link present in the detail page (care@1finance.co.in) ",async ({page})=> {
  await page.click("//a[normalize-space()='care@1finance.co.in']");
});
