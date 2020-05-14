
// miniprogram/pages/gooddetail/gooddetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detailData: {
      isbool:false,
      thingImage: '../../images/icon9.jpeg', // 物品图片
      thingName: '商品名称', //物品名字
      thingConditions: '数码产品', //成色
      thingPrice: '37', //价格
      thingCampus: '津南校区', //校区
      thingPhoneNumber: '1782', //联系方式
      thingDescribe: '哈哈哈哈哈哈你好帅', //描述备注
      poster: 'JackLin', //发布者
     
    },

    "comment":[
      {
        'id':0,
        'name':'ctj',
        'content':'凯尔，你被自己的光芒变的盲目。',
        'date':'2018年12月4日'
      },
      {
        'id':1,
        'name':'ctj',
        'content':'凯尔，你被自己的光芒变的盲目。',
        'date':'2018年12月4日'
      },
      {
        'id':2,
        'name':'ctj',
        'content':'凯尔，你被自己的光芒变的盲目。',
        'date':'2018年12月4日'
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options.id); //接收上一个页面传过来的数据，是个对象。
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 2000
    });
   
    var that = this;
    var detailData = that.data.detailData;
    var thingImage = 'detailData.thingImage';
    var thingName = 'detailData.thingName';
    var thingConditions = 'detailData.thingConditions';
    var thingPrice = 'detailData.thingPrice';
    var thingCampus = 'detailData.thingCampus';
    var thingPhoneNumber = 'detailData.thingPhoneNumber';
    var thingDescribe = 'detailData.thingDescribe';
    var thingId = that.data.thingId;
    var studentId = that.data.studentId;
    var nickName = that.data.nickName;
    var poster = 'detailData.poster';
    var url = app.globalData.huanbaoBase + 'getbythingid.php';
    
    try {
      var value = wx.getStorageSync('nickName')
      if (value) {
        that.setData({
          [nickName]: value
        })
      }
    } catch (e) {
      // Do something when catch error
    }
  
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
    console.log(studentId);
    wx.request({
      url,
      method: 'POST',
      // header: {'content-type' : 'json'},
      header: {
        'content-type': 'application/x-www-form-urlencoded '
      },
      data: {
        thingId: options.id,
      },
      success: function(res) {
        var data = res.data.data[0];
        that.setData({
          [thingImage]: data.gpicture, //价格
          [thingName]: data.gname, //名字
          [thingConditions]: data.gstatus, //成色
          [thingPrice]: data.gprice, //价格
          [thingCampus]: data.gcollege, //校区
          [thingPhoneNumber]: data.phone, //联系方式
          [thingDescribe]: data.gnote || '无描述', //描述
          thingId: data.goodid, //物品id
          
          [poster]: data.usersname, //发布者
        })
      } //此处的res就是data对象
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