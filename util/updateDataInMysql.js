var mysql = require('mysql');
var Mock = require('mockjs');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'oubinke941025',
    database: 'bicycleManage',
    multipleStatements: true
});

connection.connect();

// updateCityName();
// updatePhoneNumAndIdNum();
// updatePhoneNumInOrderTable();
updateTimeInOpenCity();

// 数据库中open_city表，name列的内容由easy mock随机生成的，但页面查询时的选项只有三个，分别是北京、天津和上海。
// 所以需要将数据库中name列的内容重新更新一下
function updateCityName() {

    var tableName = 'open_city';
    for (var i = 1; i < 101; i++) {
        updateCity(i, tableName);
    }
}

function updateCity(id, tableName) {
    var cityName = ['北京', '天津', '上海'];
    var randomSelectCity = cityName[Math.floor(Math.random() * 3)];
    var sql = 'UPDATE ' + tableName + ' SET name = ' + '"' + randomSelectCity + '"' + ' WHERE id = ' + id;
    // console.log(sql);
    connection.query(sql, function (err, result, fields) {
        if (err) {
            console.log('[SELECT ERROR] - ', err.message);
            return;
        }
    });
}

// 数据库中employee表，phone_num列和identify_num列的内容由easy mock随机生成，所生成的内容不符合规范。
// 所以需要将数据库中phone_num列和identify_num列的内容重新更新一下
function updatePhoneNumAndIdNum() {

    var tableName = 'employee';
    for (var i = 1; i < 31; i++) {
        updatePhoneAndID(i, tableName);
    }
}

function updatePhoneAndID(id, tableName) {
    var phoneNum = getPhoneNum();
    var sql = 'UPDATE ' + tableName + ' SET phone_num = ' + phoneNum + ' , identify_num = ' + '"' + Mock.Random.id() + '"' + ' WHERE id = ' + id;
    connection.query(sql, function (err, result, fields) {
        if (err) {
            console.log('[SELECT ERROR] - ', err.message);
            return;
        }
    });
}

function getPhoneNum() {
    var prefixArray = new Array("130", "131", "132", "133", "135", "137", "138", "170", "187", "189");
    var i = parseInt(10 * Math.random());
    var prefix = prefixArray[i];
    for (var j = 0; j < 8; j++) {
        prefix += Math.floor(Math.random() * 10);
    }
    return prefix;
}

function updatePhoneNumInOrderTable() {
    var tableName = 'order_info';
    for (var i = 1; i < 121; i++) {
        updatePhoneNum(i, tableName);
    }
}

function updatePhoneNum(id, tableName) {
    var phoneNum = getPhoneNum();
    var sql = 'UPDATE ' + tableName + ' SET phone_num = ' + phoneNum + ' WHERE id = ' + id;
    connection.query(sql, function (err, result, fields) {
        if (err) {
            console.log('[SELECT ERROR] - ', err.message);
            return;
        }
    });
}

function updateTimeInOpenCity() {
    var tableName = 'open_city';
    for (var i = 1; i < 107; i++) {
        updateTime(i, tableName);
    }
}

function updateTime(id, tableName) {
    var time = Mock.Random.datetime();
    var sql = 'UPDATE ' + tableName + ' SET update_time = ' + '"' + time + '"' + ' WHERE id = ' + id;
    connection.query(sql, function (err, result, fields) {
        if (err) {
            console.log('[SELECT ERROR] - ', err.message);
            return;
        }
    });
}

connection.end();