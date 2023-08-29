const express = require("express");
const path = require("path");
const fs = require("fs");
const api = require("./routes/index.js"); //imports api from index.js

//invokes an instance of express, app object is an instance of express and now express can be used
const app = express();

//port handler
const PORT = process.env.PORT || 3001;

//write middleware for project
app.use(express.json());
//this middleware method parses the request body (object) for a post request to JSON
app.use(express.urlencoded({ extended: true }));
//this middleware method aids express in seeing the incoming request body (object) as JSON(specializing in complex objects and arrays?), and it parses an html request additionally
app.use("/api", api);
//sends requests that begin with /api to the index.js in routes folder
app.use(express.static("public"));
//this middleware serves static assets from public folder

//GET route for homepage/index.html
app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/index.html"))
);

//GET route for notes page/notes.html
app.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/notes.html"))
);

//console log app listener once server has started
app.listen(PORT, () =>
  console.log(`App listening at https://localhost:${PORT}!`)
);
