var app = getApp()
// miniprogram/pages/perInfo/perInfo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    'otheruser':'',
    isAdmi:true,
    label:false,
    announce:[]
  },
  changefans:function(e){
    var that = this
    wx.cloud.callFunction({
      name:'fans',
      data:{
       _id:this.data.otheruser._id,
       love:!that.data.label
      },
      complete: res =>{
        console.log("修改关注成功")
        that.setData({
          label:!that.data.label
        })
        wx.cloud.callFunction({
          name:'user_info',
          data:{
            _id:that.data.otheruser._id
          },
          complete:res =>{
            console.log("关注更改后重新获取用户信息成功")
            that.setData({
              otheruser:res.result
            })
          }
        })
      }
    })
  },
  getannounce0:function(e){
    var that = this
    var tempgoods = []
    let promiseArr = []
    for (var index in that.data.otheruser.announce) {
      promiseArr.push(new Promise((reslove, reject)=>{
        wx.cloud.callFunction({
         name: 'good_info',
         data:{
          _id:that.data.otheruser.announce[index]
         }
        }).then(res => {
          tempgoods.push(res.result)
          reslove()
        }).catch(error => {
          console.log(error)
        })
      }))
      
     }
     console.log(tempgoods)
     Promise.all(promiseArr).then(res=>{
       that.setData({
         announce:tempgoods
       })
       console.log("发布gggggg")
       console.log(this.data.announce)
     })
    wx.setStorage({
      data:this.data.announce,
      key: 'announce',
    })
    wx.setStorage({
      data: 0,
      key: 'key',
    })
    wx.navigateTo({
      url: '../otherannounce/otherannounce',
    })
  },
  getannounce1:function(e){
    var that = this
    var tempgoods = []
    let promiseArr = []
    for (var index in that.data.otheruser.announce) {
      promiseArr.push(new Promise((reslove, reject)=>{
        wx.cloud.callFunction({
         name: 'good_info',
         data:{
          _id:that.data.otheruser.announce[index]
         }
        }).then(res => {
          tempgoods.push(res.result)
          reslove()
        }).catch(error => {
          console.log(error)
        })
      }))
      
     }
     console.log(tempgoods)
     Promise.all(promiseArr).then(res=>{
       that.setData({
         announce:tempgoods
       })
       console.log("发布gggggg")
       console.log(this.data.announce)
     })
  
    wx.setStorage({
      data:this.data.announce,
      key: 'announce',
    })
    wx.setStorage({
      data: 1,
      key: 'key',
    })
    wx.navigateTo({
      url: '../otherannounce/otherannounce',
    })
  },
  getbought:function(e){
    var that = this
    var tempgoods = []
    let promiseArr = []
    for (var index in that.data.otheruser.announce) {
      promiseArr.push(new Promise((reslove, reject)=>{
        wx.cloud.callFunction({
         name: 'good_info',
         data:{
          _id:that.data.otheruser.announce[index]
         }
        }).then(res => {
          tempgoods.push(res.result)
          reslove()
        }).catch(error => {
          console.log(error)
        })
      }))
      
     }
     console.log(tempgoods)
     Promise.all(promiseArr).then(res=>{
       that.setData({
         announce:tempgoods
       })
       console.log("发布gggggg")
       console.log(this.data.announce)
     })
    wx.setStorage({
      data: this.data.announce,
      key: 'boughts',
    }),
    wx.navigateTo({
      url: '../otherbought/otherbought',
    })
  },
  getcollection:function(e){
    var that = this
    var tempgoods = []
    let promiseArr = []
    for (var index in that.data.otheruser.announce) {
      promiseArr.push(new Promise((reslove, reject)=>{
        wx.cloud.callFunction({
         name: 'good_info',
         data:{
          _id:that.data.otheruser.announce[index]
         }
        }).then(res => {
          tempgoods.push(res.result)
          reslove()
        }).catch(error => {
          console.log(error)
        })
      }))
      
     }
     console.log(tempgoods)
     Promise.all(promiseArr).then(res=>{
       that.setData({
         announce:tempgoods
       })
       console.log("发布gggggg")
       console.log(this.data.announce)
     })
    wx.setStorage({
      data: this.data.announce,
      key: 'goods',
    }),
    wx.navigateTo({
      url: '../othercollection/othercollection',
    })
  },
  jump:function(e){
    wx.navigateTo({
      url: '../index/index',
      success: function(res) {
        console.log("successs");
      },
      fail: function(res) {
        console.log(e);
      },
      complete: function(res) {
    
      },
     })
  },


  showModal(e) {
    this.setData({
      modalName: e.currentTarget.dataset.target
    })
  },
  hideModal(e) {
    this.setData({
      modalName: null
    })
  },

  userNameInput:function(e){
    this.setData({
      userPhone:e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that =  this
    wx.getStorage({
      key: 'label',
      success:function(e){
        that.setData({
          label:e.data
        })
      }
    })
    wx.getStorage({
      key: 'otheruser',
      success:function(res){
        that.setData({
          otheruser:res.data
        })
      }
    })

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