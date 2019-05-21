var http = require('http');
var fs = require('fs');

// 服务器开启
function start(router, handle) {
    var config = JSON.parse(fs.readFileSync('./config.json', 'utf-8')),
        port = config.port || 80;
    http.createServer(function (request, response) {
        router(request.url, response, handle);
    }).listen(port);
    console.log('Start server');
}

module.exports = {
    start: start
}