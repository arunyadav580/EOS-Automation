export default class TermInsurancePage {
    constructor(page) {
        debugger;
        this.page = page;
        this.uiElement = "[class^=bestcard_bestcard_contianer]";
    }

    async getPolicy(request, baseUrl, gen, age, sum) {
        debugger;
        const response = await request.post(baseUrl + "term-insurance/v1/get-term-insurance", {
            data: {
                gender: gen,
                age_group: age,
                sum_assured: sum,
                page: "1",
                page_length: "6",
                sort_by: "DESC",
                scheme_featured_flag: 1,
            }
        });
        
        console.log(await response.status());
        const resp = await response.json();
        return resp;
    }

    async gotoTermInsurancePage(page) {
        debugger;
        await this.page.goto("https://1finance.co.in/product-scoring/term-insurance");
        await this.page.waitForTimeout(1000);
        await this.page.waitForSelector(this.uiElement);
    }

    async uiDetail() {
        debugger;
        const termInsArray = [];
        const uiElements = await this.page.$$(this.uiElement);

        for (let i = 0; i < uiElements.length; i++) {
            let policy = uiElements[i];
            let policyNamee = await policy.$eval("p.bestcard_main_titile__bp7v8", element => element.innerText);
            let oneFinanceScoree = await policy.$eval("div > span > span", element => element.innerText);
            let oneFinLinkk = await policy.$eval("div > img", element => element.getAttribute("srcset"));

            termInsArray.push({
                policyName: policyNamee,
                oneFinanceScore: oneFinanceScoree,
                oneFinLink: oneFinLinkk,
            });
        }

        return termInsArray;
    }
}
