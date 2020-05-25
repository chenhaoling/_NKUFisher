const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()

exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  delete event.userInfo
  event._id = wxContext.OPENID
  event.announce = []
  event.collection = []
  event.bought = []
  event.love = []
  event.fans = []
  event.role = 'user'
  event.contact = ""
  await db.collection('User').add({
    data: event
  })
  return event
}
