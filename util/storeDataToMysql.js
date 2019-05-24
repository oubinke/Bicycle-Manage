var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'oubinke941025',
    database: 'bicycleManage'
});


function storeDataToMysql(data, tableName) {
    // console.log(data);
    data = JSON.parse(data);
    var items = data.result.item_list
    console.log(items);
    connection.connect();
    var addSql = {
        open_city: 'INSERT INTO ' + tableName + '(name, mode, op_mode, franchisee_name, city_admins, open_time, sys_user_name, update_time) VALUES(?,?,?,?,?,?,?,?)',
        employee: 'INSERT INTO ' + tableName + '(name, sex, isMarried, phone_num, identify_num, address) VALUES(?,?,?,?,?,?)',
    }

    items.map(function (item) {
        var addSqlParams = [];
        for (key in item) {
            if (key !== 'id') {
                addSqlParams.push(item[key]);
            }
        }
        connection.query(addSql[tableName], addSqlParams, function (err, result) {
            if (err) {
                console.log('[INSERT ERROR] - ', err.message);
                return;
            }

            console.log('--------------------------INSERT----------------------------');
            //console.log('INSERT ID:',result.insertId);        
            console.log('INSERT ID:', result);
            console.log('-----------------------------------------------------------------\n\n');
        })
    })
    connection.end();
}

module.exports = {
    storeDataToMysql: storeDataToMysql
}