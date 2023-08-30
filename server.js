const express = require("express");
const fs = require("fs");

//sends requests that begin with /api to the respective file in routes folder
const apiRoutes = require("./routes/apiroutes");
const htmlRoutes = require("./routes/htmlRoutes");

//invokes an instance of express, app object is an instance of express and now express can be used
const app = express();

//port handler
const PORT = process.env.PORT || 3001;

//middleware for project
app.use(express.json());
//this middleware method parses the request body (object) for a post request to JSON
app.use(express.urlencoded({ extended: true }));
//this middleware method aids express in seeing the incoming request body (object) as JSON(specializing in complex objects and arrays?), and it parses an html request additionally
app.use(express.static("public"));
//this middleware serves static assets from public folder

app.use("/", htmlRoutes);
app.use("/api", apiRoutes);

//console log app listener once server has started
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}!`)
);
