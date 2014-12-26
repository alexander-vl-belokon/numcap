
var file = require('./file');
var mongo = require('./mongo');
var numcap = require('./numcap');


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