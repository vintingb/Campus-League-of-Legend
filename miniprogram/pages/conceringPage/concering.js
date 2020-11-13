//index.js
const app = getApp()

Page({
  /**
   * 页面的初始数据
   */
  data: {
    pageIndex: 0,
    articleList: [{
        'id': 1,
        'title': '指导老师：何鸣皋',
        'desc': 'Cybertutor，教育专家。',
        'imageURL': 'https://www.et.ynu.edu.cn/appdd/uploads/20181130006/8/%E4%BD%95%E8%80%81%E5%B8%88.jpg'
      },
      {
        'id': 2,
        'title': '成员：张家尉',
        'desc': '信息学院 物联网工程18级学生',
        'imageURL': 'https://www.et.ynu.edu.cn/appdd/uploads/20181130006/8/%E5%BC%A0%E5%AE%B6%E5%B0%89.jpg'
      },
      {
        'id': 3,
        'title': '成员：钟琪',
        'desc': '地球科学学院 地球物理学18级学生',
        'imageURL': 'https://www.et.ynu.edu.cn/appdd/uploads/20181130006/8/%E9%92%9F%E7%90%AA.jpg'
      },
      {
        'id': 4,
        'title': '成员：刘兆达',
        'desc': '信息学院 物联网工程18级学生',
        'imageURL': 'https://www.et.ynu.edu.cn/appdd/uploads/20181130006/8/%E5%88%98%E5%85%86%E8%BE%BE.jpg'
      }
    ]
    
  },

  /**
   * current 改变时会触发 change 事件
   * @param {*} e 
   */
  swiperChange(e) {
    this.setData({
      pageIndex: e.detail.current
    })
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
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