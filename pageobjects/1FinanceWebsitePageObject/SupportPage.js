export default class SupportPage {
    constructor(page){
        //this will make the page availabe to every other method
        this.page = page;
        this.supportTitle = page.locator("//h1[normalize-space()='How can we assist you?']");
        this.whatsappButton = page.locator("//img[@alt='whatsapp']");
    }
}

