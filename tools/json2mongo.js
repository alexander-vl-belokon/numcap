var fileloaderHelper = require('./helpers/fileloader.js');
var fs = require('fs');
var MongoClient = require('mongodb').MongoClient;

var dataDirectory = 'data/';

function convert(options) {

    if(!options) options = {};

    var settings = {
        host: options['host'] || 'localhost',
        port: options['port'] || '27017',
        db: options['db'] || 'capacity',
        collection: options['collection'] || 'capacity'
    };

    var url = ['mongodb://', settings.host, ':', settings.port, '/', settings.db].join('');
    var filenames = fileloaderHelper.getFilelistByExtension(dataDirectory, 'json');

    MongoClient.connect(url, function (err, db) {
        if (err) throw err;

        var collection = db.collection(settings['collection']);

        collection.remove({}, function (err,result) {
            
            console.log("Removing old records...");
            
            updateNext(filenames, 0, function(){
                db.close()
            });
        });

        var insertFileInDb = function (filename, callback) {
            var fileName = dataDirectory + filename;

            var fileContentAsJson = JSON.parse(fs.readFileSync(fileName, 'utf8'));

            collection.insert(fileContentAsJson, function (err, result) {
                if (err) {
                    console.log(err);
                } else {
                    console.log('Written', result.length);
                }
                callback();
            });
        }

        var updateNext = function (array, i, lastCallback) {
            var count = array.length - 1;
            var callback;

            if(i!=count){
                callback = function () {
                    updateNext(array, i + 1, lastCallback);
                }
            }else{
                callback = lastCallback;
            }

            insertFileInDb(array[i],callback);
        }

        
    });
}

module.exports = {
    convert: convert
};