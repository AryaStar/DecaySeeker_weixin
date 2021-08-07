// pages/grant/grant.js
var app = getApp();
const db = wx.cloud.database()//引用数据库.

Page({

  /**
   * 页面的初始数据
   */
  data: {
    username: '',
    defaultUrl: '/images/user1.jpg',
    userTx: '',
    userInfo: {},
    identity: '',
    realname: '',

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //当重新加载这个页面时，查看是否有已经登录的信息
    let username = wx.getStorageSync('username'),
      avater = wx.getStorageSync('avatar'),
      identity=wx.getStorageSync('identity')
    if (username) {
      this.setData({
        username: username,
        userTx: avater,
      })
      console.log(identity)
      if (identity =='医生') {
        wx.redirectTo({
          url: '/pages/doctor/doctor',
        })
      }
      else  if (identity=='患者'){
        wx.redirectTo({
          url: '/pages/patient/patient',
        })
      }  
    }
    
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: res => {
              this.setData({
                userTx: res.userInfo.avatarUrl,
                userInfo: res.userInfo
              })
            }
          })
        }
      }
    })

  },
  
  getUserInfoHandler: function (e) {
    let d = e.detail.userInfo
    this.setData({
      userTx: d.avatarUrl,
      username: d.nickName,
    })
    var identity = this.data.identity
    var realname = this.data.realname
    wx.setStorageSync('avater', d.avatarUrl)
    wx.setStorageSync('username', d.nickName)
    wx.setStorageSync("identity", identity)
    wx.setStorageSync("realname", realname)
    
    //获取数据库引用
    const db = wx.cloud.database()
    const _ = db.command
    //查看是否已有登录，无，则获取id
    var userId = wx.getStorageSync('userId')
    if (!userId) {
      userId = this.getUserId()
    }
    //查找数据库
    db.collection('users').where({
      userId: userId,
      _openid: d.openid
    }).get({
      success(res) {
        // res.data 是包含以上定义的记录的数组
        //如果查询到数据,将数据记录，否则去数据库注册
        if (res.data && res.data.length > 0) {
          wx.setStorageSync('openId', res.data[0]._openid)
        } else {
          //定时器
          setTimeout(() => {
            //写入数据库
            db.collection('users').add({
              data: {
                userId: userId,
                name: d.nickName, 
                identity:identity,
                realname:realname
              },
              success: function () {
                console.log('用户id新增成功')
                app.globalData.username = wx.getStorageSync('username'),
                  app.globalData.userId = wx.getStorageSync('userId'),
                  app.globalData.userTx = wx.getStorageSync('avater'),
                  console.log(app.globalData.username)
                  
                
                db.collection('users').where({
                  userId: userId
                }).get({
                  success: res => {
                    wx.setStorageSync('openId', res.data[0]._openid)
                  },
                  fail: err => {
                    console.log('用户_openId设置失败')
                  }
                })

                if(identity=='医生'){
                  wx.redirectTo({
                    url: '/pages/doctor/doctor',
                  })
                }
               else if (identity == '患者') {
                  wx.redirectTo({
                  url: '/pages/patient/patient',
                })
              }
              },
              fail: function (e) {
                console.log('用户id新增失败')
              }
            })
          }, 100)
        }
      },
      fail: err => {

      }
    })
  },
  getUserId: function () {
    //生产唯一id，采用一个字母或数字+1970年到现在的毫秒数+10w的一个随机数组成
    var w = "abcdefghijklmnopqrstuvwxyz0123456789",
      firstW = w[parseInt(Math.random() * (w.length))];
    var userId = firstW + (Date.now()) + (Math.random() * 100000).toFixed(0)
    wx.setStorageSync('userId', userId)
    return userId;
  },

  doctor:function(e){
    this.setData({
      identity:'医生'
    })
  },
  patient: function (e) {
    this.setData({
      identity:'患者'
    })
  },
  ins: function(e){
    this.setData({
      realname:e.detail.value
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