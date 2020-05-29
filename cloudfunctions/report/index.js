// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  const openid = cloud.getWXContext().OPENID
  
  if (event.commentId != undefined) {
    // 投诉评论
    let k = 1
    let re = await db.collection('PendingCheck').where({
      commentId: event.commentId,
      goodId: event.goodId,
      reporter: event.reporter
    }).get().then(res=> {
      if (res.data.length > 0) {
        console.log(res.data)
        k = 0 //已被该用户投诉过一次
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
        console.log("hefaefaewf")
        
      }
    })
    if (k == 1) {
      return {detail: true}
    }
    else {
      return {detail: false}
    }

  }
  else  {
    // 投诉商品
    let k = 1
    let re = await db.collection('PendingCheck').where({
      goodId: event.goodId,
      reporter: event.reporter
    }).get().then(res=> {
      if (res.data.length > 0 ) {
        for (let i = 0; i < res.data.length; i++) {
          if (res.data[i].commentId == undefined) {
            k = 0  //已经被该用户投诉过一次
          }
        }
        delete event.userInfo
        if (k != 0) {
          db.collection('PendingCheck').add({ 
          data: event
          })
        }
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
    if (k == 0) {
      return {detail: false}
    }
    else {
      return {detail: true}
    }
  }
}

