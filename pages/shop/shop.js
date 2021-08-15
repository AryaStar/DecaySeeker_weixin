// pages/shop/shop.js
var app = getApp();

// pages/project2/project2.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
   
    imgUrls:['/images/乳牙.jpg','/images/p1.jpg','/images/恒牙.jpg'],
    nav:['/images/shop.png','/images/健康牙齿.png','',''],
    newUser:'',
    song:['/images/p4.jpg','/images/p2.jpg','/images/p3.jpg']
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.editTabBar1();
    // wx.request({
    //   url: 'https://www.easy-mock.com/mock/5ceb9351d910de59a72e0ba7/example/list',
    //   success:(res)=>{
    //     // console.log(res.data.song)
    //     this.setData({
    //       imgUrls: res.data.BannerList,
    //       nav: res.data.iconList,
    //       newUser:res.data.newUser,
    //       song: res.data.song
    //     })
    //   }
    // })
// https://www.easy-mock.com/mock/5ceb9351d910de59a72e0ba7/example/banner
//https://img02.hua.com/m/home/img/m_home_use_friend.png
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