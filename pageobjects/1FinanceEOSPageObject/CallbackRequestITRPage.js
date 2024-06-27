export default class CallbackRequestITRPage {
    constructor(page){
        this.page = page;
        this.textboxName = page.locator("(//input[@id='nameinput'])[1]");
        this.textboxPhoneNumber = page.locator("(//input[@id='nameinput'])[2]");
        this.textboxEmail = page.locator("(//input[@id='nameinput'])[3]");
        this.submitButton = page.locator("//button[normalize-space()='Submit']");
        this.alertMessageBox = page.locator("//span[@alt='checkmark']");
    }
}
