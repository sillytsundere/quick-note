//init modules (express)
const express = require("express");

//import module route for notes
const notesRouter = require("./notes");

//create instance of express so middleware and routing can be applied
const app = express();

//middleware to tie route to notes pathway
app.use("/notes", notesRouter);

//middleware error handler for server errors
app.use((err, req, res, next) => res.status(500).send("Internal Server Error"));

//export app module
module.exports = app;
