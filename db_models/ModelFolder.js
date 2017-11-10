const mongoose = require('mongoose');
//  create schema  //
const Schema = mongoose.Schema;
const schemaFolder = new Schema({
    title: String,
    type: { type: String, default: 'folder' }
},
{ versionKey: false });

//  create model  //
const ModelFolder = mongoose.model('Folder', schemaFolder);

module.exports = ModelFolder;