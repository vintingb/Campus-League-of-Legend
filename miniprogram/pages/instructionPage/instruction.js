//index.js
const app = getApp()

Page({
  data: {
  },
  swiperChange(e) {
    this.setData({
      pageIndex: e.detail.current
    })
  },
  onLoad: function () {
    this.loadArticles();
  },

  async loadArticles() {
    const db = wx.cloud.database({})
    const cloudData = await db.collection('articles').get()
    const articles = cloudData.data
    this.setData({
      articleList: articles
    })
  },
  gotoViewImage: function (e) {
    // console.log(e.currentTarget.dataset);
    app.globalData.viewTitle = e.currentTarget.dataset.title;
    app.globalData.viewDesc = e.currentTarget.dataset.desc;
    app.globalData.viewImageURL = e.currentTarget.dataset.imageurl;
    wx.navigateTo({
      url: '../viewImagePage/viewImage'
    })

  }
})