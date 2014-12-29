var numcap = require('../index');

var q3 = new numcap({type: 'file'});

q3.getData("56576567", function (err, data) {
    console.log(err, data);
});

q3.getData("8-391-2745000", function (err, data) {
    console.log(err, data);
});