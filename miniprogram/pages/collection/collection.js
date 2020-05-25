// miniprogram/pages/collection/collection.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo : {},
    goods:[],
    good:[
      {
        "id":0,
        "name":"This is a test",
        "content":"折磨生出苦难，苦难又会加剧折磨，凡间这无穷的循环，将有我来终结！真正的恩典因不完整而美丽，因情感而真诚，因脆弱而自由！",
        "price":"88"
      },
      {
        "id":1,
        "name":"This is a test",
        "content":"折磨生出苦难，苦难又会加剧折磨，凡间这无穷的循环，将有我来终结！真正的恩典因不完整而美丽，因情感而真诚，因脆弱而自由！",
        "price":"88"
      },
      {
        "id":2,
        "name":"This is a test",
        "content":"折磨生出苦难，苦难又会加剧折磨，凡间这无穷的循环，将有我来终结！真正的恩典因不完整而美丽，因情感而真诚，因脆弱而自由！",
        "price":"88"
      },
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("onLoad")
    if(this.data.goods.length === 0){
    wx.cloud.callFunction({
      name: 'user_info',
      data: '',
      complete: res => {
        this.setData({
          userInfo: res.result
        })
        // console.log("发布的"+this.data.fabu_id)
        
        this.backDetail()
      }
    })
  }

  },

  backDetail: function(){
    var tempgoods = []
    if(app.globalData.fabu==0){
      for (var index in this.data.userInfo.announce) {
        wx.cloud.callFunction({
          name: 'good_info',
          data: {
            _id:this.data.userInfo.announce[index]
          },
          complete: res => {
            tempgoods.push(res.result)
            // console.log("山脉:"+this.data.goods[0].category)
            console.log("长度")
            console.log(this.data.goods.length)
            // if(index === this.data.userInfo.announce.length - 1)
            // {
            this.setData({
              goods: tempgoods
            })
          // }
          }
        })
       }
       
      //  console.log("河流:"+this.data.goods[0])
    }else if(app.globalData.fabu==1){
      for (var index in this.data.userInfo.announce) {
        wx.cloud.callFunction({
          name: 'good_info',
          data: {
            _id:this.data.userInfo.announce[index]
          },
          complete: res => {
            tempgoods.push(res.result)
            // console.log("山脉:"+this.data.goods[0].category)
            console.log("长度")
            console.log(this.data.goods.length)
            // if(index === this.data.userInfo.announce.length - 1)
            // {
            this.setData({
              goods: tempgoods
            })
          // }
          }
        })
       }
    }else if(app.globalData.fabu==2){
      for (var index in this.data.userInfo.announce) {
        wx.cloud.callFunction({
          name: 'good_info',
          data: {
            _id:this.data.userInfo.announce[index]
          },
          complete: res => {
            tempgoods.push(res.result)
            // console.log("山脉:"+this.data.goods[0].category)
            console.log("长度")
            console.log(this.data.goods.length)
            // if(index === this.data.userInfo.announce.length - 1)
            // {
            this.setData({
              goods: tempgoods
            })
          // }
          }
        })
       }
    }else{
      for (var index in this.data.userInfo.announce) {
        wx.cloud.callFunction({
          name: 'good_info',
          data: {
            _id:this.data.userInfo.announce[index]
          },
          complete: res => {
            tempgoods.push(res.result)
            // console.log("山脉:"+this.data.goods[0].category)
            console.log("长度")
            console.log(this.data.goods.length)
            // if(index === this.data.userInfo.announce.length - 1)
            // {
            this.setData({
              goods: tempgoods
            })
          // }
          }
        })
       }
    }
    // this.onShow()
    // this.onReady()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log("onReady")
    // console.log("河流:"+this.data.goods[0])
    // this.onLoad()
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log("onShow")
    // console.log("河流:"+this.data.goods[0])
  //  console.log(this.data.goods)
  // this.onLoad()
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