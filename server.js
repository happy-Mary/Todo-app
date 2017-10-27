const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');

const app = express();
const jsonParser = bodyParser.json();
const Schema = mongoose.Schema;
const port = 3000;

app.use(express.static(path.resolve(__dirname, 'dist')));

app.listen(port, () => {
    console.log(`Server started on ${port}`);
});


// get all folders
app.get('/api/folders', (req, res) => {
    // ///////////////////////////////////////
    console.log('WE NEED FOLDERS');
    const folders = fs.readFileSync('folders.json', 'utf8', (err, data) => {
        if (err) return res.sendStatus(404);

        return data;
    });
    res.send(folders);
});

// get one folder by id
app.get('/api/folders/:id', (req, res) => {
    const id = req.params.id;

    // getting folders from DB
    const folder = null;
    if (folder) {
        res.send(folder);
    } else {
        res.status(400).send();
    }
});

// post new folder
app.post('/api/folders', jsonParser, function(req, res) {
    if (!req.body) return res.sendStatus(400);

    res.send();
});


/* GET home page. */
app.get('*', function(req, res, next) {
    //Path to your main file
    if (!req.url.startsWith("/api/")) {
        console.log('not app');
        res.status(200).sendFile(path.join(__dirname + '/dist/index.html'));
    }
});

