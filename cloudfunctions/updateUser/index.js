const cloud = require('wx-server-sdk')
cloud.init()

const dbs = cloud.database()

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
exports.main = async (event, context) => {
  const db = require('better-sqlite3')('snh48.db');
  const row = db.prepare('select * from user').all();
  for (var i = 0; i < 48; i++) {
    dbs.collection('user').add({
      data: {
        _id: row[i].student_id,
        data: JSON.parse(row[i].data),
        student_id:row[i].student_id,
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
        console.log(res)
      }
    })
  }
}