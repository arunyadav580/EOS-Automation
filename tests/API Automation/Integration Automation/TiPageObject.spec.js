import { test, page, request, expect } from '@playwright/test';
import { TermInsurancePage } from '../../../pageobjects';

const baseUrl = process.env.PROD_BASE_URL_WP;

const ageGroup = ["29 or less", "30-34", "35-39", "40-44", "45-49", "50-54", "55-59", "60 or more"];
const gender = ["Male", "Female", "Others"];
const sumAssured = ["0.5", "1", "2", "3", "4", "5"];

test.describe("Using Page Object", () => {

    let allResponses = [];
    
    ageGroup.forEach(age => {
        gender.forEach(gen => {
            sumAssured.forEach(sum => {
                test(`Get the response for Term Insurance for Age Group ${age}, Gender ${gen} and Sum ${sum}`, async ({ page, request }) => {
                    const termInsurancePage = new TermInsurancePage(page);
                    const response = await termInsurancePage.getPolicy(request, baseUrl, gen, age, sum);
                    allResponses.push(response)
                });
            });
        });
    });


    test("UI Logic", async() => {
        const apiResp = allResponses
        console.log(apiResp)

        const uiContainer = await page.$$("ul[class='terminsurancecard_insurance_listing_card__CjLQG']");
        
        for(let i = 0; i < uiContainer.length; i++){
            console.log("A");

        }

    })
});



 test("Hit API and get response and launch URL and get Elements", async ({ request, page }) => { 
        const termInsurancePage = new TermInsurancePage(page);

        const apiResponse = await termInsurancePage.getPolicy(request, baseUrl);

        await termInsurancePage.gotoTermInsurancePage(page); 
        const uiResponse = await termInsurancePage.uiDetail(); 

        for (let i = 0; i < apiResponse.length; i++) {
            console.log(uiResponse[i].policyName)
            console.log(apiResponse.data[i].insurance_plan_name)
            expect.soft(uiResponse[i].policyName).toEqual(apiResponse.data[i].insurance_plan_name);
        }
    })
