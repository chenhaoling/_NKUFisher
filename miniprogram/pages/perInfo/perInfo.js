
var app = getApp()
// miniprogram/pages/perInfo/perInfo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    isReview: false,
    isAut: false,
    blockCard: [
      {
        url: '../collection/collection',
        tittle: '我的发布',
      },
      {
        url: '../collection/collection',
        tittle: '我淘到的',
      },
      {
        url: '../collection/collection',
        tittle: '我的求购',
      },
      {
        url: '../collection/collection',
        tittle: '我的收藏',
      },
      {
        url: '../collection/collection',
        tittle: '系统通知',
      }
    ],
    userHead:'../../images/icon9.jpeg',
    isAdmi:true,
    name:'1', //商品名字
    thingDescribe:'',//商品描述
    currentPrice:'1',//商品价格
    college:'软件学院',//
    thingImage:'../../images/xiangji.jpg',
    stuId:'123',
    phoneNum: '123678',
    buttonLoading: false,
    currUser:{}
  },

  getCurrUserInfo:function(e){
    this.setData({
      userInfo: app.globalData.userInfo
    })
    if(app.globalData.userInfo._id != null) {
      this.setData({
        isAut: true
      })
    }
    if(app.globalData.userInfo.stuNum != undefined && app.globalData.userInfo.stuNum != '') {
      this.setData({
        isReview: true
      })
    }
  },

  authorization: function(e){
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: res => {
              const userInfo = res.userInfo
              wx.cloud.callFunction({
                name: 'authorization',
                data: {
                  nickName: userInfo.nickName,
                  avatar: userInfo.avatar,
                },
                complete: res => {
                  app.globalData.userInfo = res.result
                  this.getCurrUserInfo()
                },
              })
            }
          })
        }
      }
    })
  },

    /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getCurrUserInfo()
  },

    /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log("222")
    // if(Object.keys(app.globalData.userInfo).length != 0) {
    //   this.setData({
    //     isAut:true
    //   })
    //   console.log("test")
    // }
    // this.onShow()

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

  getMyfabu:function(e){
    app.globalData.fabu=0,
    console.log("打印userinfo")
    console.log(app.globalData.userInfo)
  },

  getMytao:function(e){
    app.globalData.fabu=1
  },
  getMyqiugou:function(e){
    app.globalData.fabu=2
  },
  getMyshoucang:function(e){
    app.globalData.fabu=3
  },


/**
* 获取用户唯一凭证
*/
bingGetOpenID: function() {
  wx.login({
    success: function(data) {
      console.log('获取登录 Code：' + data.code)
      var postData = {
        code: data.code
      };
    },
    fail: function() {
      console('登录获取Code失败！');
    }
  })
},

  verify:function(e){
    console.log("shenfen");
  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
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