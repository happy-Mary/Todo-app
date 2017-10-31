const mongoose = require('mongoose');
//  create schema  //
const Schema = mongoose.Schema;
const schemaTask = new Schema({
    title: String,
    listId: String,
    marked: Boolean,
    // при post не передаем, при update - да
    completed: { type: Boolean, default: false },
    date: { type: Date, default: new Date() },
    dueDate: { type: Date, default: 0 },
    remindDate: { type: Date, default: 0 },
    note: { type: String, default: '', trim: true }
},
{ versionKey: false });

//  create model  //
const ModelTask = mongoose.model('Task', schemaTask);

module.exports = ModelTask;