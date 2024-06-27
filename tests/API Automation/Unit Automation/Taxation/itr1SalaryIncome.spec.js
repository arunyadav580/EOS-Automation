import { test, request, expect } from '@playwright/test';
const dotenv = require('dotenv');
const baseUrl = process.env.QA_BASE_URL_TAX;

const token = "eyJhbGciOiJSUzI1NiIsImtpZCI6IjQzMTgzRkU1Q0Y5RTMyNUY1OUQzMDQ4RUZGMkVFNkUyIiwidHlwIjoiYXQrand0In0.eyJuYmYiOjE3MDY2NzYxMjEsImV4cCI6MTcwNjc2MjUyMSwiaXNzIjoiaHR0cHM6Ly9uZXdxYS5hY2NvdW50Lm9uZWZpbi5hcHAiLCJjbGllbnRfaWQiOiJDdXN0b21lckFwcENsaWVudENyZWRlbnRpYWxzIiwic3ViIjoiMDMyNzUzMWMtM2EwYS00MDU4LWI4ZDMtYmRkMmM2Zjk5MzJiIiwiYXV0aF90aW1lIjoxNzA2Njc2MTIxLCJpZHAiOiJsb2NhbCIsImlhdCI6MTcwNjY3NjEyMSwic2NvcGUiOlsiY3VzdG9tZXItbG9naW4iLCJjdXN0b21lci1yZWdpc3RyYXRpb24iLCJtb25leS1zaWduIiwib2ZmbGluZV9hY2Nlc3MiXSwiYW1yIjpbInB3ZCJdfQ.S0WYPvYx9EFoLGnV2xnOL9apLifMDNDWdGFqS0h8pTJqn8mil-zin-IcQOHsrFOj0vYaAw6nY29myhwr1F_8gwFftPoxqFYv0DeOFlY_pjOCEQ0uqdJE-Sy-1P4YbYjTMPux1wo5mjWORofLPhbufglN9VB9Jb0j8PKlsFwkZEIkcMt8-Kc8n_9ng_H6xXwLFNvzdFcwRLHZxy1mhi0VbSYkp1TRf2fGhWE9oP7y84SGIv1HpCVOhHgZ8x_wH8reCuugSPk2a9MMSiF4rE3mz9O7ZLZp_n-AsKdr7Nek9yZOL97gXkbxIQOgfJY9POXxQsGpAJ8p2eCgtTyvnLq30w";
const customerCode = "8cb54f31-5e2f-4ea4-ab8b-914459665e73";
const itrSalaryIncome = async(request, token, customerCode, employerName, employerCategory, totalTaxDeduction, employerTan)=>{
    const response = await request.post(`${baseUrl}itr-filing/add_salary_income`, 
    {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },

        data : {
            customer_code: customerCode,
            employer_name: employerName,
            employer_category: employerCategory,
            total_tax_deducted_at_source: totalTaxDeduction,
            employer_tan: employerTan,
            employer_address: "",
            employer_pincode: "",
            employer_city: "",
            employer_state: "",
            total_gross_salary: 0,
            salarysection17_1_type: "Total_amount",
            salarysection17_1: [
              {
                basic_pay: 0,
                house_rent_allowance: 0,
                lta_allowance: 0,
                add_items: [
                  {
                    typeOfAllowItem: "",
                    allowAmt: 0,
                    otherSction: ""
                  }
                ]
              }
            ],
            total_salarysection17_1: 0,
            salarysection17_2_type: "Total_amount",
            salarysection17_2: [
              {
                typeOfAllowItem172: "",
                allowAmt172: 0,
                otherSction172: ""
              }
            ],
            total_salarysection17_2: 0,
            salarysection17_3_type: "Total_amount",
            salarysection17_3: [
              {
                typeOfAllowItem173: "",
                allowAmt173: 0,
                otherSction173: ""
              }
            ],
            total_salarysection17_3: 0,
            income_under_sec_89a_notified_country: [
              {
                typeOfAllowItem89A: "",
                allowAmt89A: 0
              }
            ],
            total_income_under_sec_89a_notified_country: 0,
            income_taxable_relief_u_s_89a: 0,
            income_under_sec_89a_other_than_notified_country: 0,
            exemption_allowance_under_sec_10_type: "Total_amount",
            exemption_allowance_under_sec_10: [
              {
                house_rent_allowance: 0,
                lta_allowance: 0,
                add_items: [
                  {
                    typeOfAllowItem10: "",
                    allowAmt10: 0,
                    otherSction10: ""
                  }
                ]
              }
            ],
            total_exemption_allowance_under_sec_10: 0,
            balance: 0,
            deductions_and_relief: 0,
            standard_deduction_16_ia: 0,
            professional_tax_16_iii: 0,
            entertainment_allowance_under_sec16_ii: 0,
            relief_4b_under_sec_89: 0,
            relief_income_claimed_sec_89: 0,
            income_chargeable_under_the_head_salaries: 0
          }
    })
    return response;
}

