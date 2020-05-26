// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  delete event.userInfo

  // var now = new Date(),
  // y = now.getFullYear(),
  // m = now.getMonth() + 1,
  // d = now.getDate(),
  // x = y + "-" + (m < 10 ? "0" + m : m) + "-" + (d < 10 ? "0" + d : d) + " " + now.toTimeString().substr(0, 8);
  // console.log(x)

  if (event.father != undefined) {
    //对评论的评论
    let childId
    let data = {}
    data.userId = event.userId
    data.time = event.time
    data.content = event.content
    data.nickname = event.nickname
    data.avatarUrl = event.avatarUrl
    let result = await db.collection('Comment').add({ 
      data: data
    }).then(res => {
      childId = res._id
    })

    
    let result1 = await db.collection('Comment').doc(event.father).update({
      data: {
        childComments: db.command.push(childId)
      }
      
    })
    return {detail: true}
  }

  else {
    //是第一层的评论
    let childId
    let childData = {}
    childData.userId = event.userId
    childData.time = event.time
    childData.content = event.content
    data.nickname = event.nickname
    data.avatarUrl = event.avatarUrl
    let result2 = await db.collection('Comment').add({ 
      data: childData
    }).then(res => {
      childId = res._id
    })
    let result3 = await db.collection('Good').doc(event.goodId).update({
      data: {
        comments: db.command.push(childId)
      }
    })

    return {detail: true}
  }
}
