// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  const openId =  cloud.getWXContext().OPENID
  let result = await db.collection('User').doc(openId).get()
  let love = result.data.love
  result = await db.collection('User').doc(event._id).get()
  let fans = result.data.fans
  if(event.love == true) {
    if(love.indexOf(event._id) != -1) {
      return {detail: false}
    }
    love.push(event._id)
    fans.push(openId)
  }
  else {
    let index = love.indexOf(event._id)
    if(index == -1) {
      return {detail: false}
    }
    love.splice(index, 1)
    index = fans.indexOf(openId)
    fans.splice(index, 1)
  }
  let data = {love: love}
  await db.collection('User').doc(openId).update({
    data: data
  })
  data = {fans: fans}
  await db.collection('User').doc(event._id).update({
    data: data
  })
  return {detail: true}
}