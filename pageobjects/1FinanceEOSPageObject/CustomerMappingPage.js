export default class CustomerMappingPage {
    constructor(page){
        this.page = page;
        this.searchTextBox = page.locator("(//div[contains(text(),'Search for a customer')])[1]");
        this.editButton = page.locator("(//i[@class='fa fa-pencil ng-star-inserted'])[1]");
        this.searchNewFC = page.locator("div[class='ng-placeholder']");
        this.saveButton = page.locator("//button[normalize-space()='Save']"); 
        this.alertMessageBox = page.locator("//div[@role='alert']"); 
    }
}
