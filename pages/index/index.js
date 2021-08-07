Component({
  data: {
    selected: 0,
    color: "#9397af",
    selectedColor: "#13227a",
    list: [{
        "pagePath": "/pages/patient/patient",
        "text": "首页",
        "iconPath": "/images/tab1.jpg",
        "selectedIconPath": "/images/tab2.jpg"
      },
      {
        "pagePath": "/pages/trend/trend",
        "text": "趋势",
        "iconPath": "/images/tab3.jpg",
        "selectedIconPath": "/images/tab4.jpg"
      },
      {
        "pagePath": "/pages/patient-my/patient-my",
        "text": "我的",
        "iconPath": "/images/tab5.jpg",
        "selectedIconPath": "/images/tab6.jpg"
    }]
  },
  attached() {
  },
  methods: {
    switchTab(e) {
      const data = e.currentTarget.dataset
      const url = data.path
      wx.switchTab({ url })
      this.setData({
        selected: data.index
      })
    }
  }
})