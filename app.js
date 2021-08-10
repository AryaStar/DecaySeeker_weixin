//app.js
App({
  onLaunch: function () {
    
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        // env 参数说明：
        //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
        //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
        //   如不填则使用默认环境（第一个创建的环境）
        env: 'my-9gn0t7ku8daafcf9',
        traceUser: true,
      })
    }

    this.globalData = {
      username: '',
      defaultUrl: '/images/user1.jpg',
      userTx: '',
      userInfo: {},
      userId: '',
      ph:[],
      date:[],
      number:[],
      ph1: [],
      date1: [],
      number1: [],
      ph2: [],
      date2: [],
      number2: [],
      name:'',
      num:'',
      sum:"",
      doctorid_now:'',
    }
  },
  

  //第一种底部  

  editTabBar: function () {
    //使用getCurrentPages可以获取当前加载中所有的页面对象的一个数组，数组最后一个就是当前页面。

    var curPageArr = getCurrentPages();    //获取加载的页面
    var curPage = curPageArr[curPageArr.length - 1];    //获取当前页面的对象
    var pagePath = curPage.route;    //当前页面url
    if (pagePath.indexOf('/') != 0) {
      pagePath = '/' + pagePath;
    }
    var tabBar = this.tabBar;
    for (var i = 0; i < tabBar.list.length; i++) {
      tabBar.list[i].active = false;
      if (tabBar.list[i].pagePath == pagePath) {
        tabBar.list[i].active = true;    //根据页面地址设置当前页面状态    
      }
    }
    curPage.setData({
      tabBar: tabBar
    });
  },
  //第二种底部，原理同上
  editTabBar1: function () {
    var curPageArr = getCurrentPages();
    var curPage = curPageArr[curPageArr.length - 1];
    var pagePath = curPage.route;
    if (pagePath.indexOf('/') != 0) {
      pagePath = '/' + pagePath;
    }
    var tabBar = this.tabBar1;
    for (var i = 0; i < tabBar.list.length; i++) {
      tabBar.list[i].active = false;
      if (tabBar.list[i].pagePath == pagePath) {
        tabBar.list[i].active = true;
      }
    }
    curPage.setData({
      tabBar: tabBar
    });
  },

    //第一种底部导航栏显示
    tabBar: {
      "color": "#9397af",
      "selectedColor": "#13227a",
      "borderStyle": "white",
      list: [
          {
            "pagePath": "/pages/doctor/doctor",
            "text": "首页",
            "iconPath": "/images/tab1.jpg",
            "selectedIconPath": "/images/tab2.jpg",
            "clas": "menu-item",
          active: true
          },
          {
            "pagePath": "/pages/doctor-my/doctor-my",
            "text": "我的",
            "iconPath": "/images/tab5.jpg",
            "selectedIconPath": "/images/tab6.jpg",
            "clas": "menu-item",
            active: false
          }
        ],

      "position": "bottom"
    },
    //第二种底部导航栏显示
    tabBar1: {
      "color": "#9397af",
      "selectedColor": "#13227a",
      "borderStyle": "white",
      list: [{
        "pagePath": "/pages/patient/patient",
        "text": "首页",
        "iconPath": "/images/tab1.jpg",
        "selectedIconPath": "/images/tab2.jpg",
        "selectedColor": "#13227a",
        "clas": "menu-item1",
        active: true
      },
      {
        "pagePath": "/pages/choose_base/choose_base",////////////////////////////////////////////////////////////////////
        "text": "记录",
        "iconPath": "/images/tab3.jpg",
        "selectedIconPath": "/images/tab4.jpg",
        "selectedColor": "#13227a",
        "clas": "menu-item1",
        active: false
      },
      {
        "pagePath": "/pages/patient-my/patient-my",
        "text": "我的",
        "iconPath": "/images/tab5.jpg",
        "selectedIconPath": "/images/tab6.jpg",
        "selectedColor": "#13227a",
        "clas": "menu-item1",
        active: false
      }
      ],
      "position": "bottom"
    }
  }

)
