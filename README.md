# MothSeeker_WeiXin
互联网+项目-探蛀的微信端代码

### 0.注

a. 小程序目前连接本地服务器。
b. 还需在设置->项目设置中选择不校验合法域名。

### 1.改动“首页”的 “开始检测”

在patient.js中添加show函数与服务器http://127.0.0.1:5000/createNewRecordById 接口交互，返回json数据，以弹窗形式渲染到前端

### 2.改动“记录”页若干事宜

a. 两个page页面与之相关，choose_base与arecord。点击“记录”可进入choose_base界面。

b. choose_base.js文件onload函数加载时请求http://127.0.0.1:5000/getAllRecordsNoByUserId 接口并返回json数据以表格渲染到前端。

c. choose_base.js文件goto函数。实现点击“查看”跳转到arecord界面。

d. arecord.js文件onload函数加载时请求http://127.0.0.1:5000/getDataByNo 接口，返回牙位信息渲染到前端



