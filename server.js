const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const multer = require('multer');

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

const server = app.listen(process.env.PORT || port);

const io = require('socket.io')(server);

// mongoose settings
mongoose.Promise = global.Promise;
mongoose.connect(mLab, {
    useMongoClient: true
});
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

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
    let arrayID = [];
    ModelFolder.findById(id, function(err, folder) {
        if (err) throw err;
        folder.remove();
        res.send(folder);
    });
    // changing lists folderId to null
    ModelList.find({ folderId: id }).exec((err, lists) => {
            lists.forEach((list) => { arrayID.push(list._id) })
        })
        .then(() => {
            ModelList.update({ folderId: id }, { $set: { folderId: null } }, { multi: true }).exec()
        })
        .then(() => {
            ModelList.find({ _id: { $in: arrayID } }).exec((err, data) => {
                io.emit('lists_changed', { obj: data, key: 'folderId' });
            })
        })
});

// change one folder
app.put('/api/folders/:id', jsonParser, function(req, res) {
    if (!req.body && !req.params.id) return res.sendStatus(400);

    ModelFolder.findByIdAndUpdate(
        req.params.id, { $set: req.body }, { new: true },
        function(err, folder) {
            if (err) throw err;
            res.send(folder);
        });
});

// get all lists
app.get('/api/lists', (req, res) => {
    ModelList.find({}, (err, lists) => {
        if (err) throw err;

        res.send(lists);
    })
});

// post new list
app.post('/api/lists', jsonParser, function(req, res) {
    if (!req.body) return res.sendStatus(400);

    const newList = new ModelList(req.body);
    newList.save((err) => {
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
        req.params.id, { $set: req.body }, { new: true },
        (err, list) => {
            if (err) throw err;
            res.send(list);
        });
});

// change countTodo in list on drag&drop
function changeTaskCountInList(task, newTask) {
    if (task.listId !== newTask.listId) {
        // change first list
        ModelList.findByIdAndUpdate(task.listId, {
            $inc: { taskCount: -1 } },
            { new: true },
            (error, list) => {
            io.emit('lists_changed', { obj: list, key: 'taskCount' });
        });
        // change second list
        ModelList.findByIdAndUpdate(newTask.listId, {
            $inc: { taskCount: 1 } },
            { new: true },
            (error, list) => {
            io.emit('lists_changed', { obj: list, key: 'taskCount' });
        });
    }
}

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
        if (err) res.send(err);
        
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
    ModelList.findByIdAndUpdate(req.body.listId, {
        $inc: { taskCount: 1 } },
        { new: true },
        function(err, list) {
        if (err) throw err;
        io.emit('lists_changed', { obj: list, key: 'taskCount' });
    })
});

// delete task
app.delete('/api/tasks/:id', function(req, res) {
    if (!req.params.id) return res.sendStatus(400);

    const id = req.params.id;
    ModelTask.findById(id, function(err, task) {
        if (err) throw err;
        task.remove();
        // delete its subtasks and files
        ModelSubtask.remove({ taskId: id }).exec();
        ModelFile.find({ taskId: id }, (error, files) => {
            files.forEach((file) => {
                fs.unlinkSync(file.path);
                file.remove();
            });
        })
        io.emit('task_removed', task);
        res.send(task);
    }).then((task) => {
        ModelList.findByIdAndUpdate(task.listId, {
            $inc: { taskCount: -1 } },
            { new: true },
            (err, list) => {
            if (err) throw err;
            io.emit('lists_changed', { obj: list, key: 'taskCount' });
        })
    });
});

// change task
app.put('/api/tasks/:id', jsonParser, function(req, res) {
    if (!req.body && !req.params.id) return res.sendStatus(400);

    ModelTask.findById(req.params.id).exec((err, task) => {
        if (req.body.listId) {
            changeTaskCountInList(task, req.body);
        }
    })
    .then(() => {
        ModelTask.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
        .exec((err, task) => { res.send(task); })
    })
    .catch((err) => { throw err; });
});

// get subtasks
app.get('/api/subtasks/:id', (req, res) => {
    const id = req.params.id;

    const findObj = { taskId: id };

    ModelSubtask.find(findObj, function(err, subtasks) {
        if (err) res.send(err);

        res.send(subtasks);
    })
});

// create subtask
app.post('/api/subtasks', jsonParser, function(req, res) {
    if (!req.body) return res.sendStatus(400);

    const newSubtask = new ModelSubtask(req.body);
    newSubtask.save(function(err) {
        if (err) throw err;

        res.send(newSubtask);
    });
});

// delete subtask
app.delete('/api/subtasks/:id', function(req, res) {
    if (!req.params.id) return res.sendStatus(400);

    const id = req.params.id;
    ModelSubtask.findById(id, function(err, subtask) {
        if (err) throw err;
        subtask.remove();
        res.send(subtask);
    });
});

// change task
app.put('/api/subtasks/:id', jsonParser, function(req, res) {
    if (!req.body && !req.params.id) return res.sendStatus(400);
        ModelSubtask.findByIdAndUpdate(req.params.id,
            { $set: req.body },
            { new: true })
        .exec((err, task) => {
            if (err) throw err;
            res.send(task);
        })
});

// //////////////////////////////////////////////////////////////////
// loading files on server
app.use(bodyParser.json({ limit: '5000mb' }));
// ////////////////////////////////////////////////////////////////

// get files
app.get('/api/files/:id', (req, res) => {
    const id = req.params.id;

    const findObj = { taskId: id };

    ModelFile.find(findObj, function(err, files) {
        if (err) throw err;
        res.send(files);
    })
});

// add file
const upload = multer({ dest: path.resolve(__dirname, 'uploads') });
// ///////////////////////////////
app.post('/api/files', upload.single('file'), (req, res) => {
    console.log(req.file);
    const fileData = {
        name: req.file.originalname,
        size: req.file.size,
        taskId: req.body.taskId,
        path: req.file.path
    };
    const newFile = new ModelFile(fileData);
    newFile.save(function(err) {
        if (err) throw err;
            // set date after adding to DB ???
            res.send(newFile);
        });
  });

// delete file
app.delete('/api/files/:id', function(req, res) {
    if (!req.params.id) return res.sendStatus(400);

    const id = req.params.id;
    ModelFile.findById({ _id: id }, (err, file) => {
        fs.unlinkSync(file.path);
        file.remove();
        res.send(file);
    })
    .catch((err) => {
        res.sendStatus(400);
        throw err;
    })
});

// ///////////////////////////////////////
// IF CLIENT REQEST NOT API, SEND IT TO ANGULAR ROUTE
// ///////////////////////////////////////
app.get('*', (req, res) => {
    if (!req.url.startsWith("/api/")) {
        res.status(200).sendFile(path.join(__dirname, '/dist/index.html'));
    }
});