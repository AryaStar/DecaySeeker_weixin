// pages/patient-data/patient-data.js
const db = wx.cloud.database()//引用数据库.
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
name:'',
did:'',
listData:[],

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.request({
      url: 'http://1.15.106.25/getAllDoctors',
      data:{
        // user_id: '1'
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success (res) {
        var mydata = res.data.doctor
        that.setData({
          listData: mydata
        })
        
      }
    })

    
  },

  getData:function(e){
    var doctorid = e.target.dataset.text
    console.log(doctorid)
    this.setData({
     did: doctorid
    })

    app.globalData.doctorid_now = doctorid

    wx.navigateTo({
      url: '/pages/users/users',
    })

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