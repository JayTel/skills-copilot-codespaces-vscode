// write a program to read data from csv file
// and display all the comments in the console
// https://jsonplaceholder.typicode.com/comments

const fs = require('fs'); // require module for file system
const csv = require('csv-parser'); // require module for csv-parser
const request = require('request'); // require module for request

const file = fs.createWriteStream('comments.csv'); // create a file

request('https://jsonplaceholder.typicode.com/comments').pipe(file); // get data from the url and write to the file

fs.createReadStream('comments.csv')
  .pipe(csv())
  .on('data', (row) => {
    console.log(row.email); // display all the comments in the console
  })
  .on('end', () => {
    console.log('CSV file successfully processed');
  });