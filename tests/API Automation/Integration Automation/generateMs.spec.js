import { test } from '@playwright/test';
import dotenv from 'dotenv';
import csvToJson from 'C:/Users/ADMIN/Playwright/XlToJS/csvToJsonRunali.js';

// const { csvToJson } = require('C:/Users/ADMIN/Playwright/XlToJS/csvToJsonRunali.js');

dotenv.config();

const csvFilePath = 'C:/Users/ADMIN/Playwright/XlToJs/runali.csv';

const { ansObj, userIds } = csvToJson(csvFilePath);

const ansObject = ansObj
// console.log(ansObj)

const baseUrl = process.env.QA_BASE_URL_CUSTOMER_APP;
const baseUrlMoneysign = process.env.QA_BASE_URL_MS_APP;
const baseUrlNode = process.env.QA_BASE_URL_CUSTOMER_APP_NODE;
const baseUrlMoneysignNode = process.env.QA_BASE_URL_MS_APP_NODE;

const mobileNumber = "2000000000";
const otpNumber = "9999";

let dotNetApiResponse = [];
let nodeApiResponse = []

const requestOtp = async (request, mobileNumber, url) => {
    const response = await request.post(`${url}api/v2/onboarding/request-for-otp`,
        {
            data: {
                mobile_number: mobileNumber,
                otp_autoread_string: "string",
                app_version: "string",
                device_platform: "string",
                device_model: "string"
            }
        });

    console.log("Request OTP -->", await response.status())
    return response
}

const validateOtp = async (request, mobileNumber, otpNumber, url) => {
    const response = await request.post(`${url}api/v2/onboarding/validate-otp`,
        {
            data: {
                mobile_number: mobileNumber,
                otp: otpNumber,
                customer_app_instance_id: "e3502231-e199-4f39-ac31-7417e173eddc",
                app_version: "0.2.5-qa + 51",
                device_platform: "android",
                device_model: "OnePlus CPH2447",
                notification_token: "null",
                whatsapp_enabled: true
            }
        });

    console.log("validate OTP -->", await response.status())
    return response
}

const onboardUser = async (request, mobileNumber, tempCode, url) => {
    const response = await request.post(`${url}api/v2/onboarding/onboard-customer`,
        {
            data: {
                first_name: "Runali",
                last_name: "Painaik",
                mobile_number: mobileNumber,
                temp_code: tempCode,
                customer_app_instance_id: "e3502231-e199-4f39-ac31-7417e173eddc",
                app_version: "0.2.5-qa + 51",
                device_platform: "android",
                device_model: "OnePlus CPH2447",
                notification_token: "null"
            }
        });
    console.log("Onboard User -->", await response.status())
    return response

}

const addResponse = async (request, accessToken, userCode, ansObject, url) => {

    console.log(ansObject)
    const response = await request.post(`${url}api/user/money-sign/add-response`, {
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
        },
        data: {
            "userCode": userCode,
            "answers": ansObject
        }
    });
    console.log("Add Response -->", await response.status())
    return response
}

const generateMs = async (request, accessToken, url) => {
    const response = await request.post(`${url}api/user/money-sign/generate`,
        {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
        })
    console.log("generate MS -->", await response.status())
    return response
}

const deleteUser = async (request, accessToken, url) => {
    const response = await request.delete(`${url}api/customer/delete-customer-data`, {
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
        },
    });
    const d = await response.status();
    console.log("delete User -->", await response.json());
    return response;
}

function compareResponses(response1, response2) {
    const mismatches = [];

    if (response1.length !== response2.length) {
        console.log('Responses have different lengths');
        return false;
    }

    for (let i = 0; i < response1.length; i++) {
        if (response1[i].moneySign !== response2[i].moneySign) {
            const msNotEqual = response1[i].moneySign
            const userId = response1[i].userCode
            const oldUser = response1[i].oldUserCode
            mismatches.push({ msNotEqual, userId, oldUser });
        }
    }
    return mismatches
}

