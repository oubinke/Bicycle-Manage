/*
 Navicat MySQL Data Transfer

 Source Server         : 127.0.0.1
 Source Server Version : 50621
 Source Host           : localhost
 Source Database       : RUNOOB

 Target Server Version : 50621
 File Encoding         : utf-8

 Date: 05/18/2016 11:44:07 AM
*/

SET NAMES utf8;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
--  Table structure for `websites`
-- ----------------------------
DROP TABLE IF EXISTS `open_city`;
CREATE TABLE `open_city` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` char(20) NOT NULL DEFAULT '',
  `mode` int(11) NOT NULL DEFAULT 1,
  `op_mode` int(11) NOT NULL DEFAULT 1,
  `franchisee_name` char(20) NOT NULL DEFAULT '',
  `city_admins` char(20) NOT NULL DEFAULT '',
  `open_time` datetime NOT NULL,
  `sys_user_name` char(20) NOT NULL DEFAULT '',
  `update_time` bigint(40) NOT NULL, 
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
--  Records of `websites`
-- ----------------------------
-- BEGIN;
-- INSERT INTO `websites` VALUES ('1', 'Google', 'https://www.google.cm/', '1', 'USA'), ('2', '淘宝', 'https://www.taobao.com/', '13', 'CN'), ('3', '菜鸟教程', 'http://www.runoob.com/', '4689', 'CN'), ('4', '微博', 'http://weibo.com/', '20', 'CN'), ('5', 'Facebook', 'https://www.facebook.com/', '3', 'USA');
-- COMMIT;

-- SET FOREIGN_KEY_CHECKS = 1;
