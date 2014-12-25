var Numcap = require('./index');
var number = '+79131775501';

//JSON-file variant:
var nc1 = new Numcap();

var operator = nc1.getOperator(number);
console.log('Operator: ', operator);

var region = nc1.getRegion(number);
console.log('Region: ', region);


//Mongodb variant:

var nc2 = new Numcap({'type': 'mongodb'});

var operator = nc2.getOperator(number, function (err, result) {
	if(err) console.log(err);
    console.log('Operator: ', result);
});

var operator = nc2.getRegion(number, function (err, result) {
	if(err) console.log(err);
    console.log('Region: ', result);
});