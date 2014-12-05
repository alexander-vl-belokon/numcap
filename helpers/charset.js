function cp1251ToUtf8(text){
    var Iconv = require('iconv').Iconv;
    var fromEnc = 'WINDOWS-1251';
    var toEnc = 'UTF-8';
    var translator = new Iconv(fromEnc,toEnc);
    return translator.convert(text).toString();
}

module.exports = {
    cp1251ToUtf8:cp1251ToUtf8
}