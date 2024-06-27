export default class Careers {
    constructor(page) {
        this.page = page;
        this.exploreOpportunities = page.locator("//a[@class='careers_exploreCTA__htT_M careers_mt-20__xMEmM']");
        this.firstTeam = page.locator("(//div[@class='positions_job-card__K2DBz'])[1]");
        this.secondTeam = page.locator("(//div[@class='positions_job-card__K2DBz'])[2]");
        this.thirdTeam = page.locator("(//div[@class='positions_job-card__K2DBz'])[3]");
        this.fourthTeam = page.locator("(//div[@class='positions_job-card__K2DBz'])[4]");
        this.fifthTeam = page.locator("(//div[@class='positions_job-card__K2DBz'])[5]");
        this.sixthTeam = page.locator("(//div[@class='positions_job-card__K2DBz'])[6]");
        this.seventhTeam = page.locator("(//div[@class='positions_job-card__K2DBz'])[7]");
        this.eighthTeam = page.locator("(//div[@class='positions_job-card__K2DBz'])[8]");
        this.apply = page.locator("//div[@class='jobrole_apply_btn__Jy4Ky']");
    }
}