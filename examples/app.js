var numcap = require('../index');


var q2 = new numcap({type: 'file'});

q2.getData("8-391-2745000", function (err, data) {
    console.log(err, data);
});


var q3 = new numcap({type: 'mongo', options: { collection: 'capacity4'}});

q3.getData("8-391-2745000", function (err, data) {
    console.log(err, data);
});