// miniprogram/pages/perInfo/perInfo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    'otheruser':'',
    isAdmi:true,
    
  },
  getbought:function(e){
    wx.setStorage({
      data: this.data.otheruser.bought,
      key: 'boughts',
    }),
    wx.navigateTo({
      url: '../otherbought/otherbought',
    })
  },
  getcollection:function(e){
    wx.setStorage({
      data: this.data.otheruser.collection,
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