test.describe('Compare MoneySigns on Old vs New APIs', async () => {

    test("Dotnet API response -->", async ({ request }) => {

        let valOtp;
        let otp;
        let tempCode;

        const chunkSize = 25;
        const userObjects = ansObject.length / chunkSize

        for (let i = 0; i < userObjects; i++) {

            const start = chunkSize * i;
            const end = (start + chunkSize);
            const chunk = ansObject.slice(start, end);

            await requestOtp(request, mobileNumber, baseUrl)
            await new Promise(resolve => setTimeout(resolve, 1000));

            valOtp = await validateOtp(request, mobileNumber, otpNumber, baseUrl)
            await new Promise(resolve => setTimeout(resolve, 1000));

            otp = await valOtp.json()
            tempCode = otp.data.temp_code


            if (await otp.data.customer_found) {

                await deleteUser(request, otp.data.access_token, baseUrl)
                await new Promise(resolve => setTimeout(resolve, 5000));

                await requestOtp(request, mobileNumber, baseUrl)
                await new Promise(resolve => setTimeout(resolve, 1000));

                valOtp = await validateOtp(request, mobileNumber, otpNumber, baseUrl)
                await new Promise(resolve => setTimeout(resolve, 1000));

                otp = await valOtp.json()
                tempCode = otp.data.temp_code
            }

            const userOnboard = await onboardUser(request, mobileNumber, tempCode, baseUrl)
            await new Promise(resolve => setTimeout(resolve, 2000));

            const onboard = await userOnboard.json();
            // console.log(onboard)
            const accessToken = onboard.data.access_token
            const userId = onboard.data.user_id

            console.log(chunk)

            await addResponse(request, accessToken, userId, chunk, baseUrlMoneysign)

            await new Promise(resolve => setTimeout(resolve, 4000));


            const generateMoneySign = await generateMs(request, accessToken, baseUrlMoneysign)
            await new Promise(resolve => setTimeout(resolve, 5000));

            const mS = await generateMoneySign.json();

            dotNetApiResponse.push({ id: i, moneySign: mS.data.moneysign, userCode: userId, oldUserCode: userIds[i] });

            await deleteUser(request, accessToken, baseUrl)
            await new Promise(resolve => setTimeout(resolve, 5000));
        }
        // console.log(dotNetApiResponse)
    });

    test("Node API response -->", async ({ request }) => {

        let valOtp;
        let otp;
        let tempCode;

        const chunkSize = 25;
        const userObjects = ansObject.length / chunkSize

        for (let i = 0; i < userObjects; i++) {

            const start = chunkSize * i;
            const end = (start + chunkSize);
            const chunk = ansObject.slice(start, end);

            await requestOtp(request, mobileNumber, baseUrlNode)
            await new Promise(resolve => setTimeout(resolve, 1000));

           valOtp = await validateOtp(request, mobileNumber, otpNumber, baseUrlNode)
            await new Promise(resolve => setTimeout(resolve, 1000));

            otp = await valOtp.json()
            tempCode = otp.data.temp_code

            if (await otp.data.customer_found) {

                await deleteUser(request, otp.data.access_token, baseUrl)
                await new Promise(resolve => setTimeout(resolve, 5000));

                await requestOtp(request, mobileNumber, baseUrl)
                await new Promise(resolve => setTimeout(resolve, 1000));

                valOtp = await validateOtp(request, mobileNumber, otpNumber, baseUrl)
                await new Promise(resolve => setTimeout(resolve, 1000));

                otp = await valOtp.json()
                tempCode = otp.data.temp_code
            }

            const userOnboard = await onboardUser(request, mobileNumber, tempCode, baseUrlNode)
            await new Promise(resolve => setTimeout(resolve, 2000));

            const onboard = await userOnboard.json();
            // console.log(onboard)
            const accessToken = onboard.data.access_token
            const userId = onboard.data.user_id

            await addResponse(request, accessToken, userId, chunk, baseUrlMoneysignNode)
            await new Promise(resolve => setTimeout(resolve, 2000));

            const generateMoneySign = await generateMs(request, accessToken, baseUrlMoneysignNode)
            await new Promise(resolve => setTimeout(resolve, 3000));

            const mS = await generateMoneySign.json();

            nodeApiResponse.push({ id: i, moneySign: mS.data.moneysign, userCode: userId, oldUserCode: userIds[i] });


            await deleteUser(request, accessToken, baseUrlNode)
            await new Promise(resolve => setTimeout(resolve, 5000));
        }
        // console.log(nodeApiResponse)
    });

    test("Responses which are not similar responses -->", async () => {
        const respNotEqual = compareResponses(dotNetApiResponse, nodeApiResponse);
        console.log("The Responses which are not equal -->", respNotEqual)
    })

})