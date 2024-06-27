export default class HealthInsurancePage {
    constructor(page){
        this.page = page; 
        this.uiElement = page.$$("[class^='CardHealth_bestcard_contianer__9wDmk']");
    }

    async getPolicy(){
        const response = await request.post(baseUrl + "product-scoring/v1/get-health-insurance-featured-list", {
            data : {
                age_group: "36-40", 
                sum_insured: "10 Lacs", 
                family_construct_mapping: "1A"
            }
        })
        const resp = await response.json()
        return resp
    }

    async goToHealthInsurancePage(page){
        await this.page.goto(prodUrl + "product-scoring/health-insurance?gender=male&age=36-40&family=spouse-&sum=10+Lacs");
        await this.page.waitForTimeout(1000);
        await this.page.waitForSelector(this.uiElement);
    }

    async uiDetail(){
    
        for(let i=0; i < featuredList.length; i++){
            const policy = featuredList[i]
            const subTitlee =await policy.$eval("//p[contains(@class, 'CardHealth_subtitle')]", element => element.innerText)
            const mainTitlee = await policy.$eval("//p[contains(@class,'CardHealth_main_titile')]", element => element.innerText)
            const pricee = await policy.$eval(" div:nth-child(2) > div > div > div:nth-child(2) > span", element => element.innerText)
            const productFeaturee = await policy.$eval("(//span[@class='CardHealth_bestcard_number_score__VmUoe'])[1]", element => element.innerText)
            
            healthInsuranceArray.push({
                subTitle : subTitlee,
                title : mainTitlee,
                policy : pricee, 
                productFeature : productFeaturee, 
            })

        }
    }

}