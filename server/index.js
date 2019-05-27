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
// 城市管理页面请求的处理：城市查询和开通城市
handle['/open_city'] = requestHandles.query;
handle['/open_city/open'] = requestHandles.create;
// 订单管理页面请求的处理：订单查询、结束订单
handle['/order_info'] = requestHandles.query;
handle['/order_info/finish'] = requestHandles.update;
// 员工管理页面请求的处理：员工查询、创建员工、编辑员工、删除员工
handle['/employee'] = requestHandles.query;
handle['/employee/insert'] = requestHandles.create;
handle['/employee/update'] = requestHandles.update;
handle['/employee/delete'] = requestHandles.delete;
// 

server.start(router.route, handle);