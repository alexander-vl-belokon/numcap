var fileloaderHelper = require('./helpers/fileloader.js');
var fs = require('fs');
var dataDirectory = 'data/';
var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/capacity';

function convert() {
    var filesNames = fileloaderHelper.getFilelistByExtension(dataDirectory, 'json');
    MongoClient.connect(url, function (err, db) {
        var collection = db.collection('capacities');
        collection.remove({},function(err,result){
            console.log("Removeing old records...");
        });
        var insertFileInDb = function (filename,callback) {
            var fileName = dataDirectory + filename;
            var fileContentAsJson = JSON.parse(fs.readFileSync(fileName, 'utf8'));
            var convertedFileContentAsJson = fileContentAsJson.map(function (item) {
                return  {
                    "code": parseInt(item.code),
                    "beginNumber": parseInt(item.beginNumber),
                    "endNumber": parseInt(item.endNumber),
                    "capacity": parseInt(item.capacity),
                    "operator": item.operator,
                    "region": item.region
                };
            });
            collection.insert(convertedFileContentAsJson, function (err, result) {
                if (err) {
                    console.log(err);
                } else {
                    console.log('Written', result.length);
                }
                callback();
            });
        }
        var updateNext=function(array,i,lastCallback){
            var count=array.length - 1;
            var callback;
            if(i!=count){
                callback=function(){
                    updateNext(array,i+1,lastCallback);
                }
            }else{
                callback=lastCallback;
            }
            insertFileInDb(array[i],callback);
        }
        updateNext(filesNames,0,function(){db.close()});
    });
}

module.exports = {convert:convert};