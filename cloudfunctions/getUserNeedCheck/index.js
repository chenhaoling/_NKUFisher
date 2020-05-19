// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  if (event.type == 1) {
    //拉取 待审核用户
    let result = await db.collection('PendingCheck').where({
      identity: 1
    }).get().then(res=> {
      return res.data
    })
  }

  else if (event.type == 2) {
    //拉取 被投诉的评论
    let result = await db.collection('PendingCheck').where({
      identity: 2
    }).get().then(res=> {
      return res.data
    })
  }

  else {
    //拉取 被投诉的商品
    let result = await db.collection('PendingCheck').where({
      identity: 3
    }).get().then(res=> {
      return res.data
    })
  }
}
