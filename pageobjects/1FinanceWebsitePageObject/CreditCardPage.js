export default class CreditCardPage {
    constructor(page){
        this.page = page; 
        this.viewDetail = page.locator("//div[@id='bestCard-0']//a[@class='bestcardcredit_view_deatil__bD_I3'][normalize-space()='View details']");
    }

}