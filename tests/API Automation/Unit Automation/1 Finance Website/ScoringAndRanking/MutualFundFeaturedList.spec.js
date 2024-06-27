import { test, expect } from '@playwright/test';
const dotenv = require('dotenv');
const baseUrl = process.env.PROD_BASE_URL_WP;

const featuredListFund = async (request, length) => {
    debugger;
    const response = await request.post(baseUrl + "mutual-funds/v1/get-featured-list", {
        data: {
            "featured_flag": length,
        }
    });
    const resp = await response.json();
    return resp;
}

test.describe("Mutual Fund Featured List API", async()=>{

    test("Enter Alphabetical input in flag section of Mutual Fund Featured List and assert response", async ({ request }) => {
        const resp = await featuredListFund(request, "A");
        expect(resp.meta.status).not.toBe(200);
        expect(resp.meta.message).toEqual("Featured flag id is required");
    });
    
    test("Keep the flag empty in Mutual Fund Featured List and assert response", async ({ request }) => {
        debugger;
        const resp = await featuredListFund(request, "");
        expect(resp.meta.status).not.toBe(200);
        expect(resp.meta.message).toEqual("Featured flag id is required");
    });
    
    test("Enter incorrect flag in Mutual Fund Featured List", async ({ request }) => {
        const resp = await featuredListFund(request, "0");
        expect(resp.meta.status).not.toBe(200);
        expect(resp.meta.message).toEqual("Featured flag id is required");
    });
    
    test("Mutual Fund Featured List with correct flag and assert response", async ({ request }) => {
        const resp = await featuredListFund(request, "1");
        expect(resp.meta.status).toBe(200);
        expect(resp.meta.message).toEqual("Success");
    
        const commonUrlPart = "https://imaages-hosting-1fin.s3.ap-south-1.amazonaws.com/assets/fund-logos/";
    
        for (let i = 0; i < resp.data.length; i++) {
            const logoLink = resp.data[i].logo_link;
            const fundScore = resp.data[i].fund_score
            expect(logoLink).toContain(commonUrlPart);
            expect(typeof fundScore).toBe('string');
        }
    });   
})
