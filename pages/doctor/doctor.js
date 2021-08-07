// pages/doctor/doctor.js
var app = getApp();
const db = wx.cloud.database()//引用数据库.
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [
      {
        link: '/pages/rock1/rock1',
        url: '/images/rock1.jpg',
      },
      {
        link: '/pages/rock2/rock2',
        url: '/images/rock2.jpg',
      },
      {
        link: '/pages/rock3/rock3',
        url: '/images/rock3.jpg',
      },
    ],
    mHidden: true,
    num: '',
    hp: '',
    who: '',
    Hei: "" 

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

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this
    wx.getSystemInfo({
      success: function (res) {
        console.log(res.windowHeight);
        that.setData({ 
          upHeight: res.windowHeight / 896 * 300,
          middleHeight: res.windowHeight - res.windowHeight / 896 * 700,
          downHeight: res.windowHeight / 896 * 400
        })
      }
    })
    while(true){
      var num = Math.floor(Math.random() * 11 + 75);
      if (num%10!=0&&num%10!=9&&num != 56 && num != 57 && num !=58&& num !=66&& num !=67&& num !=68&&num!=76&& num !=77&&num!=78){
        break;
      }
    }
    var hp= Math.random() * 1 + 6;
    hp = hp.toFixed(1);
    this.setData({
      'num':num,
      'hp':hp
    })
    if (hp < 5.5) {
      this.setData({
        'who': "有患龋风险！"
      })
    }
    else  {
      this.setData({
        'who': "牙齿较为健康！"
      })
    }
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
    app.editTabBar();    //显示自定义的底部导航
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