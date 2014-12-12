var fileloaderHelper = require('./helpers/fileloader.js');
var csvHelper = require('./helpers/csv.js');
var fs = require('fs');

schema = {
    "code": "",
    "beginNumber": "",
    "endNumber": "",
    "capacity": "",
    "operator": "",
    "region": ""
};

function convert() {
    var dataDir = 'data/';
    var filesList = getCsvFileslist(dataDir);
    for (var i = 0; i < filesList.length; i++) {
        var filepath = dataDir + filesList[i];
        convertCsvDataToJson(filepath);
    }
}

function convertCsvDataToJson(filepath) {
    fs.readFile(filepath, 'utf8', function (err, data) {
        console.log(filepath);
        if (err) {
            return console.log(err);
        }
        else {
            var csv = csvHelper.parseCsv(data, ';');
            var jsonAccumulator = [];
            for (i = 1; i < csv.length-1; i++) {
                var objectCsvString = getObject(csv[i]);
                jsonAccumulator.push(objectCsvString);
            }
            var jsonFile = JSON.stringify(jsonAccumulator, null, 2);
            writeToFile(filepath.replace('.csv', '.json'), jsonFile);
        }
    });
}
function getCsvFileslist(dataDir) {
    var csvFilesList = [];
    var fs = require('fs');
    var fileslist = fs.readdirSync(dataDir);
    for (var i = 0; i < fileslist.length; i++) {
        //console.log(fileslist[i]);
        if (fileslist[i].lastIndexOf(".csv") != -1) {
            csvFilesList.push(fileslist[i]);
        }
    }
    return csvFilesList;
}

function getObject(csvString) {
    var object = {};
    object['code'] = csvString[0];
    object['beginNumber'] = csvString[1];
    object['endNumber'] = csvString[2];
    object['capacity'] = csvString[3];
    object['operator'] = csvString[4];
    object['region'] = String(csvString[5]).replace('\r', '');
    return object;
}

function writeToFile(name, content) {
    fs.writeFile(name, content, function (err) {
        if (err) {
            console.log(err);
        } else {
            console.log("JSON saved to " + name);
        }
    });
}

module.exports = {
    convertCsvDataToJson: convertCsvDataToJson,
    getCsvFileslist: getCsvFileslist,
    convert: convert
}