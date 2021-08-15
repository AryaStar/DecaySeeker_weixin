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
    listData:[],
    record_no:'',
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


  // getDate1: function (e) {
  //   this.setData({
  //     num: e.detail.text
  //   })
  // },

  
  trend: function(e){
    var that = this
    var getid= that.data.record_no
    // console.log(getid+'haha')
    wx.request({
      url: 'http://1.15.106.25/getReportByNo',
      data:{
        record_no: getid
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success (res) {
        var mydata = res.data.signal 
        if(mydata == '200'){
          that.show()
          console.log(mydata)
        }else{
          console.log('http://1.15.106.25/getReportByNo?record_no='+getid)
          wx.downloadFile({
            url: 'http://1.15.106.25/getReportByNo?record_no='+getid, 
            type: 'pdf',
            header:{'Content-Type':'application/pdf'},
            //仅为示例，并非真实的资源
            success (res) {
              // 只要服务器有响应数据，就会把响应内容写入文件并进入 success 回调，业务需要自行判断是否下载到了想要的内容
              var filePath=res.tempFilePath
              // var filePath='/download'
              wx.saveFile({
                tempFilePath: filePath,
                // tempFilePath:filePath,
                success: function(res){
                  console.log('save pdf')
                  var savedFilePath = res.savedFilePath
                }
              })
              wx.openDocument({
                filePath: filePath,
                success:function(data){
                  console.log('success!')
                },
                fail:function(data){
                  console.log("fail!")
                },
                complete:function(data){
                  console.log('complete!'),
                  console.log(data)
                }
              })

              }

            }
          )

        }
        
      }
    })

   
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    app.editTabBar1();
     let getid=options.id.toString()
      // console.log(getid)
      that.setData({
        record_no: getid
      })
      // console.log(that.data.record_no+'hihi')
      wx.request({
        url: 'http://1.15.106.25/getDataByNo',
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
  },

  bindVideoEnterPictureInPicture() {
    console.log('进入小窗模式')
  },

  bindVideoLeavePictureInPicture() {
    console.log('退出小窗模式')
  },

  screenChange(res){
    console.log("screenChange->res:" + JSON.stringify(res))
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