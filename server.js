const express = require('express');
const fs = require('fs');
const path = require('path');
const db = require('./db/db.json');

const app = express();
const port = process.env.PORT || 3001;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))

//create a route for '/api/notes' that will return the data of the db.json file
app.get('/api/notes', (req, res) => {
    res.json(db)
})

//create a route for '/api/notes' that will post the data of the db.json file
app.post
// ('/api/notes', (req, res) => {
//     const newNote = req.body;
//     newNote.id = db.length.toString();
//     db.push(newNote);
//     fs.writeFile('./db/db.json', JSON.stringify(db), (err) => {
//         if (err) throw err;
//         res.json(db);
//     })
// })

// get route for /notes that will return the notes.html localhost:3001/notes
app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, './public/notes.html')));

// get route for * that will return the index.html
app.get('*', (req, res) => res.sendFile(path.join(__dirname, './public/index.html')));

app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));