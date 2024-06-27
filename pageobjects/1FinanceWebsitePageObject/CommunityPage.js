export default class CommunityPage {
    constructor(page){
        this.page = page; 
        this.oneFinLogo = page.locator("//span[@id='forumLogoWrapper']");
    }
}