function cp1251ToUtf8(text){
    var Iconv = require('iconv').Iconv;
    var fromEnc = 'WINDOWS-1251';
    var toEnc = 'UTF-8';
    var translator = new Iconv(fromEnc,toEnc);
    return translator.convert(text).toString();
}

function changeFileCharset(source,fromCharset,toCharset){
    var spawn = require('child_process').spawn;
    var iconv = spawn('iconv', ['-f',fromCharset, '-t', toCharset, source,'-o', source+'_']);
    var mv = spawn('mv', [source+'_', source]);
    iconv.stdout.setEncoding('utf8');
    iconv.stdout.on('data', function (data) {
        mv.stdin.write(data);
        var str = data.toString()
        var lines = str.split(/(\r?\n)/g);
        console.log(lines.join(""));
    });
    iconv.on('close', function (code) {
        console.log('encode process exit code ' + code);
        mv.stdin.end();
    });
}

module.exports = {
    cp1251ToUtf8:cp1251ToUtf8,
    changeFileCharset:changeFileCharset
}