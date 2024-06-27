async function scrollPage(page, iterations) {
    for (let i = 0; i < iterations; i++) {
        page.keyboard.down('PageDown');
    }
}
export default class MoneysignPage {
    constructor(page) {
        //this will make the page availabe to every other method
        this.page = page;
        this.moneysign = page.locator("//div[contains(@class, 'headerStyles_navLinks__CEkii')]//a[1]");
        this.vigilantTurtle = page.locator("(//div[@class='moneysign-redesign_moneysign_profile_data__gvH1p'])[1]");
        this.persistantHorse = page.locator("//div[contains(@class, 'moneysign-redesign_moneysign_profile_data') and contains(@class, 'moneysign-redesign_moneysign_profile_horse')]");
        this.farsightedEagle = page.locator("//div[contains(@class, 'moneysign-redesign_moneysign_profile_data') and contains(@class, 'moneysign-redesign_moneysign_profile_eagle')]");
        this.opportunisticLion = page.locator("//div[contains(@class, 'moneysign-redesign_moneysign_profile_data') and contains(@class, 'moneysign-redesign_moneysign_profile_lion')]");
        this.virtuousElephant = page.locator("//div[contains(@class, 'moneysign-redesign_moneysign_profile_data') and contains(@class, 'moneysign-redesign_moneysign_profile_elephant')]");
        this.enlightenedWhale = page.locator("//div[contains(@class, 'moneysign-redesign_moneysign_profile_data') and contains(@class, 'moneysign-redesign_moneysign_profile_wahle')]");
        this.tacticalTiger = page.locator("//div[contains(@class, 'moneysign-redesign_moneysign_profile_data') and contains(@class, 'moneysign-redesign_moneysign_profile_tiger')]");
        this.stealthyShark = page.locator("//div[contains(@class, 'moneysign-redesign_moneysign_profile_data') and contains(@class, 'moneysign-redesign_moneysign_profile_shark')]");
        this.closeCard = page.locator("//button[contains(@aria-label, 'close')]");
        this.nextButtonPreviousPage = page.locator("(//*[name()='svg'][@class='MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-a7whoe'])[1]");
        this.nextButtonNextPage = page.locator("(//*[name()='svg'][@class='MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-a7whoe'])[2]");
        this.downloadTheApp = page.locator("//button[normalize-space()='Download the app']");
        this.readMore = page.locator("//a[normalize-space()='Read more']");
    }

    async commonStepsToScroll(page) {
        await this.page.waitForTimeout(1000);
        scrollPage(this.page, 2);
        await this.page.waitForTimeout(1000);
    }

    async nextPage(page) {
        await this.nextButtonPreviousPage.click();
        await this.nextButtonNextPage.click();
        await this.nextButtonNextPage.click();
        await this.nextButtonNextPage.click();
        await this.nextButtonNextPage.click();
        await this.nextButtonNextPage.click();
        await this.nextButtonNextPage.click();
    }

    async previousPage(page) {
        await this.nextButtonPreviousPage.click();
        await this.nextButtonPreviousPage.click();
        await this.nextButtonPreviousPage.click();
        await this.nextButtonPreviousPage.click();
        await this.nextButtonPreviousPage.click();
        await this.nextButtonPreviousPage.click();
        await this.nextButtonPreviousPage.click();
        await this.nextButtonPreviousPage.click();
    }
}