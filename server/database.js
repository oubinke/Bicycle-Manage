var mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'oubinke941025',
    database: 'bicycleManage',
    multipleStatements: true
});

module.exports = {
    connection: connection
}