const mongoose = require('mongoose');
//  create schema  //
const Schema = mongoose.Schema;
const schemaFile = new Schema({
    name: String,
    size: Number,
    taskId: Number,
    url: String,
    loaded: { type: Date, default: new Date() }
});

//  create model  //
const ModelFile = mongoose.model('File', schemaFile);

module.exports = ModelFile;