// NPM Dependencies

const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();

const PORT = process.env.PORT || 3001;

// Server Middleware Setup

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(express.json());


// API POST Route

app.post('/api/notes', (req, res) => {
  fs.readFile('./db/db.json', 'utf8', (err, data) => {
    if (err) throw err;
    const notes = JSON.parse(data);
    let userNote = req.body;
    userNote.id = Math.floor(Math.random() * 5000);
    notes.push(userNote);
  fs.writeFile('./db/db.json', JSON.stringify(notes), (err, data) => {
      res.json(userNote);
  });
  }); 
});


// API DELETE Route

app.delete('/api/notes/:id', (req, res) => {
  fs.readFile('./db/db.json', 'utf8', (err, data) => {
    if (err) throw err;
    let notes = JSON.parse(data);
    const newNotes = notes.filter(note => note.id !== parseInt(req.params.id));
  
  fs.writeFile('./db/db.json', JSON.stringify(newNotes), (err, data) => {
    res.json({msg: 'successfully'});
  });
});
});


// API GET Routes

app.get('api/notes/:id', (req, res) =>{
  res.json(notes[req.params.id]);
});

app.get('/api/notes', (req, res) => {
  fs.readFile('./db/db.json', 'utf8', (err, data) => {
    if (err) throw err;
    const notes = JSON.parse(data);
    res.json(notes);
  });
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/notes.html'))
});


// API CATCH-ALL If User Input Doesn't Match A Valid Route
app.get('*', (req, res) => {
   res.sendFile(path.join(__dirname, '/index.html'));
});   


// Server Starts

app.listen(PORT, () => {
    console.log(`App listening on PORT: ${PORT}`);
});


