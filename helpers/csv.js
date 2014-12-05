function parseCsv(data,splitter){
    var csv = new Array();
    var lines = data.split('\n');
    for(var i = 0;i < lines.length;i++){
        csv[i]=lines[i].split(splitter);
    }
    return csv;
}

module.exports = {
    parseCsv:parseCsv
}