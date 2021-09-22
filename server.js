console.clear();
const uuid = require('./helpers/uuid');
const express = require('express');
const fs = require('fs');
const PORT = 3001;
const app = express();
const path = require("path")
// WHEN I open the Note Taker
// THEN I am presented with a landing page with a link to a notes page
// WHEN I click on the link to the notes page

//Get request for notes
app.get("/api/notes", (req, res) => {
    res.json(`${req.method} request received to get notes`);
    console.info(`${req.method} request received to get notes`);
})
// THEN I am presented with a page with existing notes listed in the left-hand column, plus empty fields to enter a new note title and the note’s text in the right-hand column
// WHEN I enter a new note title and the note’s text
//post request to add note
app.post("/api/notes", (req, res) => {
console.info(`${req.method} request received to add note`)
})

//destructuring assignment for the items in req.body
const { title, text } = req.body;

if (title && text) {
    const newNote = {
        title,
        text,
        id: uuid(),
    }
    fs.readFile('.db/db.json', 'utf8', (err, data) => {
        if(err) {
            console.error(err);
        } else {
            const parsedNotes =  JSON.parse(data);
            parsedNotes.push(newNote);
            fs.writeFile(
                './db/db.json',
                JSON.stringify(parsedNotes, null, 4),
            )
        }
    })
}
// THEN a Save icon appears in the navigation at the top of the page
// WHEN I click on the Save icon
// THEN the new note I have entered is saved and appears in the left-hand column with the other existing notes
// WHEN I click on an existing note in the list in the left-hand column
// THEN that note appears in the right-hand column
// WHEN I click on the Write icon in the navigation at the top of the page
// THEN I am presented with empty fields to enter a new note title and the note’s text in the right-hand column
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);