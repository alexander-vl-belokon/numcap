function main(args) {
    var arguments = checkArguments(args);
    switch (args[2]) {
        case '--download':
            callDownload();
            break;
        case '--csv2json':
            callCsv2Json();
            break;
        case '--json2mongo':
            callJson2Mongo(arguments);
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

function callJson2Mongo(arguments) {
    var json2mongo = require('./tools/json2mongo');
    json2mongo.convert(arguments);
}

function checkArguments(args) {
    var arguments = {};
    for (var i = 2; i < args.length; i++) {
        if (args[i].indexOf('--help') != -1
            || args[i].indexOf('--download') != -1
            || args[i].indexOf('--csv2json') != -1
            || args[i].indexOf('--json2mongo') != -1
            || args[i].indexOf('--port') != -1
            || args[i].indexOf('--db') != -1
            || args[i].indexOf('--collection') != -1
            || args[i].indexOf('--host') != -1) {
            var splitArg = args[i].replace('--','').split('=');
            arguments[splitArg.shift()] = splitArg.pop();
        }
        else {
            printHelp();
            throw new Error('Argument ' + args[i] + ' has not defined.')
        }
    }
    return arguments;
}

function printHelp() {
    console.log('It is numcap cli program (ncli).');
    console.log('================================');
    console.log('Arguments:\n');
    console.log('--help   \tshow this text;');
    console.log('--download  \tdownload new .CSV files from http://www.rossvyaz.ru;');
    console.log('--csv2json  \tconvert .CSV files to .JSON files;');
    console.log('--json2mongo  \tsave .JSON files to MongoDB, addition options:');
    console.log('\t--host[=name]  \thost of MongoDB (default: host=localhost);');
    console.log('\t--db[=name]    \ta database name in MongoDB (default: db=capacity);');
    console.log('\t--port[=name]  \ta binding port in MongoDB (default: port=27017);');
    console.log('\t--collection[=name]  \ta collection name in MongoDB (default: collection=capacity).');
}

main(process.argv);