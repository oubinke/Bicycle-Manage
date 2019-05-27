-- ----------------------------
--  Table structure for `websites`
-- ----------------------------
DROP TABLE IF EXISTS `order_info`;
CREATE TABLE `order_info` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `order_num` char(20) NOT NULL DEFAULT '',
  `bike_num` char(20) NOT NULL DEFAULT '',
  `user_name` char(20) NOT NULL DEFAULT '',
  `phone_num` char(20) NOT NULL DEFAULT '',
  `distance` int(10),
  `total_time` int(10),
  `order_status` int(10) NOT NULL DEFAULT 1,
  `start_time` datetime NOT NULL,
  `end_time` datetime,
  `total_fee` int(10),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;