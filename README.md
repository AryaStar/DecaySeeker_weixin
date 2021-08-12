# MothSeeker_WeiXin
互联网+项目-探蛀的微信端代码

### 0.环境搭建

* 小程序目前连接本地服务器127.0.0.1:5000。
* 微信端不支持wx.request本地IP地址，故需要在微信开发者工具中设置->项目设置中选择不校验合法域名。

### 1.改动“首页”的 “开始检测”功能

* 在patient.js中添加show函数与服务器http://127.0.0.1:5000/createNewRecordById 接口交互，返回json数据，以弹窗形式渲染到前端

### 2.改动“记录”页若干功能

* 点击“记录”可进入choose_base界面，点击单个记录“查看”可进入arecord界面。
* choose_base.js文件onload函数加载时请求http://127.0.0.1:5000/getAllRecordsNoByUserId 接口并返回json数据以表格渲染到前端。
* choose_base.js文件goto函数，实现点击“查看”跳转到arecord界面。
* arecord.js文件onload函数加载时请求http://127.0.0.1:5000/getDataByNo 接口，返回牙位信息渲染到前端
* 设计arecord.js文件trend函数，请求http://127.0.0.1:5000/getReportByNo 接口。若未上传文件则弹窗显示，若有文件则下载文件(目前对文件下载路径上还未处理好)。
* 暂时未用到getTokenBycheckNo接口。

### 3.设计“我的”->“医生简介”若干功能

* 点击“医生简介”进入doctor-data页面，进入后点击列表中某医生进入users页面。

* doctor-data.js文件onload函数加载时请求http://127.0.0.1:5000/getAllDoctors 接口，返回医生信息渲染到前端

* doctor-data.js文件getData函数，实现点击“某医生”，将医生id写入app.js全局变量doctorid_now中，并跳转到users界面。

* users.js文件onload函数加载时读取全局变量doctorid_now并请求http://127.0.0.1:5000/getDoctorById 接口，返回该医生json信息渲染到前端界面。

### 4.设计医患聊天界面-患者端

* user.js文件中chat_with函数，点击咨询后进入chatting界面。
* chatting.js文件中onLoad函数加载时，请求http://127.0.0.1:5000/getChatById 接口，请求该医患的聊天记录并渲染到前端。
* chatting.js文件中sendClick函数，发送消息的时候，把消息显示到前端，并请求http://127.0.0.1:5000/addChatById 接口，将该聊天记录添加到后台csv文件。

### 5.设计医患聊天界面-医生端

* patient-data.js文件中get_data函数，点击咨询后进入chatting_doctor界面。
* chatting_doctor.js文件中onLoad函数加载时，请求http://127.0.0.1:5000/getChatById 接口，请求该医患的聊天记录并渲染到前端。
* chatting_doctor.js文件中sendClick函数，发送消息的时候，把消息显示到前端，并请求http://127.0.0.1:5000/addChatById 接口，将该聊天记录添加到后台csv文件。

## 6.设计商店界面

* 暂定为静态界面展示医疗器械图片
