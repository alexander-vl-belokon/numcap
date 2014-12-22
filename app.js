var number = '+79131775501';

//JSON-file variant:
var Numcap = require('./tools/numcap.js');
var nc = new Numcap();
var operator = nc.getOperator(number);
var region = nc.getRegion(number);
console.log('Operator: ', operator);
console.log('Region: ', region);


//Mongodb variant:

var Numcap = require('./tools/numcap.js');
var nc = new Numcap({'type': 'mongodb'});
var operator = nc.getOperator(number, function (result) {
    console.log('Operator: ', result);
});
var operator = nc.getRegion(number, function (result) {
    console.log('Region: ', result);
});