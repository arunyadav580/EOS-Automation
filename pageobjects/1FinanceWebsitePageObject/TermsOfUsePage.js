export default class TermsOfUsePage {
    constructor(page){
        this.page = page; 
        this.title = page.locator("//h1[normalize-space()='Terms Of Use']");
    }
}

