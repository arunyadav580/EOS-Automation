export default class BlogsPage {
    constructor(page){
        this.page = page; 
        this.scienceBehindMs = page.locator("//h1[@class='blogs_postTitle___5eSZ']");
    }
}