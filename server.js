const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const jsonParser = bodyParser.json();
const Schema = mongoose.Schema;

// app.use(express.static(__dirname + '/dist'));

app.use(express.static(path.resolve(__dirname, 'dist')));

// get all folders
app.get('/api/folders', (req, res) => {
    // getting folders from DB
    const folders = null;
    res.send(folders)
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

