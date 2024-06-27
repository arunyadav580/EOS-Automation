import { test, expect } from '@playwright/test';

const baseUrl = process.env.PROD_BASE_URL_WP;

const commonLinkPart = "https://imaages-hosting-1fin.s3.ap-south-1.amazonaws.com/assets/fund-logos/";

test.describe('Mutual Fund Detail API', async () => {

    let allFunds;

    test("Get the response for all equity funds", async ({ request }) => {
        const response = await request.post(baseUrl + "mutual-funds/v1/get-all-funds?type=equity", {
            data: {
                "category": -1,
                "page_no": 1,
                "length": 10
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
                    const res =await response.json();
                    console.log(res);
                    expect(res).toBeTruthy();
                    expect(res.meta.message).toEqual("Success");
                    expect(res.data.logo_link).toContain(commonLinkPart);
                    expect(res.data.fund_rank).toMatch(/^\d+\/\d+$/);
                    expect(res.data.as_of_date).toMatch(/^\w+\s\d{4}$/);
                    expect(parseInt(res.data.fund_score)).toBeLessThanOrEqual(100);
                }
            }
        }
    });
})



