export default class PrivacyPolicyPage {
    constructor(page){
        this.page = page; 
        this.title = page.locator("//h1[normalize-space()='Privacy Policy']");
    }
}