console.clear();
const uuid = require('./helpers/uuid');
const express = require('express');
const fs = require('fs');
const PORT = 3001;
const app = express();
const path = require("path")

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
// WHEN I open the Note Taker
// THEN I am presented with a landing page with a link to a notes page
// WHEN I click on the link to the notes page
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

// GET request for notes
app.get('/notes', (req, res) => {
    // Send a message to the client
    // res.json(`${req.method} request received to get notes`);
    res.sendFile(path.join(__dirname, "public/notes.html"))
    // Log our request to the terminal
    console.info(`${req.method} request received to get notes`);
  });
  app.get("/api/notes", (req, res) => 
  res.sendFile(path.join(__dirname, "db/db.json"))
  )
  // POST request to add a note
  app.post('api/notes', (req, res) => {
    // Log that a POST request was received
    console.info(`${req.method} request received to add a note`);
  
    // Destructuring assignment for the items in req.body
    const { title, text } = req.body;
  
    // If all the required properties are present
    if (title && text) {
      // Variable for the object we will save
      const newNote = {
        title,
        text,
        id: uuid(),
      };
  
      // Convert the data to a string so we can save it
      const noteString = JSON.stringify(newNote);
  
      // Write the string to a file
      fs.writeFile(`./db/${newNote.title}.json`, noteString, (err) =>
        err
          ? console.error(err)
          : console.log(
              `Note for ${newNote.title} has been written to JSON file`
            )
      );
  
      const response = {
        status: 'success',
        body: newNote,
      };
  
      console.log(response);
      res.status(201).json(response);
    } else {
      res.status(500).json('Error in posting note');
    }
  });
  
  app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT} 🚀`)
  );
  