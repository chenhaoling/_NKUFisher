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
      for(let index = 0; index < event.comments.length; index++) {
        await cloud.callFunction({
          name: 'deleteCommentsByIds',
          data: {
            id: event.comments[index]
          }
        })
      }
      await db.collection('Good').doc(event.goodId).remove()
      return {detail: true}
    }
    if(event.commentId != undefined) {
      let result = await db.collection('Good').doc(event.commentGoodId).get()
      let comments = result.data.comments
      let index = comments.indexOf(event.commentId)
      comments.splice(index, 1)
      await db.collection('Good').doc(event.commentGoodId).update({
        data: {comments: comments}
      })
      await cloud.callFunction({
        name: 'deleteCommentsByIds',
        data: {
          id: event.commentId
        }
      })
      return {detail: true}
    }
    return {detail: false}
  }
  return {detail: true}
}