test.describe('ITR 1 Salary Income', async() => {
    test("Enter in-valid token", async({request}) => {
        const response = await itrSalaryIncome(request,"eyJhbGciOiJSUzI1NiIsImtpZCI6IjQzMTgzRkU1Q0Y5RTMyNUY1OUQzMDQ4RUZGMkVFNkUyIiwidHlwIjoiYXQrand0In0.eyJuYmYiOjE3MDY2NzYxMjEsImV4cCI6MTcwNjc2MjUyMSwiaXNzIjoiaHR0cHM6Ly9uZXdxYS5hY2NvdW50Lm9uZWZpbi5hcHAiLCJjbGllbnRfaWQiOiJDdXN0b21lckFwcENsaWVudENyZWRlbnRpYWxzIiwic3ViIjoiMDMyNzUzMWMtM2EwYS00MDU4LWI4ZDMtYmRkMmM2Zjk5MzJiIiwiYXV0aF90aW1lIjoxNzA2Njc2MTIxLCJpZHAiOiJsb2NhbCIsImlhdCI6MTcwNjY3NjEyMSwic2NvcGUiOlsiY3VzdG9tZXItbG9naW4iLCJjdXN0b21lci1yZWdpc3RyYXRpb24iLCJtb25leS1zaWduIiwib2ZmbGluZV9hY2Nlc3MiXSwiYW1yIjpbInB3ZCJdfQ.S0WYPvYx9EFoLGnV2xnOL9apLifMDNDWdGFqS0h8pTJqn8mil-zin-IcQOHsrFOj0vYaAw6nY29myhwr1F_8gwFftPoxqFYv0DeOFlY_pjOCEQ0uqdJE-Sy-1P4YbYjTMPux1wo5mjWORofLPhbufglN9V","8cb54f31-5e2f-4ea4-ab8b-9144595e73");
        expect(response.status()).toEqual(401);
        const resp = await response.json()
        expect(resp.detail).toEqual("Invalid token");
    })

    test("Enter in-valid customer code", async({request}) => {
        const response = await itrSalaryIncome(request,token, "8cb54f31-5e2f-4ea4-ab8b-9e73");
        console.log(await response.json());
    })

    test("Enter Null value in employeer name section", async({request}) => {

        debugger;
        const response = await itrSalaryIncome(request,token, customerCode, null);
        expect(response.status()).toEqual(422);

        const resp = await response.json();

        const input = resp.detail[0].input
        const msg = resp.detail[0].msg
        
        if(input == null){
            expect(msg).toEqual("Input should be a valid string");
        }
    })

    test("Enter invalid employer category name", async({request}) => {

        const response = await itrSalaryIncome(request,token, customerCode, "Runali", "Public Sector");
        expect(response.status()).toEqual(422);

        console.log(await response.json());
    })

    test("Enter invalid total TDS and assert response", async({request}) => {
        const response = await itrSalaryIncome(request,token, customerCode, "Runali", "Public Sector", null);
        expect(response.status()).toEqual(422);
        const resp = await response.json();
        const input = resp.detail[0].input
        if(input == null){
            expect (resp.detail[0].msg).toEqual("Input should be a valid integer");
        }
    })

    test("Enter alphabetical input in total TDS and assert response", async({request}) => {
        const response = await itrSalaryIncome(request,token, customerCode, "Runali", "Public Sector", "ABC");
        expect(response.status()).toEqual(422);
        const resp = await response.json();
        const input = resp.detail[0].input
        if(input == "ABC"){
            expect (resp.detail[0].msg).toEqual("Input should be a valid integer, unable to parse string as an integer");
        }
    })

    test("Enter Special character in total TDS and assert response", async({request}) => {
        const response = await itrSalaryIncome(request,token, customerCode, "Runali", "Public Sector", "$%");
        expect(response.status()).toEqual(422);
        const resp = await response.json();
        const input = resp.detail[0].input
        if(input == "$%"){
            expect (resp.detail[0].msg).toEqual("Input should be a valid integer, unable to parse string as an integer");
        }
    })

    test("Enter invalid TAN and assert response", async({request})=>{
        const response = await itrSalaryIncome(request, token, customerCode, "Runali", "Public Sector", "2000", "BHQPC5813B");
        expect(response.status()).toEqual(422);
    })


    test("Enter valid customer code", async({request}) => {
        const response = await itrSalaryIncome(request,token, customerCode);
        console.log(await response.json());
    })
})