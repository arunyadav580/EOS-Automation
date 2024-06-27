export default class HomePage {
    constructor(page){
        this.titleContent = page.locator("//h1[normalize-space()='Get Holistic Financial Planning']");
        this.downloadTheAppContent = page.locator("//h3[normalize-space()='Download 1 Finance']");
        this.cashFlowContent = page.locator("//h2[normalize-space()='Cashflow Planning']");
        this.insuranceContent = page.locator("//h2[normalize-space()='Insurance Planning']");
        this.liabilityContent = page.locator("//h2[normalize-space()='Liability Planning']");
        this.investmentContent = page.locator("//h2[normalize-space()='Investment Planning']");
        this.taxContent = page.locator("//h2[normalize-space()='Tax Planning']");
        this.willContent = page.locator("//h2[normalize-space()='Will & Estate Planning']");
        this.downloadAppButton = page.locator("div[class='banner_banner-container__Bb4vo'] a[class='download_download-btn__ebsp4']");
        this.closeDownloadScreen = page.locator("//button[contains(@id, 'DownloadAppModal_close')]");
        this.cashFlowPlanning = page.locator("//div[contains(@class, 'Financeapproach_approach-container-data')]//div[1]");
        this.liabilityPlanning = page.locator("//div[contains(@class, 'Financeapproach_approach-container-data')]//div[2]");
        this.taxPlanning = page.locator("//div[contains(@class, 'Financeapproach_approach-container-data')]//div[3]");
        this.insurancePlanning = page.locator("//div[contains(@class, 'Financeapproach_approach-container-data')]//div[4]");
        this.investmentPlanning = page.locator("//div[contains(@class, 'Financeapproach_approach-container-data')]//div[5]");
        this.willPlanning = page.locator("//div[contains(@class, 'Financeapproach_approach-container-data')]//div[6]");
        this.downloadAppButtonTwo = page.locator("div[class='undefined'] a[class='download_download-btn__ebsp4']");
        this.downloadAppButtonThree = page.locator("div[class='Wellnessplan_wellnessplan-downloadbtn-row__dWXxd'] a[class='download_download-btn__ebsp4']")
        this.faqFirstTile =page.locator("//body/div[@id='__next']/div[contains(@class, 'homePagev4_main-container')]/section/div[contains(@class, 'homePagev4_accordion-data')]/div[1]/div[1]");
        this.faqSecondTile = page.locator("//body/div[@id='__next']/div[contains(@class, 'homePagev4_main-container')]/section/div[contains(@class, 'homePagev4_accordion-data')]/div[2]/div[1]");
        this.faqThirdTile = page.locator("//body/div[@id='__next']/div[contains(@class, 'homePagev4_main-container')]/section/div[contains(@class, 'homePagev4_accordion-data')]/div[3]/div[1]");
        this.faqFourthTile = page.locator("//body/div[@id='__next']/div[contains(@class, 'homePagev4_main-container')]/section/div[contains(@class, 'homePagev4_accordion-data')]/div[4]/div[1]");
        this.faqFifthTile = page.locator("//body/div[@id='__next']/div[contains(@class, 'homePagev4_main-container')]/section/div[contains(@class, 'homePagev4_accordion-data')]/div[5]/div[1]");
    }
}

