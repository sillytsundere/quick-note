const util = require('util');
const fs = require("fs");

const readFromFile = util.promisify(fs.readFile);

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

const writeToFile = (destination, content) =>
  fs.writeFile(destination, JSON.stringify(content, null, 4), (err) =>
    err ? console.error(err) : console.info(`\nData written to ${destination}`)
    //if err = true, console.error(err) else console.info(bla bla bla)
  );

module.exports = { readFromFile, readAndAppend };