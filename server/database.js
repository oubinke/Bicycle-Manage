var mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'oubinke941025',
    database: 'bicycleManage',
    multipleStatements: true,
    // 强制日期类型(TIMESTAMP, DATETIME, DATE)以字符串返回，而不是一个javascript Date对象（格林威治标准时间）返回. (默认: false)
    dateStrings: true
});

module.exports = {
    connection: connection
}