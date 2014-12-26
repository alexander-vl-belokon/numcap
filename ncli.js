function main(args, callback) {
    switch (args[2]) {
        case '-help':
            printHelp();
            break;
        case '-renew':
            callDownload();
            break;
        case '-csv2json':
            callConvert();
            break;
        case '-json2mongo':
            callMongoPusher();
            break;
        default:
            printHelp();
            break;
    }
}

function callDownload() {
    var downloader = require('./tools/download');
    downloader.reloadFiles();
}
function callConvert() {
    var csv2json = require('./tools/csv2json');
    csv2json.convert();
}
function callMongoPusher() {
    var json2mongo = require('./tools/json2mongo');
    json2mongo.convert();
}

function printHelp() {
    console.log('It is numcap cli program (ncli).');
    console.log('================================');
    console.log('Arguments:\n');
    console.log('-help   \tshow this text;');
    console.log('-renew  \tdownload new .CSV files from http://www.rossvyaz.ru;');
    console.log('-csv2json  \tconvert .CSV files to .JSON files;');
    console.log('-json2mongo  \tsave .JSON files to MongoDB.');
}

main(process.argv);