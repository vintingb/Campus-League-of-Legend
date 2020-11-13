//index.js

Page({
  data: {
    imgUrls: [
      'cloud://demo1demo1-7g32j1k4710c7cac.6465-demo1demo1-7g32j1k4710c7cac-1304010070/background/s1.jpg',
      'cloud://demo1demo1-7g32j1k4710c7cac.6465-demo1demo1-7g32j1k4710c7cac-1304010070/background/s2.jpg',
      'cloud://demo1demo1-7g32j1k4710c7cac.6465-demo1demo1-7g32j1k4710c7cac-1304010070/background/s3.jpg'
    ],
    indicatorDots: true,
    circular: true,
    autoplay: true,
    interval: 4000,
    duration: 700,
    // motto: '',
    // userInfo: {},
    // hasUserInfo: false,
    // canIUse: wx.canIUse('button.open-type.getUserInfo')

  },
  //事件处理函数
  navigateInstruction: function(){
    wx.navigateTo({
      url: '../../pages/instructionPage/instruction',
    })
  },
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {},
  changeIndicatorDots: function (e) {
    this.setData({
      indicatorDots: !this.data.indicatorDots
    })
  },
  changeAutoplay: function (e) {
    this.setData({
      autoplay: !this.data.autoplay
    })
  },
  intervalChange: function (e) {
    this.setData({
      interval: e.detail.value
    })
  },
  durationChange: function (e) {
    this.setData({
      duration: e.detail.value
    })
  },
  navigateToAwards: function () {
    wx.navigateTo({
      url: '../../pages/awardsPage/awards'
    })
  },
  navigateCompetitionLIstPage:function(e){
    wx.switchTab({
      url: '../../pages/competitionLIstPage/competition',
    })
  }
})