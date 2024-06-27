import { test, expect } from '@playwright/test';

const baseUrl = process.env.PROD_BASE_URL_WP;

const commonLinkPart = "https://imaages-hosting-1fin.s3.ap-south-1.amazonaws.com/assets/fund-logos/";

const allFund = async (request, category, pageNo, length, fundType, slug) => {
    const queryParams = fundType ? `?type=${fundType}` : '';  //ternary operator to check if funt type is not null  , '' if condition is false
    const response = await request.post(`${baseUrl}${slug}${queryParams}`, {
        data: {
            "category": category,
            "page_no": pageNo,
            "length": length
        },
    });
    const resp = await response.json();
    return resp;
};

test.describe("Mutual Fund Get Funds API", async () => {

    test("keep category section blank for equity fund and assert response", async ({ request }) => {
        const response = await allFund(request, "", 1, 10, "equity", "mutual-funds/v1/get-all-funds")
        expect(response.meta.status).not.toEqual(200);
        expect(response.meta.message).not.toEqual("Should not accept blank input");
    })

    test("Enter invalid category in category section for equity fund and assert response", async ({ request }) => {
        const response = await allFund(request, "All", 1, 10, "equity", "mutual-funds/v1/get-all-funds")
        expect(response.meta.status).not.toEqual(200);
        expect(response.meta.message).toEqual("Category All is not valid");
    })

    const testLengths = [10, 15, 20, 417];

    for (const length of testLengths) {
        test(`Enter length ${length} and check if the equity funds are getting fetched for that and assert response`, async ({ request }) => {
            const resp = await allFund(request, "-1", "1", length, "equity", "mutual-funds/v1/get-all-funds");
            expect(resp.meta.status).toEqual(200);
            expect(resp.meta.message).toEqual("Success");
            const len = resp.data.length
            expect(len).toEqual(length);
        });
    }

    test("Get all equity funds and assert response", async ({ request }) => {
        const response = await allFund(request, "-1", "1", 417, "equity","mutual-funds/v1/get-all-funds");
        expect(resp.meta.status).toEqual(200);
        expect(resp.meta.message).toEqual("Success");
        expect(resp.total_count).toEqual("417");

        for (let i = 0; i < response.data.length; i++) {
            const logoLink = response.data[i].logo_link;
            const fundScore = response.data[i].fund_score;
            expect(logoLink).toContain(commonLinkPart);
            expect(typeof fundScore).toBe('string');
        }
    });

    test("Get all Tax Saver funds and assert response", async ({ request }) => {
        const response = await allFund(request, "Equity Linked Savings Scheme", "1", 38, "tax","mutual-funds/v1/get-all-funds");
        expect(response.meta.status).toEqual(200);
        expect(response.meta.message).toEqual("Success");
        expect(response.data.length).toEqual(38);

        for (let i = 0; i < response.data.length; i++) {
            const logoLink = response.data[i].logo_link;
            const fundScore = response.data[i].fund_score;
            expect(logoLink).toContain(commonLinkPart);
            expect(typeof fundScore).toBe('string');
        }
    });

    test("Get all Hybrid funds and assert response", async ({ request }) => {
        const response = await allFund(request, "-1", "1", 147, "hybrid", "mutual-funds/v1/get-all-funds");
        expect(response.meta.status).toEqual(200);
        expect(response.meta.message).toEqual("Success");
        expect(response.data.length).toEqual(147);

        for (let i = 0; i < response.data.length; i++) {
            const logoLink = response.data[i].logo_link;
            const fundScore = response.data[i].fund_score;
            expect(logoLink).toContain(commonLinkPart);
            expect(typeof fundScore).toBe('string');
        }
    });

    test("Get all debt funds and assert response", async ({ request }) => {
        const response = await allFund(request, "-1", "1", 302,"debt" ,"mutual-funds/v1/get-all-funds");
        expect(response.meta.status).toEqual(200);
        expect(response.meta.message).toEqual("Success");
        expect(response.data.length).toEqual(302);

        for (let i = 0; i < response.data.length; i++) {
            const logoLink = response.data[i].logo_link;
            const fundScore = response.data[i].fund_score;
            expect(logoLink).toContain(commonLinkPart);
            expect(typeof fundScore).toBe('string');
        }
    });
})


