const express = require('express');
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
const port = 3000;
const mLab = 'mongodb://happy-Mary:harrypotter1991@ds241055.mlab.com:41055/todolist_db'


// express settings
app.use(express.static(path.resolve(__dirname, 'dist')));

const server = app.listen(port);

const io = require('socket.io')(server);

// mongoose settings
mongoose.Promise = global.Promise;
mongoose.connect(mLab, {
    useMongoClient: true
  });
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// TESTING CREATING
// let newList = new ModelList({ title: 'list 1' });
// newList.save(function(err) {
//     if (err) throw err;
//     console.log('List created!');
// });

// API REQUSTS //////////////////////////////////////////////////////////

// get all folders
app.get('/api/folders', (req, res) => {
    ModelFolder.find({}, function(err, folders) {
        if (err) throw err;

        res.send(folders);
    })
});

// get one folder by id
app.get('/api/folders/:id', (req, res) => {
    const id = req.params.id;
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
    ModelFolder.findById(id, function(err, folder) {
        if (err) throw err;
        folder.remove();
        res.send(folder);
    });
    // changing lists folderId to null
    ModelList.update(
        { folderId: id },
        { $set: { folderId: null } },
        { multi: true },
        function(err, lists) {
            if (err) throw err;
    })
    ModelList.find({ folderId: null }, function(err, lists) {
        if (err) throw err;
        io.emit('ungroup_lists', lists);
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

// get all lists
app.get('/api/lists', (req, res) => {
    ModelList.find({}, function(err, lists) {
        if (err) throw err;

        res.send(lists);
    })
});

// post new list
app.post('/api/lists', jsonParser, function(req, res) {
    if (!req.body) return res.sendStatus(400);

    const newList = new ModelList(req.body);
    newList.save(function(err) {
        if (err) throw err;

        res.send(newList);
    });
});

// delete list
app.delete('/api/lists/:id', function(req, res) {
    if (!req.params.id) return res.sendStatus(400);

    const id = req.params.id;
    ModelList.findById(id, function(err, list) {
        if (err) throw err;
        list.remove();
        res.send(list);
    })
    ModelTask.remove({ listId: id }, function(err, tasks) {
        if (err) throw err;

        io.emit('removed_tasks');
    })
});

// change one list
app.put('/api/lists/:id', jsonParser, function(req, res) {
    if (!req.body && !req.params.id) return res.sendStatus(400);

    ModelList.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true },
        function(err, list) {
            if (err) throw err;
            res.send(list);
    });
});

// get tasks by id
app.get('/api/tasks/:id', (req, res) => {
    const id = req.params.id;

    let findObj;
    if (id === 'marked') {
        findObj = { marked: true }
    } else {
        findObj = { listId: id }
    }

    ModelTask.find(findObj, function(err, tasks) {
        if (err) throw err;

        res.send(tasks);
    })
});

// create task
app.post('/api/tasks', jsonParser, function(req, res) {
    if (!req.body) return res.sendStatus(400);

    const newTask = new ModelTask(req.body);
    newTask.save(function(err) {
        if (err) throw err;

        res.send(newTask);
    });
    // ModelList.findByIdAndUpdate(req.body.listId, { $inc: { taskCount: 1 } }, { new: true }, function(err, list) {
    //     if (err) throw err;
    //     io.emit('ungroup_lists', list);
    // })
});

// delete task
app.delete('/api/tasks/:id', function(req, res) {
    if (!req.params.id) return res.sendStatus(400);

    const id = req.params.id;
    ModelTask.findById(id, function(err, task) {
        if (err) throw err;
        task.remove();
        res.send(task);
    })
});

// change task
app.put('/api/tasks/:id', jsonParser, function(req, res) {
    if (!req.body && !req.params.id) return res.sendStatus(400);

    ModelTask.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true },
        function(err, task) {
            if (err) throw err;
            res.send(task);
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