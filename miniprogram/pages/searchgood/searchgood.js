// miniprogram/pages/searchgood/searchgood.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchgood:[]
  },
  getgoodInfo:function(e){
    wx.cloud.callFunction({
      name: 'good_info',
      data:{_id:e.currentTarget.dataset.id},
      // complete: res => {
      //   console.log(res)
      // }
      success:function(res){
        // console.log("成功")
        // let goodinfo = JSON.stringify(res.result);
       
        wx.setStorage({
          data: res.result,
          key: 'goodinfo',
        })
        wx.cloud.callFunction({
          name:'getCommentsById',
          
          data:{
            ids:res.result.comments,
          },
          complete: e =>{
            console.log()
            console.log("获取comment成功")
            wx.setStorage({
              data: e.result,
              key: 'comments',
            })
          }
        })
        
        var otheruser
        wx.cloud.callFunction({
          name: 'user_info',
          data: {_id:res.result.openId},
          complete: res => {
            // console.log("获取用户信息成功")
            // console.log(res.result)
           
            wx.setStorage({
              data: res.result,
              key: 'otheruser',
            })
          }
        }),
        wx.navigateTo({
          url: '../gooddetail/gooddetail',
        })
      },
      fail:console.error
    })  
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.getStorage({
      key: 'searchgood',
      success:function(res){
        that.setData({
          searchgood:res.data
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