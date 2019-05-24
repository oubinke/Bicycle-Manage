var url = require('url');
var querystring = require('querystring');
var database = require('./database');

// 连接数据库
var connection = database.connection;
connection.connect();

function select(response, queryUrl) {
    // 根据传入的参数获得数据库中需要查询的表名
    var tableName = url.parse(queryUrl).pathname.slice(1);
    var queryString = url.parse(queryUrl).query;
    var queryObject = querystring.parse(queryString);
    // 如果是请求整个页面
    if (queryObject['page'] && Object.keys(queryObject).length === 1) {
        var pageNum = queryObject['page'];
        console.log('tableName ' + tableName);
        // SQL命令：获得数据库指定表中所有的条目
        var sql = 'SELECT * FROM ' + tableName;
        // SQL命令：获得数据库指定表中项目的总数
        var sqlCheckNum = 'SELECT COUNT(*) AS total FROM ' + tableName;
        var data = {};
        connection.query(sql + ';' + sqlCheckNum, function (err, result) {
            if (err) {
                console.log('[SELECT ERROR] - ', err.message);
                return;
            }
            // 初始化要发送给客户端的数据
            data['code'] = 0;
            data['result'] = {};
            data['result']['page'] = +pageNum;
            data['result']['page_size'] = 10;
            data['result']['total_count'] = result[1][0].total;
            data['result']['page_count'] = Math.ceil(data['result']['total_count'] / data['result']['page_size']);
            data['result']['item_list'] = result[0];
            response.writeHead(200, {
                'Content-Type': 'application/json; charset=utf-8',
                'Access-Control-Allow-Origin': '*'
            });
            response.end(JSON.stringify(data));
        });
    } else { // 根据特定关键字进行查询
        var city_name = {
            0: '',
            1: ' name = "北京"',
            2: ' name = "天津"',
            2: ' name = "上海"'
        };
        var mode = {
            0: '',
            1: ' mode = 1',
            2: ' mode = 2'
        };
        var op_mode = {
            0: '',
            1: ' op_mode = 1',
            2: ' op_mode = 2'
        };
        sql_city_name = city_name[queryObject['city']];
        sql_mode = mode[queryObject['mode']];
        sql_op_mode = op_mode[queryObject['op_mode']];
        var sql = 'SELECT * FROM ' + tableName;
        sql = sql + (queryObject['city'] === '0' ? '' : ' WHERE') + city_name[queryObject['city']];
        sql = sql + (queryObject['mode'] === '0' ? '' : (sql.indexOf('WHERE') > -1 ? ' AND' : ' WHERE')) + mode[queryObject['mode']];
        sql = sql + (queryObject['mode'] === '0' ? '' : (sql.indexOf('WHERE') > -1 ? ' AND' : ' WHERE')) + op_mode[queryObject['op_mode']];
        console.log('Query the database by : city_name:', sql_city_name, ' mode:', sql_mode, ' op_mode:', sql_op_mode);
        var data = {};
        var pageNum = queryObject['page'];
        connection.query(sql, function (err, result) {
            if (err) {
                console.log('[SELECT ERROR] - ', err.message);
                return;
            }
            // 初始化要发送给客户端的数据
            data['code'] = 0;
            data['result'] = {};
            data['result']['page'] = +pageNum;
            data['result']['page_size'] = 10;
            data['result']['total_count'] = result.length;
            data['result']['page_count'] = Math.ceil(data['result']['total_count'] / data['result']['page_size']);
            data['result']['item_list'] = result;
            console.log(data);
            response.writeHead(200, {
                'Content-Type': 'application/json; charset=utf-8',
                'Access-Control-Allow-Origin': '*'
            });
            response.end(JSON.stringify(data));
        });
    }
    // connection.end();
}

function create(response, createUrl) {
    var queryString = url.parse(createUrl).query;
    var queryObject = querystring.parse(queryString);
    var tableName = /\/(\w+)\//.exec(createUrl)[1];

    var city_name = {
        1: "北京",
        2: "天津",
        3: "上海"
    };

    var sql = 'INSERT INTO ' + tableName + '(name, mode, op_mode, franchisee_name, city_admins, open_time, sys_user_name, update_time) VALUES(?,?,?,?,?,?,?,?)';
    var sqlParams = [];
    sqlParams.push(city_name[queryObject['name']]);
    sqlParams.push(+queryObject['mode']);
    sqlParams.push(+queryObject['op_mode']);
    sqlParams.push('松果自营');
    sqlParams.push(queryObject['sys_user_name']);
    var date = new Date();
    var open_time = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
    sqlParams.push(open_time);
    sqlParams.push(queryObject['sys_user_name']);
    sqlParams.push(new Date().getTime());

    connection.query(sql, sqlParams, function (err, result, fields) {
        if (err) {
            console.log('[SELECT ERROR] - ', err.message);
            return;
        }
        response.writeHead(200, {
            'Content-Type': 'application/json; charset=utf-8',
            'Access-Control-Allow-Origin': '*'
        });
        var data = {code: '0'};
        response.end(JSON.stringify(data));
    });
}

module.exports = {
    select: select,
    create: create
}