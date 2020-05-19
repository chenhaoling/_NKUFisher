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
    name:'1', //商品名字
    thingDescribe:'',//商品描述
    currentPrice:'1',//商品价格
    college:'软件学院',//
    thingImage:'../../images/xiangji.jpg',
    stuId:'123',
    phoneNum: '123678',
    buttonLoading: false,

  },

  bindCurrentPriceInput: function(e) {
    this.setData({
      stuId: e.detail.value
    })
  },
  //书本信息
  bindBookcollegeInput: function(e) {
    this.setData({
      college: e.detail.value
    })
  },
  bindBookPhoneNumberInput: function(e){
      this.setData({
          phoneNum: e.detail.value
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
  bindThingImageInput: function() { //商品图片选择
    var that = this;
    wx.chooseImage({
      count: 1,
      sourceType: ['album', 'camera'],
      success: function(res) {
        var thingImage = res.tempFilePaths;
        that.setData({
          thingImage: thingImage
        })
      },
    })
  },
  bindBookNameInput: function(e) {
    this.setData({
      name: e.detail.value
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

  verify:function(e){
    console.log("shenfen");
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