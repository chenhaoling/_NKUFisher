const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()

exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  delete event.userInfo
  event._id = wxContext.OPENID
  const result = await db.collection('User').add({
    data: event
  })
  return result.errMsg
}