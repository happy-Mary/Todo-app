const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const port = 3000;
const app = express();
const mLab = 'mongodb://happy-Mary:harrypotter1991@ds241055.mlab.com:41055/todolist_db'

// express settings
app.use(express.static(path.resolve(__dirname, 'dist')));
const server = app.listen(process.env.PORT || port);
const io = require('socket.io')(server);

// mongoose settings
mongoose.Promise = global.Promise;
mongoose.connect(mLab, {
    useMongoClient: true
});
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// API
require('./api/folders')(app, io);
require('./api/lists')(app, io);
require('./api/tasks')(app, io);
require('./api/subtasks')(app);
require('./api/files')(app);

// IF CLIENT REQEST NOT API, SEND IT TO ANGULAR ROUTE
app.get('*', (req, res) => {
    if (!req.url.startsWith("/api/")) {
        res.status(200).sendFile(path.join(__dirname, '/dist/index.html'));
    }
});