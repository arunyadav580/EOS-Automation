const XLSX = require('xlsx');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

const fs = require('fs');
const workbook = XLSX.readFile('vinu.xlsx');

// select particular sheet for processing
const worksheet = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]]);

console.log(worksheet);

// // Extract the keys from the first element of the JSON data
const keys = Object.keys(worksheet[0]);
console.log(keys)

const csvWriter = createCsvWriter({
  path: 'data.csv',
  header: keys
});
console.log(worksheet.slice(0,1))

// // Write the rows to the CSV file
csvWriter.writeRecords(worksheet.map(row => ({
  'Post Link': row['Post Link'],
  'OG Image': row['OG Image'],
  ' Twitter Image': row[' Twitter Image']
})))
  .then(() => {
    console.log('CSV file created successfully.');
    fs.readFile('data.csv', 'utf8', (err, data) => {
    if (err) throw err;

    var newData = data.replace(/\[/g, '{').replace(/\]/g, '}');
    fs.writeFile('data.csv', newData, 'utf8', (err) => {
      if (err) throw err;
      console.log('The file has been saved!');
    });
  });
});