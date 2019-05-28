# 共享单车管理系统
本项目前端使用React框架，

## 项目演示地址
http://47.93.98.216:8000

## 运行方式

1. clone项目到本地

    git clone git@github.com:oubinke/Bicycle-Manage.git
    
2. 进入项目路径下
    npm install
3. 本项目布局使用的是Less，所以对node_modules\react-scripts\config\webpack.config.js文件中319行加入如下内容
```
......
oneOf: [
    {
        test: /\.less$/,
        use: [{
            loader: 'style-loader',
        }, {
            loader: 'css-loader', // translates CSS into CommonJS
        }, {
            loader: 'less-loader', // compiles Less to CSS
        }]
    },
    {
        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
        loader: require.resolve('url-loader'),
        ......
]
```
4. 编译项目
    npm run build

5. 生成项目所需要的数据

6. 进入server/文件夹下，开启服务器
    node index.js

7. 在浏览器中输入localhost:8888


## Todo
* 首屏加载性能优化
* 登录页面
* 权限设置页面
