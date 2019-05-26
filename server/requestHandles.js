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


function query(response, queryUrl) {
    console.log('Handle query ' + queryUrl);
    databaseOperation.select(response, queryUrl);
    // response.writeHead(200, {
    //     'Content-Type': 'application/json; charset=utf-8',
    //     'Access-Control-Allow-Origin': '*'
    // });
    // response.end(JSON.stringify(data));
}

function create(response, createUrl) {
    console.log('Handle create ' + createUrl);
    databaseOperation.create(response, createUrl);
}

function update(response, createUrl) {
    console.log('Handle update ' + createUrl);
    databaseOperation.update(response, createUrl);
}

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