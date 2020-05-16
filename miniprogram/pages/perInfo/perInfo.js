// miniprogram/pages/perInfo/perInfo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userHead:'../../images/icon9.jpeg',
    userName: 'JackLin',
    userPhone: 123456,
    guanzhu:12,
    fensi:11,
    isAdmi:true,

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