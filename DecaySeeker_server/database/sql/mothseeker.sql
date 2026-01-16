/*
 Navicat Premium Data Transfer

 Source Server         : MothSeeker
 Source Server Type    : MySQL
 Source Server Version : 50726
 Source Host           : localhost:3306
 Source Schema         : mothseeker

 Target Server Type    : MySQL
 Target Server Version : 50726
 File Encoding         : 65001

 Date: 08/08/2021 17:19:29
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for chat_relations
-- ----------------------------
DROP TABLE IF EXISTS `chat_relations`;
CREATE TABLE `chat_relations`  (
  `patient_id` int(11) NOT NULL,
  `doctor_id` int(11) NOT NULL,
  PRIMARY KEY (`patient_id`, `doctor_id`) USING BTREE
) ENGINE = MyISAM CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Fixed;

-- ----------------------------
-- Records of chat_relations
-- ----------------------------

-- ----------------------------
-- Table structure for check_record
-- ----------------------------
DROP TABLE IF EXISTS `check_record`;
CREATE TABLE `check_record`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `status` int(11) NULL DEFAULT NULL,
  `time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `user_id` int(11) NULL DEFAULT NULL,
  `token` int(255) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 9 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Fixed;

-- ----------------------------
-- Records of check_record
-- ----------------------------
INSERT INTO `check_record` VALUES (1, 0, '2021-08-07 10:54:11', 1, 231);
INSERT INTO `check_record` VALUES (2, 0, '2021-08-07 10:54:13', 2, 232);
INSERT INTO `check_record` VALUES (3, 1, '2021-08-07 10:57:12', 1, 15116);
INSERT INTO `check_record` VALUES (4, 1, '2021-08-07 11:03:18', 1, 234);
INSERT INTO `check_record` VALUES (5, 0, '2021-08-07 10:54:16', 1, 235);
INSERT INTO `check_record` VALUES (6, 0, '2021-08-07 10:54:19', 1, 236);
INSERT INTO `check_record` VALUES (7, 0, '2021-08-07 11:21:45', 1, 838412);
INSERT INTO `check_record` VALUES (8, 0, '2021-08-07 14:05:21', 1, 780172);

-- ----------------------------
-- Table structure for doctors
-- ----------------------------
DROP TABLE IF EXISTS `doctors`;
CREATE TABLE `doctors`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `department` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `field` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `introduction` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `phone` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 2 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of doctors
-- ----------------------------
INSERT INTO `doctors` VALUES (1, '赵小芳', '儿童口腔科', '诊治和预防各类儿童常见口腔疾病，尤其对罕见牙周疾病诊治和预防具有独特经验', '副主任医师，获得医学博士学位，有多年的国外访问学者的经历。曾任国际口腔儿童协会会员。工作期间先后主持并参与国家级研究课题多项，主持省部级教学改革项目多项。在国际，国内期刊发表30余篇论文。', '028-80000000');

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `wechat_username` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `phone_number` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 2 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES (1, 'WhileBug', '17883693551');

SET FOREIGN_KEY_CHECKS = 1;
