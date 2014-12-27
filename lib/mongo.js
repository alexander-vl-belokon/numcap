'use strict';

var MongoClient = require('mongodb').MongoClient;

var mongo = function (options) {

    if(!options) options = {};

    var settings = {
        host: options['host'] || 'localhost',
        port: options['port'] || '27017',
        db: options['db'] || 'capacity',
        collection: options['collection'] || 'capacity'
    };

    var url = ['mongodb://', settings.host, ':', settings.port, '/', settings.db].join('');

    var find = function (db, structure, callback) {
        var collection = db.collection(settings['collection']);
        
        var query = {
            code: structure['code'],
            end: {
                $gte: structure['number']
            },
            begin: {
                $lte: structure['number']
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