const mongoose = require('mongoose');
//  create schema  //
const Schema = mongoose.Schema;
const schemaTask = new Schema({
    title: String,
    listId: String,
    marked: Boolean,
    // при post не передаем, при update - да
    completed: { type: Boolean, default: false },
    date: { type: Date, default: Date.now },
    dueDate: { type: Date, default: '' },
    remindDate: { type: Date, default: '' },
    note: { type: String, default: '', trim: true },
    type: { type: String, default: '', trim: "todo" }
},
{ versionKey: false });

//  create model  //
const ModelTask = mongoose.model('Task', schemaTask);

module.exports = ModelTask;