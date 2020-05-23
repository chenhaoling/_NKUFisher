// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  await db.collection('PendingCheck').doc(event._id).remove()
  if(event.accept) {
    if(event.openId != undefined) {
      await db.collection('User').doc(event.openId).update({
        data: {
          stuNum: event.stuNum,
          campus: event.campus,
        }
      })
      return {detail: true}
    }
    if(event.goodId != undefined) {
      await db.collection('Good').doc(event.goodId).remove()
      return {detail: true}
    }
    if(event.commentId != undefined) {
      await db.collection('Comment').doc(event.commentId).remove()
      return {detail: true}
    }
    return {detail: false}
  }
  return {detail: true}
}