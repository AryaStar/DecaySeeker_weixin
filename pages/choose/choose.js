// pages/choose/choose.js
const app = getApp();
const db = wx.cloud.database()//引用数据库.
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mHidden: true,
    teeth:'',
    number:'',
    num1:'',
    num:'',
    pic:'/images/恒牙.jpg',
    selectArray1: [{ "text": "11" }, { "text": "12" }, { "text": "13" }, { "text": "14" }, { "text": "15" }, { "text": "16" }, { "text": "17" }, { "text": "18" }, { "text": "21" }, { "text": "22" }, { "text": "23" }, { "text": "24" }, { "text": "25" }, { "text": "26" }, { "text": "27" }, { "text": "28" }, { "text": "31" }, { "text": "32" }, { "text": "33" }, { "text": "34" }, { "text": "35" }, { "text": "36" }, { "text": "37" }, { "text": "38" }, { "text": "41" }, { "text": "42" }, { "text": "43" }, { "text": "44" }, { "text": "45" }, { "text": "46" }, { "text": "47" }, { "text": "48" }, { "text": "51" }, { "text": "52" }, { "text": "53" }, { "text": "54" }, { "text": "55" }, { "text": "61" }, { "text": "62" }, { "text": "63" }, { "text": "64" }, { "text": "65" }, { "text": "71" }, { "text": "72" }, { "text": "73" }, { "text": "74" }, { "text": "75" }, { "text": "81" }, { "text": "82" }, { "text": "83" }, { "text": "84" }, { "text": "85" }, ]

  },
  changeModel: function () {
    this.setData({
      mHidden: true
    })
  },
  show: function () {
    this.setData({
      mHidden: false
    })
  },
  modelCancel: function () {
    this.setData({
      mHidden: true
    })
  },
  changeModel: function () {
    this.setData({
      mHidden: true
    })
  },
  getDate: function (e) {
    this.setData({
      pic: '/images/恒牙.jpg'
    })
    var pic = this.data.pic
  },
  getDate2: function (e) {
    this.setData({
      pic: '/images/乳牙.jpg'
    })
    var pic = this.data.pic
  },

  getDate1: function (e) {
    this.setData({
      num: e.detail.text
    })
  },
  trend: function(e){
    var num = this.data.num
    if (num == 46){
      wx.showModal({
        title: "提示",
        content: "46牙远中面龋风险为5级"
      })
    }
    else if(num == 37){
      wx.showModal({
        title: "提示",
        content: "37牙的近中面龋风险为4级"
      })
    }
    else if(num == 27){
      wx.showModal({
        title: "提示",
        content: "27牙颊面龋风险为3级"
      })
    }
    else{
      this.show()
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    db.collection('users').where({
      userId: wx.getStorageSync('userId')
    })
      .get({
        success: res => {
          console.log(res.data[0]._id)
          this.setData({
            'number': res.data[0].number,
            'number1': res.data[0].number1,
            'number2': res.data[0].number2,
          })
          var number = this.data.number
          var number1 = this.data.number1
          var number2 = this.data.number2
          this.setData({
            'num1': number[number.length - 1],
            'num2': number1[number.length - 1],
            'num3': number2[number.length - 1],
          })

        }
      })
    var that = this
    db.collection('users').where({
      userId: wx.getStorageSync('userId')
    })
      .get({
        success: res => {
          this.setData({
            'ph': res.data[0].ph,
            'number': res.data[0].number,
            'date': res.data[0].date,
            'ph1': res.data[0].ph1,
            'number1': res.data[0].number1,
            'date1': res.data[0].date1,
            'ph2': res.data[0].ph2,
            'number2': res.data[0].number2,
            'date2': res.data[0].date2
          })
          app.globalData.ph = this.data.ph
          app.globalData.date = this.data.date
          app.globalData.ph1 = this.data.ph1
          app.globalData.date1 = this.data.date1
          app.globalData.ph2 = this.data.ph2
          app.globalData.date2 = this.data.date2
          app.globalData.number = this.data.number
          app.globalData.number1 = this.data.number1
          app.globalData.number2 = this.data.number2
        }
      })
    app.editTabBar1();
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