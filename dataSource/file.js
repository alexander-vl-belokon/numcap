'use strict';

var fs = require('fs');

var file = function(options){

    var getDataDirectory = function(){
        return options['dataDirectory'] || 'data';
    }

    var checkStructure = function (structure) {
        return (structure['code'] && structure['code'].length === 3
            && structure['number'] && structure['number'].length === 7 );
    }

    var getFileNameByFirstDigit = function (digit) {        
        var filename = '';
        var files = fs.readdirSync(getDataDirectory());

        files = files.filter(function (element) {
            return ( element.lastIndexOf('json') != -1
                && element.lastIndexOf(digit) != -1 )
        });
        
        return files[0];
    }

    var getFilePath = function (structure) {
        var filename = getFileNameByFirstDigit(structure.code.charAt(0));
        if (!filename) throw new Error('Check files with data');

        return getDataDirectory() + '/' + filename;
    }

    var getData = function (structure) {        
        var array,
            encoding = 'utf8';

        if (checkStructure(structure)) {    
            array = JSON.parse(fs.readFileSync(getFilePath(structure), encoding));

            array = array.filter(function (element) {
                return (element['code'] === structure['code'] 
                        && (element['beginNumber'] <= parseInt(structure['number']) 
                            && element['endNumber'] >= parseInt(structure['number']) )
                        )
            });
        } else {
            throw new Error('Check structure of number');
        }

        return array[0];
    }

    return {
        getData: getData
    }
}

module.exports = file;