// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  let id = event.id
  let goodId = event.goodId
  let targetGood  = await db.collection('Good').doc(goodId).get()

  let comments = []
  comments = targetGood.data.comments
  let index = 0
  for (let i = 0; i < comments.length; i++) {
    if (comments[i] == id) index = i
  }
  comments.splice(index, 1)

  let Good = await db.collection('Good').doc(goodId).update({
    data: {
      comments: comments
    },
    success: function(res) {
    }
  })


  let childSingle = await db.collection('Comment').doc(id).get()
  if (childSingle.data.childComments != undefined){
    for (let j = 0; j < childSingle.data.childComments.length; j++) {
      await db.collection('Comment').doc(childSingle.data.childComments[j]).remove()
    }
  }
  await db.collection('Comment').doc(id).remove()
  
  return {detail: true}

}
