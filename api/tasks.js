const ModelList = require('../db_models/ModelList');
const ModelTask = require('../db_models/ModelTask');
const ModelSubtask = require('../db_models/ModelSubtask');
const ModelFile = require('../db_models/ModelFile');

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

module.exports =  function(app, io) {
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

}