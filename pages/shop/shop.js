import indexData from '../../data/index.js'
const app = getApp();
Page({
  data: {
    swiperImages: [],
    recommendImages: [],
    windowWidth: 0,
  },
  commodDetails: function (params) {
    var data = JSON.stringify(params.currentTarget.dataset.details)
    wx.setStorage({
      key: 'commodDetails',
      data: data,
    })
    // wx.navigateTo({
    //   url: '/pages/details/details',
    // })
    wx.showModal({
      title: '提示',
      content: '淘口令复制成功，请打开手机淘宝查看',
      showCancel: false
    });
  },
  onLoad: function() {
    app.editTabBar1();
    this.setData({
      swiperImages: indexData.swiperImages,
      recommendImages: indexData.recommendImages
    })
  },
  onReady: function () {
    var windowWidth = wx.getSystemInfoSync().windowWidth
    this.setData({
      windowWidth: windowWidth
    })
    wx.setStorage({
      key: 'windowWidth',
      data: windowWidth,
    })
  }
})
