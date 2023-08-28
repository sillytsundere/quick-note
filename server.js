const express = require('express');
const path = require('path');
const fs = require('fs');
const uuid = require('uuid');


//invokes an instance of express, app object is an instance of express and now express can be used
const app = express();

const PORT = process.env.PORT || 3001;

//write middleware for project
app.use(express.json());
//this middleware method parses the request body (object) for a post request to JSON
app.use(express.urlencoded({ extended: true }));
//this middleware method aids express in seeing the incoming request body (object) as JSON(specializing in complex objects and arrays?), and it parses an html request additionally
app.use(express.static('public'));

//wil need routes/paths for GET, POST, DELETE, 

//GET route for homepage/index.html
app.get('/', (req, res) => 
    res.sendFile(path.join(__dirname, '/public/index.html'))
);

//GET route for notes page/notes.html
app.get('/notes', (req,res) => 
    res.sendFile(path.join(__dirname, '/public/notes.html'))
);

//console log app listener once server has started
app.listen(PORT, () =>
  console.log(`App listening at https://localhost:${PORT}!`)
);