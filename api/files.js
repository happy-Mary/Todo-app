const multer = require('multer');
const path = require('path');
const fs = require('fs');

const ModelFile = require('../db_models/ModelFile');

const upload = multer({ dest: path.resolve(__dirname, 'uploads') });

module.exports =  function(app) { 
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
}