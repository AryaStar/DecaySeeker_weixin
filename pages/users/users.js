// pages/users/users.js
var app = getApp();
const db = wx.cloud.database()//引用数据库.
Page({

  /**
   * 页面的初始数据
   */
  data: {
    trimg: '/images/tab6.jpg',
    pic:'',
    Hei: "",
    // listData:[],
    doctor_now:{},
    doctorid_now:'',
  },

  

  chat_with: function (e) {
    // let value= e.currentTarget.dataset.value
    // console.log(value)
    wx.navigateTo({
      url: '../chatting/chatting'//+value,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this
    var doctorid_now = app.globalData.doctorid_now
    // console.log(doctorid_now+'haha');
    wx.request({
      url: 'http://127.0.0.1:5000/getDoctorById',
      data: {
        doctor_id: doctorid_now,
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success (res) {
        let mydata = res.data.doctor
        that.setData({
          doctor_now: mydata
        })
        // console.log(mydata)
      }
    })

    // if(name=="赵小芳"){
    //   this.setData({
    //     pic:"https://6d79-my-9gn0t7ku8daafcf9-1305074139.tcb.qcloud.la/%E5%8C%BB%E7%94%9F%E4%BF%A1%E6%81%AF/page_000001.png?sign=ae1a13e893d07e39d865727d85ba49f7&t=1614494086"
    //   })
    // }
    // else if (name == "李建国") {
    //   this.setData({
    //     pic: "https://6d79-my-9gn0t7ku8daafcf9-1305074139.tcb.qcloud.la/%E5%8C%BB%E7%94%9F%E4%BF%A1%E6%81%AF/page_000002.png?sign=72a24254b30c1f4bfbb7b8107cbb1572&t=1614494237"
    //   })
    // }
    // else if (name == "吴伟") {
    //   this.setData({
    //     pic: "https://6d79-my-9gn0t7ku8daafcf9-1305074139.tcb.qcloud.la/%E5%8C%BB%E7%94%9F%E4%BF%A1%E6%81%AF/page_000003.png?sign=dc9bc04d726268539d2ac951a7cb111d&t=1614494756"
    //   })
    // }
    // else if (name == "李梅") {
    //   this.setData({
    //     pic: "https://6d79-my-9gn0t7ku8daafcf9-1305074139.tcb.qcloud.la/%E5%8C%BB%E7%94%9F%E4%BF%A1%E6%81%AF/page_000004.png?sign=6d1d3a8a0a641ade8659f99c20c5b3a1&t=1614494776"
    //   })
    // }
    // else if (name == "王大志") {
    //   this.setData({
    //     pic: "https://6d79-my-9gn0t7ku8daafcf9-1305074139.tcb.qcloud.la/%E5%8C%BB%E7%94%9F%E4%BF%A1%E6%81%AF/page_000005.png?sign=af9ac8f39fe3ad6e2cc56cc549c639e9&t=1614494789"
    //   })
    // }
    // else if (name == "彭莹") {
    //   this.setData({
    //     pic: "https://6d79-my-9gn0t7ku8daafcf9-1305074139.tcb.qcloud.la/%E5%8C%BB%E7%94%9F%E4%BF%A1%E6%81%AF/page_000006.png?sign=0d50c27425e86b8819e33cd826e6d42d&t=1614494806"
    //   })
    // }
    // else if (name == "陈大山") {
    //   this.setData({
    //     pic: "https://6d79-my-9gn0t7ku8daafcf9-1305074139.tcb.qcloud.la/%E5%8C%BB%E7%94%9F%E4%BF%A1%E6%81%AF/page_000007.png?sign=935c1ae0c5b6df235e535d9234302e21&t=1614494818"
    //   })
    // }
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