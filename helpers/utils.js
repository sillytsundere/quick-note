//init modules
const util = require('util');
const fs = require("fs");

//custom fs function to change readFile  method into a promise
const readFromFile = util.promisify(fs.readFile);

//function writes data to JSON file
const writeToFile = (destination, content) =>
  fs.writeFile(destination, JSON.stringify(content, null, 4), (err) =>
    err 
    ? console.error(err) 
    : console.info(`\nData written to ${destination} successfully!`)
    //if err = true, console.error(err) else console.info(bla bla bla)
);

//function reads data from JSON file and appends new data to JSON file
const readAndAppend = (content, file) => {
  fs.readFile(file, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
    } else {
      const parsedData = JSON.parse(data);
      parsedData.push(content);
      writeToFile(file, parsedData);
    }
  });
};

//export statement for fsUtils module
module.exports = { readFromFile, readAndAppend };