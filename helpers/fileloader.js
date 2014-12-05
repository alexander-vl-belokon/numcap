function downloadFileAndSaveToDirectory(source,destination){
    var http = require('http');
    var fs = require('fs');
    var file = fs.createWriteStream(destination);
    var request = http.get(source, function(response) {
        response.pipe(file);
    });
}

function downloadFileAndSaveToDirectoryByWget(source,destination){
    var spawn = require('child_process').spawn;
    var prc = spawn('wget', ['-q',source, '-O', destination]);
    prc.stdout.setEncoding('utf8');
    prc.stdout.on('data', function (data) {
        var str = data.toString()
        var lines = str.split(/(\r?\n)/g);
        console.log(lines.join(""));
    });
    prc.on('close', function (code) {
        console.log('process exit code ' + code);
    });
}

module.exports = {
    downloadFileAndSaveToDirectory:downloadFileAndSaveToDirectory,
    downloadFileAndSaveToDirectoryByWget:downloadFileAndSaveToDirectoryByWget
}