// miniprogram/pages/index.js
var app = getApp()


Page({

  /**
   * 页面的初始数据
   */
  data: {
    navTab:["发布的商品", "求购的商品"],
    goodslist: [],
    id:'',
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
    "good":[
      {
        "id":"05f2c36f5ebcf44c00cb82d25f35128c",
        "name":"This is a test",
        "content":"折磨生出苦难，苦难又会加剧折磨，凡间这无穷的循环，将有我来终结！真正的恩典因不完整而美丽，因情感而真诚，因脆弱而自由！",
        "price":"88"
      },
      {
        "id":'1',
        "name":"This is a test",
        "content":"折磨生出苦难，苦难又会加剧折磨，凡间这无穷的循环，将有我来终结！真正的恩典因不完整而美丽，因情感而真诚，因脆弱而自由！",
        "price":"88"
      },
      {
        "id":'2',
        "name":"This is a test",
        "content":"折磨生出苦难，苦难又会加剧折磨，凡间这无穷的循环，将有我来终结！真正的恩典因不完整而美丽，因情感而真诚，因脆弱而自由！",
        "price":"88"
      }]
  },
  getgoodInfo:function(e){
    wx.cloud.callFunction({
      name: 'good_info',
      data:{_id:e.currentTarget.dataset.id},
      // complete: res => {
      //   console.log(res)
      // }
      success:function(res){
        console.log("成功")
        // let goodinfo = JSON.stringify(res.result);
        wx.setStorage({
          data: res.result,
          key: 'goodinfo',
        })
        console.log(res.result.openId)
        var otheruser
        wx.cloud.callFunction({
          name: 'user_info',
          data: {_id:res.result.openId},
          complete: res => {
            console.log("获取用户信息成功")
            console.log(res.result)
            // otheruser = JSON.stringify(res.result)
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
      fail:console.error
    })  
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
    this.getInfo()
    console.log(e.currentTarget.dataset.id)
  },

  tabSelect2(e) {
    this.setData({
      TabCur2: e.currentTarget.dataset.id,
      scrollLeft2: (e.currentTarget.dataset.id-1)*60,
      isAnounce2:  e.currentTarget.dataset.id === 0 ? true : false,
    }),
    this.getInfo()
    console.log(this.data.TabCur2)
  },

   getmes:function(e){
    console.log(e)
  },

  getInfo :function(){
    var con = 1;
    var cate = "数码产品";
    if(this.data.TabCur == 0){//发布
      con = 1
    }else{
      con = 0
    }
    if(this.data.TabCur2 == 0){
      cate = "数码产品"
    }else if(this.data.TabCur2 == 1){
      cate = "学习资料"
    }else if(this.data.TabCur2 == 2){
      cate = "生活用品"
    }else{
      cate = "其他"
    }
    console.log(con),
    console.log(cate),
    wx.cloud.callFunction({
      name: 'search_good',
      data: {condition:con,
             category:cate,    
      },
      complete: res => {
        console.log(res.result[1]),
        this.setData({
          goodslist:res.result
        })
        

        // for (var index in this.data.goodslist) {
        //       console.log(this.data.goodslist[index].category),
        //   console.log(this.data.goodslist[index]._id)
        //    }
        this.data.goodslist = res.result


        for (var index in this.data.goodslist) {
            console.log(this.data.goodslist[index].title),
            console.log(this.data.goodslist[index]._id)
           }

        // console.log(this.data.goodslist)
        // for (var index in this.data.goodslist) {
        //     console.log(this.data.goodslist[index].title),
        //     console.log(this.data.goodslist[index]._id)
        //    }


      // console.log(this.data.list)
      }
     
    })
    
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getInfo()
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
