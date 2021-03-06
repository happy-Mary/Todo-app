const mongoose = require('mongoose');
//  create schema  //
const Schema = mongoose.Schema;
const schemaSubtask = new Schema({
    title: String,
    taskId: String,
    completed: { type: Boolean, default: false }
},
{ versionKey: false });

//  create model  //
const ModelSubtask = mongoose.model('Subtask', schemaSubtask);

module.exports = ModelSubtask;