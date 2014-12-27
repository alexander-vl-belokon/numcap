
var file = require('../lib/file');
var mongo = require('../lib/mongo');
var numcap = require('../lib/numcap');


var q1 = new file({dataDirectory: '../data'});

q1.getData({code: '391', number: '2148000'}, function (err, data) {
    console.log(err, data);
});


var q3 = new numcap({type: 'file', options: {dataDirectory: '../data'}});

q3.getData("56576567", function (err, data) {
    console.log(err, data);
});

q3.getData("8-913-529-29-26", function (err, data) {
    console.log(err, data);
});


var q4 = new numcap({type: 'mongo'});

q4.getData("8-913-529-29-26", function (err, data) {
    console.log(err, data);
});