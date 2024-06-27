import {test, expect, request} from "@playwright/test";

const baseUrl = process.env.PROD_BASE_URL_WP; 
const prodUrl = process.env.PROD_URL_WEBSITE ;

async function scrollPage(page, iterations) {
    for (let i = 0; i < iterations; i++) {
      page.keyboard.down('PageDown');
    }
  }

test.describe("Health Insurance", ()=>{
    let healthInsuranceArray;
    let apiResponse; 

    test("Get an API response --> ", async ({request}) => {
        const response = await request.post (baseUrl + "product-scoring/v1/get-health-insurance-featured-list", {
            data : {
                age_group: "36-40", 
                sum_insured: "10 Lacs", 
                family_construct_mapping: "1A"
            }
        })
        apiResponse = await response.json()
    })

    healthInsuranceArray = []

    test("Get UI response --> ", async ({page}) => {
        // console.log(prodUrl + "product-scoring/health-insurance?gender=male&age=36-40&family=spouse-&sum=10+Lacs")
        await page.goto(prodUrl + "product-scoring/health-insurance?gender=male&age=36-40&family=spouse-&sum=10+Lacs");
        await scrollPage(page,2);
        const featuredList =await page.$$("[class^='CardHealth_bestcard_contianer__9wDmk']");
        
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
        // console.log(healthInsuranceArray)
    })

    test("Compare responses", async()=>{
        const resp = apiResponse
        const ui = healthInsuranceArray

        for(let i=0; i< resp.data.length; i++){
            expect.soft(resp.data[i].insurer_name).toContain(ui[i].subTitle)
            expect.soft(resp.data[i].insurance_plan).toContain(ui[i].title)
            expect.soft(ui[i].policy).toContain(resp.data[i].average_price_scoring)
        }


    })

})