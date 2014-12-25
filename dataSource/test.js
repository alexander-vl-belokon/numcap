
var file = require('./file');

var q = new file({dataDirectory: '../data'});

q.getData({code: '391', number: '2148000'}, function (err,data) {
    console.log(err, data);
});

