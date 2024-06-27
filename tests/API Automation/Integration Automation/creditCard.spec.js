import { test, expect, request } from "@playwright/test";
import { CreditCardPage } from "../../../pageobjects";

const baseUrl = "https://1finance.co.in/product-scoring/term-insurance";

test.describe("Automated test cases for Credit Card", () => {

    test("Hit API and get response", async({request})=>{
        const response = await request.post("https://1finance.co.in/magazine/wp-json/term-insurance/v1/get-term-insurance",
        {
            data :{
                gender: "Male", 
                age_group: "30-34", 
                sum_assured: "1", 
                page: "1", 
                page_length: "6", 
                sort_by: "DESC"
            }

        })

        console.log(await response.json())
    })

    test.only("To click on view detail and assert response", async( {page} ) => {
        const creditCard = new CreditCardPage(page);
        await page.goto("https://1finance.co.in/product-scoring/term-insurance");
        const uiElement = await page.$$("[class^=bestcard_bestcard_contianer]");
        console.log(uiElement.length)   
    })

})



