// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  const openId = cloud.getWXContext().OPENID
  let result = await db.collection('User').doc(openId).get()
  let collection = result.data.collection
  let index = collection.indexOf(event._id)
  if(event.add) {
    if(index != -1) {
      return {detail: false}
    }
    collection.push(event._id)
    await db.collection('User').doc(openId).update({
      data: {collection: collection}
    })
    return {detail: true}
  }
  if(index == -1) {
    return {detail: false}
  }
  collection.splice(index, 1)
  await db.collection('User').doc(openId).update({
    data: {collection: collection}
  })
  return {detail: true}
}
