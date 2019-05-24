var url = require('url');
var path = require('path');


module.exports = {
    route: function (inputUrl, response, handle) {
        // 请求资源的路径
        var pathname = url.parse(inputUrl).pathname;
        // 请求资源的扩展名
        var extname = path.extname(path.basename(pathname));
        // 根据不同的请求路径来执行不同的处理
        if (typeof handle[pathname] === 'function') {
            // 例如'/', '/manifest.json', '/open_city?page=1'等的请求
            console.log('According pathname Handle ' + pathname);
            handle[pathname](response, inputUrl);
        } else if (typeof handle[extname] === 'function') {
            // 例如'/static/js/main.7404934f.chunk.js', '/assets/end_point.png'等的请求
            console.log('According extname Handle ' + pathname);
            handle[extname](pathname, extname, response);
        } else {
            console.log('Not found ' + pathname);
            response.writeHead(404, { 'Content-Type': 'text/plain' });
            response.write('404 Not found');
            response.end();
        }
    }
}