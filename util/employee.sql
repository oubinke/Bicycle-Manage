-- ----------------------------
--  Table structure for `employee`
-- ----------------------------
DROP TABLE IF EXISTS `employee`;
CREATE TABLE `employee` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` char(20) NOT NULL DEFAULT '',
  `sex` int(11) NOT NULL DEFAULT 1,
  `isMarried` int(11) NOT NULL DEFAULT 0,
  `phone_num` char(20) NOT NULL DEFAULT 0,
  `identify_num` char(20) NOT NULL DEFAULT '',
  `address` char(20) NOT NULL DEFAULT '', 
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;