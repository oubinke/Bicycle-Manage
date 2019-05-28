var url = require('url');
var querystring = require('querystring');
var database = require('./database');
var util = require('./util');

// 连接数据库
var connection = database.connection;
connection.connect();

// 查询数据库中相应表的所有内容
function select(response, queryUrl) {
    // 根据传入的参数获得数据库中需要查询的表名、
    var tableName = url.parse(queryUrl).pathname.slice(1);
    var queryString = url.parse(decodeURI(queryUrl)).query;
    var queryObject = querystring.parse(queryString);
    // 如果是请求整个页面
    if (queryObject['page'] && Object.keys(queryObject).length === 1) {
        // SQL命令：获得数据库指定表中所有的条目
        var sql = 'SELECT * FROM ' + tableName;
        var data = {};
        console.log(sql);
    } else { // 根据特定关键字进行查询
        var data = {};
        var sql = 'SELECT * FROM ' + tableName;
        if (tableName === 'open_city') {
            var city_name = {
                0: '',
                1: ' name = "北京"',
                2: ' name = "天津"',
                3: ' name = "上海"'
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
            sql += queryObject['city'] === '0' ? '' : (' WHERE' + city_name[queryObject['city']]);
            sql += queryObject['mode'] === '0' ? '' : (sql.indexOf('WHERE') > -1 ? ' AND' : ' WHERE' + mode[queryObject['mode']]);
            sql += queryObject['op_mode'] === '0' ? '' : (sql.indexOf('WHERE') > -1 ? ' AND' : ' WHERE' + op_mode[queryObject['op_mode']]);
            console.log(sql);
        } else if (tableName === 'employee') {
            var sql_name = queryObject['name'];
            var sql_phone_num = queryObject['phone_num'];
            sql += sql_name === '' ? '' : ' WHERE name = ' + '"' + sql_name + '"';
            sql += sql_phone_num === '' ? '' : ((sql.indexOf('WHERE') > -1 ? ' AND' : ' WHERE') + ' phone_num = ' + '"' + sql_phone_num + '"');
            console.log(sql);
        } else if (tableName === 'order_info') {
            var sql_order_num = queryObject['order_num'];
            var sql_start_time = queryObject['start_time'];
            var sql_end_time = queryObject['end_time'];
            var sql_order_status = queryObject['order_status'];

            sql += sql_order_num === '' ? '' : ' WHERE order_num = ' + '"' + sql_order_num + '"';
            if (sql_start_time) {
                sql += ((sql.indexOf('WHERE') > -1 ? ' AND' : ' WHERE') + ' Date(start_time) BETWEEN ' + '"' + sql_start_time + '"');
                if (!sql_end_time) {
                    var now = new Date();
                    sql_end_time = now.getFullYear() + '-' + now.getMonth() + '-' + now.getDay();
                }
                sql += ' AND ' + '"' + sql_end_time + '"';
            }
            sql += sql_order_status === '' ? '' : ((sql.indexOf('WHERE') > -1 ? ' AND' : ' WHERE') + ' order_status = ' + '"' + sql_order_status + '"');
            console.log(sql);
        }
    }
    connection.query(sql, function (err, result) {
        if (err) {
            console.log('[SELECT ERROR] - ', err.message);
            return;
        }
        // 初始化要发送给客户端的数据
        data['code'] = 0;
        data['result'] = {};
        data['result']['page'] = +queryObject['page'];
        data['result']['page_size'] = 10;
        data['result']['total_count'] = result.length;
        data['result']['page_count'] = Math.ceil(data['result']['total_count'] / data['result']['page_size']);
        data['result']['item_list'] = result;
        // console.log(data);
        response.writeHead(200, {
            'Content-Type': 'application/json; charset=utf-8',
            'Access-Control-Allow-Origin': '*'
        });
        response.end(JSON.stringify(data));
    });
}

// 在数据库某一个表中插入一项
function create(response, createUrl) {
    var queryString = url.parse(decodeURI(createUrl)).query;
    var queryObject = querystring.parse(queryString);
    var tableName = /\/(\w+)\//.exec(createUrl)[1];

    // 根据不同的表名来执行不同的SQL命令
    var createSql = {
        'open_city': 'INSERT INTO ' + tableName + '(name, mode, op_mode, franchisee_name, city_admins, open_time, sys_user_name, update_time) VALUES(?,?,?,?,?,?,?,?)',
        'employee': 'INSERT INTO ' + tableName + '(name, sex, isMarried, phone_num, identify_num, address) VALUES(?,?,?,?,?,?)',
    };

    // 根据不同的表名来获得不同的参数
    var createSqlParams = {
        'open_city': getCityParams,
        'employee': getEmployeeParams
    };

    function getCityParams() {
        var city_name = {
            1: "北京",
            2: "天津",
            3: "上海"
        };
        var sqlParams = [];
        sqlParams.push(city_name[queryObject['name']]);
        sqlParams.push(+queryObject['mode']);
        sqlParams.push(+queryObject['op_mode']);
        sqlParams.push('松果自营');
        sqlParams.push(queryObject['sys_user_name']);
        sqlParams.push(util.getFormatTime());
        sqlParams.push(queryObject['sys_user_name']);
        sqlParams.push(util.getFormatTime());

        return sqlParams;
    }

    function getEmployeeParams() {
        var sqlParams = [];
        sqlParams.push(queryObject['name']);
        sqlParams.push(+queryObject['sex']);
        sqlParams.push(+queryObject['isMarried']);
        sqlParams.push(queryObject['phone_num']);
        sqlParams.push(queryObject['identify_num']);
        sqlParams.push(queryObject['address']);

        return sqlParams;
    }

    var sql = createSql[tableName];
    var sqlParams = createSqlParams[tableName]();
    console.log(sql);
    console.log('sql参数：', sqlParams);
    connection.query(sql, sqlParams, function (err, result, fields) {
        if (err) {
            console.log('[SELECT ERROR] - ', err.message);
            return;
        }
        response.writeHead(200, {
            'Content-Type': 'application/json; charset=utf-8',
            'Access-Control-Allow-Origin': '*'
        });
        var data = { code: '0' };
        response.end(JSON.stringify(data));
    });
}

// 在数据库中某一表中更新一项
function update(response, createUrl) {
    // 注意这里要使用decodeURI对url进行解码
    var queryString = url.parse(decodeURI(createUrl)).query;
    var queryObject = querystring.parse(queryString);
    var tableName = /\/(\w+)\//.exec(createUrl)[1];

    var total_time = 10 + Math.floor(Math.random() * 20);
    var end_time = util.getFormatTime();
    var total_fee = 1 + Math.floor(Math.random() * 7);
    var distance = 1000 + Math.floor(Math.random() * 4000);

    // 根据不同的表名来执行不同的SQL命令
    var updateSql = {
        'employee': 'UPDATE ' + tableName + ' SET name = ' + '"' + queryObject.name + '"' + ', sex = ' + queryObject.sex + ',isMarried=' + queryObject.isMarried + ',phone_num=' + queryObject.phone_num + ',identify_num=' + queryObject.identify_num + ',address=' + '"' + queryObject.address + '"' + ' WHERE id = ' + queryObject.id,
        'order_info': 'UPDATE ' + tableName + ' SET total_time = ' + total_time + ', end_time = ' + '"' + end_time + '"' + ', total_fee = ' + total_fee + ', distance = ' + distance + ', order_status = 1 WHERE order_num = ' + '"' + queryObject.order_num + '"'
    };
    var sql = updateSql[tableName];
    console.log(sql);

    connection.query(sql, function (err, result, fields) {
        if (err) {
            console.log('[SELECT ERROR] - ', err.message);
            return;
        }
        response.writeHead(200, {
            'Content-Type': 'application/json; charset=utf-8',
            'Access-Control-Allow-Origin': '*'
        });
        var data = { code: '0' };
        response.end(JSON.stringify(data));
    });
}

// 删除数据库中某一项
function dele(response, createUrl) {
    var queryString = url.parse(createUrl).query;
    var queryObject = querystring.parse(queryString);
    var tableName = /\/(\w+)\//.exec(createUrl)[1];
    var sql = 'DELETE FROM ' + tableName + ' WHERE id = ' + queryObject.id;
    console.log(sql);
    connection.query(sql, function (err, result, fields) {
        if (err) {
            console.log('[SELECT ERROR] - ', err.message);
            return;
        }
        response.writeHead(200, {
            'Content-Type': 'application/json; charset=utf-8',
            'Access-Control-Allow-Origin': '*'
        });
        var data = { code: '0' };
        response.end(JSON.stringify(data));
    });
}

module.exports = {
    select: select,
    create: create,
    update: update,
    delete: dele
}