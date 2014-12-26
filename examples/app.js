var numcap = require('../index');
var number = '+79131775501';

//Mongodb variant:

var nc2 = new numcap();

var operator = nc2.getOperator(number, function (err, result) {
    if(err) console.log(err);
    console.log('Operator: ', result);
});

var operator = nc2.getRegion(number, function (err, result) {
    if(err) console.log(err);
    console.log('Region: ', result);
});


var q3 = new numcap({type: 'file', options: {dataDirectory: '../data'}});

q3.getData("56576567", function (err, data) {
    console.log(err, data);
});

q3.getData("8-913-529-29-26", function (err, data) {
    console.log(err, data);
});