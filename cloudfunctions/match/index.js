// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const db = cloud.database()
  const _ = db.command
  const wxContext = cloud.getWXContext()
  var name = event.name
  var openid = event.openid
  var user = await db.collection('user').doc(openid).get()
  var 创新 = user.data.power.创新
  var 协作 = user.data.power.协作
  var 学习 = user.data.power.学习
  var 工具 = user.data.power.工具
  var 表达 = user.data.power.表达
  var 领导 = user.data.power.领导
  if (创新 > 80) {
    var flag创新 = 70
  } else {
    var flag创新 = 85
  }
  if (协作 > 80) {
    var flag协作 = 70
  } else {
    var flag协作 = 85
  }
  if (学习 > 80) {
    var flag学习 = 70
  } else {
    var flag学习 = 85
  }
  if (工具 > 80) {
    var flag工具 = 70
  } else {
    var flag工具 = 85
  }
  if (表达 > 80) {
    var flag表达 = 70
  } else {
    var flag表达 = 85
  }
  if (领导 > 80) {
    var flag领导 = 70
  } else {
    var flag领导 = 85
  }

  var matchlist = db.collection('user').where({
    power: {
      "创新": _.gt(flag创新),
      "协作": _.gt(flag协作),
      "学习": _.gt(flag学习),
      "工具": _.gt(flag工具),
      "表达": _.gt(flag表达),
      "领导": _.gt(flag领导),
    }
  }).get()
  return matchlist
}