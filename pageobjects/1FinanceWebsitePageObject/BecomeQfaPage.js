export default class BecomeQfaPage {
    constructor(page){
        this.page = page;
        this.becomeAQfaTitle = page.locator("//h1[normalize-space()='Partner as a Qualified Financial Advisor']");
        this.becomeQfa = page.locator("//a[normalize-space()='Become a QFA']");  
        this.joinNow = page.locator("//div[contains(@class, 'becomeaqfa_banner_qfa__u8zIh')]//a");
        this.joinNowSecond = page.locator("//a[normalize-space()='Join Now']");
        this.fullName = page.locator("//input[@id='full_name']");
        this.emailId = page.locator("//input[@id='email']");
        this.mobileNumber = page.locator("//input[@id='phone']")
        this.city = page.locator("//input[@id='city']");
        this.cfp = page.locator("//input[@id='cpf']");
        this.cwm = page.locator("//input[@id='cwm']");
        this.cfa = page.locator("//input[@id='cfa']");
        this.ca = page.locator("//input[@id='ca']");
        this.sebi = page.locator("//input[@id='sebi_ria']");
        this.nism = page.locator("//input[@id='nism_xa_xb']");
        this.qpfp = page.locator("//input[@id='qpfp']");
        this.others = page.locator("//input[@id='other']");
        this.ans = page.locator("//input[@id='our_answer']");
        this.submitButton = page.locator("//button[@type='submit']//*[name()='svg']");
        this.phoneNoEmailErrorToast = page.locator("//div[contains(@class, 'becomeaqfa_from-error')]");
        this.SuccessToast = page.locator("//div[contains(@class, 'becomeaqfa_form-success')]");
        this.cancelButton = page.locator("//div[@class='becomeaqfa_form-success__OINKy']//span");
        this.faqFirstTile = page.locator("//div[contains(@class,'becomeaqfa_become-accordion')]//div[1]//div[1]//span[1]");
        this.faqSecondTile = page.locator("//div[contains(@class,'becomeaqfa_become-accordion')]//div[2]//div[1]//span[1]");
        this.faqThirdTile = page.locator("//div[contains(@class,'becomeaqfa_become-accordion')]//div[3]//div[1]//span[1]");
        this.faqFourthTile = page.locator("//div[contains(@class,'becomeaqfa_become-accordion')]//div[4]//div[1]//span[1]");
        this.faqFifthTile = page.locator("//div[contains(@class,'becomeaqfa_become-accordion')]//div[5]//div[1]//span[1]");
        this.faqSixthTile = page.locator("//div[contains(@class,'becomeaqfa_become-accordion')]//div[6]//div[1]//span[1]");
        this.faqSeventhTile = page.locator("//div[contains(@class,'becomeaqfa_become-accordion')]//div[7]//div[1]//span[1]");
        this.faqEighthTile = page.locator("//div[contains(@class,'becomeaqfa_become-accordion')]//div[8]//div[1]//span[1]");
        this.faqNinthTile = page.locator("//div[contains(@class,'becomeaqfa_become-accordion')]//div[9]//div[1]//span[1]");
    }

    async allDetails(){
        await scrollPage(this.page, 5);
        await this.page.waitForTimeout(2000);
        await this.becomeQfa.click();
        await this.page.waitForTimeout(3000);
        await this.joinNow.click();
        await this.page.waitForTimeout(1000);
        await this.fullName.type("Runali Painaik");
        await this.fullName.press("Tab"); 
        await this.emailId.type("runalipainaik@gmail.com");
        await this.fullName.press("Tab"); 
        await this.mobileNumber.type('8291684040');
        await this.fullName.press("Tab"); 
        await this.city.type('Thane');
        await this.fullName.press("Tab"); 
        await this.ca.click();
        await this.cfa.click();
        await this.cfp.click();
        await this.cwm.click();
        await this.nism.click();
        await this.qpfp.click();
        await this.sebi.click();
        await this.others.click();
        await this.ans.type("Answer");
        await this.submitButton.click();
    }
}

