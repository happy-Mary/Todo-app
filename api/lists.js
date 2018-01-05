const ModelList = require('../db_models/ModelList');
const ModelTask = require('../db_models/ModelTask');

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

module.exports =  function(app, io) {
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

}