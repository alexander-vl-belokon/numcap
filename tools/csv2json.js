var fs = require('fs');
var downloadDirectory = 'download/';
var dataDirectory = 'data/';

function convert () {
    var files = getCsvFiles(downloadDirectory);
    for (var i = 0; i < files.length; i++) {
        convertCsv2Json(files[i]);
    }
};

function convertCsv2Json (filename) {
    var csvfilepath = downloadDirectory + filename;
    fs.readFile(csvfilepath, 'utf8', function (err, data) {       
        if (err) throw err;

        var lines = data.split('\r\n');

        var array = lines
            .map(function (line, i) {
                return line.split(';');
            })
            .map(function (array, i){
                return getObject(array);
            });

        var json = JSON.stringify(array, null, 2);
        var file = dataDirectory + filename.replace('.csv', '.json');
        
        fs.writeFile(file, json, function (err) {
            if (!err) console.log("JSON saved to " + file);
        });
        
    });
};

function getCsvFiles (dir) {        
    var fileslist = fs.readdirSync(dir);
    fileslist = fileslist.filter(function (element) {
        return element.lastIndexOf(".csv") != -1
    });
    return fileslist;
};

function getObject (array) {
    return {
        code: array[0],
        begin: array[1],
        end: array[2],
        capacity: array[3],
        operator: array[4],
        region: array[5]
    };
};

module.exports = {    
    convert: convert
};