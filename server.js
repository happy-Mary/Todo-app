const express = require('express');
// const MongoClient = require('mongodb').MongoClient;
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
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
const mLab = 'mongodb://happy-Mary:harrypotter1991@ds241055.mlab.com:41055/todolist_db'

// express settings
app.use(express.static(path.resolve(__dirname, 'dist')));

app.listen(port, () => {
    console.log(`Server started on ${port}`);
});

// mongoose settings
mongoose.Promise = global.Promise;
mongoose.connect(mLab, {
    useMongoClient: true
  });
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// TESTING CREATING
// let newFolder = new ModelFolder({ title: 'first folder' });
// newFolder.save(function(err) {
//     if (err) throw err;
//     console.log('User created!');
// });

// ModelFolder.findById('59f84a123dd79c2e0c72512a', function(err, user) {
//     if (err) throw err;
//     console.log(user);
//     user.remove();
// })

// ModelFolder.find({}, function(err, users) {
//     if (err) throw err;
//     console.log(users);
// })

// //////////////////////

// API REQUSTS

// get all folders
app.get('/api/folders', (req, res) => {
    ModelFolder.find({}, function(err, folders) {
        if (err) throw err;

        res.send(folders);
        // mongoose.disconnect();
    })
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

    const newFolder = new ModelFolder(req.body);
    newFolder.save(function(err) {
        if (err) throw err;

        res.send(newFolder);
    });
});

// delete folder
app.delete('/api/folders/:id', function(req, res) {
    if (!req.params.id) return res.sendStatus(400);

    const id = req.params.id;
    // изменить тут folderId у листов на null
    ModelFolder.findById(id, function(err, folder) {
        if (err) throw err;
        folder.remove();
        res.send(folder);
    })
});

// change one folder
app.put('/api/folders/:id', jsonParser, function(req, res) {
    if (!req.body && !req.params.id) return res.sendStatus(400);

    ModelFolder.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true },
        function(err, folder) {
            if (err) throw err;
            res.send(folder);
    });
});


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
// mongodb://happy-Mary:harrypotter1991@ds241055.mlab.com:41055/todolist_db