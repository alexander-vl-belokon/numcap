
var file = require('./file');
var mongo = require('./mongo');


function Numcap(connection) {
    if (connection) {
        if (connection.type === 'file') {
            this.dataSource = new file(connection.options);           
        } else if (connection.type === 'mongodb') {
            this.dataSource = new mongo(connection.options);
        }
    } else {
        this.connection = this.defaultConnection;
    }
}

Numcap.prototype.defaultConnection = {
    'type': 'file',
    'options': {
        'dataDirectory': './data'
    }
};

Numcap.prototype.getData = function(number, callback){
    var structure = this.getStructureOfNumber(number);
    this.dataSource.getData(structure, callback);
}

Numcap.prototype.getStructureOfNumber = function (number) {
    var struct = {
        prefix: '',
        code: '',
        number: ''
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

module.exports = Numcap;