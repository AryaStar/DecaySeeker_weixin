import * as echarts from '../../ec-canvas/echarts';

const app = getApp();
var chart = null

function initChart(canvas, width, height) {
  var date=[];
  var ph=[];
  chart = echarts.init(canvas, null, {
    width: width,
    height: height
  });
  canvas.setChart(chart);

  var option = {
    grid: {
      containLabel: true
    },

    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: date
      // show: false
    },
    yAxis: {
      x: 'center',
      type: 'value',
      splitLine: {
        lineStyle: {
          type: 'dashed'
        }
      }
      // show: false
    },
    series: [{
      name: 'A',
      type: 'line',
      smooth: false,
      data: ph,
      dataLabel: true, // 是否在图表中显示数据内容值
    }],
    height: 200,
  };

  chart.setOption(option);
  return chart;
}

Page({
  onShareAppMessage: function (res) {
    return {
      title: 'ECharts 可以在微信小程序中使用啦！',
      path: '/pages/index/index',
      success: function () { },
      fail: function () { }
    }
  },
  data: {
    mHidden: true,
    ec: {
      onInit: initChart
    },
    number: [],
    num: '',
    num1:'',
    num2: '',
    num3: '',
    selectArray1: [{ "text": "11" }, { "text": "12" }, { "text": "13" }, { "text": "14" }, { "text": "15" }, { "text": "16" }, { "text": "17" }, { "text": "18" }, { "text": "21" }, { "text": "22" }, { "text": "23" }, { "text": "24" }, { "text": "25" }, { "text": "26" }, { "text": "27" }, { "text": "28" }, { "text": "31" }, { "text": "32" }, { "text": "33" }, { "text": "34" }, { "text": "35" }, { "text": "36" }, { "text": "37" }, { "text": "38" }, { "text": "41" }, { "text": "42" }, { "text": "43" }, { "text": "44" }, { "text": "45" }, { "text": "46" }, { "text": "47" }, { "text": "48" }, { "text": "51" }, { "text": "52" }, { "text": "53" }, { "text": "54" }, { "text": "55" }, { "text": "61" }, { "text": "62" }, { "text": "63" }, { "text": "64" }, { "text": "65" }, { "text": "71" }, { "text": "72" }, { "text": "73" }, { "text": "74" }, { "text": "75" }, { "text": "81" }, { "text": "82" }, { "text": "83" }, { "text": "84" }, { "text": "85" },]

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

  getDate1: function (e) {
    this.setData({
      num: e.detail.text
    })
    app.globalData.num = this.data.num
    var num = app.globalData.num
    var number = app.globalData.number
    var number1 = app.globalData.number1
    var number2 = app.globalData.number2
    this.setData({
      num1:number[number.length - 1],
       num2:number1[number1.length - 1],
      num3: number2[number2.length - 1]
    })
    if (num == number[number.length - 1]) {
      this.setData({
        ph: app.globalData.ph,
        date: app.globalData.date
      })
      this.getLastDay()
    }
    else if (num == number1[number1.length - 1]){
      this.setData({
        ph: app.globalData.ph1,
        date: app.globalData.date1
      })
      this.getLastDay()
    }
    else if (num == number2[number2.length - 1]) {
      this.setData({
        ph: app.globalData.ph2,
        date: app.globalData.date2
      })
      this.getLastDay()
    }
    else {
      this.show()
    }

  },

  onReady() {

  },

  onLoad() {
  },
  
  //获取七天的日期
  getLastDay() {
    var ph=this.data.ph
    var date=this.data.date
    var option = {
      grid: {
        containLabel: true
      },
      tooltip: {
        show: true,
        trigger: 'axis'
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: date
        // show: false
      },
      yAxis: {
        x: 'center',
        type: 'value',
        splitLine: {
          lineStyle: {
            type: 'dashed'
          }
        },
        min: 4,
        // show: false
      },

      series: [{
        name: 'A',
        type: 'line',
        smooth: false,
        data: ph,
        dataLabel: true, // 是否在图表中显示数据内容值
      }],
      height: 200,
    };
    setTimeout(() => {
      chart.clear()
      chart.setOption(option);
    }, 150)
  }
});

