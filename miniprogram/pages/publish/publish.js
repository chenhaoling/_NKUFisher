// miniprogram/pages/publish/publish.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    good: {
      condition: 0,
      title: "",
      contact: "",
      campus: "八里台校区",
      category: "数码产品",
      detail: "",
      oriPrice: -1,
      curPrice: -1,
      image: [],
    },
    postBook: true,
    postThing: false,
    campus: ["八里台校区", "津南校区", "泰达校区"], 
    campusIndex: 0,
    categorys: ["数码产品", "学习资料", "生活用品", "其他"], 
    categoryIndex: 0, 
    buttonLoading: false,
    TabCur: 0,
    scrollLeft: 0,
  },

  bindInput: function(e) {
    this.data.good[e.currentTarget.dataset.type] = e.detail.value
    this.setData({good: this.data.good})
  },

  tabSelect(e) {
    this.setData({
      TabCur: e.currentTarget.dataset.id
    })
    this.data.goodcondition = e.currentTarget.dataset.id
    this.setData({good: this.data.good})
  },

  ChooseImage() {
    const that = this
    wx.chooseImage({
      count: 4,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function(res) {
        if(that.data.good.image.length != 0) {
          that.data.image= that.data.image.concat(res.tempFilePaths)
          that.setData({good: good})
        } else {
          that.data.image = res.tempFilePaths
          that.setData({good: good})
        }
      },
    })
  },
  ViewImage(e) {
    wx.previewImage({
      urls: this.data.good.image,
      current: e.currentTarget.dataset.url
    });
  },
  DelImg(e) {
    this.data.good.image.splice(e.currentTarget.dataset.index, 1)
    this.setData({good: good})
  },

  bindSubmit: function() {
    if (app.globalData.userInfo.stuNum == "") {
      wx.showModal({
        title: '提示',
        content: '请验证您的学生身份',
        success: function(res) {
          if (res.confirm) {
            console.log('用户点击确定')
            wx.navigateTo({
              url: '../my/mySetting/mySetting',
            })
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    } else {
      this.setData({
        buttonLoading: true
      })
      this.data.good.create = true
      wx.cloud.callFunction({
        name: 'distribute_good',
        data: this.data.good,
        complete: res => {
          console.log(res)
          wx.showToast({
            title: '发布成功',
            icon: 'succes',
            duration: 2500,
            mask: true
          })
        },
      })
    }
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

    /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },



})

