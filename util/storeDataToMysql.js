var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'oubinke941025',
  database : 'bicycleManage'
});


function storeDataToMysql(data) {
    // console.log(data);
    data = JSON.parse(data);
    var items = data.result.item_list
    console.log(items);
    connection.connect();
    items.map(function(item) {
        var addSql = 'INSERT INTO open_city(name, mode, op_mode, franchisee_name, city_admins, open_time, sys_user_name, update_time) VALUES(?,?,?,?,?,?,?,?)';
        var addSqlParams = [];
        for (key in item) {
            if (key !== 'id') {
                addSqlParams.push(item[key]);
            }
        }
        connection.query(addSql, addSqlParams, function (err, result){
            if(err){
                console.log('[INSERT ERROR] - ',err.message);
                return;
               }        
        
              console.log('--------------------------INSERT----------------------------');
              //console.log('INSERT ID:',result.insertId);        
              console.log('INSERT ID:',result);        
              console.log('-----------------------------------------------------------------\n\n');  
        })
    })
    connection.end();
}

module.exports = {
    storeDataToMysql: storeDataToMysql
}