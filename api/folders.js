const ModelFolder = require('../db_models/ModelFolder');
const ModelList = require('../db_models/ModelList');

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

module.exports =  function(app, io) {
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

}