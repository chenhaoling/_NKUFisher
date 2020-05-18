// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  delete event.userInfo
  let result = await db.collection('Comment').doc(event.commentId).get()
  return result.data
}
