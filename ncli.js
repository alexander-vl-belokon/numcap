
function main(args) {
    switch (args[2]) {
        case '--download':
            callDownload();
            break;
        case '--csv2json':
            callCsv2Json();
            break;
        case '--json2mongo':
            callJson2Mongo();
            break;
        case '--help':
        default:
            printHelp();
            break;
    }
}

function callDownload() {
    var download = require('./tools/download');
    download.reloadFiles();
}

function callCsv2Json() {
    var csv2json = require('./tools/csv2json');
    csv2json.convert();
}

function callJson2Mongo() {
    var json2mongo = require('./tools/json2mongo');
    json2mongo.convert();
}

function printHelp() {
    console.log('It is numcap cli program (ncli).');
    console.log('================================');
    console.log('Arguments:\n');
    console.log('--help   \tshow this text;');
    console.log('--download  \tdownload new .CSV files from http://www.rossvyaz.ru;');
    console.log('--csv2json  \tconvert .CSV files to .JSON files;');
    console.log('--json2mongo  \tsave .JSON files to MongoDB.');
}

main(process.argv);