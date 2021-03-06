console.clear();
const express = require('express');
const fs = require('fs');
const { parse } = require('path');
const PORT = process.env.PORT || 3001;
const app = express();
const path = require("path")
const uuid = require('./helpers/uuid');
const util = require("util")

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
// WHEN I open the Note Taker
// THEN I am presented with a landing page with a link to a notes page
// WHEN I click on the link to the notes page
app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

// GET request for notes
app.get("/notes", (req, res) => 
    // res.json(`${req.method} request received to get notes`);
    res.sendFile(path.join(__dirname, "public/notes.html")))
app.get("/api/notes", (req, res) => 
  res.sendFile(path.join(__dirname, "db/db.json"))
  )
  // POST request to add a note
  app.post('/api/notes', (req, res) => {
    console.info(`POST request received to add a note`);
    const {title, text} = req.body;
  
    if (title && text) {
      const newNote = {
        title,
        text,
        id: uuid(),
      };
  
      fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) {
          console.error(err);
        } else {
          const parsedNotes = JSON.parse(data);
          parsedNotes.push(newNote);
          console.log(parsedNotes);
  
          fs.writeFile(
            './db/db.json',
            JSON.stringify(parsedNotes),
            (writeErr) =>
              writeErr
                ? console.error(writeErr)
                : console.info('Successfully updated notes!')
          );
        }
      });
  
      const response = {
        status: 'success',
        body: newNote,
      };
  
      console.log(response);
      res.status(201).json(response);
    } else {
      res.status(500).json('Error in posting note');
      res.send("done")
    }
  });
  app.delete("/api/notes/:id", (req, res) => {
    console.log(req.params.id);
    const readfileAsync = util.promisify(fs.readFile);
    let datatoParse = readfileAsync("./db/db.json", "utf8")
    .then((notes) => {
      console.log(notes);
      let parsedData;
      parsedData = datatoParse;
      const notes1 = parsedData.filter((note) => {
        console.log("two", note.id);
          note.id !== (req.params.id);
          console.log("one", [].concat(JSON.stringify(datatoParse)));
      })
    })
      console.log("three", notes);
      const stringifiedData = JSON.stringify(notes);
          const writefileAsync = util.promisify(fs.writeFile);
          writefileAsync("./db/db.json", stringifiedData);
  })
  
  app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT} ????`)
  );