// pages/contact/contact.js
const app = getApp();
var inputVal = '';
var msgList = [];
var windowWidth = wx.getSystemInfoSync().windowWidth;
var windowHeight = wx.getSystemInfoSync().windowHeight;
var keyHeight = 0;

/**
 * 初始化数据
 */
function initData(that) {
 inputVal = '';

 msgList = [{
   speaker: 'server',
   contentType: 'text',
   content: '欢迎来到英雄联盟，敌军还有30秒到达战场，请做好准备！'
  },
  {
   speaker: 'customer',
   contentType: 'text',
   content: '我怕是走错片场了...'
  }
 ]
 that.setData({
  msgList,
  inputVal
 })
}

/**
 * 计算msg总高度
 */
// function calScrollHeight(that, keyHeight) {
//  var query = wx.createSelectorQuery();
//  query.select('.scrollMsg').boundingClientRect(function(rect) {
//  }).exec();
// }

Page({

 /**
  * 页面的初始数据
  */
 data: {
  scrollHeight: '100vh',
  inputBottom: 0,
  msgList:[]
 },

//  send_data: function(e) {
//   wx.request({
//     url: 'http://127.0.0.1:5000/addChatById',
//     data:{
//       patient_id: '1',//一开始病人id写死为1
//       doctor_id:'1',
//       // doctor_id: app.globalData.doctorid_now //这是全局变量，点击某医生的时候设定
//       sender: 'doctor',
//       content: inputVal,
//     },
//     header: {
//       'content-type': 'application/json' // 默认值
//     },
//     success (res) {
//       var mydata = res.data.signal

//       console.log(mydata+'hahi')
//     }
//   })
//  },


 /**
  * 生命周期函数--监听页面加载
  */
 onLoad: function(options) {
  // initData(this);
  let username = wx.getStorageSync('username'),
  userTx = wx.getStorageSync('avater')
  var that = this
  this.setData({
    username: username,
  userTx: userTx,
   cusHeadIcon: app.globalData.userInfo.defaultUrl,
  });
  wx.request({
    url: 'http://1.15.106.25/getChatById',
    data:{
      patient_id: '1',
      doctor_id:'1',
      // doctor_id: app.globalData.doctorid_now
    },
    header: {
      'content-type': 'application/json' // 默认值
    },
    success (res) {
      var mydata = res.data.chat_records
      that.setData({
        msgList: mydata
      })
      msgList = mydata
      console.log(msgList)
    }
  })
 },


 /**
  * 获取聚焦
  */
 focus: function(e) {
  keyHeight = e.detail.height;
  this.setData({
   scrollHeight: (windowHeight - keyHeight) + 'px'
  });
  this.setData({
   toView: 'msg-' + (msgList.length - 1),
   inputBottom: keyHeight + 'px'
  })
  //计算msg高度
  // calScrollHeight(this, keyHeight);

 },

 //失去聚焦(软键盘消失)
 blur: function(e) {
  this.setData({
   scrollHeight: '100vh',
   inputBottom: 0
  })
  this.setData({
   toView: 'msg-' + (msgList.length - 1)
  })

 },

 /**
  * 发送点击监听
  */
 sendClick: function(e) {
   var myinput=e.detail.value
   var that = this
    msgList.push({
   sender: 'doctor',
   receiver:'patient',
   timestamp:'',
   content: e.detail.value
  })
  wx.request({
    url: 'http://1.15.106.25/addChatById',
    data:{
      patient_id: '1',//一开始病人id写死为1
      doctor_id:'1',
      // doctor_id: app.globalData.doctorid_now //这是全局变量，点击某医生的时候设定
      sender: 'doctor',
      content: myinput,
    },
    header: {
      'content-type': 'application/json' // 默认值
    },
    success (res) {
      var mydata = res.data.signal
      console.log(mydata+'hahi')
      that.setData({
         msgList,
         inputVal
        });
    }
  })
  // msgList.push({
  //  speaker: 'customer',
  //  contentType: 'text',
  //  content: e.detail.value
  // })
  // inputVal = '';
  // this.setData({
  //  msgList,
  //  inputVal
  // });
 },

 /**
  * 退回上一页
  */
 toBackClick: function() {
  wx.navigateBack({})
 }

})