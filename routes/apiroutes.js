const notes = require("express").Router();
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

//GET path for retreiving notes
notes.get("/notes", (req, res) => {
  console.info(`${req.method} request received to get all current notes`);
  let notes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
  res.json(notes);
});

//POST path for submitting new notes
notes.post("/notes", (req, res) => {
  console.info(`${req.method} request received to add a note`);

  //destructuring for items in req.body
  const { title, text } = req.body;

  // If all the required properties are present
  if (title && text) {
    // declare variable for the object we will save
    const newNote = {
      title,
      text,
      id: uuidv4(),
    };

    //parsing notes from db file
    let notes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
    //adding new note to the parsed notes
    notes.push(newNote);
    //writing new note list with newly added note back to db file
    fs.writeFileSync("./db/db.json", JSON.stringify(notes));

    res.json(newNote);
  } else {
    //if required properties are not present an error message will be sent
    res.status(400).json("Error in posting note");
  }
});

//DELETE path for deleting notes
notes.delete("/notes/:id", (req, res) => {
  console.info(`${req.method} request received to delete a note`);
  let notes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
  let deleteNote = req.params.id;

  //filter() searches through each item of array and this function finds each item whose id does NOT match the deleteNote id and puts them in updated notes, so the deleted note is not saved(deleted)
  let updatedNotes = notes.filter((n) => n.id != deleteNote);

  // rewrite db.json file with updated Notes array
  fs.writeFileSync("./db/db.json", JSON.stringify(updatedNotes));

  res.json(updatedNotes);
});

//export statement for note module
module.exports = notes;
