# 生成数据
这个文件夹包括生成项目所需数据的一些程序。

## 在数据库中创建表
`city.sql`, `employee.sql`, `order.sql`分别对应城市管理页面，员工管理页面，订单管理页面在数据库中对应的表。

进入MySQL数据库，运行`source /your_dir/city.sql`来生成对应的表结构。

## 将easy mock所生成的数据插入到MySQL中
本项目所有数据都是使用easy mock随机生成的。

1.修改`storeDataToMysql.js`和`updateDataInMysql.js`文件中的[`password`](./storeDataToMysql.js#L9)和[`database`](./storeDataToMysql.js#L10)；

2.修改`mockToMysql.js`中的[`requestUrl`](./mockToMysql.js#L9)参数

> 城市管理：https://www.easy-mock.com/mock/5cb5d9425ea1070405312b0f/api/open_city  
> 员工管理：https://www.easy-mock.com/mock/5cb5d9425ea1070405312b0f/api/employee  
> 订单管理：https://www.easy-mock.com/mock/5cb5d9425ea1070405312b0f/api/order_info  

3.运行数据导入代码
```
node mockToMysql.js
```

4. 运行数据更新代码。由于easy mock所生成的数据还有些不完善，需要更新数据库中部分数据。
```
node updateDataInMysql.js
```
