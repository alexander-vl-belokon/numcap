'use strict';

var fs = require('fs');
var path = require('path');

var file = function (options) {

    if(!options) options = {};

    var getDataDirectory = function(){
        return options['dataDirectory'] || path.resolve(__dirname, '../data');
    };

    var checkStructure = function (structure) {
        return ( structure['code'] && structure['code'].length === 3
            && structure['number'] && structure['number'].length === 7 );
    };

    var getFileNameByFirstDigit = function (digit, callback) {
        fs.readdir(getDataDirectory(), function (err, files) {
            files = files.filter(function (element) {
                return ( element.lastIndexOf('json') != -1
                    && element.lastIndexOf(digit) != -1 )
                });
            callback(files[0]);
        });
    };

    var getFilePath = function (structure, callback) {
        getFileNameByFirstDigit(structure.code.charAt(0), function (filename) {
            if (!filename) throw new Error('Check files with data');
            callback(getDataDirectory() + '/' + filename);
        });
    };

    var getData = function (structure, callback) {
        var array,
            encoding = 'utf8';

        if (!checkStructure(structure)) throw new Error('Check structure of number');

        getFilePath(structure, function (filepath) {
            fs.readFile(filepath, encoding, function (err, data) {
                if (err) throw err;
                array = JSON.parse(data);

                array = array.filter(function (element) {
                    return (element['code'] === structure['code'] 
                            && (element['begin'] <= parseInt(structure['number']) 
                                && element['end'] >= parseInt(structure['number']) )
                            )
                });
                
                callback(null, array[0]);
            });
        });        
    };

    return {
        getData: getData
    }
}

module.exports = file;