wx.cloud.init()
const db = wx.cloud.database()

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
Page({
  data: {
    // array: ['数学竞赛', '物理竞赛', '英语竞赛', '编程竞赛'],
    array: [],
    tmp: []
  },
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value, "对应的竞赛名称为", this.data.array[e.detail.value])
    this.setData({
      index: e.detail.value
    })
  },
  onLoad: function (e) {
    const that = this;
    db.collection('competitionList').get({
      success: function (res) {
        for (var i = 0; i < res.data.length; i++) {
          that.data.tmp.push(res.data[i].name)
        }
        that.setData({
          "array": that.data.tmp
        })
      }
    })
  },
  matchTeammates: function (e) {
    var index = this.data.index;
    var openid = wx.getStorageSync('openid')
    if (index) {
      match(this.data.array[index], openid);
    } else {
      wx.showToast({
        icon: "none",
        title: '请选择竞赛名称',
      })
    }
  },
})

function match(name, openid) {
  wx.cloud.callFunction({
    name: "match",
    data: {
      "name": name,
      "openid": openid
    }
  }).then(res => {
    // 这里返回匹配到的用户信息(互补匹配)
    var userList = res.result.data;
    if (userList) {
      var index = getRndInteger(0, userList.length - 1)
      wx.navigateTo({
        url: '../../pages/userInfoPage/userInfo?isButtonShow=true&student_id=' + userList[index].student_id,
      })
    }else{
      wx.cloud.callFunction({
        name: "randomMatch"
      }).then(res=>{
        var userList = res.result.data
        var index = getRndInteger(0, 47)
        wx.navigateTo({
          url: '../../pages/userInfoPage/userInfo?isButtonShow=true&student_id=' + userList[index].student_id,
        })
      })
    }
  })
}