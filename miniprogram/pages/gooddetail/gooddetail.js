
// miniprogram/pages/gooddetail/gooddetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    'goodinfo':'',
  },




  contentInp(e) {
    this.setData({
      contentInp: e.detail.value
    })
  },

  addComment: function(){

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this
    that.setData({
      goodinfo:JSON.parse(options.goodinfo)
    })
    // let good = JSON.parse(options.goodinfo)
    console.log(that.data.goodinfo)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    var that = this;
    var studentId = that.data.studentId; //学生id
    var nickName = that.data.nickName;
    try { 
      var value = wx.getStorageSync('studentIdSync')
      if (value) {
        console.log(value); //同步得到studentId的值
        that.setData({
          studentId: value
        })
      }
    } catch (e) {
      console.log(0);
    }
    try {
      var value = wx.getStorageSync('nickName')
      if (value) {
        that.setData({
          nickName: value
        })
      }
    } catch (e) {
      // Do something when catch error
    }
    console.log(studentId);
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