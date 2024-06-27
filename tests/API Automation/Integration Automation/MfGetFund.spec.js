import { test, expect } from '@playwright/test';
const baseUrl = process.env.PROD_BASE_URL_WP;

const getCategories = async (request, slug, fundType) => {
    const queryParams = fundType ? `?type=${fundType}` : '';
    const response = await request.get(`${baseUrl}${slug}${queryParams}`);
    const resp = await response.json()
    return resp

}

const allFund = async (request, category, pageNo, length, fundType, slug) => {
    debugger;
    const queryParams = fundType ? `?type=${fundType}` : '';
    const response = await request.post(`${baseUrl}${slug}${queryParams}`, {
        data: {
            "category": category,
            "page_no": pageNo,
            "length": length
        }
    });
    const resp = await response.json();
    return resp;
};

test.describe("Get all the categories for all funds and hit detail API using those categories", async () => {

    const categoryArray = [];
    const debtCategoryArray = [];
    const hybridCategoryArray = [];

    test("Get all the categories of Equity funds and assert response", async ({ request }) => {
        const response = await getCategories(request, "mutual-funds/v1/get-fund-categories", "equity");
        for (let i = 0; i < response.data.length; i++) {
            categoryArray.push(response.data[i].text)
        }
    });

    test("Check if the Equity funds are getting displayed for each category and assert response", async ({ request }) => {
        debugger;
        if (categoryArray) {
            const array = categoryArray;
            for (const eachCategory of array) {
                if (eachCategory !== 'All') {
                    const resp = await allFund(request, eachCategory, "1", 417, "equity", "mutual-funds/v1/get-all-funds");

                    expect(resp.meta.status).toEqual(200);
                    expect(resp.meta.message).toEqual("Success");

                    const length = resp.data.length;

                    for (let i = 0; i < length; i++) {
                        const fundType = resp.data[i].category;
                        switch (fundType) {
                            case "Thematic Fund":
                                expect(length).toEqual(59);
                                break;
                            case "Small Cap Fund":
                                expect(length).toEqual(24);
                                break;
                            case "Sector Funds":
                                expect(length).toEqual(64);
                                break;
                            case "Multi Cap Fund":
                                expect(length).toEqual(15);
                                break;
                            case "Mid Cap Fund":
                                expect(length).toEqual(28);
                                break;
                            case "Largecap Index Fund":
                                expect(length).toEqual(48);
                                break;
                            case "Large Cap Fund":
                                expect(length).toEqual(29);
                                break;
                            case "Flexi Cap Fund":
                                expect(length).toEqual(31);
                                break;
                            case "Equity Linked Savings Scheme":
                                expect(length).toEqual(38);
                                break;
                            case "Dividend Yield":
                                expect(length).toEqual(8);
                                break;
                            case "Contra/Value Fund":
                                expect(length).toEqual(22);
                                break;
                            case "Focused Fund":
                                expect(length).toEqual(25);
                                break;
                            case "Index Funds":
                                expect(length).toEqual(1);
                                break;
                            default:
                                break;
                        }
                    }
                }
            }
        }
    });

    test("Get all the categories of Debt funds and assert response", async ({ request }) => {
        const response = await getCategories(request, "mutual-funds/v1/get-fund-categories", "debt");
        for (let i = 0; i < response.data.length; i++) {
            debtCategoryArray.push(response.data[i].text)
        }
    });

    test("Check if the Debt funds are getting displayed for each category and assert response", async ({ request }) => {
        if (debtCategoryArray) {
            const array = debtCategoryArray;
            for (const eachCategory of array) {
                if (eachCategory !== "All") {
                    const resp = await allFund(request, eachCategory, "1", 302, "debt", "mutual-funds/v1/get-all-funds");
                    expect(resp.meta.status).toEqual(200);
                    expect(resp.meta.message).toEqual("Success");

                    const length = resp.data.length;

                    for (let i = 0; i < length; i++) {
                        debugger;
                        const fundType = resp.data[i].category;

                        switch (fundType) {
                            case "Banking and PSU Fund":
                                expect.soft(length).toEqual(23);
                                break;
                            case "Corporate Bond Fund":
                                expect.soft(length).toEqual(37);
                                break;
                            case "Credit Risk Fund":
                                expect(length).toEqual(14);
                                break;
                            case "Dynamic Bond Fund":
                                expect.soft(length).toEqual(22);
                                break;
                            case "Floating Rate Fund":
                                expect.soft(length).toEqual(12);
                                break;
                            case "Glit Fund":
                                expect(length).toEqual(6);
                                break;
                            case "Liquid Fund":
                                expect.soft(length).toEqual(35);
                                break;
                            case "Long Duration Fund":
                                expect.soft(length).toEqual(4);
                                break;
                            case "Low Duration Fund":
                                expect.soft(length).toEqual(21);
                                break;
                            case "Medium Duration Fund":
                                expect.soft(length).toEqual(15);
                                break;
                            case "Medium to Long Duration Fund":
                                expect(length).toEqual(12);
                                break;
                            case "Money Market Fund":
                                expect(length).toEqual(22);
                                break;
                            case "Overnight Fund":
                                expect.soft(length).toEqual(32);
                                break;
                            case "Short Duration Fund":
                                expect.soft(length).toEqual(24);
                                break;
                            case "Ultra Short Duration Fund":
                                expect(length).toEqual(23);
                                break;
                            default:
                                break;
                        }

                    }


                }
            }
        }
    });

    test("Get all the categories of Hybrid funds and assert response", async ({ request }) => {
        const response = await getCategories(request, "mutual-funds/v1/get-fund-categories", "hybrid");
        for (let i = 0; i < response.data.length; i++) {
            hybridCategoryArray.push(response.data[i].text)
        }
    });

    test("Check if the Hybrid funds are getting displayed for each category and assert response", async ({ request }) => {
        if (hybridCategoryArray) {
            const array = hybridCategoryArray;
            for (const eachCategory of array) {
                if (eachCategory !== "All") {
                    const resp = await allFund(request, eachCategory, "1", 147, "hybrid", "mutual-funds/v1/get-all-funds");

                    expect(resp.meta.status).toEqual(200);
                    expect(resp.meta.message).toEqual("Success");

                    const length = resp.data.length;

                    for (let i = 0; i < length; i++) {
                        debugger;
                        const fundType = resp.data[i].category;
                        switch (fundType) {
                            case "Aggressive Hybrid Fund":
                                expect.soft(length).toEqual(30);
                                break;
                            case "Arbitrage Fund":
                                expect.soft(length).toEqual(28);
                                break;
                            case "Balanced Advantage/Dynamic Asset Allocation Fund":
                                expect.soft(length).toEqual(30);
                                break;
                            case "Conservative Hybrid Fund":
                                expect.soft(length).toEqual(21);
                                break;
                            case "Equity Savings Fund":
                                expect.soft(length).toEqual(22);
                                break;
                            case "Multi Asset Allocation Fund":
                                expect.soft(length).toEqual(16);
                                break;
                            default:
                                break;
                        }
                    }
                }
            }
        }
    });
})

