// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  let openId =  cloud.getWXContext().OPENID
  let result = await db.collection('Good').doc(event._id).get()
  if(openId != result.data.openId) {
    result.data.hot++
    await db.collection('Good').doc(event._id).update({
      data: {hot: result.data.hot}
    })
  }
  return result.data
}
