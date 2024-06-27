export default class Press {
    constructor(page){
        this.page = page; 
        this.pressButton = page.locator("//a[normalize-space()='Press']");
    }

}