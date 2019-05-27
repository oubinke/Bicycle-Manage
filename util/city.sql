-- ----------------------------
--  Table structure for `open_city`
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
  `update_time` datetime NOT NULL, 
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;