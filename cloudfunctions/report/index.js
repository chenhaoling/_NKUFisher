// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  const openid = cloud.getWXContext().OPENID
  
  if (event.commentId != undefined) {
    // 投诉评论
    db.collection('PendingCheck').where({
      commentId: event.commentId,
      goodId: event.goodId,
      reporter: event.reporter
    }).get().then(res=> {
      if (res.data.length > 0) {
        return {detail: false} //已被该用户投诉过一次
      }
      else {
        data = {}
        data.goodId = event.goodId
        data.commentId = event.commentId
        data.reporter = event.reporter
        data.identity = 2
         db.collection('PendingCheck').add({ 
          data: data
        })
        return {detail: true}
      }
    })


  }
  else  {
    // 投诉商品
    db.collection('PendingCheck').where({
      goodId: event.goodId,
      reporter: event.reporter
    }).get().then(res=> {
      if (res.data.length > 0 ) {
        for (let i = 0; i < res.data.length; i++) {
          if (res.data[i].commentId == undefined) {
            return {detail: false}  //已经被该用户投诉过一次
          }
        }
        db.collection('PendingCheck').add({ 
          data: event
        })
        return {detail: true} 
      }
      else {
        data = {}
        data.goodId = event.goodId
        data.reporter = event.reporter
        data.identity = 3
         db.collection('PendingCheck').add({ 
          data: data
        })
        return {detail: true}
      }
    })
  }
}

