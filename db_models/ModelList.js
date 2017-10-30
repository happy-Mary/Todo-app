const mongoose = require('mongoose');
//  create schema  //
const Schema = mongoose.Schema;
const schemaList = new Schema({
    title: String,
    // ???
    folderId: { type: Number, default: null },
    type: { type: String, default: 'list' }
});

//  create model  //
const ModelList = mongoose.model('List', schemaList);

module.exports = ModelList;