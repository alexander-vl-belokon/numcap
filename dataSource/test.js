
var file = require('./file');
var mongo = require('./mongo');

var q1 = new file({dataDirectory: '../data'});

q1.getData({code: '391', number: '2148000'}, function (err, data) {
    console.log(err, data);
});


var q2 = new mongo({host: 'localhost', port: 27017, db: 'capacity', collection: 'capacity'});

q2.getData({code: "391", number: "2148000"}, function (err, data) {
    console.log(err, data);
});
