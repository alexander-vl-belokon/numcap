var charsetHelper = require('./helpers/charset.js');
var fileloaderHelper = require('./helpers/fileloader.js');
var csvHelper = require('./helpers/csv.js');


function reloadFiles() {
    var dataPath = 'data/';
    var Path = require('path');
    getnumberCapacityListCsvLinks(function getListCsvUrls(data3) {
        var splitter = ';';
        readRemoteFile(data3, function secondLayerCsv(data2) {
            var csvSecondLayer = csvHelper.parseCsv(data2, splitter);
            var listUrls = csvSecondLayer[8][3].trim('\r').replace('/ru/','/').split(' ');//delete block replace('/ru/','/') when mistake in oData passport will be repaired
            var downloadAndConvert=function(filename){
                var fileAbsolutePath= dataPath+Path.basename(filename)
                var convert=function(){charsetHelper.changeFileCharset(fileAbsolutePath,'cp1251','utf8');}
                fileloaderHelper.downloadFileAndSaveToDirectoryByWget(listUrls[i],fileAbsolutePath,convert);
            }
            
            for(var i = 0;i < listUrls.length;i++){
                downloadAndConvert(listUrls[i]);
            }
        });
    });
}

function getnumberCapacityListCsvLinks(cb){
    var odataBaseFile = 'http://www.rossvyaz.ru/docs/articles/opendatalist.csv';
    var splitter = ';';
    readRemoteFile(odataBaseFile, function firstLayerCsv(data1){
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
        callback(charsetHelper.cp1251ToUtf8(body));
    });
};

function getCsvUrl(url){
    return url.substr(0, url.length - 1) + ".csv";
}

function decodeDataFiles(folder){
    var fs = require('fs');
    var fileslist = fs.readdirSync(folder);
    for(var i = 0;i < fileslist.length;i++){
        var fileAbsolutePath= folder+'/'+fileslist[i];
        charsetHelper.changeFileCharset(fileAbsolutePath,'cp1251','utf8');
    }
}

module.exports = {
    reloadFiles:reloadFiles,
    getnumberCapacityListCsvLinks:getnumberCapacityListCsvLinks,
    readRemoteFile:readRemoteFile,
    getCsvUrl:getCsvUrl,
    decodeDataFiles:decodeDataFiles

}