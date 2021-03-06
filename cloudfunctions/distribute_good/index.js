// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  delete event.userInfo
  if(event.create)
  {
    delete event.create
    event.state = 1
    event.star = 0
    event.hot = 0
    var now = new Date()
    y = now.getFullYear()
    m = now.getMonth() + 1
    d = now.getDate()
    event.createTime = y + "-" + (m < 10 ? "0" + m : m) + "-" + (d < 10 ? "0" + d : d) + " " + now.toTimeString().substr(0, 8)
    event.comments = []
    event.openId = cloud.getWXContext().OPENID
    let result = await db.collection('Good').add({
      data: event
    })
    const goodId = result._id
    result = await db.collection('User').doc(event.openId).get()
    let announce = result.data.announce
    announce.push(goodId)
    await db.collection('User').doc(event.openId).update({
      data: {announce: announce}
    })
    return goodId
  }
  delete event.create
  const result = await db.collection('Good').doc(event._id).get()
  if(event.image != undefined) {
    let image = result.data.image
    image.push(event.image)
    await db.collection('Good').doc(event._id).update({
      data: {image: image}
    })
    return {detail: true}
  }
  if(event.comments != undefined) {
    let comments = result.data.comments
    comments.push(event.comments)
    await db.collection('Good').doc(event._id).update({
      data: {comments: comments}
    })
    return {detail: true}
  }
  const goodId = event._id
  delete event._id
  await db.collection('Good').doc(goodId).update({
    data: event
  })
  return {detail: true}
}
