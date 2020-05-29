// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  
  if (event.type == 1) {
    //拉取 待审核用户
    let data = []
    let result = await db.collection('PendingCheck').where({
      identity: 1
    }).get().then(res=> {
      data = res.data
    })
    return data
  }

  else if (event.type == 2) {
    let data=[]
    //拉取 被投诉的评论
    let result = await db.collection('PendingCheck').where({
      identity: 2
    }).get().then(res=> {
      data = res.data     
    })
    outdata = []
    for (let i = 0; i < data.length; i++) {
        const single = await cloud.callFunction({
            // 要调用的云函数名称
            name: 'getComment',
    
            data: {commentId:data[i].commentId}
          })
        console.log(single.result)
        sObject = {}
        sObject["checkId"] = data[i]._id
        sObject["nickname"] = single.result.nickname
        sObject["time"] = single.result.time
        sObject["content"] = single.result.content
        sObject["commentId"] = single.result._id
        outdata.push(sObject)

    }

    
    
    
    return outdata
  }

  else {
    //拉取 被投诉的商品
    let data = []
    let outdata = []
    let result = await db.collection('PendingCheck').where({
      identity: 3
    }).get().then(res=> {
      data = res.data
    })

    for (let i = 0; i < data.length; i++) {
      const single = await cloud.callFunction({
          // 要调用的云函数名称
        name: 'good_info',
        data: {_id:data[i].goodId}
      })
      sObject = {}
      sObject["checkId"] = data[i]._id
      sObject["detail"] = single.result
      outdata.push(sObject)
    }

    return outdata
  }
}
