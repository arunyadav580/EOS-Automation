import { test, request, expect } from '@playwright/test';
const dotenv = require('dotenv');
const baseUrl = process.env.QA_BASE_URL_TAX;

const token = "eyJhbGciOiJSUzI1NiIsImtpZCI6IjQzMTgzRkU1Q0Y5RTMyNUY1OUQzMDQ4RUZGMkVFNkUyIiwidHlwIjoiYXQrand0In0.eyJuYmYiOjE3MDYxNjc4ODcsImV4cCI6MTcwNjE3MTQ4NywiaXNzIjoiaHR0cHM6Ly9uZXdxYS5hY2NvdW50Lm9uZWZpbi5hcHAiLCJjbGllbnRfaWQiOiJDdXN0b21lckFwcExvZ2luQ2xpZW50Q3JlZGVudGlhbHMiLCJzdWIiOiI3NWJhNDc2ZS03Mjc3LTRjMjItYWU4Yy1lZWYxNWYyODE2ZDUiLCJhdXRoX3RpbWUiOjE3MDYxNjc4ODcsImlkcCI6ImxvY2FsIiwiaWF0IjoxNzA2MTY3ODg3LCJzY29wZSI6WyJjdXN0b21lci1sb2dpbiJdLCJhbXIiOlsicHdkIl19.S3a3SxQbEiavUXFYJw4V8xnhNEogQOsh8x_OkBqcIOQ2M2LuEUwptRzn3D1JOuh8yDJXcEEDO6ciDwR5dA3y9yjFAy2kJtAp3R9oxoiTaWna46B5MCNJ05YahNDySYqr5XDPz7NTiJqonns3NkGfiyk3gDn7TjGzfOJHEfwEG9aw5XQA1L8h1kyACgYQb5eZZRvW4BZrfdK-YfAl3sxLCkveTRO0VpclXV_W7Ho7WndMZA2JN0cBwNeuQuxG1a8NAbSuyUgbNO3wu6FWNjPtHFZkWOs9noS-ehUsdwCiLHBDboUNGBZ_5JlhXnXlhBsIRBtD_TY6ndJociTwylbW5A";

const personalDetail = async (request, token, customerCode, firstName, middleName, lastName, dateOfBirth, gender, maritalStatus, fatherName, aadhaarType, aadhaarNo, panNo, mobNo, email, secondMobNo, secondEmail , stdCode, landlineNo, address, floorBuilding, premiseNo, roadStreet, area, city, state, country, residentialStatus, bankId, bankName, ifsc, accountType, bankNo, confirmBankNo) => {

    const response = await request.post(`${baseUrl}itr-filing/add_personal_details`, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        data: {
            customer_code : customerCode,
            basic_details : {
                first_name: firstName,
                middle_name: middleName,
                last_name: lastName,
                dob: dateOfBirth,
                gender: gender,
                marital_status: maritalStatus,
                fathers_name: fatherName
            },
            id_contact_details: {
                aadhar_type : aadhaarType,
                aadhar_no:  aadhaarNo,
                pan_no : panNo,
                mob_no : mobNo,
                email : email,
                second_mob_no : secondMobNo,
                second_email : secondEmail,
                std_code : stdCode,
                landline_no : landlineNo
            },
            address: {
                pincode : address,
                floor_building : floorBuilding,
                premise_name : premiseNo,
                road_street : roadStreet,
                area : area,
                city : city,
                state : state,
                country : country,
                residential_status : residentialStatus
            },
            bank_details: [
                {
                    bank_id : bankId,
                    is_default : true,
                    bank_name : bankName,
                    ifsc : ifsc,
                    account_type : accountType,
                    bank_acc_no : bankNo,
                    confirm_bank_acc_no : confirmBankNo
                }
            ]
        }
    });

    return response;
}

