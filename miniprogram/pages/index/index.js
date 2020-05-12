// miniprogram/pages/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
	  navTab:["发布的商品", "求购的商品"],
    // currentNavtab: "0",
    TabCur: 0,
    scrollLeft:0,
    isAnounce: true,
    mess:"按钮测试数据",
    
    TabCur2: 0,
    scrollLeft2:0,
    goodTab:["数码产品","学习资料","生活用品","全部"],

    cardCur: 0,
    swiperList: [{
      id: 0,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg'
    }, {
      id: 1,
        type: 'image',
        url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84001.jpg',
    }, {
      id: 2,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big39000.jpg'
    }, {
      id: 3,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg'
    }, {
      id: 4,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big25011.jpg'
    }, {
      id: 5,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big21016.jpg'
    }],
  },

  // cardSwiper
  cardSwiper(e) {
    this.setData({
      cardCur: e.detail.current
    })
  },

  isCard(e) {
    this.setData({
      isCard: e.detail.value
    })
  },
  
    tabSelect(e) {
    this.setData({
      TabCur: e.currentTarget.dataset.id,
      scrollLeft: (e.currentTarget.dataset.id-1)*60,
      isAnounce:  e.currentTarget.dataset.id === 0 ? true : false,
    }),
    console.log(e)
  },

  tabSelect2(e) {
    this.setData({
      TabCur2: e.currentTarget.dataset.id,
      scrollLeft2: (e.currentTarget.dataset.id-1)*60,
      isAnounce2:  e.currentTarget.dataset.id === 0 ? true : false,
    }),
    console.log(e)
  },

   getmes:function(e){
    console.log(e)
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

  }
})
