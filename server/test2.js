var url = require('url');
var querystring = require('querystring');

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
var mode = {
    1: 1,
    2: 2
};
var op_mode = {
    1: 1,
    2: 2
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

console.log(sqlParams);

console.log(sql);