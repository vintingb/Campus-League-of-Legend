// pages/page2/page2.js
const app = getApp()

Page({
  data: {
  },
  onLoad: function (options) {
    this.setData({
      title: app.globalData.viewTitle,
      desc: app.globalData.viewDesc,
      imageURL: app.globalData.viewImageURL
    })
  }
})