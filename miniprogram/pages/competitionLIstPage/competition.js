//index.js
const app = getApp()
wx.cloud.init()
const db = wx.cloud.database()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    tmp1: [],
    pageIndex: 0,
    articleList: []
  },
  onLoad: function (e) {
    const that = this;
    db.collection('competitionList').get({
      success: function (res) {
        for (var i = 0; i < res.data.length; i++) {
          that.data.tmp1.push({
            "id": res.data[i]._id,
            "title": res.data[i].name,
            "desc": res.data[i].desc,
            "imageURL": res.data[i].imgurl,
          })
        }
        that.setData({
          articleList: that.data.tmp1
        })
      }
    })

  },

  swiperChange(e) {
    this.setData({
      pageIndex: e.detail.current
    })
  },
  gotoViewImage: function (e) {
    app.globalData.viewTitle = e.currentTarget.dataset.title;
    app.globalData.viewDesc = e.currentTarget.dataset.desc;
    app.globalData.viewImageURL = e.currentTarget.dataset.imageurl;
    wx.navigateTo({
      url: '../viewImagePage/viewImage'
    })
  }
})