// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  let id = event.id

  let childSingle = await db.collection('Comment').doc(id).get()
  if (childSingle.data.childComments != undefined){
    for (let j = 0; j < childSingle.data.childComments.length; j++) {
      await db.collection('Comment').doc(childSingle.data.childComments[j]).remove()
    }
  }
  await db.collection('Comment').doc(id).remove()
  
  return {detail: true}

}
