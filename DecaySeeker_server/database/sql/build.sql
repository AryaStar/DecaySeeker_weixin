CREATE TABLE `users` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `wechat_username` varchar(255),
  `phone_number` varchar(255)
);

CREATE TABLE `check_record` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `status` int,
  `time` timestamp,
  `user_id` int
);
