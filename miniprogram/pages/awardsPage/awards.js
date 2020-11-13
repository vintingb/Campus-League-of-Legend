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
    wx.cloud.callFunction({
      name: "getAllUser"
    }).then(res => {
      for (var i = 0; i < 48 ; i++) {
        that.data.tmp1.push({
          "id": res.result.data[i].student_id,
          "title": res.result.data[i].data.name,
          "desc":  res.result.data[i].data.award_record,
          "imageURL": "cloud://demo1demo1-7g32j1k4710c7cac.6465-demo1demo1-7g32j1k4710c7cac-1304010070/images/" + res.result.data[i].student_id + ".jpg"
        })
      } 
      that.setData({
        articleList: that.data.tmp1
      })
    })
  },

  swiperChange(e) {
    this.setData({
      pageIndex: e.detail.current
    })
  },

  gotoViewImage: function (e) {
    wx.navigateTo({
      url: '../../pages/userInfoPage/userInfo?isButtonShow=false&student_id=' + e.currentTarget.dataset.id,
    })
  }
})