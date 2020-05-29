
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
    isAdmin:false,
    buttonLoading: false,
    updateInfo: {
      reviewImage: '',
      stuNum: '',
      campus: "八里台校区",
      nickName: '',
      contact: '',
    },
    campus: ["八里台校区", "津南校区", "泰达校区"], 
    campusIndex: 0,
    buttonLoading: false,
    blockCard: [
      {
        url: '../collection/collection?type=fabu',
        tittle: '我的发布',
      },
      {
        url: '../collection/collection?type=bought',
        tittle: '我淘到的',
      },
      {
        url: '../collection/collection?type=request',
        tittle: '我的求购',
      },
      {
        url: '../collection/collection?type=collection',
        tittle: '我的收藏',
      },
    ],
  },

  getCurrUserInfo:function(e){
    this.setData({
      userInfo: app.globalData.userInfo
    })
    if(app.globalData.userInfo._id != null) {
      this.data.updateInfo.nickName = this.data.userInfo.nickName
      this.data.updateInfo.contact = this.data.userInfo.contact
      this.setData({
        isAut: true,
        updateInfo: this.data.updateInfo
      })
    }
    if(app.globalData.userInfo.role === 'admin'){
      this.setData({
        isAdmin: true
      })
    }
    if(app.globalData.userInfo.stuNum != undefined && app.globalData.userInfo.stuNum != '') {
      this.setData({
        isReview: true
      })
    }
  },


  authorization: function(res){
    if(app.globalData.userInfo._id != null) {
      this.getCurrUserInfo()
    } else {
      const userInfo = res.detail.userInfo
      wx.cloud.callFunction({
        name: 'authorization',
        data: {
          nickName: userInfo.nickName,
          avatar: userInfo.avatarUrl,
        },
        complete: res => {
          app.globalData.userInfo = res.result
          this.getCurrUserInfo()
          this.setData({
            isAut: true
          })
        },
      })
    }
  },

  bindInput: function(e) {
    if(e.currentTarget.dataset.type == "campus") {
      this.data.updateInfo[e.currentTarget.dataset.type] = this.data.campus[e.detail.value]
      this.setData({campusIndex: e.detail.value})
    } else {
      this.data.updateInfo[e.currentTarget.dataset.type] = e.detail.value
    }
    this.setData({updateInfo: this.data.updateInfo})
  },

  bindAdmin:function(){
    wx.navigateTo({
      url: '../manager/manager',
    })
  },

  bindClear:function(){
    this.setData({
      isAut: false,
    })
  },

  bindUpdate:function(){
    const that = this
    wx.cloud.callFunction({
      name: 'user_info',
      data: {
        nickName: this.data.updateInfo.nickName,
        contact: this.data.updateInfo.contact,
      },
      complete: res => {
        wx.showToast({
          title: '修改成功',
          icon: 'succes',
          duration: 2500,
          mask: true
        })
        that.hideModal()
        app.globalData.userInfo.nickName = that.data.updateInfo.nickName
        app.globalData.userInfo.contact = that.data.updateInfo.contact
        that.setData({
          userInfo: app.globalData.userInfo
        })
      },
    })
  },

  bindReview:function(){
    const that = this
    let filePath = this.data.updateInfo.reviewImage
    let suffix = /\.[^\.]+$/.exec(filePath)[0];
    that.setData({
      buttonLoading: true,
    })
    wx.cloud.uploadFile({
      cloudPath: new Date().getTime() + suffix,
      filePath: filePath,
    }).then(res => {
      that.data.updateInfo.reviewImage = res.fileID
      wx.cloud.callFunction({
        name: 'identityCheck',
        data: {
          userId: that.data.userInfo._id,
          pic: that.data.updateInfo.reviewImage,
          stuNum: that.data.updateInfo.stuNum,
          stuCollege: that.data.updateInfo.campus,
          identity: 1,
        },
        complete: res => {
          wx.showToast({
            title: '提交成功',
            icon: 'succes',
            duration: 2500,
            mask: true
          })
          that.hideModal()
          that.data.updateInfo.stuNum = ''
          that.data.updateInfo.reviewImage = ''
          that.data.updateInfo.campus = "八里台校区",
          that.setData({
            updateInfo: that.data.updateInfo,
            buttonLoading: false,
          })
        },
      })
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

  ChooseImage() {
    const that = this
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function(res) {
        that.data.updateInfo.reviewImage = res.tempFilePaths[0]
      that.setData({updateInfo: that.data.updateInfo})
      },
    })
  },
  ViewImage(e) {
    wx.previewImage({
      urls: this.data.updateInfo.reviewImage,
      current: e.currentTarget.dataset.url
    });
  },
  DelImg(e) {
    this.data.updateInfo.reviewImage = ''
    this.setData({updateInfo: this.data.updateInfo})
  },

    /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  },

    /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getCurrUserInfo()
    const that = this
    app.userInfoReadyCallback = res =>{
      this.setData({
        userInfo: res.result
      })
      that.getCurrUserInfo()
    };
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