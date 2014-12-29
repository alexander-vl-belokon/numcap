var charsetHelper = require('./helpers/charset.js');
var fileloaderHelper = require('./helpers/fileloader.js');
var csvHelper = require('./helpers/csv.js');

var path = require('path');
var request = require("request");

function reloadFiles () {

    var downloadDirectory = 'download/';
    
    getnumberCapacityListCsvLinks(function (url) {
        var splitter = ';';

        readRemoteFile(url, function (data) {

            var csvSecondLayer = csvHelper.parseCsv(data, splitter);

            var listUrls = csvSecondLayer[8][3].trim('\r').split(' ');

            var downloadAndConvert = function (filename) {

                var fileAbsolutePath = downloadDirectory + path.basename(filename);

                var convert = function(){
                    charsetHelper.changeFileCharset(fileAbsolutePath, 'cp1251', 'utf8');
                }
                fileloaderHelper.downloadFileAndSaveToDirectoryByWget(listUrls[i], fileAbsolutePath, convert);
            }
            
            for(var i = 0; i < listUrls.length; i++){

                downloadAndConvert(listUrls[i]);
            }            
        });
    });
}

function getnumberCapacityListCsvLinks (callback) {
    var odataBaseFileUrl = 'http://www.rossvyaz.ru/docs/articles/opendatalist.csv';
    var splitter = ';';

    readRemoteFile(odataBaseFileUrl, function (data) {
        var csvFirstLayer = csvHelper.parseCsv(data, splitter);
        var url = getCsvUrl(csvFirstLayer[1][2]);
        callback(url);
    });
}

function readRemoteFile (url, callback) {
    request({
        uri: url,
        charset: 'utf8'
    }, function(error, response, body) {
        callback(body);
    });
};

function getCsvUrl(url){
    return url.substr(0, url.length - 1) + ".csv";
}

module.exports = {
    reloadFiles: reloadFiles
}