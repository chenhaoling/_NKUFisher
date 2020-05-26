// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  let ids = event.ids
  let result = []
  for (let i = 0; i < ids.length; i++) {
    let tmpComment = await db.collection('Comment').doc(ids[i]).get()
    result.push(tmpComment.data)
  }
  return result
}
