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
          type: e.currentTarget.dataset.id + 1
      },
      complete:res =>{
        if(e.currentTarget.dataset.id == 0) {
          that.setData({
            checkUser: res.result,
          })
        } else if(e.currentTarget.dataset.id == 1) {
          that.setData({
            checkGood: res.result,
          })
        } else {
          that.setData({
            checkComment: res.result,
          })
        }
      }
    })
  },

  bindReview: function(e){
    if(this.data.TabCur == 0) {
      this.reviewUser(e)
    } else if(this.data.tabCur == 1) {
      this.reviewGood(e)
    } else {
      this.reviewComment(e)
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
        openId: that.data.reviewIndex.openId,
        accept: e.currentTarget.dataset.accept,
      },
      complete:res =>{
      }
    })
  },


  acceptComment: function(e){
    var that = this
    var Time = new Date()
    wx.cloud.callFunction({  
        name:'review',
        data:{
            _id: e.currentTarget.dataset['id'],

        },
        complete:res =>{
        }
      })
    that.onLoad() 
  },

  deleteComment: function(e){
    console.log("inside delete")
    var that = this
    var Time = new Date()
    wx.cloud.callFunction({
        name:'review',
        data:{
            _id: e.currentTarget.dataset['id'],
            accept: true,
            commentId: e.currentTarget.dataset['commentId']
        },
        complete:res =>{
        }
      })
    that.onLoad() 
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
        _id: that.data.reviewIndex._id,
        goodId: that.data.reviewIndex.goodId,
        accept: e.currentTarget.dataset.accept,
      },
      complete:res =>{
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
        _id: that.data.reviewIndex._id,
        commentId: that.data.reviewIndex.commentId,
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
    var that = this
    wx.cloud.callFunction({
        name:'getUserNeedCheck',
        data:{
            type: 2
        },
        complete:res =>{
            console.log(res.result)
            that.setData({
                comment: res.result
            }) 
        }
      })
      wx.cloud.callFunction({
        name:'getUserNeedCheck',
        data:{
            type: 3
        },
        complete:res =>{
            console.log(res.result)
            that.setData({
                checkGood: res.result
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