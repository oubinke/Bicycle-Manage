// 数据库中城市的位置由easy mock随机生成的，但页面查询是的选项只有三个，分别是北京、天津和上海。
// 所以需要修改数据库中open_city表，name列的内容

var mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'oubinke941025',
    database: 'bicycleManage',
    multipleStatements: true
});
var tableName = 'open_city';

connection.connect();
for (var i = 1; i<101; i ++) {
    updateData(i);
}

function updateData(id) {
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

connection.end();