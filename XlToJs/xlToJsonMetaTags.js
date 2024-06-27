const fs = require('fs');
const xlsx = require('xlsx');

// const excelFilePath = "C:/Users/ADMIN/Playwright/XlToJs/metaTags.xlsx";


function excelToJson(excelFilePath) {
    const workbook = xlsx.readFile(excelFilePath);
    const sheetName = workbook.SheetNames[0]; 
    const sheet = workbook.Sheets[sheetName];
    const jsonData = xlsx.utils.sheet_to_json(sheet);


    const formattedData = jsonData.map(row => {
        return {
            url: row['url '].trim(), 
            title: row['title'],
            description: row['description']
        };
    });

    return formattedData;
}

module.exports = excelToJson;

// const jsonData = excelToJson(excelFilePath);
// console.log(jsonData); 
