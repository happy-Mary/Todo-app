const express = require('express');
// const MongoClient = require('mongodb').MongoClient;
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
// Models
const ModelFolder = require('./db_models/ModelFolder');
const ModelList = require('./db_models/ModelList');
const ModelTask = require('./db_models/ModelTask');
const ModelSubtask = require('./db_models/ModelSubtask');
const ModelFile = require('./db_models/ModelFile');

const app = express();
const jsonParser = bodyParser.json();
const Schema = mongoose.Schema;
const port = 3000;
const mLab = 'localhost'

// express settings
app.use(express.static(path.resolve(__dirname, 'dist')));

app.listen(port, () => {
    console.log(`Server started on ${port}`);
});

// mongoose settings
mongoose.Promise = global.Promise;
mongoose.connect(mLab);
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// API REQUSTS

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

// change folder
app.update('/api/folders/:id');

// delete folder
app.delete('/api/folders/:id');

// ///////////////////////////////////////
// IF CLIENT REQEST NOT API, SEND IT TO ANGULAR ROUTE
// ///////////////////////////////////////

app.get('*', (req, res) => {
    if (!req.url.startsWith("/api/")) {
        console.log('not API request');
        res.status(200).sendFile(path.join(__dirname, '/dist/index.html'));
    }
});


// http://blog.devshark.ru/posts/nodejs-mongoose-mongodb/