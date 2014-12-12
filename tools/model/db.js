var mongoose = require('mongoose');

var db = mongoose.createConnection('localhost', 'capacity');

mongoose.connection.on('error', function (err) {
    console.log(err);
});

mongoose.connection.on('connected', function () {
    console.log('Mongoose default connection open');
});

mongoose.connection.on('disconnected', function () {
    console.log('Mongoose default connection disconnected');
});

module.exports = db;
