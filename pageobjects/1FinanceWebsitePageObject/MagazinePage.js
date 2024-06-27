export default class MagazinePage {
    constructor(page){
        this.page = page;
        this.title = page.locator("//div[@class='page-content title-area']//h1");
        this.magazine = page.locator("//a[contains(@class, 'headerStyles_navLink')][2]");
        this.askAQFA = page.locator("//a[@class='category ask-a-qfa-magazine']");
        this.dispatchOneFinance = page.locator("//a[normalize-space()='Dispatch from 1 Finance']");
        this.longStoryShort = page.locator("//a[@class='category long-story-short-magazine']");
        this.personalEssay = page.locator("//a[@class='category personal-essays']");
        this.thingAboutMoney = page.locator("//a[@class='category the-thing-about-money-magazine']");
        this.viewAllQfa = page.locator("(//span[contains(text(),'View all')])[1]");
        this.viewAllAboutMoney = page.locator("(//span[contains(text(),'View all')])[2]");
        this.viewAllPersonalEssay = page.locator("(//span[contains(text(),'View all')])[3]");
        this.viewAllLongStory = page.locator("(//span[contains(text(),'View all')])[4]");
        this.viewAllDispatch = page.locator("(//span[contains(text(),'View all')])[5]");
        this.downloadTheApp = page.locator("//button[@class='downloadbtn mobile-invisible']//img[@alt='button']");
        this.cancel = page.locator("//button[@id='close']");
        this.emailSection = page.locator("(//input[@placeholder='Enter email'])[1]");
        this.emailSectionOne = page.locator("(//input[@placeholder='Enter email'])[2]");
        this.nextArrow = page.locator("(//div[@class='gjs-row styled-input'])[2]");
        this.askAQFASection = page.locator("//div[@class='links']//h2[contains(text(),'Ask a QFA')]");
        this.thingAboutMoneySection = page.locator("//div[@class='links']//h2[contains(text(),'The Thing About Money')]")
        this.personalEssay = page.locator("//div[@class='links']//h2[contains(text(),'Personal Essays')]");
        this.longStoryShortSection = page.locator("//div[@class='links']//h2[contains(text(),'Long Story Short')]");
        this.dispatchOneFinanceSection = page.locator("//h2[normalize-space()='Dispatch From 1 Finance']");
    }
}