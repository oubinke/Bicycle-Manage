var http = require('http');
var fs = require('fs');
var path = require('path');

http.createServer(function (request, response) {
    console.log('------request------');
    console.log(request.url);
    if (request.url === '/') {
        var pathname = path.join('../build', 'index.html');
        fs.readFile(pathname, function (err, data) {
            if (err) {
                console.log(err);
            } else {
                response.writeHead(200, { 'Content-Tpye': 'text/html' });
                response.end(data);
            }
        });
    } else {
        var pathname = path.join('../build', request.url);
        var extname = path.extname(path.basename(pathname));
        if (extname === '.js') {
            fs.readFile(pathname, function (err, data) {
                if (err) {
                    console.log(err);
                } else {
                    response.writeHead(200, { 'Content-Tpye': 'application/javascript; charset=UTF-8' });
                    response.end(data);
                }
            });
        } else if (extname === '.css') {
            fs.readFile(pathname, function (err, data) {
                if (err) {
                    console.log(err);
                } else {
                    response.writeHead(200, { 'Content-Tpye': 'text/css' });
                    response.end(data);
                }
            });
        } else if (extname === '.svg') {
            // 必须异步读取.svg文件
            fs.readFile(pathname, "binary", function (error, file) {
                if (error) {
                    response.writeHead(500, { "Content-Type": "text/plain" });
                    response.end();
                } else {
                    response.writeHead(200, { "Content-Type": "image/svg+xml" });
                    response.write(file, "binary");
                    response.end();
                }
            });
        } else if (request.url === '/manifest.json') {
            fs.readFile(pathname, function (err, data) {
                if (err) {
                    console.log(err);
                } else {
                    response.writeHead(200, { 'Content-Tpye': 'application/json' });
                    response.end(data);
                }
            });
        }

    }
}).listen(8888);