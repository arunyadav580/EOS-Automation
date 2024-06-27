export default class OurStoryPage {
    constructor(page){
        this.page = page; 
        this.storyTitle = page.locator("//p[contains(@class,'text-darkGrey story_spaced-pretext__CuetO')]");
        this.firstExpansionTile = page.locator("(//button[@type='button'])[1]");
        this.secondExpansionTile = page.locator("(//button[@type='button'])[2]");
        this.thirdExpansionTile = page.locator("(//button[@type='button'])[3]");
        this.fourthExpansionTile = page.locator("(//button[@type='button'])[4]");
        this.loadMore = page.locator("//span[normalize-space()='Load more']");
        this.firstStoryCard = page.locator("(//div[@class=' story_card-content__wJRAb'])[1]");
        this.secondStoryCard = page.locator("(//div[@class=' story_card-content__wJRAb'])[2]");
        this.thirdStoryCard = page.locator("(//div[@class=' story_card-content__wJRAb'])[3]");
        this.fourthStoryCard = page.locator("(//div[@class=' story_card-content__wJRAb'])[4]");
    }
}

