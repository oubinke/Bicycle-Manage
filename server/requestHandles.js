var fs = require('fs');
var path = require('path');

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


function query(response, query) {
    var data = { "code": "0", "result": { "page": 3, "page_size": 10, "total_count": 60, "page_count": 6, "item_list": [{ "id": 1, "name": "上海市", "mode": 2, "op_mode": 1, "franchisee_id": 77, "franchisee_name": "松果自营", "city_admins": [{ "user_name": "孟伟", "user_id": 10001 }, { "user_name": "贺军", "user_id": 10002 }], "open_time": "1982-11-29 19:24:54", "sys_user_name": "任超", "update_time": 1520476737000 }, { "id": 2, "name": "郴州市", "mode": 2, "op_mode": 2, "franchisee_id": 77, "franchisee_name": "松果自营", "city_admins": [{ "user_name": "尹杰", "user_id": 10003 }, { "user_name": "孟霞", "user_id": 10004 }], "open_time": "1983-03-13 16:17:16", "sys_user_name": "何明", "update_time": 1520476737000 }, { "id": 3, "name": "苗栗县", "mode": 1, "op_mode": 1, "franchisee_id": 77, "franchisee_name": "松果自营", "city_admins": [{ "user_name": "谭勇", "user_id": 10005 }, { "user_name": "蔡静", "user_id": 10006 }], "open_time": "1979-09-22 01:45:00", "sys_user_name": "傅磊", "update_time": 1520476737000 }, { "id": 4, "name": "海外", "mode": 2, "op_mode": 1, "franchisee_id": 77, "franchisee_name": "松果自营", "city_admins": [{ "user_name": "赖明", "user_id": 10007 }], "open_time": "2002-04-13 16:00:28", "sys_user_name": "程静", "update_time": 1520476737000 }, { "id": 5, "name": "林芝地区", "mode": 1, "op_mode": 2, "franchisee_id": 77, "franchisee_name": "松果自营", "city_admins": [{ "user_name": "丁勇", "user_id": 10008 }], "open_time": "2015-02-22 21:46:26", "sys_user_name": "龚杰", "update_time": 1520476737000 }, { "id": 6, "name": "双鸭山市", "mode": 1, "op_mode": 2, "franchisee_id": 77, "franchisee_name": "松果自营", "city_admins": [{ "user_name": "胡静", "user_id": 10009 }, { "user_name": "乔霞", "user_id": 10010 }], "open_time": "1995-09-04 04:12:27", "sys_user_name": "杨勇", "update_time": 1520476737000 }, { "id": 7, "name": "丽江市", "mode": 1, "op_mode": 2, "franchisee_id": 77, "franchisee_name": "松果自营", "city_admins": [{ "user_name": "袁娜", "user_id": 10011 }, { "user_name": "徐强", "user_id": 10012 }], "open_time": "1998-11-06 05:59:48", "sys_user_name": "叶刚", "update_time": 1520476737000 }, { "id": 8, "name": "北海市", "mode": 1, "op_mode": 2, "franchisee_id": 77, "franchisee_name": "松果自营", "city_admins": [{ "user_name": "秦明", "user_id": 10013 }, { "user_name": "彭涛", "user_id": 10014 }], "open_time": "1985-11-08 22:04:12", "sys_user_name": "林静", "update_time": 1520476737000 }, { "id": 9, "name": "海西蒙古族藏族自治州", "mode": 1, "op_mode": 2, "franchisee_id": 77, "franchisee_name": "松果自营", "city_admins": [{ "user_name": "阎静", "user_id": 10015 }, { "user_name": "方超", "user_id": 10016 }], "open_time": "2001-06-02 01:17:57", "sys_user_name": "吴霞", "update_time": 1520476737000 }, { "id": 10, "name": "和田地区", "mode": 2, "op_mode": 2, "franchisee_id": 77, "franchisee_name": "松果自营", "city_admins": [{ "user_name": "崔平", "user_id": 10017 }, { "user_name": "雷磊", "user_id": 10018 }], "open_time": "1979-08-12 08:57:03", "sys_user_name": "乔秀兰", "update_time": 1520476737000 }] } };
    response.writeHead(200, {
        'Content-Type': 'application/json; charset=utf-8',
        'Access-Control-Allow-Origin': '*'
    });
    response.end(JSON.stringify(data));
}

module.exports = {
    start: start,
    manifest: manifest,
    getJs: getJs,
    getCss: getCss,
    getSvg: getSvg,
    getPng: getPng,
    getJpg: getJpg,
    query: query
}