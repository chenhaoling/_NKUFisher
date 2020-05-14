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
  let limitKey = 100
  if(event.limit != undefined) {
    limitKey = event.limit
  }
  let data = {}
  for(let key in event) {
    if(key != 'orderBy' && key != 'limit') {
      data[key] = db.RegExp({
        regexp: event[key],
        options: 'i',
      })
    }
  }
  const result = await db.collection('Good').orderBy(orderByKey[0], orderByKey[1]).limit(limitKey).where(data).get()
  return result.data
}
