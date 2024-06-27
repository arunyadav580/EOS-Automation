export default class ToolsPage {
    constructor(page){
        this.page = page;
        this.insuranceButton = page.locator("//a[normalize-space()='Insurance']");
    }
}
