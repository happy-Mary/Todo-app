const ModelSubtask = require('../db_models/ModelSubtask');

const bodyParser = require('body-parser');

const jsonParser = bodyParser.json();

module.exports =  function(app) {
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

    // change subtask
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
}