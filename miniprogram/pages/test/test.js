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
  
    },
  
    //发布物品的响应事件
    bindSubmitThing: function() {
      var that = this;
      var studentId = that.data.studentId;
      if (!studentId) {
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
        var thingImage = that.data.thingImage; //图片
        var thingName = that.data.thingName; //名字
        var thingConditionIndex = that.data.thingConditionIndex; //成色索引值
        var thingConditions = that.data.thingConditions[thingConditionIndex]; //成色
        var thingCampusIndex = that.data.thingCampusIndex; //校区索引值
        var thingCampus = that.data.thingCampus[thingCampusIndex]; //校区
        var thingDescribe = that.data.thingDescribe || '无备注或描述'; //备注
        var thingPhoneNumber = that.data.thingPhoneNumber; //电话
        var thingPrice = that.data.thingPrice; //价格
        var studentId = that.data.studentId;
        var nickName = that.data.nickName;
        var url = app.globalData.huanbaoBase + 'thingpost.php';
        var urlImg = app.globalData.huanbaoBase + 'thingimg.php';
        wx.request({
          url,
          data: {
            thingImage: thingImage,
            thingName: thingName,
            thingConditions: thingConditions,
            thingCampus: thingCampus,
            thingDescribe: thingDescribe,
            thingPhoneNumber: thingPhoneNumber,
            thingPrice: thingPrice,
            studentId: studentId,
            nickName: nickName,
          },
          method: "POST",
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          success: function(res) {
            console.log(res);
            var currenttime = util.formatTime(new Date());
            var currentdate = util.formatDate(new Date());
            var thingId = res.data;
            const uploadTask = wx.uploadFile({
              url: urlImg,
              filePath: thingImage[0],
              name: 'file',
              formData: {
                'date': currentdate,
                'datetime': currenttime,
                'thingId': thingId,
              },
              success: function(res) {
                console.log(res.data);
                wx.showToast({
                  title: '发布成功',
                  icon: 'succes',
                  duration: 2500,
                  mask: true
                })
                that.setData({
                  buttonLoading: false,
                  thingImage: '',
                  thingName: '',
                  thingDescribe: '',
                  thingPrice: '',
                  thingPhoneNumber: '',//电话号码
                })
              },
              fail: function(res) {
                console.log(JSON.stringify(res));
                wx.showToast({
                  title: '发布失败',
                  icon: 'loading',
                  duration: 2000
                })
                that.setData({
                  buttonLoading: false
                })
              },
            })
          },
          fail: function(res) {
            console.log(JSON.stringify(res));
            wx.showToast({
              title: '发布失败',
              icon: 'loading',
              duration: 2000
            })
            that.setData({
              buttonLoading: false
            })
          },
        })
      }
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
    bindThingDescribeInput: function(e) { //商品描述
      this.setData({
        thingDescribe: e.detail.value
      })
    },
  
    bindBookNameInput: function(e) {
      this.setData({
        name: e.detail.value
      })
    },
  
  })
  
  