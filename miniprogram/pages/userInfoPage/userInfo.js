const app = getApp()
import uCharts from '../../utils/u-charts.js';
var canvaRadar = null;
const db = wx.cloud.database()
Page({
  data: {
    userInfo: {
      "avatarUrl": "",
      "name": "",
      "college": "",
      "major": "",
      "hobby": "",
    },
    power: {
      "学习": 0,
      "表达": 0,
      "协作": 0,
      "创新": 0,
      "工具": 0,
      "领导": 0
    }
  },
  touchHandler: function (e) {
    console.log(radarChart.getCurrentDataIndex(e));
  },
  onLoad: function (options) {
    var student_id = options.student_id
    var isButtonShow = options.isButtonShow
    var openid = wx.getStorageSync('openid')
    if(isButtonShow=="true"){
      db.collection("matchHistory").add({
        data:{
          "student_id": student_id,
          "openid": openid
        }
      })
    }
    db.collection('user').doc(student_id).get().then(res => {
      var windowWidth = 400;
      try {
        var ress = wx.getSystemInfoSync();
        windowWidth = ress.windowWidth;
      } catch (e) {
        console.error('getSystemInfoSync failed!');
      }
      var power = res.data.power
      var categories = []
      var data = []
      for (var k in power) {
        categories.push(k)
        data.push(power[k])
      }
      var userData = wx.getStorageSync('data')
      canvaRadar = new uCharts({
        $this: this,
        canvasId: "canvasColumn",
        type: 'radar',
        fontSize: 11,
        legend: {
          show: true
        },
        background: '#FFFFFF',
        pixelRatio: 1,
        animation: true,
        dataLabel: true,
        categories: categories,
        series: [{
          name: '队友能力图',
          data: data
        },{
          name: '自我内力图',
          data: userData
        }],
        width: windowWidth,
        height: windowWidth - 30,
        extra: {
          radar: {
            max: 100 //雷达数值的最大值
          }
        }
      });

      this.setData({
        userInfo: {
          "avatarUrl": "cloud://demo1demo1-7g32j1k4710c7cac.6465-demo1demo1-7g32j1k4710c7cac-1304010070/images/" + student_id + ".jpg",
          "name": res.data.data.name,
          "college": res.data.data.college,
          "major": res.data.data.major,
          "hobby": res.data.data.hobby
        },
      })
    })
  }
})