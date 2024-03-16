const express = require('express');
const fs = require('fs');
const path = require('path');
const db = require('./db/db.json');
const util = require('util');
const { ok } = require('assert');
const readFile = util.promisify(fs.readFile);
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({extended: false}))
app.use(express.static(path.join(__dirname, 'public')));

const getNotes = () => {
    return readFile(path.join(__dirname, './db/db.json'), 'utf8')
}
//create a route for '/api/notes' that will return the data of the db.json file
app.get('/api/notes', (req, res) => {
    getNotes().then((data) => res.json(JSON.parse(data)));
})

//create a route for '/api/notes' that will post the data of the db.json file
app.post
('/api/notes', (req, res) => {
    getNotes().then(oldNotes =>{
        const newNote = req.body;
        var id = db.length.toString();
        const parseNotes = [].concat(JSON.parse(oldNotes), {...newNote, id});
        fs.writeFile('./db/db.json', JSON.stringify(parseNotes), (err) => {
            if (err) throw err;
            res.json({msg:"ok"});
        })
    })
    

})

// get route for /notes that will return the notes.html localhost:3001/notes
app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, './public/notes.html')));

// get route for * that will return the index.html
app.get('*', (req, res) => res.sendFile(path.join(__dirname, './public/index.html')));

app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));