import * as echarts from '../../ec-canvas/echarts';

const app = getApp();
var chart = null

function initChart(canvas, width, height) {
  var ph = []
  var date = []
  chart = echarts.init(canvas, null, {
    width: width,
    height: height
  });
  canvas.setChart(chart);

  var option = {
    grid: {
      containLabel: true
    },
    tooltip: {
      show: true,
      trigger: 'axis',
      dataLabel: true, // 是否在图表中显示数据内容值
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
    ec: {
      onInit: initChart
    },
    number: [],
    num: '',
    ph:[],
    date:[]

  },

  onReady() {

  },

  onLoad() {
    var sum = app.globalData.sum
    var number = app.globalData.number
    var number1 = app.globalData.number1
    var number2 = app.globalData.number2
    console.log(app.globalData.number2)
    if(sum==number[number.length-1]){
      this.setData({
       ph : app.globalData.ph,
       date : app.globalData.date
      })
      
    }
    else if(sum==number1[number1.length-1]){
      this.setData({
        ph: app.globalData.ph1,
        date: app.globalData.date1
      })
    }
    else if(sum==number2[number2.length-1]){
      this.setData({
        ph: app.globalData.ph2,
        date: app.globalData.date2
      })
    }
    console.log(this.data.ph)
    console.log(this.data.date)
    this.getLastDay()
  },

  //获取七天的日期
  getLastDay() {
    var ph = this.data.ph
    var date = this.data.date
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
    }, 1000)
  }
});

