var fs = require('fs');
var sample = JSON.parse(fs.readFileSync('../db-sample.json', 'utf8'));

module.exports = sample;
