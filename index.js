var downloader = require('./tools/download.js');
var csvConverter = require('./tools/csv2json.js');
downloader.reloadFiles();
csvConverter.convert();