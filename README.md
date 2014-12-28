numcap
======

Phone numbers of all operators in Russian Federation

Find region and phone operator by number



Install
=======
> npm install numcap --save



Usage
=====
`````
var numcap = require('numcap');

var finder = new numcap({type: 'file', options: {dataDirectory: '../data'}});

finder.getData("8-913-529-29-26", function (err, data) {
    console.log(err, data);
});

Output

{ code: '913',
  begin: '4900000',
  end: '5399999',
  capacity: '500000',
  operator: 'Мобильные ТелеСистемы',
  region: 'Красноярский край' }
  

`````



Update data
===========

Numcap contain JSON files with data of resource, but you can use ncli.js for update data

Run from directory of your project

> node ./node_modules/numcap/ncli.js --download

> node ./node_modules/numcap/ncli.js --csv2json



Use mongodb
===========

Load data to mongodb use ncli.js

Run from directory of your project

> npm install mongodb --save

> node ./node_modules/numcap/ncli.js --json2mongo


*Example*
`````
var numcap = require('numcap');

var finder = new numcap({type: 'mongo', options: {host: '192.168.1.1'}});

finder.getData("8-913-529-29-26", function (err, data) {
    console.log(err, data);
});

`````