export default class EOSCallbackRequestPage {
    constructor(page){
        this.page = page;
        this.dashboardHomeButton = page.locator("//a[@class='sidenav-nav-link active']//*[name()='svg']");
        this.memberListButton = page.locator("//a[@routerlink='/memberdetails']//*[name()='svg']");
        this.customerMappingPageButton = page.locator("//a[@routerlink='/customermapping']//*[name()='svg']");
        this.rIADashboardPageButton = page.locator("//a[@routerlink='/riadashboard']//*[name()='svg']"); 
        this.requestPageDropdown = page.locator("//ng-select[@placeholder='Select']");
        this.priorityListOption = page.locator("//span[normalize-space()='Priority List']");
        this.editButton = page.locator("(//*[name()='path'])[40]");
        this.editButton = page.locator("(//*[name()='svg'][@class='bi bi-pencil-fill'])[1]");
        this.alertMessageBox = page.locator("//div[@role='alert']");
        this.commentBox = page.locator("//textarea[@placeholder='Type Here..']");
        this.saveButton = page.locator("//button[normalize-space()='Save']");
        this.selectDropdown = page.locator("//div[@class='ng-dropdown-panel-items scroll-host']");
        this.select = page.locator("//ng-select[@formcontrolname='inputIssue']");
        this.searchBox = page.locator("//input[@id='filter-text-box']");

    }
}
