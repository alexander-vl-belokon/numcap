var fs = require('fs');

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
        }
    } else {
        this.connection = this.defaultConnection;
    }
}

Numcap.prototype.defaultConnection = {
    'type': '',
    'options': {
        'fileType': '.json',
        'dataDirectory': 'data/'
    }
};
Numcap.prototype.connection = {};
Numcap.prototype.connectionFiletype = '';


Numcap.prototype.getOperator = function (number) {
    var foundCapacityObjects = this.basicSearchByNumber(number);
    return foundCapacityObjects.pop().operator;
}

Numcap.prototype.basicSearchByNumber = function (number) {
    var numberStruct = this.getStructuredNumber(number);
    var filename = this.getFileNameByFirstDigit(numberStruct.code.charAt(0));
    var filepath = this.connection.options.dataDirectory + filename;
    var capacity = this.readFileToArray(filepath);
    var firstLevelSearch = this.filterByCode(capacity, numberStruct.code);
    var secondLevelSearch = this.filterByNumber(firstLevelSearch, numberStruct.number);
    return secondLevelSearch;
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

Numcap.prototype.getRegion = function (number) {
    var foundCapacityObjects = this.basicSearchByNumber(number);
    return foundCapacityObjects.pop().region;
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