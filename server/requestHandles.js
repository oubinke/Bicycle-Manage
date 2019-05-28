var fs = require('fs');
var path = require('path');
var databaseOperation = require('./databaseOperation');

var config = JSON.parse(fs.readFileSync('./config.json', 'utf-8')),
    root = config.root || '.';

var MIME = {
    '.css': 'text/css',
    '.js': 'application/javascript; charset=UTF-8',
    '.css': 'text/css',
    '.svg': 'image/svg+xml',
    '.png': 'image/png',
    '.jpg': 'image/jpeg'
};

// '/'请求对应的处理
function start(response) {
    var pathname = path.join(root, 'index.html');
    fs.readFile(pathname, function (err, data) {
        if (err) {
            console.log(err);
        } else {
            response.writeHead(200, { 'Content-Tpye': 'text/html' });
            response.end(data);
        }
    });
}

// '/manifest.json'请求对应的处理
function manifest(response) {
    var pathname = path.join(root, 'manifest.json');
    fs.readFile(pathname, function (err, data) {
        if (err) {
            console.log(err);
        } else {
            response.writeHead(200, { 'Content-Tpye': 'application/json' });
            response.end(data);
        }
    });
}

// 获得以.js结尾的静态文件
function getJs(pathname, extname, response) {
    pathname = path.join(root, pathname);
    fs.readFile(pathname, function (err, data) {
        if (err) {
            console.log(err);
        } else {
            response.writeHead(200, { 'Content-Tpye': MIME[extname] });
            response.end(data);
        }
    });
}

// 获得以.css结尾的静态文件
function getCss(pathname, extname, response) {
    pathname = path.join(root, pathname);
    fs.readFile(pathname, function (err, data) {
        if (err) {
            console.log(err);
        } else {
            response.writeHead(200, { 'Content-Tpye': MIME[extname] });
            response.end(data);
        }
    });
}

// 获得以.svg结尾的静态文件
function getSvg(pathname, extname, response) {
    pathname = path.join(root, pathname);
    fs.readFile(pathname, "binary", function (error, file) {
        if (error) {
            response.writeHead(500, { "Content-Type": "text/plain" });
            response.end();
        } else {
            response.writeHead(200, { "Content-Type": MIME[extname] });
            response.write(file, "binary");
            response.end();
        }
    });
}

// 获得以.png结尾的静态文件
function getPng(pathname, extname, response) {
    pathname = path.join(root, pathname);
    fs.readFile(pathname, "binary", function (error, file) {
        if (error) {
            response.writeHead(500, { "Content-Type": "text/plain" });
            response.end();
        } else {
            response.writeHead(200, { "Content-Type": MIME[extname] });
            response.write(file, "binary");
            response.end();
        }
    });
}

// 获得以.jpg结尾的静态文件
function getJpg(pathname, extname, response) {
    pathname = path.join(root, pathname);
    fs.readFile(pathname, "binary", function (error, file) {
        if (error) {
            response.writeHead(500, { "Content-Type": "text/plain" });
            response.end();
        } else {
            response.writeHead(200, { "Content-Type": MIME[extname] });
            response.write(file, "binary");
            response.end();
        }
    });
}

// 查询数据库中的内容
function query(response, queryUrl) {
    console.log('Handle query ' + queryUrl);
    databaseOperation.select(response, queryUrl);
}

// 往数据库中添加内容
function create(response, createUrl) {
    console.log('Handle create ' + createUrl);
    databaseOperation.create(response, createUrl);
}

// 更新数据库中的内容
function update(response, createUrl) {
    console.log('Handle update ' + createUrl);
    databaseOperation.update(response, createUrl);
}

// 删除数据库中的内容
function dele(response, createUrl) {
    console.log('Handle delete ' + createUrl);
    databaseOperation.delete(response, createUrl);
}

module.exports = {
    start: start,
    manifest: manifest,
    getJs: getJs,
    getCss: getCss,
    getSvg: getSvg,
    getPng: getPng,
    getJpg: getJpg,
    query: query,
    create: create,
    update: update,
    delete: dele
}