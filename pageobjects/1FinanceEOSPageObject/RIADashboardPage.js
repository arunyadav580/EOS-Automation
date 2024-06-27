export default class RIADashboardPage {
    constructor(page){
        this.page = page;
        this.searchTextBox = page.locator("//input[@id='filter-text-box']");
        this.telephonicButton = page.locator("//i[@name='telephoneFill']//*[name()='svg']");
        this.commentBox = page.locator("//textarea[@placeholder='Type Here..']");
        this.saveButton = page.locator("//button[normalize-space()='Save']"); 
        this.alertMessageBox = page.locator("//div[@id='toast-container']"); 
    }
}
