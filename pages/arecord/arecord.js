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
    listData:[]

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
    // db.collection('users').where({
    //   userId: wx.getStorageSync('userId')
    // })
    //   .get({
    //     success: res => {
    //       console.log(res.data[0]._id)
    //       this.setData({
    //         'number': res.data[0].number,
    //         'number1': res.data[0].number1,
    //         'number2': res.data[0].number2,
    //       })
    //       var number = this.data.number
    //       var number1 = this.data.number1
    //       var number2 = this.data.number2
    //       this.setData({
    //         'num1': number[number.length - 1],
    //         'num2': number1[number.length - 1],
    //         'num3': number2[number.length - 1],
    //       })

    //     }
    //   })
    // var that = this
    // db.collection('users').where({
    //   userId: wx.getStorageSync('userId')
    // })
    //   .get({
    //     success: res => {
    //       this.setData({
    //         'ph': res.data[0].ph,
    //         'number': res.data[0].number,
    //         'date': res.data[0].date,
    //         'ph1': res.data[0].ph1,
    //         'number1': res.data[0].number1,
    //         'date1': res.data[0].date1,
    //         'ph2': res.data[0].ph2,
    //         'number2': res.data[0].number2,
    //         'date2': res.data[0].date2
    //       })
    //       app.globalData.ph = this.data.ph
    //       app.globalData.date = this.data.date
    //       app.globalData.ph1 = this.data.ph1
    //       app.globalData.date1 = this.data.date1
    //       app.globalData.ph2 = this.data.ph2
    //       app.globalData.date2 = this.data.date2
    //       app.globalData.number = this.data.number
    //       app.globalData.number1 = this.data.number1
    //       app.globalData.number2 = this.data.number2
    //     }
    //   })
    var that = this
    app.editTabBar1();

     let getid=options.id.toString()
      console.log(getid)

      wx.request({
        url: 'http://127.0.0.1:5000/getDataByNo',
        data:{
          record_no: getid
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success (res) {
          let mydata = res.data.data
          that.setData({
            listData: mydata
          })
          console.log(mydata)
        }
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