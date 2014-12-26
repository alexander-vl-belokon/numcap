numcap
======

Phone numbers of all operators in Russian Federation

*Possibilities*

1. Find region by number
2. Find phone operator by number


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

finder.getData("56576567", function (err, data) {
    console.log(err, data);
});

`````

DATA
====

numcap contain JSON files with data of resource
but you can use ncli.js for update data

Update
======

> node ncli.js --download
> node ncli.js --csv2json

Use mongodb
===========
load data to mongodb use ncli.j

> node ncli.js --json2mongo


