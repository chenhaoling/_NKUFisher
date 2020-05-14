// miniprogram/pages/publish/publish.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    postBook: true,
    postThing: false,
    campus: ["八里台校区", "津南校区", "泰达校区"], //6
    campusIndex: 0,

    conditions: ["数码产品", "学习资料", "生活用品", "其他"], //5
    conditionIndex: 2, //
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

  choosePostBook: function(e) {
    var that = this;
    that.setData({
      postBook: true,
      postThing: false,
   
    })
  },
  choosePostThing: function(e) {
    var that = this;
    that.setData({
      postBook: false,
      postThing: true,
    })
  },

  bindCampusChange: function(e) {
    console.log(e);
    this.setData({
      campusIndex: e.detail.value
    })
  },

  bindConditionChange: function(e) { //
    console.log(e.detail);
    this.setData({
      conditionIndex: e.detail.value
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})

