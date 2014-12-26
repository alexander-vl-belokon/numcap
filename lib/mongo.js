'use strict';

var MongoClient = require('mongodb').MongoClient;

var mongo = function (options) {

    var dbconn = null;
    var url = 'mongodb://' + options.host + ':' + options.port + '/' + options.db;
    var collectionName = options['collection'] || 'capacity';


    var find = function (db, structure, callback) {
        var collection = db.collection(collectionName);
            
        var query = {
            code: parseInt(structure['code']),
            end: {
                $gte: parseInt(structure['number'])
            },
            begin: {
                $lte: parseInt(structure['number'])
            }
        };

        collection.find(query).toArray(function (err, docs) {
            callback(err, docs[0]);
        });  
    }
    
    var getData = function (structure, callback) {
        MongoClient.connect(url, function (err, db) {
            if (err) throw err;            
            find(db, structure, function (err, result){
                callback(err, result);
                db.close();
            })
        }); 
    };

    return {
        getData: getData
    }
}

module.exports = mongo;