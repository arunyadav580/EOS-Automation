const request = require('request');

export default class MutualFundFilter {
  constructor(baseUrl, page) {
    this.baseURL = baseUrl;
    this.page = page;
    this.scoringAndRanking = page.locator("(//a[contains(@class, 'headerStyles_navLink') and contains(normalize-space(), 'Scoring & Ranking')])[1]");
    this.mutualFunds = page.locator("//a[@class='zz_health_anchor__zaAuz zz_health_product-card___SLhI mb-4']");
    this.filterHigh = page.locator("//p[contains(@id,'mf-search-filter-high-gtm')]");
    this.filterMedium = page.locator("//p[contains(@id,'mf-search-filter-mid-gtm')]");
    this.filterLow = page.locator("//p[contains(@id,'mf-search-filter-low-gtm')]");
    this.filter = page.locator("//div[contains(@class, 'mf-scoring_sorting-frm')]");
    this.filterLowToHigh = page.locator("//p[normalize-space()='Score: Low to High']");
    this.filterHighToLow = page.locator("//p[normalize-space()='Score: High to Low']")
  }

  async filterMutualFunds(scheme, scheme_priority, sortBy) {

    const response = await this.page.request.post(`${this.baseURL}`, {
      data: {
        "query": "",
        "page": 1,
        "page_length": 9,
       "scheme": scheme,
        "scheme_priority": scheme_priority,
        "sort_by": sortBy,
      },
    });
    const responseData = await response.json(); // Extract JSON data from the response
    return responseData;
  }

  async zerothObject() {
    const mfArray = await this.page.$$('[class^=mf-scoring_cards] article');
    const attributesArray = [];

    for (let i = 0; i < mfArray.length; i++) {
      let article = mfArray[i];

      // Fetching attributes from the current article
      let schemeName = await article.getAttribute('scheme_name');
      let logoLink = await article.getAttribute('logo_link');
      let category = await article.getAttribute('category');
      let oneFinanceRank = await article.getAttribute('fund_rank');
      let oneFinanceScore = await article.getAttribute('fund_score');

      // Pushing the attributes to the array
      attributesArray.push({
        schemeName,
        logoLink,
        category,
        oneFinanceRank,
        oneFinanceScore,
      });
    }
    return attributesArray;
  }
}

//export default class AllMutualFunds {
  //   constructor(baseUrl, page) {
  //     this.baseURL = baseUrl;
  //     this.page = page;
  //     this.scoringAndRanking = this.page.locator("//a[@class='headerStyles_navLink__r3hGb'][normalize-space()='Scoring & Ranking']");
  //     this.mutualFunds = this.page.locator("//a[@href='/product-scoring/mutual-funds']");
  //     this.viewEquityFunds = this.page.locator("//a[normalize-space()='View all equity funds']");
  //     this.taxSaverFunds = this.page.locator("//a[normalize-space()='View all tax saver funds']");
  //     this.taxSaver = this.page.locator("//button[@class='mflanding_filterBtn_inactive__hm1jz'][normalize-space()='Tax Saver']");
  //     this.viewDetails = this.page.locator("//div[contains(@class, 'fundType_card_right_')]//a");
  //     this.count = this.page.locator("//span[contains(@class,'fundType_fund_pages_text')]")
  //     this.nextbutton = this.page.locator("//button[6]");
  //     this.nextPageTwo = this.page.locator("//button[7]");
  //     this.allPurposeButton = this.page.locator("//div[contains(@class, 'fundType_fund_pagination')]//div//button");
  //     this.firstTile = this.page.locator("//div[contains(@class, 'Accordion_accordion__gJ319')][1]");
  //     this.secondTile = this.page.locator("//div[contains(@class, 'Accordion_accordion__gJ319')][2]");
  //     this.thirdTile = this.page.locator("//div[contains(@class, 'Accordion_accordion__gJ319')][3]");
  //     this.fourthTile = this.page.locator("//div[contains(@class, 'Accordion_accordion__gJ319')][4]");
  //     this.fifthTile = this.page.locator("//div[contains(@class, 'Accordion_accordion__gJ319')][5]");
  //     this.sixthTile = this.page.locator("//div[contains(@class, 'Accordion_accordion__gJ319')][6]");
  //   }
  
    // async mfAllFilter(category ,pageNo, length) {
    //   const response = await this.page.request.post(`${this.baseURL}/magazine/wp-json/mutual-funds/v1/get-all-funds`, {
    //     data: {
    //       "category":category,
    //       "page_no":pageNo,
    //       "length":length
    //   }
    //   });
    //   const apiPolicyDetail = await response.json(); 
    //   return apiPolicyDetail;
    // }
  
    // async zerothObject() {
    //   // const mfEquityFunds = await this.page.$$('[class^=fundType_fund_showcase] div');
    //   //const mfEquityFunds = await this.page.$$("div[class^=fundType_card__]");
    //   // //div[contains(@class,'fundType_card__')]//div[contains(@class, 'fundType_card_left_')]//img[@alt]
    //   const mfEquityFunds = await this.page.locator("//div[contains(@class,'fundType_card__')]").all();
  
    //   const fundDetails = [];
  
    //   // console.log(mfEquityFunds.length);
      
    //   for (let i = 0; i < mfEquityFunds.length; i++) {
    //     debugger;
    //     let div = mfEquityFunds[i];
  
    //     // Fetching attributes from the current article
    //     let schemeName = await div.locator("//div[contains(@class, 'fundType_card_left_')]//img").getAttribute('alt');
    //     let oneFinanceScore = await div.locator("//div[contains(@class, 'fundType_card_right_')]//span//span").innerText();
    //     let fundCategory = await div.locator("//div[contains(@class, 'fundType_card_left_')]//div//span[2]").innerText();
  
    //     // Pushing the attributes to the array
    //     fundDetails.push({
    //       schemeName,
    //       oneFinanceScore,
    //       fundCategory
    //     });
    //   }
    //   return fundDetails;
    // }
  // }


