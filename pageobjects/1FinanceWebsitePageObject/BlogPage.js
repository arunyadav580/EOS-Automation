export default class BlogPage {
    constructor(page){
        this.page = page; 
        this.all = page.locator("//li[@class='all_posts blog_category category_item active']");
        this.mutualFund = page.locator("//li[@id='category_item_273']");
        this.investing = page.locator("//li[@id='category_item_274']");
        this.liabilityPlanning = page.locator("//li[@id='category_item_275']");
        this.crypto = page.locator("//li[@id='category_item_278']");
        this.taxPlanning = page.locator("//li[@id='category_item_285']");
        this.creditCard = page.locator("//li[@id='category_item_291']");
        this.personalFinance = page.locator("//li[@id='category_item_292']");
        this.temparament = page.locator("//li[@id='category_item_334']");
    }
}