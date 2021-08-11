// pages/patient/patient.js
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


    mHidden:true,
    userId: '1',
    id: '',
    num:'',
    hp:'',
    ph:[],
    date:[],
    number:[],
    ph1: [],
    date1: [],
    number1: [],
    ph2: [],
    date2: [],
    number2: [],
    who:'',
    upHeight:'',
    middleHeight:'',
    downHeight:''
  },

//   test:function(){
//     wx.navigateTo({
//       url: '../chatting/chatting'
//   })
// },


  changeModel:function(){
    this.setData({
    mHidden:true
    })
  },

  show:function(){
    var that = this
    this.setData({
      mHidden: false
    })
    // db.collection('users').where({
    //   userId: wx.getStorageSync('userId')
    // })

    wx.request({
      url: 'http://127.0.0.1:5000/createNewRecordById',
      data:{
        user_id: '1'
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success (res) {
        var mytoken = res.data['token'].toString()
        console.log(mytoken)
        wx.showModal({
          title: '验证码',
          content: mytoken,
          cancelColor: 'cancelColor',
          showCancel: false,
        })
      }
    })

    // .get({
    //     success: res => {
    //       this.setData({
    //         'ph': res.data[0].ph,
    //         'number': res.data[0].number,
    //       })
    
    //       var ph=this.data.ph
    //       var number=this.data.number
    //       this.setData({
    //         'hp':ph[ph.length-1],
    //         'num':number[number.length-1]
    //       })
    //       var hp=this.data.hp
    //       if (hp < 5.5) {
    //         this.setData({
    //           'who': "有患龋风险"
    //         })
    //       }
    //       else {
    //         this.setData({
    //           'who': "牙齿较为健康"
    //         })
    //       }
    //       this.setData({
    //         mHidden: false
    //       })
    //     }
    //   })

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
    let userId = wx.getStorageSync('userId')
    this.setData({
      userId: userId,
    })

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
    db.collection('users').where({
      userId: userId
    })
      .get({
        success: res => {
          console.log(res.data[0]._id)
          this.setData({
            'id': res.data[0]._id,
          })
          var id = this.data.id
          wx.setStorageSync('id', id)
          db.collection('users').doc(id).update({
            // data 传入需要局部更新的数据
            data: {
              date:['03-20','04-15','05-10','06-21'],
              number: [45,45,45,45],
              ph:[5.5,5.4,6.4,5.8],
              date1: ['08-15', '09-03', '09-27', '10-10'],
              number1: [12,12,12,12],
              ph1: [4.0, 4.8, 6.0, 6.1],
              date2: ['04-20', '05-11', '06-01', '06-29'],
              number2: [27, 27, 27, 27],
              ph2: [5.1, 5.3, 5.9, 5.7]
            },
            success: function (res) {
              console.log(res.data)
            }
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
          var ph = this.data.ph
          var number = this.data.number
          this.setData({
            'hp': ph[ph.length - 1],
            'num': number[number.length - 1]
          })
          var hp = this.data.hp
          if (hp < 5.5) {
            this.setData({
              'who': "有患龋风险！"
            })
          }
          else {
            this.setData({
              'who': "牙齿较为健康！"
            })
          }
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