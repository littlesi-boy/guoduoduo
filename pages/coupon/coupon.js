// pages/coupon/coupon.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    curr: 0,
    list1:[],
    list2:[],
    list3:[],
    money:0
  },
  choose_part: function (e) {
    var type = e.currentTarget.dataset.type;
    this.setData({ curr: type });
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    var curr=that.data.curr;
    wx.request({
      url: app.globalData.baseUrl + '/api/my/coupon',
      method: "POST",
      data: {
        id: wx.getStorageSync('uid'),
        status: 0
      },
      success: function (res) {
        console.log(res)
        that.setData({list1:res.data.data})
      }
    })
    wx.request({
      url: app.globalData.baseUrl + '/api/my/coupon',
      method: "POST",
      data: {
        id: wx.getStorageSync('uid'),
        status: 1
      },
      success: function (res) {
        // console.log(res)
        that.setData({ list2: res.data.data })
      }
    })
    wx.request({
      url: app.globalData.baseUrl + '/api/my/coupon',
      method: "POST",
      data: {
        id: wx.getStorageSync('uid'),
        status: 2
      },
      success: function (res) {
        // console.log(res)
        that.setData({ list3: res.data.data })
      }
    })
  },
  select: function (e) {
    var timestamp = Date.parse(new Date());
    timestamp = timestamp / 1000;
    var start_time = e.currentTarget.dataset.start_time;
    var end_time = e.currentTarget.dataset.end_time;

    var money = this.options.money
    var id = e.currentTarget.dataset.id;
    
    var coupon_money = e.currentTarget.dataset.coupon_money;
    var limit_money = e.currentTarget.dataset.limit_money;
    if (money < coupon_money|| (timestamp<start_time ||timestamp>end_time)){
      wx.showModal({
        title: '提示',
        content: '未达到使用条件',
      })
    }else{
    var pages = getCurrentPages();
    var Page = pages[pages.length - 1];//当前页
    var prevPage = pages[pages.length - 2];  //上一个页面
    var info = prevPage.data //取上页data里的数据也可以修改
    prevPage.setData({ limit_money: limit_money })//设置数据
    prevPage.setData({ coupon_money: coupon_money })//设置数据
    prevPage.setData({ coupon_id: id })//设置数据
    
    // console.log(id)
    // // prevPage.setData({ pname: pname })//设置数据
    // // console.log(pname+"----"+name)
   
    wx.navigateBack()
    }
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