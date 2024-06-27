export default class SitemapPage {
    constructor(page){
        this.page = page;
        this.title = page.locator("//h1[normalize-space()='Sitemap Links']");  
    }
}