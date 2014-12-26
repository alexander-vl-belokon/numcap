
var file = require('./file');
var mongo = require('./mongo');
var pnf = require('phone-number-format');

function Numcap (connection) {
    if (connection && connection['type']) {
        switch (connection['type']){
            case 'mongo':
                this.dataSource = new mongo(connection.options);
                break;
            case 'file':
                this.dataSource = new file(connection.options);
                break;
            default:
                throw new Error('Unknown type of connection');
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

Numcap.prototype.getData = function (number, callback){
    if(!pnf.isValid(number)) {
        callback(new Error('Not valid number format'));
    } else {
        var structure = this.getStructureOfNumber(number);
        this.dataSource.getData(structure, callback);
    }
}

Numcap.prototype.getStructureOfNumber = function (number) {

    var numberString = pnf.normalize(number);

    var struct = {
        prefix: numberString.slice(0, 1),
        code: numberString.slice(1, 4),
        number: numberString.slice(4)
    };

    return struct;
}

module.exports = Numcap;