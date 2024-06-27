export default class GfpSummit {
    constructor(page){
        this.page = page;
        this.title = page.locator("//h1[normalize-space()='Global Financial Planners Summit 2023']");
        this.watchNow = page.locator("//button[@type='button']");
        this.fullName = page.locator("(//div[@class='CustomInput_input-container__oHCgA registerform_inputClass__ECdIH'])[1]");
        this.email = page.locator("(//div[@class='CustomInput_input-container-2__lT6U_ false'])[1]");
        this.mobileNumber = page.locator("(//div[@class='CustomInput_input-container-2__lT6U_ false'])[2]");
        this.companyName = page.locator("//input[@id='company']");
        this.designation = page.locator("//input[@id='designation']");
        this.currentCity = page.locator("(//div[@class='CustomInput_input-container-2__lT6U_ undefined'])[1]");
        this.submitButton = page.locator("//button[@type='submit']");
    }
}
