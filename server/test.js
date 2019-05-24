var mysql = require('mysql');
var url = require('url');
var querystring = require('querystring');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'oubinke941025',
    database: 'bicycleManage',
    multipleStatements: true
});
var tableName = 'open_city';

connection.connect();

var inputUrl = '/open_city/open?name=1&op_mode=1&mode=1&sys_user_name=Bingo';
parse = url.parse(inputUrl).query;
var queryString = url.parse(inputUrl).query;
var queryObject = querystring.parse(queryString);
var tableName = /\/(\w+)\//.exec(inputUrl)[1];

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
var open_time  = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
sqlParams.push(open_time);
sqlParams.push(queryObject['sys_user_name']);
sqlParams.push(new Date().getTime());

connection.query(sql, sqlParams, function (err, result, fields) {
    if (err) {
        console.log('[SELECT ERROR] - ', err.message);
        return;
    }
    // item_list = result;
    console.log('--------------------------SELECT----------------------------');
    // data['code'] = 0;
    // data['result'] = {};
    // data['result']['page'] = 1;
    // data['result']['page_size'] = 10;
    // data['result']['total_count'] = result[1][0].total;
    // data['result']['page_count'] = Math.ceil(data['result']['total_count'] / data['result']['page_size']);
    // data['result']['item_list'] = result[0];
    // console.log(JSON.stringify(data));
    console.log(result);
    console.log('------------------------------------------------------------\n\n');
});

connection.end();