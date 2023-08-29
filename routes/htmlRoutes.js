const router = require("express").Router();
const path = require("path");

//GET route for homepage/index.html
router.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "../public/index.html"))
);

//GET route for notes page/notes.html
router.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "../public/notes.html"))
);

module.exports = router;
