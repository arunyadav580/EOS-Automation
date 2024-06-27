import { test, expect } from '@playwright/test';

const baseUrl = process.env.PROD_BASE_URL_WP;

test.describe('Term Insurance', async () => {

    let termInsArray;
    let apiResponse;

    test("Get the response for Term Insurance : ", async ({ request }) => {
        debugger;
        const response = await request.post(baseUrl + "term-insurance/v1/get-term-insurance", {
            data: {
                gender: "Male",
                age_group: "30-34",
                sum_assured: "1",
                page: "1",
                page_length: "6",
                sort_by: "DESC",
                scheme_featured_flag: 1,
            }
        })
        apiResponse = await response.json();
    })

    test("Grab UI elements for Term Insurance : ", async ({ page }) => {
        debugger;

        await page.goto("https://1finance.co.in/product-scoring/term-insurance");
        await page.waitForTimeout(1000);
        const uiElements = await page.$$("[class^=bestcard_bestcard_contianer]");

        termInsArray = []

        for (let i = 0; i < uiElements.length; i++) {
            let policy = uiElements[i]
            let policyNamee = await policy.$eval("p.bestcard_main_titile__bp7v8", element => element.innerText);
            let oneFinanceScoree = await policy.$eval("div > span > span", element => element.innerText);
            let oneFinLinkk = await policy.$eval("div > img", element => element.getAttribute("srcset"));

            termInsArray.push({
                policyName : policyNamee,
                oneFinanceScore : oneFinanceScoree,
                oneFinLink: oneFinLinkk,
            }
            )
        }
    });

    test("Assert response for UI vs API", async () => {
        const uiResp = termInsArray
        const apiResp = apiResponse

        for (let i = 0; i < uiResp.length; i++) {
            console.log(uiResp[i].policyName)
            console.log(apiResp.data[i].insurance_plan_name)
            expect.soft(uiResp[i].policyName).toEqual(apiResp.data[i].insurance_plan_name);
        }

    })


})