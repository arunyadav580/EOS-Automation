import { test, expect, request } from "@playwright/test";
import { configDotenv } from "dotenv";

const baseUrl = process.env.PROD_BASE_URL_WP

test.describe("Get Mutual Funds from global search", () => {

    const globalSearchFund = async (request, scheme, category) => {
        const response = await request.post(`${baseUrl}magazine/wp-json/product-scoring/v1/get-global-search-list`, {
            data: {
                "schemes": scheme,
                "investments": category
            }
        });
        const resp = await response.json();
        return resp;
    };

    test("Keep the scheme section blank and check if all the funds are getting fetched", async ({ request }) => {
        const response = await globalSearchFund(request, "", "mutual_fund");
        const { meta } = response;
        expect(meta.status).toEqual(200);
        expect(meta.message).toEqual("Success");
    });

    test("Keep the investment section blank and assert response", async ({ request }) => {
        const response = await globalSearchFund(request, "", "");
        const { meta } = response;
        expect(meta.status).not.toEqual(200);
        expect(meta.message).toEqual("Valid Investment is required");
    })

    test("Enter numeric input in scheme section blank and assert response", async ({ request }) => {
        const response = await globalSearchFund(request, "1", "");
        const { meta } = response;
        expect.soft(meta.status).toEqual(200);
    })

    test("To check if all the mutual funds are getting fetched and displayed and assert response", async ({ request }) => {
        const response = await globalSearchFund(request, "", "mutual_fund");
        const { meta } = response;
        expect(meta.status).toEqual(200);
        expect(meta.message).toEqual("Success");
        expect(response.data.length).toEqual(866);
        if (response) {
            const resp = response.data
            for (let i of resp) {
                expect(i.type).toMatch(/equity|debt|tax|hybrid/);
            }
        }
    })

    test("To check if all the health insurances are getting fetched and displayed and assert response", async ({ request }) => {
        const response = await globalSearchFund(request, "", "health_insurance");
        const { meta } = response;
        expect(meta.status).toEqual(200);
        expect(meta.message).toEqual("Success");
        expect(response.data.length).toEqual(97);
    })

    test("To check if all the term insurances are getting fetched and displayed and assert response", async ({ request }) => {
        const response = await globalSearchFund(request, "", "term_insurance");
        const { meta } = response;
        expect(meta.status).toEqual(200);
        expect(meta.message).toEqual("Success");
        expect(response.data.length).toEqual(20);
    })

    test("To check if all the credit card are getting fetched and displayed and assert response", async ({ request }) => {
        const response = await globalSearchFund(request, "", "credit_card");
        const { meta } = response;
        expect(meta.status).toEqual(200);
        expect(meta.message).toEqual("Success");
        expect(response.data.length).toEqual(198);
    })

    test("Enter a single letter in scheme section for mutual funds and assert response", async ({ request }) => {
        const response = await globalSearchFund(request, "a", "mutual_fund");
        const { meta } = response;
        expect(meta.status).toEqual(200);
        expect(meta.message).toEqual("Success");
        if (response) {
            const resp = response.data
            for (let i of resp) {
                expect(i.policy_name).toContain("a");
            }
        }
    })

    test("Enter three letters in scheme section for mutual funds and assert response", async ({ request }) => {
        const response = await globalSearchFund(request, "adi", "mutual_fund");
        const { meta } = response;
        expect(meta.status).toEqual(200);
        expect(meta.message).toEqual("Success");

        if (response) {
            const resp = response.data
            for (let i of resp) {
                expect(i.policy_name).toMatch(/Adi|adi|i/);
            }
        }
    })

    test("Enter two words of a scheme name in lowercase and uppercase combination and assert response", async ({ request }) => {
        const response = await globalSearchFund(request, "aditya Birla", "mutual_fund");
        const { meta } = response;
        expect(meta.status).toEqual(200);
        expect(meta.message).toEqual("Success");
        if (response) {
            const resp = response.data
            for (let i of resp) {
                expect(i.policy_name).toMatch(/Aditya Birla|i/);
            }
        }
    });
});

