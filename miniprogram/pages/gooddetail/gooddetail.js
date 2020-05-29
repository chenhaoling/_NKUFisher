var app = getApp()
// miniprogram/pages/gooddetail/gooddetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    havecollec:false,
    reportImageUrl:'../../images/reportGood.png',
    userInfo:{},
    'goodinfo':'',
    'otheruser':'',
    'contentInp':'',
    '_id':'',
     'comments':[],
  },
  reportcomment:function(e){
    var that = this
    console.log(that.data.goodinfo._id)
    console.log(e.currentTarget.dataset.id)
    console.log(app.globalData.userInfo._id)
    wx.cloud.callFunction({
      name:'report',
      data:{
        goodId:that.data.goodinfo._id,
        commentId:e.currentTarget.dataset.id,
        reporter:app.globalData.userInfo._id,
      },
      complete: res=>{
          console.log('评论投诉成功')
          console.log(res.result)
      }
    })
  },
  delcomment:function(e){
    var that = this

  },
  getotheruserinfo:function(e){
    var label = false
    var that = this
    wx.setStorage({
      data: this.data.otheruser,
      key: 'otheruser',
    })
    for(var i = 0;i < that.data.otheruser.fans.length;i++){
      if(that.data.otheruser.fans[i]== app.globalData.userInfo._id){
        label = true;
        break;
      }    
    }
    wx.setStorage({
      data: label,
      key: 'label',
    })
    wx.navigateTo({
      url: '../otherInfo/otherInfo?label',
    })
  },


  contentInp(e) {
    this.setData({
      contentInp: e.detail.value
    })
  },

  addComment: function(){
    var that = this
    var Time = new Date()
    console.log(app.globalData.userInfo.avatar)
    wx.cloud.callFunction({
      name: 'comment', 
      data: {
        userId:that.data.otheruser._id,
        content:that.data.contentInp,
        time:Time,
        goodId:that.data.goodinfo._id,
        nickname:app.globalData.userInfo.nickName,
        avatarUrl:app.globalData.userInfo.avatar
      },
      complete: res => {
        wx.cloud.callFunction({
          name:'good_info',
          data:{_id:that.data.goodinfo._id},
          complete:res =>{
            console.log("重新获取商品信息成功")
            that.setData({
              goodinfo:res.result
            })
            wx.cloud.callFunction({
              name:'getCommentsById',
              data:{
                ids:that.data.goodinfo.comments,
              },
              complete: e =>{
                console.log()
                console.log("重新获取comment成功")
                that.setData({
                  comments:e.result
                })
              }
            })
          }
        })
        console.log("插入评论成功")
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    const vm = this
    wx.cloud.callFunction({
      name: 'user_info',
      data: {
      },
      complete: res => {
        vm.setData({
          userInfo: res.result
        })
        for(var x of vm.data.userInfo.collection){
          if(x === vm.data.goodinfo._id){
           vm.setData({
             havecollec:true
           })
          }
        } 
        console.log(res.result)
      }
    })
    
    var that = this
    that.setData({
      _id:app.globalData.userInfo._id
    })
    wx.getStorage({
      key: 'goodinfo',
      success:function(res){
        console.log(res)
        that.setData({
          goodinfo:res.data
        })
      
     
        // console.log(res.data)
      }
    }),
    wx.getStorage({
      key: 'otheruser',
      success:function(res){
        that.setData({
          otheruser:res.data
        })
      }
    }),
    wx.getStorage({
      key: 'comments',
      success:function(res){
        that.setData({
          comments:res.data
        })
      }
    })
  //  setTimeout(this.onShow(), 1000)
  },

  Collect:function(){
    this.setData({
      havecollec:true
    })
    wx.cloud.callFunction({
      name: 'collection_good',
      data: {
        _id: this.data.goodinfo._id,
        add:true
      },
      complete: res => {
        wx.showToast({
          title: '您已成功收藏该商品',
          icon: 'success',
          duration: 2000
      })
      }
    })
  },
  cancelCollect:function(){
    this.setData({
      havecollec:false
    })
    wx.cloud.callFunction({
      name: 'collection_good',
      data: {
        _id: this.data.goodinfo._id
      },
      complete: res => {
        wx.showToast({
          title: '您已成功取消收藏',
          icon: 'success',
          duration: 2000
      })
      }
    })
  },

  reportGood:function(){
    wx.cloud.callFunction({
      name: 'report',
      data: {
        goodId:this.data.goodinfo._id,
        reporter:app.globalData.userInfo._id,
      },
      complete: res => {
        if(res.result.detail === false){
          wx.showToast({
            title: '您已举报过该商品',
            icon: 'success',
            duration: 2000
        })
        }else{
          wx.showToast({
            title: '您已成功举报',
            icon: 'success',
            duration: 2000
        })
      
        }
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
  onShow: function() {

     

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