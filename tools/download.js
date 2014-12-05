function reloadFiles() {
    var dataPath = 'data/';
    var Path = require('path');
    getnumberCapacityListCsvLinks(function getListCsvUrls(data3) {
        //console.log('data3', data3);
        var splitter = ';';
        readRemoteFile(data3, function secondLayerCsv(data2) {
            var csvHelper = require('../helpers/csv.js');
            var csvSecondLayer = csvHelper.parseCsv(data2, splitter);
            var listUrls = csvSecondLayer[8][3].trim('\r').split(' ');
            var fileloaderHelper = require('../helpers/fileloader.js');
            for(var i = 0;i < listUrls.length;i++){
                fileloaderHelper.downloadFileAndSaveToDirectoryByWget(listUrls[i],dataPath+Path.basename(listUrls[i]));
            }
        });
    });
}

function getnumberCapacityListCsvLinks(cb){
    var odataBaseFile = 'http://www.rossvyaz.ru/docs/articles/opendatalist.csv';
    var splitter = ';';
    readRemoteFile(odataBaseFile, function firstLayerCsv(data1){
        var csvHelper = require('../helpers/csv.js');
        var csvFirstLayer = csvHelper.parseCsv(data1,splitter);
        var url=getCsvUrl(csvFirstLayer[1][2]);
        cb(url);
    });
}

function readRemoteFile(link, callback){
    var request = require("request");
    request({
        uri: link,
        charset: 'utf8'
    }, function(error, response, body) {
        var charsetHelper = require('../helpers/charset.js');
        callback(charsetHelper.cp1251ToUtf8(body));
    });
};

function getCsvUrl(url){
    return url.substr(0, url.length - 1) + ".csv";
}

module.exports = {
    reloadFiles:reloadFiles,
    getnumberCapacityListCsvLinks:getnumberCapacityListCsvLinks,
    readRemoteFile:readRemoteFile,
    getCsvUrl:getCsvUrl

}