var numcap = require('../index');
var number = '+79131775501';

var q3 = new numcap({type: 'file', options: {dataDirectory: '../data'}});

q3.getData("56576567", function (err, data) {
    console.log(err, data);
});

q3.getData("8-913-529-29-26", function (err, data) {
    console.log(err, data);
});