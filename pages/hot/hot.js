// pages/hot/hot.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodlist: [],
    imgbase: app.globalData.baseUrl,
    page:1,
    hasMore:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  to_detail: function (event) {
    var id = event.currentTarget.dataset.id;
    wx.navigateTo({
      url: "/pages/detail/detail?id=" + id
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
    var that = this;
    wx.request({
      url: app.globalData.baseUrl + '/api/index/goods_list',
      method: "POST",
      data: {
        type: 2,
        page: 1,
        id: wx.getStorageSync('uid'),
      },
      success: function (res) {
        //      console.log(res)
        that.setData({ goodlist: res.data.data })

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
  	 this.setData({page:1});
    var that=this;
    wx.request({
      url: app.globalData.baseUrl + '/api/index/goods_list',
      method: "POST",
      data: {
        type: 2,
        page:1
      },
      success: function (res) {
//      console.log(res)
        that.setData({ goodlist: res.data.data })
        that.setData({ hasMore: true });
 				//停止下拉刷新
        wx.stopPullDownRefresh();
      }
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var page=this.data.page;
    var hasMore = this.data.hasMore;
    var goodlist = this.data.goodlist;
    var that=this;
    if (hasMore){
      page++;
      wx.request({
        url: app.globalData.baseUrl + '/api/index/goods_list',
        method: "POST",
        data: {
          type: 2,
          page: page
        },
        success: function (res) {
          // console.log(res.data.data)
          if (res.data.code == 1) {
              goodlist = goodlist.concat(res.data.data);
              that.setData({ goodlist: goodlist });
              that.setData({ page: page });
          }else{
            that.setData({ hasMore: false });
          }
          

        }
      })
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})