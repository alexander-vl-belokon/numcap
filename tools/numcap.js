var fs = require('fs');
var MongoClient = require('mongodb').MongoClient;
/*
 * schema:
 * connection = {'type':'',
 * options:{'filetype':'json',
 *          'datadirectory':'path';
 *         }
 * }
 *
 * */
function Numcap(connection) {
    if (connection) {
        if (connection.type === 'file') {
            this.connectionFiletype = connection.options.fileType;
        } else if (connection.type === 'mongodb') {
            this.connection = {
                'type': 'mongodb',
                'options': {
                    'host': 'localhost',
                    'port': '27017',
                    'db': 'capacity',
                    'collection': 'capacities'
                }
            };
        }
    } else {
        this.connection = this.defaultConnection;
    }
}

Numcap.prototype.defaultConnection = {
    'type': 'file',
    'options': {
        'fileType': '.json',
        'dataDirectory': 'data/'
    }
};
Numcap.prototype.connection = {};
Numcap.prototype.connectionFiletype = '';


Numcap.prototype.getOperator = function () {
    var args = Array.prototype.slice.call(arguments, 0);
    if (args.length === 2) {
        if (args[1] instanceof Function) {
            var field = 'operator';
            var number = args[0];
            var cb = args[1];
            this.mongoSearchByNumber(number, field, cb);
        }
    }
    else if (args.length === 1) {
        var number = args[0];
        var foundCapacityObjects = this.searchCapacityObjects(number);
        return foundCapacityObjects.pop().region;
    }
}

Numcap.prototype.getRegion = function (number) {
    var args = Array.prototype.slice.call(arguments, 0);
    if (args.length === 2) {
        if (args[1] instanceof Function) {
            var field = 'region';
            var number = args[0];
            var cb = args[1];
            this.mongoSearchByNumber(number, field, cb);
        }
    }
    else if (args.length === 1) {
        var number = args[0];
        var foundCapacityObjects = this.searchCapacityObjects(number);
        return foundCapacityObjects.pop().region;
    }
}

Numcap.prototype.searchCapacityObjects = function (number) {
    var numberStruct = this.getStructuredNumber(number);
    var foundCapacityObjects = this.fileSearchByNumber(numberStruct);
    return foundCapacityObjects;
}

Numcap.prototype.fileSearchByNumber = function (numberStruct) {
    var filename = this.getFileNameByFirstDigit(numberStruct.code.charAt(0));
    var filepath = this.connection.options.dataDirectory + filename;
    var capacity = this.readFileToArray(filepath);
    var firstLevelSearch = this.filterByCode(capacity, numberStruct.code);
    var secondLevelSearch = this.filterByNumber(firstLevelSearch, numberStruct.number);
    return secondLevelSearch;
}

Numcap.prototype.mongoSearchByNumber = function (number, field, callback) {
    var numberStruct = this.getStructuredNumber(number);
    var connection = this.connection;
    var url = 'mongodb://' + connection.options.host + ':' + connection.options.port + '/' + connection.options.db;
    var documents = {};
    MongoClient.connect(url, function (err, db) {
        var collection = db.collection(connection.options.collection);
        var query = {
            code: parseInt(numberStruct.code),
            endNumber: {$gte: parseInt(numberStruct.number)},
            beginNumber: {$lte: parseInt(numberStruct.number)}
        };
        collection.find(query).toArray(function (err, docs) {
            var result = '';
            if (docs.length > 0) {
                result = docs.pop();
                result = result[field];
            }
            callback(result);
            db.close();
        });
    });
}

Numcap.prototype.filterByCode = function (data, code) {
    var result = [];
    for (var attributename in data) {
        if (data[attributename].code === code) {
            result.push(data[attributename]);
        }
    }
    return result;
}

Numcap.prototype.filterByNumber = function (data, number) {
    var result = [];
    for (var attributename in data) {
        var first = data[attributename].beginNumber <= parseInt(number);
        var second = data[attributename].endNumber >= parseInt(number);
        if (first === true && second === true) {
            result.push(data[attributename]);
        }
    }
    return result;
}

Numcap.prototype.getStructuredNumber = function (number) {
    var struct = {
        'prefix': '',
        'code': '',
        'number': ''
    };
    var numberString = String(number);
    if (numberString.length === 12 && numberString.charAt(0) === '+') {
        struct.prefix = numberString.slice(0, 2);
        struct.code = numberString.slice(2, 5);
        struct.number = numberString.slice(5);
    }
    else if (numberString.length === 11) {
        struct.prefix = numberString.slice(0, 1);
        struct.code = numberString.slice(1, 4);
        struct.number = numberString.slice(4);
    }
    else if (numberString.length === 10) {
        struct.code = numberString.slice(0, 4);
        struct.number = numberString.slice(4);
    }
    else {
        console.log('Error number format !');
    }
    return struct;

}


Numcap.prototype.readFileToArray = function (file) {
    var obj = JSON.parse(fs.readFileSync(file, 'utf8'));
    return obj;
}

Numcap.prototype.getFileNameByFirstDigit = function (digit) {
    var filename = '';
    var fileslist = fs.readdirSync(this.connection.options.dataDirectory);
    for (var i = 0; i < fileslist.length; i++) {
        if (fileslist[i].lastIndexOf(this.connection.options.fileType) != -1 && fileslist[i].lastIndexOf(digit) != -1) {
            filename = fileslist[i];
        }
    }
    return filename;
}

Numcap.prototype.readFilesNamesByConfiguration = function () {
    var fullFilesList = [];
    var fileslist = fs.readdirSync(this.connection.options.dataDirectory);
    for (var i = 0; i < fileslist.length; i++) {
        if (fileslist[i].lastIndexOf(this.connection.options.fileType) != -1) {
            fullFilesList.push(fileslist[i]);
        }
    }
    return fullFilesList;
}

module.exports = Numcap;