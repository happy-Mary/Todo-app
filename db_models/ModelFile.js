const mongoose = require('mongoose');
//  create schema  //
const Schema = mongoose.Schema;
const schemaFile = new Schema({
    name: String,
    size: Number,
    taskId: String,
    path: String,
    loaded: { type: Date, default: Date.now }
},
{ versionKey: false });

//  create model  //
const ModelFile = mongoose.model('File', schemaFile);

module.exports = ModelFile;