//init modules (express)
const express = require("express");

//import module routes for notes
const notesRoute = require("./notes");
const app = express();

//middleware to tie route to notes pathway
app.use("/notes", notesRoute);

//middleware error handler for server errors
app.use((err, req, res, next) => res.status(500).send("Internal Server Error"));

//making pseudo change to test gitignore

//export app module
module.exports = app;
