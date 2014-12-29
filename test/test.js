
var numcap = require('../lib/numcap');

describe('Numcap', function(){
  
    it('all will be ok', function(done){
        var finder = new numcap();
        finder.getData("8-913-529-29-26", function (err, data) {
            if (err) console.log(err);
            done();
        });
    });

    it('error in number', function(done){
        var finder = new numcap();
        finder.getData("8-913-529", function (err, data) {
            if (err) done();
        });
    });

});