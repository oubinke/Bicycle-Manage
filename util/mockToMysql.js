var https = require('https');
var saveData = require('./storeDataToMysql');

// 从指定url获取数据
var requestUrl = 'https://www.easy-mock.com/mock/5cb5d9425ea1070405312b0f/api/open_city';
https.get(requestUrl, function (response) {
    var body = [];

    console.log(response.statusCode);
    console.log(response.headers);

    response.on('data', function (chunk) {
        body.push(chunk);
    });

    response.on('end', function () {
        body = Buffer.concat(body);
        // console.log(body.toString());
        // 将请求到的数据存储至MySQL
        saveData.storeDataToMysql(body.toString());
    });
});