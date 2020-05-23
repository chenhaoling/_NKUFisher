// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  delete event.userInfo
  let orderByKey = ['tittle', 'asc']
  if(event.orderBy != undefined) {
    orderByKey = event.orderBy
  }
  delete event.orderBy
  let limitKey = 100
  if(event.limit != undefined) {
    limitKey = event.limit
  }
  delete event.limit
  let data = {}
  data.condition = event.condition
  delete event.condition
  data.state = 1
  for(let key in event) {
    data[key] = db.RegExp({
      regexp: event[key],
      options: 'i',
    })
  }
  const result = await db.collection('Good').orderBy(orderByKey[0], orderByKey[1]).limit(limitKey).where(data).field({
    _id: true,
    openId: true,
    title: true,
    category: true,
    oriPrice: true,
    curPrice: true,
    createTime: true,
    star: true,
    image: true,
    detail: true,
  }).get()
  return result.data
}
