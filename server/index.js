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
handle['/open_city/open'] = requestHandles.create;
handle['/employee'] = requestHandles.query;
handle['/employee/update'] = requestHandles.update;

server.start(router.route, handle);