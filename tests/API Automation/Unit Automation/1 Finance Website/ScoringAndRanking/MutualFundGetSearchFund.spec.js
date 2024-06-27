import { test, expect, request } from "@playwright/test";
import { configDotenv } from "dotenv";

const baseUrl = process.env.PROD_BASE_URL_WP;

test.describe(" Get Mutual Fund API Unit Scripts : ",async() => {

    const getSearchFund = async(request, policyName, category) => {
    
        const response = await request.post(`${baseUrl}mutual-funds/v1/get-search-fund`, {
            data: {
                term: policyName,
                category: category 
            }
        });
        const resp = await response.json()
        return resp;
    };

    test("Keep the term section blank and check if all the mutual funds are visible and assert response", async ({ request }) => {
        const response = await getSearchFund(request, "","-1")
        expect.soft(response.meta.status).toEqual(200);
        const length = response.data.length;
        expect(length).toEqual(417);
    })

    test("Keep the category section blank and check if all the mutual funds are visible and assert response", async ({ request }) => {
        const response = await getSearchFund(request, "","")
        expect.soft(response.meta.status).toEqual(200);
        const length = response.data.length;
        expect(length).toEqual(417);
    })

    test("Enter a single letter in term section for equity funds and assert response", async ({ request }) => {
        const response = await getSearchFund(request, "a","-1")
        expect.soft(response.meta.status).toEqual(200);
        if (response) {
            const resp = response.data
            for (let i of resp) {
                expect(i.title).toContain("a");
            }
        }
    })

    test("Enter three letters in term section for equity funds and assert response", async ({ request }) => {
        const response = await getSearchFund(request, "adi","-1");
        expect(response.meta.status).toEqual(200);
        expect(response.meta.message).toEqual("Success");

        if (response) {
            const resp = response.data
            for (let i of resp) {
                expect(i.title).toMatch(/Adi|adi|i/);
            }
        }
    })

    test("Enter two words of a scheme name in term section in lowercase and uppercase combination for equity and assert response", async ({ request }) => {
        const response = await getSearchFund(request, "aditya Birla","-1");
        expect(response.meta.status).toEqual(200);
        expect(response.meta.message).toEqual("Success");
        if (response) {
            const resp = response.data
            for (let i of resp) {
                expect(i.title).toMatch(/Aditya Birla|i/);
            }
        }
    });

    test("Enter a single letter in term section for debt funds and assert response", async ({ request }) => {
        const response = await getSearchFund(request, "a","debt")
        expect.soft(response.meta.status).toEqual(200);
        if (response) {
            const resp = response.data
            for (let i of resp) {
                expect(i.title).toContain("a");
            }
        }
    })

    test("Enter three letters in term section for debt funds and assert response", async ({ request }) => {
        const response = await getSearchFund(request, "adi","debt");
        expect(response.meta.status).toEqual(200);
        expect(response.meta.message).toEqual("Success");

        if (response) {
            const resp = response.data
            for (let i of resp) {
                expect(i.title).toMatch(/Adi|adi|i/);
            }
        }
    })

    test("Enter two words of a scheme name in term section in lowercase and uppercase combination for debt and assert response", async ({ request }) => {
        const response = await getSearchFund(request, "aditya Birla","debt");
        expect(response.meta.status).toEqual(200);
        expect(response.meta.message).toEqual("Success");
        if (response) {
            const resp = response.data
            for (let i of resp) {
                expect(i.title).toMatch(/Aditya Birla|i/);
            }
        }
    });

    test("Enter a single letter in term section for tax funds and assert response", async ({ request }) => {
        const response = await getSearchFund(request, "a","tax")
        expect.soft(response.meta.status).toEqual(200);
        if (response) {
            const resp = response.data
            for (let i of resp) {
                expect(i.title).toContain("a");
            }
        }
    })

    test("Enter three letters in term section for tax funds and assert response", async ({ request }) => {
        const response = await getSearchFund(request, "adi","tax");
        expect(response.meta.status).toEqual(200);
        expect(response.meta.message).toEqual("Success");

        if (response) {
            const resp = response.data
            for (let i of resp) {
                expect(i.title).toMatch(/Adi|adi|i/);
            }
        }
    })

    test("Enter two words of a scheme name in term section in lowercase and uppercase combination for tax and assert response", async ({ request }) => {
        const response = await getSearchFund(request, "aditya Birla","tax");
        expect(response.meta.status).toEqual(200);
        expect(response.meta.message).toEqual("Success");
        if (response) {
            const resp = response.data
            for (let i of resp) {
                expect(i.title).toMatch(/Aditya Birla|i/);
            }
        }
    });

    test("Enter a single letter in term section for hybrid funds and assert response", async ({ request }) => {
        const response = await getSearchFund(request, "a","hybrid")
        expect.soft(response.meta.status).toEqual(200);
        if (response) {
            const resp = response.data
            for (let i of resp) {
                expect(i.title).toContain("a");
            }
        }
    })

    test("Enter three letters in term section for hybrid funds and assert response", async ({ request }) => {
        const response = await getSearchFund(request, "adi","hybrid");
        expect(response.meta.status).toEqual(200);
        expect(response.meta.message).toEqual("Success");

        if (response) {
            const resp = response.data
            for (let i of resp) {
                expect(i.title).toMatch(/Adi|adi|i/);
            }
        }
    })

    test("Enter two words of a scheme name in term section in lowercase and uppercase combination for hybrid and assert response", async ({ request }) => {
        const response = await getSearchFund(request, "aditya Birla","hybrid");
        expect(response.meta.status).toEqual(200);
        expect(response.meta.message).toEqual("Success");
        if (response) {
            const resp = response.data
            for (let i of resp) {
                expect(i.title).toMatch(/Aditya Birla|i/);
            }
        }
    });

})