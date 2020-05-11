const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

const db = cloud.database()

exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  try {
    let result = await db.collection('User').doc(wxContext.OPENID).get()
    return result.data
  }
  catch(e) {
    return {_id: null}
  }
}

