export default class EOSLoginPage {
    constructor(page){
        this.page = page;
        this.googleLoginButton = page.locator("button[type='button']");
        this.googleLoginEmail = page.locator("//input[@id='identifierId']");
        this.googleLoginNextButton = page.locator("(//div[@class='VfPpkd-Jh9lGc'])[2]");
        this.googleLoginPassword = page.locator("//input[@name='Passwd']");    
    }
}

