var server = require('./server');
var router = require('./router');
var requestHandles = require('./requestHandles');

var handle = {};
handle['/'] = requestHandles.start;
handle['/manifest.json'] = requestHandles.manifest;
handle['.js'] = requestHandles.getJs;
handle['.css'] = requestHandles.getCss;
handle['.svg'] = requestHandles.getSvg;
handle['.png'] = requestHandles.getPng;
handle['.jpg'] = requestHandles.getJpg;
handle['/open_city'] = requestHandles.query;

server.start(router.route, handle);