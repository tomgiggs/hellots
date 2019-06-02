CREATE DATABASE chat CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;

CREATE TABLE `d_channel_info` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL COMMENT '用户ID',
  `channel_id` int(11) DEFAULT NULL COMMENT '聊天通道ID',
  `is_group` tinyint(4) DEFAULT NULL COMMENT '是否群组',
  `disable` tinyint(4) DEFAULT NULL COMMENT '是否禁用',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4;

CREATE TABLE `d_users` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL COMMENT '用户ID',
  `user_name` varchar(200) DEFAULT NULL COMMENT '用户名',
  `friend_limit` int(11) DEFAULT NULL COMMENT '好友数限制',
  `birth_day` int(11) DEFAULT NULL COMMENT '生日',
  `location` varchar(200) DEFAULT NULL COMMENT '地址',
  `description` varchar(200) DEFAULT NULL COMMENT '签名',
  `avatar` varchar(200) DEFAULT NULL COMMENT '头像',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4;
