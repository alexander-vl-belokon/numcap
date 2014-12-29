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

var finder = new numcap();

finder.getData("8-913-529-29-26", function (err, data) {
    console.log(err, data);
});

Output data object:

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

then with default options:

> node ./node_modules/numcap/ncli.js --json2mongo

or with additional options:

> node ./node_modules/numcap/ncli.js --json2mongo --host=localhost --port=27017 --db=capacity --collection=capacity

*Example*
`````
var numcap = require('numcap');

var finder = new numcap({type: 'mongo', options: {host: '192.168.1.1'}});

finder.getData("8-913-529-29-26", function (err, data) {
    console.log(err, data);
});

`````



Links
=====
1. [Number resource of Russian phone operators](http://www.rossvyaz.ru/activity/num_resurs/)
2. [Passport of open data](http://www.rossvyaz.ru/opendata/7710549038-Rosnumbase/)