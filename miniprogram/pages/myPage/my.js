// pages/page5/page5.js
//获取应用实例
const app = getApp()
import uCharts from '../../utils/u-charts.js';
const db = wx.cloud.database()
var canvaRadar = null;
Page({

  data: {
    motto: '',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    actionSheetHidden: true,
    menu: ''
  },

  onLoad: function (options) {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
    var openid = wx.getStorageSync('openid')
    db.collection('user').doc(openid).get().then(res => {
      var windowWidth = 400;
      try {
        var ress = wx.getSystemInfoSync();
        windowWidth = ress.windowWidth;
      } catch (e) {
        console.error('getSystemInfoSync failed!');
      }
      var power = res.data.power
      var data = []
      for (var k in power) {
        data.push(power[k])
      }
      wx.setStorageSync('data', data)
    });
  },
  getUserInfo: function (e) {
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  aboutTeam: function (e) {
    this.setData({
      actionSheetHidden: !this.data.actionSheetHidden
    })
    wx.navigateTo({
      url: '../../pages/conceringPage/concering',
    })
  },
  navigateToMatchHistoryPage: function () {
    this.setData({
      actionSheetHidden: !this.data.actionSheetHidden
    })
    wx.navigateTo({
      url: "../../pages/matchHistoryPage/matchHistory",
    })
  },
  actionSheetTap: function () {
    this.setData({
      actionSheetHidden: !this.data.actionSheetHidden
    })
  },
  actionSheetbindchange: function () {
    this.setData({
      actionSheetHidden: !this.data.actionSheetHidden
    })
  },
  cancel: function () {
    this.setData({
      actionSheetHidden: !this.data.actionSheetHidden
    })
  },
  navigateInstruction: function(){
    this.setData({
      actionSheetHidden: !this.data.actionSheetHidden
    })
    wx.navigateTo({
      url: '../../pages/instructionPage/instruction',
    })
  }
})