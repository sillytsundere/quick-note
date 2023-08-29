//what is this for?
const notes = require('express').Router();

const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

// Helper functions for reading and writing to the JSON file
const { readFromFile, readAndAppend } = require('../helpers/utils.js');

//write GET path for retreiving notes
notes.get("/", (req, res) => {
  console.info(`${req.method} request received for notes`);
  
  readFromFile('/Users/paigehamilton/Documents/bootcamp/challenges/quick-note/db/db.json')
  .then((data) => 
    res.status(200).json(JSON.parse(data))
  )
  .catch((err) => {
      console.error(err);
      res.status(500).send('Server error');
  })
});

//write POST path for submitting new notes
notes.post("/", (req, res) => {
  console.info(`${req.method} request received to add a note`);
  console.info(`${req.body} req.body`);

  //destructuring for items in req.body
  const { title, text } = req.body;

  // If all the required properties are present
  if (title && body) {
    // declare variable for the object we will save
    const newNote = {
      title,
      text,
      note_id: uuidv4(),
    };
    //then append object to db file
    readAndAppend(newNote, '/Users/paigehamilton/Documents/bootcamp/challenges/quick-note/db/db.json');

    //this response will send a success status and show the new note object
    const response = {
      status: 'success',
      body: newNote,
    };
    res.status(200).json(response);
  } else {
    //if required properties are not present an error message will be sent
    res.status(400).json('Error in posting note');
  }

});

//write DELETE path for deleting notes
notes.delete("/:id", (req, res) => {
  console.info(`${req.method} request received to delete a note`);
  res.json(`DELETE route`);
});

//export statement for note module
module.exports = notes;
