const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

// Helper functions for reading and writing to the JSON file
const { readFromFile, readAndAppend } = require('../helpers/utils.js');

//write GET path for retreiving notes
notes.get("/", (req, res) => {
  console.info(`${req.method} request received for notes`);
  
  readFromFile("../db/db.json")
  .then((data) => 
    res.status(200).json(JSON.parse(data))
  )
  .catch((err) => {
      console.error
  })
});

//write POST path for submitting new notes
notes.post("/", (req, res) => {
  console.info(`${req.method} request received to add a note`);

  //destructuring for items in req.body
  const { title, body } = req.body;

  if (title && body) {
    const newNote = {
      title,
      body,
      note_id: uuidv4(),
    };

    readAndAppend(newNote, '../db/db.json');

    const response = {
      status: 'success',
      body: newNote,
    };

    res.json(response);
  } else {
    res.json('Error in posting note');
  }

});

//write DELETE path for deleting notes
notes.delete("/:id", (req, res) => {
  console.info(`${req.method} request received to delete a note`);
  res.json(`DELETE route`);
});

module.exports = notes;
