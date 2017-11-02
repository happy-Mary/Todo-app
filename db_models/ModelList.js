const mongoose = require('mongoose');
//  create schema  //
const Schema = mongoose.Schema;
const schemaList = new Schema({
    title: String,
    folderId: { type: String, default: null },
    taskCount: Number,
    type: { type: String, default: 'list' }
},
{ versionKey: false });

//  create model  //
const ModelList = mongoose.model('List', schemaList);

module.exports = ModelList;