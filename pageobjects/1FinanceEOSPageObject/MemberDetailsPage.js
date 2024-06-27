export default class MemberDetailsPage {
    constructor(page){
        this.page = page;
        this.dashboardHomeButton = page.locator("//a[@class='sidenav-nav-link active']//*[name()='svg']");
        this.memberlistButton = page.locator("//a[@routerlink='/memberdetails']//*[name()='svg']//*[name()='path']");
        this.memberSearchBox = page.locator("//input[@id='filter-text-box']");
        this.nextPageButton = page.locator("//span[@class='icon-next']");
        this.searchedMember = page.locator(".custom");
        this.updateFinancialDetailsButton = page.locator("//button[@id='workbook-link1']");
        this.workbookButton = page.locator("//a[@id='workbook-link']");
        this.callbackRequestPageButton = page.locator("//a[@routerlink='/callbackRequest']//*[name()='svg']//*[name()='path']");
    }
}
