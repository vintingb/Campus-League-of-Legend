//app.js
function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || [];
    logs.unshift(Date.now());
    wx.setStorageSync('logs', logs);

    if (logs.length > 1) {
      wx.switchTab({
        url: '../../pages/indexPage/index',
      })
    } else {
      wx.redirectTo({
        url: '../../pages/splashPage/splash',
      })
    }

    // 登录
    wx.login({
      success: res => {
        const db = wx.cloud.database()
        wx.cloud.callFunction({
          name: "login"
        }).then(res => {
          const result = res
          console.log("用户openid", res.result.openid);
          wx.setStorageSync('openid', res.result.openid)
          db.collection('user').doc(res.result.openid).get({
            success: function (res) {
              console.log("已经添加到数据库");
            },
            fail: function (res) {
              console.log("未添加到数据库,开始添加");
              db.collection('user').add({
                data: {
                  _id: result.result.openid,
                  data: {
                    "name": "",
                    "nickname": "",
                    "birth_day": "",
                    "birth_place": "",
                    "hobby": "",
                    "college": "",
                    "major": "",
                    "skill": "",
                    "award_record": "",
                    "title": ""
                  },
                  student_id: result.result.openid,
                  power: {
                    "学习": getRndInteger(70, 95),
                    "表达": getRndInteger(70, 95),
                    "协作": getRndInteger(70, 95),
                    "创新": getRndInteger(70, 95),
                    "工具": getRndInteger(70, 95),
                    "领导": getRndInteger(70, 95),
                  },
                  style: "random"
                },
                success: function (res) {
                }
              })
            }
          })
        })
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null
  }
})