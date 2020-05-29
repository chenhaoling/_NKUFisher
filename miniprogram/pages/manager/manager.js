// miniprogram/pages/manager/manager.js
Page({
  data: {
    checkUser: [],
    checkGood: [],
    checkComment: [],
    TabCur: 0,
    pass: true,
    noPass: false,
    reviewIndex: {}
  },

  tabSelect(e) {
    this.setData({
      TabCur: e.currentTarget.dataset.id
    })
    const that = this
    wx.cloud.callFunction({
      name:'getUserNeedCheck',
      data:{
          type: + e.currentTarget.dataset.id + 1
      },
      complete:res =>{
        console.log(res.result)
        if(e.currentTarget.dataset.id == 0) {
          that.setData({
            checkUser: res.result,
          })
        } else if(e.currentTarget.dataset.id == 1) {
          console.log(res)
          that.setData({
            checkComment: res.result,
          })
        } else {
          that.setData({
            checkGood: res.result,
          })
        }
      }
    })
  },

  bindReview: function(e){
    if(this.data.TabCur == 0) {
      this.reviewUser(e)
    } else if(this.data.tabCur == 1) {
      this.reviewComment(e)
    } else {
      this.reviewGood(e)
    }
  },

  reviewUser: function(e) {
    const that = this
    this.setData({
      reviewIndex: this.data.checkUser.splice(e.currentTarget.dataset.index, 1)[0]
    })
    this.setData({checkUser: this.data.checkUser})
    wx.cloud.callFunction({
      name:'review',
      data:{
        _id: that.data.reviewIndex._id,
        openId: that.data.reviewIndex.userId,
        accept: e.currentTarget.dataset.accept,
        stuNum: that.data.reviewIndex.stuNum,
        campus: that.data.reviewIndex.stuCollege,
      },
      complete:res =>{
        console.log(res)
      }
    })
  },

  reviewGood: function(e) {
    const that = this
    this.setData({
      reviewIndex: this.data.checkGood.splice(e.currentTarget.dataset.index, 1)[0]
    })
    this.setData({checkGood: this.data.checkGood})
    wx.cloud.callFunction({
      name:'review',
      data:{
        _id: that.data.reviewIndex.checkId,
        goodId: that.data.reviewIndex.detail._id,
        comments: that.data.reviewIndex.detail.comments,
        accept: e.currentTarget.dataset.accept,
      },
      complete:res =>{
        console.log(res)
      }
    })
  },

  reviewComment: function(e) {
    const that = this
    this.setData({
      reviewIndex: this.data.checkComment.splice(e.currentTarget.dataset.index, 1)[0]
    })
    this.setData({checkComment: this.data.checkComment})
    wx.cloud.callFunction({
      name:'review',
      data:{
        _id: that.data.reviewIndex.checkId,
        commentId: that.data.reviewIndex.commentId,
        commentGoodId: that.data.reviewIndex.goodId,
        accept: e.currentTarget.dataset.accept,
      },
      complete:res =>{
      }
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
    const that = this
    wx.cloud.callFunction({
      name:'getUserNeedCheck',
      data:{
          type: 1
      },
      complete:res =>{
        that.setData({
            checkUser: res.result,
            tabCur: 0,
        })
      }
    })
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})