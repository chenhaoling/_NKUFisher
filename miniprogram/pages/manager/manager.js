// miniprogram/pages/manager/manager.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

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
    ],
    "good":[
      {
        "id":0,
        "name":"This is a test",
        "content":"折磨生出苦难，苦难又会加剧折磨，凡间这无穷的循环，将有我来终结！真正的恩典因不完整而美丽，因情感而真诚，因脆弱而自由！",
        "price":"88"
      },
      {
        "id":1,
        "name":"This is a test",
        "content":"折磨生出苦难，苦难又会加剧折磨，凡间这无穷的循环，将有我来终结！真正的恩典因不完整而美丽，因情感而真诚，因脆弱而自由！",
        "price":"88"
      },
      {
        "id":2,
        "name":"This is a test",
        "content":"折磨生出苦难，苦难又会加剧折磨，凡间这无穷的循环，将有我来终结！真正的恩典因不完整而美丽，因情感而真诚，因脆弱而自由！",
        "price":"88"
      },
    ],

    //导航栏的数据
    postBook: true,
    postThing: false,
    postJob: false,

    perImg: '../../images/icon9.jpeg',

    //个人信息
    name:'JackLin',
    stuId:'123456',
    college:'软件学院',
    phoneNum:'110'

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
    //导航栏的响应事件
    choosePostBook: function(e) {
      var that = this;
      that.setData({
        postBook: true,
        postThing: false,
        postJob: false
      })
    },
    choosePostThing: function(e) {
      var that = this;
      that.setData({
        postBook: false,
        postThing: true,
        postJob: false
      })
    },
    choosePostJob: function(e) {
      var that = this;
      that.setData({
        postBook: false,
        postThing: false,
        postJob: true
      })
    },

    pass: function(e){
      console.log("通过");
    },
    noPass:function(e){
      console.log(e);
    },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})