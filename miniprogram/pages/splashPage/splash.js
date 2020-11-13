Page({
  data: {
    imgs: [
      // "cloud://demo1demo1-7g32j1k4710c7cac.6465-demo1demo1-7g32j1k4710c7cac-1304010070/background/mysplash.jpg",
      "cloud://demo1demo1-7g32j1k4710c7cac.6465-demo1demo1-7g32j1k4710c7cac-1304010070/background/splash3.png"
    ]
  },
  start() {
    wx.switchTab({
      url: '../../pages/indexPage/index'
    })
  }
})