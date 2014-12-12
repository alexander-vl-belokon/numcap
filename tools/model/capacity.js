var mongoose = require('mongoose');

var CapacitySchema = new mongoose.Schema({
    "code": Number,
    "beginNumber": Number,
    "endNumber": Number,
    "capacity": Number,
    "operator": String,
    "region": String
});

var Capacity = mongoose.model('Capacity', CapacitySchema);



module.exports = Capacity;