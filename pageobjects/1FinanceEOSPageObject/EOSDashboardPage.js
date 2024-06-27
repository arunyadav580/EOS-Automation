export default class EOSDashboardPage {
    constructor(page){
        this.page = page;
        this.dashboardHomeButton = page.locator("//a[@class='sidenav-nav-link active']//*[name()='svg']");
        this.memberListButton = page.locator("//a[@routerlink='/memberdetails']//*[name()='svg']");
        this.customerMappingPageButton = page.locator("//a[@routerlink='/customermapping']//*[name()='svg']");
        this.rIADashboardPageButton = page.locator("//a[@routerlink='/riadashboard']//*[name()='svg']"); 
        this.callbackRequestPageButton = page.locator("//a[@routerlink='/callbackRequest']//*[name()='svg']"); 
    }
}
