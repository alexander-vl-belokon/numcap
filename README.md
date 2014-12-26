numcap
======

Number capacity of phone operators in Russian Federation

*Possibilities*

1. Find region by number
2. Find phone operator by number


Install
=======
> npm install numcap --save


Usage
=====
`````
var Numcap = require('numcap');
var numberFinder = new Numcap();
console.log('operator', numberFinder.getOperator('+7XXXXXXXXXX'));
console.log('region', numberFinder.getRegion('+7XXXXXXXXXX'));

`````
