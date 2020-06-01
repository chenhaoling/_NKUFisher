// miniprogram/pages/publish/publish.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    good: {
      condition: 1,
      title: "",
      contact: "",
      campus: "八里台校区",
      category: "数码产品",
      detail: "",
      oriPrice: "",
      curPrice: "",
      image: [],
    },
    campus: ["八里台校区", "津南校区", "泰达校区"], 
    campusIndex: 0,
    category: ["数码产品", "学习资料", "生活用品", "其他"], 
    categoryIndex: 0, 
    buttonLoading: false,
    TabCur: 0,
    scrollLeft: 0,
  },

  bindInput: function(e) {
    if(e.currentTarget.dataset.type == "campus" || e.currentTarget.dataset.type == "category") {
      this.data.good[e.currentTarget.dataset.type] = this.data[e.currentTarget.dataset.type][e.detail.value]
      if(e.currentTarget.dataset.type == "campus") {
        this.setData({campusIndex: e.detail.value})
      } else {
        this.setData({categoryIndex: e.detail.value})
      }
    } else {
      this.data.good[e.currentTarget.dataset.type] = e.detail.value
    }
    this.setData({good: this.data.good})
  },

  tabSelect(e) {
    this.setData({
      TabCur: e.currentTarget.dataset.id
    })
    this.data.good.condition = 1 - e.currentTarget.dataset.id
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
          that.data.good.image= that.data.good.image.concat(res.tempFilePaths)
          that.setData({good: that.data.good})
        } else {
          that.data.good.image = res.tempFilePaths
          that.setData({good: that.data.good})
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
    this.setData({good: that.data.good})
  },

  bindSubmit: function() {
    const that = this
      if (app.globalData.userInfo.stuNum != undefined) {
      this.setData({
        buttonLoading: true
      })
      let promiseArr = []
      this.data.good.create = true
      for(let index = 0; index < this.data.good.image.length; index++) {
        let filePath = this.data.good.image[index]
        let suffix = /\.[^\.]+$/.exec(filePath)[0];
        promiseArr.push(new Promise((reslove, reject)=>{
          wx.cloud.uploadFile({
            cloudPath: new Date().getTime() + suffix,
            filePath: filePath,
          }).then(res => {
            this.data.good.image[index] = res.fileID
            reslove()
          }).catch(error => {
            console.log(error)
          })
        }))
      }
      Promise.all(promiseArr).then(res=>{
        wx.cloud.callFunction({
          name: 'distribute_good',
          data: this.data.good,
          complete: res => {
            const goodId = res.result
            wx.showToast({
              title: '发布成功',
              icon: 'succes',
              duration: 2500,
              mask: true
            })
            that.setData({
              good: {
                condition: 1,
                title: "",
                contact: "",
                campus: "八里台校区",
                category: "数码产品",
                detail: "",
                oriPrice: "",
                curPrice: "",
                image: [],
              },
              campusIndex: 0,
              categoryIndex: 0, 
              buttonLoading: false,
              TabCur: 0,
              scrollLeft: 0,
            })
            wx.cloud.callFunction({
              name: 'good_info',
              data:{_id: goodId},
              success:function(res){         
                wx.setStorage({
                  data: res.result,
                  key: 'goodinfo',
                })
                wx.setStorage({
                  data: [],
                  key: 'comments',
                })
                var otheruser
                wx.cloud.callFunction({
                  name: 'user_info',
                  data: {_id:res.result.openId},
                  complete: res => {
                    wx.setStorage({
                      data: res.result,
                      key: 'otheruser',
                    })
                  }
                }),
                wx.navigateTo({
                  url: '../gooddetail/gooddetail',
                })
              },
            })
          },
        })
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '请验证您的学生身份',
        success: function(res) {
          if (res.confirm) {
            wx.switchTab({
              url: '../perInfo/perInfo',
            })
          }
        }
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

    /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },



})

