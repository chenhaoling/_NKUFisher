const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

const db = cloud.database()

const resetable = ['nickName', 'avatar', 'contact']

exports.main = async (event, context) => {
  const openId =  cloud.getWXContext().OPENID
  delete event.userInfo
  let data = {}
  let empty = true
  for(let index = 0; index < resetable.length; index++) {
    if(resetable[index] in event) {
      data[resetable[index]] = event[resetable[index]]
      empty = false
    }
  }
  if(empty) {
    try {
      let result = await db.collection('User').doc(openId).get()
      return result.data
    }
    catch(e) {
      return {_id: null}
    }
  }
  else {
    try {
      let result = await db.collection('User').doc(openId).update({
        data: data
      })
      return result.errMsg
    }
    catch(e) {
      return {_id: null}
    }
  }
  
}

