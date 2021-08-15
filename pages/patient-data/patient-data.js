// pages/patient-data/patient-data.js
const db = wx.cloud.database()//引用数据库.
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
realname:'',
ph:[],
date:[],
number:[],
    ph1: [],
    date1: [],
    number1: [],
    ph2: [],
    date2: [],
    number2: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;

    //1、引用数据库

    const db = wx.cloud.database({

      //这个是环境ID不是环境名称

      env: 'my-9gn0t7ku8daafcf9'
    })
    //2、开始查询数据了  news对应的是集合的名称
    db.collection('users').where({
      identity:'患者'
    }).get({
    //如果查询成功的话
      success: res => {
        //这一步很重要，给ne赋值，没有这一步的话，前台就不会显示值
        this.setData({
          ne: res.data
        })
      }
    })
  },

getData:function(e){

    let value= e.currentTarget.dataset.value
    console.log(value)
    wx.navigateTo({
      url: '/pages/arecord_doctor/arecord_doctor?id='+value,
    })


  //   if (num == 'A'){
  //     wx.showModal({
  //       title: "提示",
  //       content: "该患者17牙的牙合面龋风险为4级，26牙舌面龋风险为2级。"
  //     })
  //   }
  //   else if(num == 'B'){
  //     wx.showModal({
  //       title: "提示",
  //       content: "该患者11牙的近中面龋风险为5级，45牙合面龋风险为1级。"
  //     })
  //   }
  //   else if(num == 'C'){
  //     wx.showModal({
  //       title: "提示",
  //       content: "该患者39牙的远中面龋风险为3级。"
  //     })
  //   }
  //   else if(num == 'D'){
  //     wx.showModal({
  //       title: "提示",
  //       content: "该患者71牙舌面龋风险为1级，42牙的近中面龋风险为2级。"
  //     })
  //   }
  //   this.setData({
  //     realname: e.target.dataset.text
  //   })
  // var realname = this.data.realname
  // var that = this
  // db.collection('users').where({
  //   realname: realname,
  //   identity:'患者'
  // })
  //   .get({
  //     success: res => {
  //       console.log(res.data[0]._id)
  //       this.setData({
  //         "ph": res.data[0].ph,
  //         'date': res.data[0].date,
  //         "ph1": res.data[0].ph1,
  //         'date1': res.data[0].date1,
  //         "ph2": res.data[0].ph2,
  //         'date2': res.data[0].date2,
  //         'number':res.data[0].number,
  //         'number1': res.data[0].number1,
  //         'number2': res.data[0].number2,
  //       })
  //       app.globalData.ph= this.data.ph
  //       app.globalData.date = this.data.date
  //       app.globalData.number = this.data.number
  //       app.globalData.ph1 = this.data.ph1
  //       app.globalData.date1 = this.data.date1
  //       app.globalData.number1 = this.data.number1
  //       app.globalData.ph2 = this.data.ph2
  //       app.globalData.date2= this.data.date2
  //       app.globalData.number2 = this.data.number2
  //       console.log(app.globalData.number2)
  //       wx.navigateTo({
  //         url: '/pages/trends/trends',
  //       })
  //     }
  //   })
},


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})