///// code for api.ai
var apiai = require('apiai');
var app = apiai("76919fa1f2184bcba1370ed5b6cca048");
var request = app.textRequest('hello');

request.on('response', function(response) {
    console.log(response);
});

request.on('error', function(error) {
    console.log(error);
});

request.end();
