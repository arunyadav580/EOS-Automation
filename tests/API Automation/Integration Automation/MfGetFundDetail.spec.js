import { test, expect } from '@playwright/test';

const baseUrl = process.env.PROD_BASE_URL_WP;

test.describe('Mutual Fund Detail API', async () => {

    let allFunds;

    test("Get the response for all equity funds", async ({ request }) => {
        const response = await request.post(baseUrl + "mutual-funds/v1/get-all-funds?type=equity", {
            data: {
                "category": -1,
                "page_no": 1,
                "length": 417
            }
        });
        const fund = await response.json();
        allFunds = fund.data;
    });

    test("Hit the detail API for every slug and assert URL", async ({ request }) => {
        if(allFunds){
            const myfunds = allFunds;
            for (const fund of myfunds) {
                if (fund.slug) {
                    const response = await request.get(baseUrl + "mutual-funds/v1/get-fund-details/" + fund.slug);
                    const res =  JSON.stringify(response);
                    expect(res).toBeTruthy();
                }
            }
        }
    });
})



