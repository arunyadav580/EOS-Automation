export default class LegalAndRegulatoryPage {
    constructor(page){
        this.page = page;
        this.title = page.locator("//h1[normalize-space()='Legal & Regulatory']");  
        this.sebiInvestment = page.locator("//div[@class='legal-and-regulatory_legalAndRegulatory_tabsdata__887Ab']//div[1]");
        this.complaintStatus = page.locator("//div[@class='legal-and-regulatory_legalAndRegulatory_tabsdata__887Ab']//div[2]");
        this.dosAndDonts = page.locator("//div[@class='legal-and-regulatory_legalAndRegulatory_tabsdata__887Ab']//div[3]");
        this.clientInvestmentAdvisory = page.locator("//div[@class='legal-and-regulatory_legalAndRegulatory_tabsdata__887Ab']//div[4]");
        this.GreviancePolicy= page.locator("//div[@class='legal-and-regulatory_legalAndRegulatory_tabsdata__887Ab']//div[5]");
        this.annualReturns = page.locator("//div[@class='legal-and-regulatory_legalAndRegulatory_tabsdata__887Ab']//div[6]");
    }
}