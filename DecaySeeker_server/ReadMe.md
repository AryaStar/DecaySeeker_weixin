# DecaySeeker 服务器端代码

./database：存储数据的文件夹

app.py：主程序

## 部署方式

运行database/sql/mothseeker.sql文件，构建mysql数据库

进入主文件夹，输入flask run运行

## 与微信端的交互

### 接口说明

#### 核心功能相关接口

##### createNewRecordById接口

为id为user_id的用户创建一个新的检查记录

- user_id：需要查询的用户的id

示例：

http://127.0.0.1:5000/createNewRecordById?user_id=1

```
{
	"signal": "200", 
	"token": "838412"
}
```

##### getAllRecordsNoByUserId接口

查询id为user_id的用户的所有检查任务

- user_id：需要查询的用户的id

示例：

http://127.0.0.1:5000/getAllRecordsNoByUserId?user_id=1

```
{
  "signal": "200",
  "records": [
    {
      "id": 1,
      "status": 0,
      "time": "2021-08-05 18:08:14",
      "user_id": 1
    },
  ]
}
```

##### getDataByNo接口

返回记录编号为record_no的记录的数据

- record_no：检查记录的编号No

示例：

http://127.0.0.1:5000/getDataByNo?record_no=1

```
{
  "signal": "200",
  "data": [
    {
      "position": 1,
      "ph": 7,
      "voltage": 2
    },
  ]
}
```

##### getReportByNo接口

返回记录编号为record_no的记录的分析报告

- record_no：检查记录的编号No

示例：

http://127.0.0.1:5000/getReportByNo?record_no=1

##### getVideoByNo接口

返回记录编号为record_no的记录的分析视频

- record_no：检查记录的编号No

示例：

http://127.0.0.1:5000/getVideoByNo?record_no=1

##### getTokenByCheckNo接口

返回编号为record_no的记录的验证码token

- record_np：检查记录的编号No

示例：

http://127.0.0.1:5000/getTokenByCheckNo?record_no=1

```
{
	"signal": "200", 
	"token": 231
}
```

#### 查找医生信息相关接口

##### getDoctorById接口

返回id为doctor_id的医生的信息

- doctor_id：医生的编号id

示例：

http://127.0.0.1:5000/getDoctorById?doctor_id=1

```
{
	"signal": "200",
 	"doctor": {
			"id": 1, 
			"name": "赵小芳", 
			"department": "儿童口腔科", 
			"field": "诊治和预防各类儿童常见口腔疾病，尤其对罕见牙周疾病诊治和预防具有独特经验", 
			"phone": "副主任医师，获得医学博士学位，有多年的国外访问学者的经历。曾任国际口腔儿童协会会员。工作期间先后主持并参与国家级研究课题多项，主持省部级教学改革项目多项。在国际，国内期刊发表30余篇论文。"
	}
}
```

##### getAllDoctors接口

获取所有医生信息的接口

示例：

http://127.0.0.1:5000/getAllDoctors

```
{
	"signal": "200",
 	"doctor": [
		{
			"id": 1, 
			"name": "赵小芳", 
			"department": "儿童口腔科", 
			"field": "诊治和预防各类儿童常见口腔疾病，尤其对罕见牙周疾病诊治和预防具有独特经验", 
			"phone": "副主任医师，获得医学博士学位，有多年的国外访问学者的经历。曾任国际口腔儿童协会会员。工作期间先后主持并参与国家级研究课题多项，主持省部级教学改革项目多项。在国际，国内期刊发表30余篇论文。"
		}
	]
}
```

#### 医患聊天接口

##### addChatById接口

新增一个聊天记录的接口

- doctor_id：聊天记录对应的医生的编号
- patient_id：聊天记录对应的病患的编号
- sender：聊天记录发送者是谁，doctor表示是医生发送给病患的，patient则表示反之
- content：聊天记录的具体内容

示例：

http://127.0.0.1:5000/addChatById?doctor_id=1&patient_id=1&sender=doctor&content=医生你好哈哈哈哈哈

```
{
	"signal": "200"
}
```

##### getChatById接口

查找之前聊天记录的接口

- doctor_id：聊天记录对应的医生的编号

- patient_id：聊天记录对应的病患的编号

示例：

http://127.0.0.1:5000/getChatById?doctor_id=1&patient_id=1

```
{
    "signal": "200",
    "chat_records": [
        {
            "sender": "patient",
            "receiver": "doctor",
            "timestamp": "2016-04-07 10:25:09",
            "content": "赵医生您好！"
        },
        {
            "sender": "doctor",
            "receiver": "patient",
            "timestamp": "2016-04-07 10:25:20",
            "content": "罗先生你好，有什么要咨询的吗！"
        },
        {
            "sender": "doctor",
            "receiver": "patient",
            "timestamp": "2021-08-07 17:18:45",
            "content": "医生你好哈哈哈哈哈"
        },
        {
            "sender": "doctor",
            "receiver": "patient",
            "timestamp": "2021-08-07 17:18:55",
            "content": "医生你好哈哈哈哈哈"
        }
    ]
}
```

### 业务逻辑说明

#### 核心功能业务逻辑

- 小程序根据用户id新建一次检查任务（接口createNewRecordById）并返回验证码token
- 设备端填入验证码token
- 设备端操作
- 小程序通过用户id查找该用户已经有过的检查任务记录（getAllRecordsNoByUserId）
- 用户点击一个记录，根据记录No查找记录的原始数据（getDataByNo）并跳转到新的单个记录的具体信息的界面，根据获取到的记录No查找记录的分析报告pdf（getReportByNo），下载链接显示在这个页面

#### 查找医生信息业务逻辑

- 在医生界面显示所有医生的信息给患者用户（getAllDoctors接口查找所有医生的信息），显示医生姓名（name）和部门（department）

#### 医患聊天业务逻辑

###### 患者端

- 在所有医生界面显示所有医生的信息给患者用户（getAllDoctors接口查找所有医生的信息），显示医生姓名（name）和部门（department）
- 用户点击一个医生进入该医生详情信息，显示所有信息，提供一个按钮，供用户开始与该医生的对话
- 用户进入与医生的聊天，首先调用getAllDoctors接口，获取之前两者的所有聊天记录并显示
- 用户或者医生发送一个新的聊天，addChatById接口，新增一个聊天对话

###### 医生端

开发中...

## 与设备端的交互

启动tcpServer运行与设备端交互的服务端代码即可，传输格式：

```
sendMsg = {
    "method":"report",
    "clientToken":"123",
    "params":{
        "position":1,
        "ph":5.5,
        "voltage":10.32
    }
}
```

## 云服务器部署提示

与微信小程序端交互已上云：

- IP：1.15.106.25
- port：80

如果接口失效，则首先登陆我的服务器，然后输入一下命令：
cd MothSeeker_server
nohup python3 app.py &
重启服务

与设备端交互已上云：

- IP：1.15.106.25
- port：8848
