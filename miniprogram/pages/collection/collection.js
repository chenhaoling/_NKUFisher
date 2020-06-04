// miniprogram/pages/collection/collection.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo : {},
    goods:[],
    type:'fabu',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function ({type}) {
    this.setData({
      type:type
    })
   

    if(this.data.goods.length === 0){
     
    wx.cloud.callFunction({
      name: 'user_info',
      data: '',
      complete: res => {
        this.setData({
          userInfo: res.result
        })
        

        this.backDetail()
      }
    })
  }

  },

  backDetail: function(){
    var tempgoods = []
    if(this.data.type === 'fabu'){

      let promiseArr = []

      for (var index in this.data.userInfo.announce) {
        promiseArr.push(new Promise((reslove, reject)=>{
          wx.cloud.callFunction({
           name: 'good_info',
           data:{
            _id:this.data.userInfo.announce[index]
           }
          }).then(res => {
            tempgoods.push(res.result)
            reslove()
          }).catch(error => {
          })
        }))
        
       }

       Promise.all(promiseArr).then(res=>{
         this.setData({
           goods:tempgoods
         })
       })




      

       
    }else if(this.data.type === 'bought'){//淘到的

      let promiseArr = []

      for (var index in this.data.userInfo.bought) {


        promiseArr.push(new Promise((reslove, reject)=>{
          wx.cloud.callFunction({
           name: 'good_info',
           data:{
            _id:this.data.userInfo.bought[index]
           }
          }).then(res => {
            tempgoods.push(res.result)
            reslove()
          }).catch(error => {
            console.log(error)
          })
        }))
        
       }

       Promise.all(promiseArr).then(res=>{
         this.setData({
           goods:tempgoods
         })
        //  console.log(this.data.goods)
       })

    }else if(this.data.type === 'request'){
      let promiseArr = []

      for (var index in this.data.userInfo.announce) {


        promiseArr.push(new Promise((reslove, reject)=>{
          wx.cloud.callFunction({
           name: 'good_info',
           data:{
            _id:this.data.userInfo.announce[index]
           }
          }).then(res => {

            tempgoods.push(res.result)
            reslove()
          }).catch(error => {
            console.log(error)
          })
        }))
        
       }

       Promise.all(promiseArr).then(res=>{
         this.setData({
           goods:tempgoods
         })
        //  console.log(this.data.goods)
       })


    



    }else{//我的收藏
      // console.log("我的收藏")
      // console.log(this.data.userInfo.collection)
      let promiseArr = []

      for (var index in this.data.userInfo.collection) {


        promiseArr.push(new Promise((reslove, reject)=>{
          wx.cloud.callFunction({
           name: 'good_info',
           data:{
            _id:this.data.userInfo.collection[index]
           }
          }).then(res => {
            tempgoods.push(res.result)
            reslove()
          }).catch(error => {
            console.log(error)
          })
        }))
        
       }

       Promise.all(promiseArr).then(res=>{
         this.setData({
           goods:tempgoods
         })
        //  console.log(this.data.goods)
       })




    }
    // this.onShow()
    // this.onReady()
  },

  remove:function(event){


    if(this.data.type === 'fabu'){
      wx.cloud.callFunction({
        name: 'remove_good',
        data: {
          _id:event.currentTarget.dataset.goodid, 
        },
        complete: res => {
          this.backDetail()
          // this.onLoad()
        }
      })

    }else if(this.data.type === 'bought'){
    }else if(this.data.type === 'request'){
      wx.cloud.callFunction({
        name: 'remove_good',
        data: {
          _id:event.currentTarget.dataset.goodid,
          buy_id:app.globalData.userInfo._id
        },
        complete: res => {
          this.backDetail()
          // this.onLoad()
        }
      })

    }else{
      var that = this
      wx.cloud.callFunction({
        name: 'collection_good',
        data:{
          _id:event.currentTarget.dataset.goodid,
        },
        complete: res => {
          wx.cloud.callFunction({
            name: 'user_info',
            data: {},
            complete: restep => {
              app.globalData.userInfo = restep.result
              this.setData({
                  userInfo: restep.result
                })
                that.backDetail()
            }
            
          })
         
        }
      })
     

    }

   
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})