test.describe("Personal Detail", async () => {

    test("Enter invalid token and assert response", async ({ request }) => {
        debugger;
        const response = await personalDetail(request, "eyJhbGciOiJSUzI1NiIsImtpZCI6IjQzMTgzRkU1Q0Y5RTMyNUY1OUQzMDQ4RUZGMkVFNkUyIiwidHlwIjoiYXQrand0In0.eyJuYmYiOjE3MDYwODExNzUsImV4cCI6MTcwNjE2NzU3NSwiaXNzIjoiaHR0cHM6Ly9uZXdxYS5hY2NvdW50Lm9uZWZpbi5hcHAiLCJjbGllbnRfaWQiOiJDdXN0b21lckFwcENsaWVudENyZWRlbnRpYWxzIiwic3ViIjoiNzViYTQ3NmUtNzI3Ny00YzIyLWFlOGMtZWVmMTVmMjgxNmQ1IiwiYXV0aF90aW1lIjoxNzA2MDgxMTc1LCJpZHAiOiJsb2NhbCIsImlhdCI6MTcwNjA4MTE3NSwic2NvcGUiOlsiY3VzdG9tZXItbG9naW4iLCJjdXN0b21lci1yZWdpc3RyYXRpb24iLCJtb25leS1zaWduIiwib2ZmbGluZV9hY2Nlc3MiXSwiYW1yIjpbInB3ZCJdfQ.LAr94hsWTDX_uSQoa7h0b4FQS7UjU3S0i83OVRFUX-sgHJZWZyWFR61FUMj_hi3Wg-fsbc-U512cUhvLQPR9P4nEO_3UduzlTRvonrGX_6ms7sjNceYeecQPtqWdWa3s2zSMT8dsMJDTEaAFN76hM5eymfWlSj-gXybryUNyRN_X9svX4dhRTY9agWRVMAaf9_58R9kJ6NtXPddPSVNadjcU5PSpP3Cv568z4vfR6VX0aDjwMa6I_rk2jAOdYyrTtIDfeVi-rY_OiCW0UYvI9Ud4-woYq4hdGfUFYe1HsoTxR0C8kdIySWVvgepZB5QYlxCF3BwZxUJqvJdoig", 'e008fd6d-f54b-453e-8b9d-b1f4b28a133a');

        expect(response.status()).toEqual(401);
        const resp = await response.json();
        expect(resp.detail).toContain("Invalid token");
    });

    test("Enter invalid customer code and assert response", async ({ request }) => {
        const response = await personalDetail(request, token, 'e008fd6d-f54b-453e-8b9d-b1f4b28a133a');
        expect(response.status()).toEqual(422);
    });

    test.only("Enter invalid first name and assert response", async ({ request }) => {
        const response = await personalDetail(request, token, 'e008fd6d-f54b-453e-8b9d-b1f4b28a133a', "12345");
        const resp = await response.json();
        expect(response.status()).toEqual(422);
        expect(resp).toHaveProperty("detail");
        const msg = resp.detail[0].msg
        expect(msg).toEqual('Value error, Enter valid name')
    });

    test("Enter invalid middle name and assert response", async ({ request }) => {
        const response = await personalDetail(request, token, 'e008fd6d-f54b-453e-8b9d-b1f4b28a133a', "Runali", "12345");
        const resp = await response.json();
        // console.log(resp)
        expect(response.status()).toEqual(422);
        expect(resp).toHaveProperty("detail");

        if (resp.detail[0].input === '12345') {
            expect(resp.detail[0].msg).toEqual('Value error, Enter valid name')
        }
    });

    test("Enter invalid last name and assert response", async ({ request }) => {
        const response = await personalDetail(request, token, 'e008fd6d-f54b-453e-8b9d-b1f4b28a133a', "Runali", "Ashok", "12345");
        const resp = await response.json();
        expect(response.status()).toEqual(422);
        expect(resp).toHaveProperty("detail");

        if (resp.detail[0].input === '12345') {
            expect(resp.detail[0].msg).toEqual('Value error, Enter valid name')
        }
    });

    test("Enter invalid Date of Birth and assert response", async ({ request }) => {
        const dob = "17th March 1998"
        const response = await personalDetail(request, token, 'e008fd6d-f54b-453e-8b9d-b1f4b28a133a', "Runali", "Ashok", "Painaik", dob);
        const resp = await response.json();
        expect(response.status()).toEqual(422);
        expect(resp).toHaveProperty("detail");

        if (resp.detail[0].input === dob) {
            expect(resp.detail[0].msg).toEqual("Value error, time data '17th March 1998' does not match format '%Y-%m-%d'")
        }
    });

    test("Enter invalid gender and assert response", async ({ request }) => {
        const gender = 12345;
        const response = await personalDetail(request, token, 'e008fd6d-f54b-453e-8b9d-b1f4b28a133a', "Runali", "Ashok", "Painaik", '1998-03-17', gender);
        const resp = await response.json();
        console.log(resp)
        expect(response.status()).toEqual(422);
        expect(resp).toHaveProperty("detail");

        if (resp.detail[0].input === gender) {
            expect(resp.detail[0].msg).toEqual("Input should be a valid string")
        }

    });

    test("Enter invalid marital status and assert response", async ({ request }) => {
        const maritalStatus = 12345;
        const response = await personalDetail(request, token, 'e008fd6d-f54b-453e-8b9d-b1f4b28a133a', "Runali", "Ashok", "Painaik", '1998-03-17', "trans", maritalStatus);
        const resp = await response.json();
        console.log(resp)
        expect(response.status()).toEqual(422);
        expect(resp).toHaveProperty("detail");

        if (resp.detail[0].input === maritalStatus) {
            expect(resp.detail[0].msg).toEqual("Input should be a valid string")
        }
    });

    test("Enter invalid father name status and assert response", async ({ request }) => {
        const fatherName = 12345;
        const response = await personalDetail(request, token, 'e008fd6d-f54b-453e-8b9d-b1f4b28a133a', "Runali", "Ashok", "Painaik", '1998-03-17', "trans", "Unmarried", fatherName);
        const resp = await response.json();
        console.log(resp)
        expect(response.status()).toEqual(422);
        expect(resp).toHaveProperty("detail");

        if (resp.detail[0].input === fatherName) {
            expect(resp.detail[0].msg).toEqual("Input should be a valid string")
        }
    });

    test("Enter string 12 digit number for aadhar type Aadhar numberand assert response", async ({ request }) => {
        const aadhaarType = "Aadhaar number"
        const aadhaarNo = 10202
        const response = await personalDetail(request, token, 'e008fd6d-f54b-453e-8b9d-b1f4b28a133a', "Runali", "Ashok", "Painaik", '1998-03-17', "trans", "Unmarried", "Ashok", aadhaarType, aadhaarNo);
        const resp = await response.json();
        expect(response.status()).toEqual(422);
        expect(resp).toHaveProperty("detail");

        if (resp.detail[0].input === aadhaarNo) {
            expect(resp.detail[0].msg).toEqual("Input should be a valid string")
        }
    });

    test("Enter less than 12 digit number for aadhar type Aadhar numberand assert response", async ({ request }) => {
        const aadhaarType = "Aadhaar number"
        const aadhaarNo = "538735542"
        const response = await personalDetail(request, token, 'e008fd6d-f54b-453e-8b9d-b1f4b28a133a', "Runali", "Ashok", "Painaik", '1998-03-17', "trans", "Unmarried", "Ashok", aadhaarType, aadhaarNo);
        const resp = await response.json();
        expect(response.status()).toEqual(422);
        expect(resp).toHaveProperty("detail");

        if (resp.detail[0].input === aadhaarNo) {
            expect(resp.detail[0].msg).toEqual("Value error, Aadhar No Invalid.")
        }
    });

    test("Enter 12 digit number for aadhar type Aadhar enrollment number and assert response", async ({ request }) => {
        const aadhaarNo = "538735542970"
        const response = await personalDetail(request, token, 'e008fd6d-f54b-453e-8b9d-b1f4b28a133a', "Runali", "Ashok", "Painaik", '1998-03-17', "trans", "Unmarried", "Ashok", "Aadhaar number", aadhaarNo);
        const resp = await response.json();
        expect(response.status()).toEqual(201);
        expect(resp).toHaveProperty("detail");
    });

    test("Enter string number for aadhar type Aadhar numberand assert response", async ({ request }) => {
        const aadhaarType = "Aadhaar enrollment no."
        const aadhaarNo = "23453"
        const response = await personalDetail(request, token, 'e008fd6d-f54b-453e-8b9d-b1f4b28a133a', "Runali", "Ashok", "Painaik", '1998-03-17', "trans", "Unmarried", "Ashok", aadhaarType, aadhaarNo);
        const resp = await response.json();
        expect(response.status()).toEqual(422);
        expect(resp).toHaveProperty("detail");

        if (resp.detail[0].input === aadhaarNo) {
            expect(resp.detail[0].msg).toEqual("Value error, Aadhar Enrollment NO Invalid.")
        }
    });

    test("Enter less than 28 digit number for aadhar type Aadhar enrollment number and assert response", async ({ request }) => {
        const aadhaarType = "Aadhaar enrollment no."
        const aadhaarNo = "538735542"
        const response = await personalDetail(request, token, 'e008fd6d-f54b-453e-8b9d-b1f4b28a133a', "Runali", "Ashok", "Painaik", '1998-03-17', "trans", "Unmarried", "Ashok", aadhaarType, aadhaarNo);
        const resp = await response.json();
        expect(response.status()).toEqual(422);
        expect(resp).toHaveProperty("detail");

        if (resp.detail[0].input === aadhaarNo) {
            expect(resp.detail[0].msg).toEqual("Value error, Aadhar Enrollment NO Invalid.")
        }
    });

    test("Enter alphabetical input Aadhar enrollment number and assert response", async ({ request }) => {
        const aadhaarType = "Aadhaar enrollment no."
        const aadhaarNo = "erirfd"
        const response = await personalDetail(request, token, 'e008fd6d-f54b-453e-8b9d-b1f4b28a133a', "Runali", "Ashok", "Painaik", '1998-03-17', "trans", "Unmarried", "Ashok", aadhaarType, aadhaarNo);
        const resp = await response.json();
        expect(response.status()).toEqual(422);
        expect(resp).toHaveProperty("detail");

        if (resp.detail[0].input === aadhaarNo) {
            expect(resp.detail[0].msg).toEqual("Value error, Aadhar Enrollment NO Invalid.")
        }
    });

    test("Enter 28 digit number for aadhar type Aadhar enrollment number and assert response", async ({ request }) => {
        const aadhaarType = "Aadhaar enrollment no.";
        const aadhaarNo = "5387355429705387355429703333";
        const response = await personalDetail(request, token, 'e008fd6d-f54b-453e-8b9d-b1f4b28a133a', "Runali", "Ashok", "Painaik", '1998-03-17', "trans", "Unmarried", "Ashok", aadhaarType, aadhaarNo);

        expect(response.status()).toEqual(201);
        const resp = await response.json();
        expect(resp).toHaveProperty("detail");
    });

})