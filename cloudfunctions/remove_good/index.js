// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  const openId = cloud.getWXContext().OPENID
  let result = await db.collection('Good').doc(event._id).get()
  if(result.data.openId == openId) {
    await db.collection('Good').doc(event._id).update({
      data: {state: 0}
    })
    if(event.buy_id != undefined) {
      result = await db.collection('User').doc(event.buy_id).get()
      bought = result.data.bought
      bought.push(event._id)
      await db.collection('User').doc(event.buy_id).update({
        data: {bought: bought}
      })
    }
    return {detail: true}
  }
}
