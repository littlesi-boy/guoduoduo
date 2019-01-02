// pages/search/search.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    value: "",
    history_list: [],
    hot_list: [],
    has_serach: false,
    list: [],
    base: app.globalData.base,
  },
  get_search: function (e) {
    var value = e.detail.value;
    if (value) {
      this.setData({ value: value });
      this.search(value);
    }
  },
  to_search: function (e) {
    var value = e.currentTarget.dataset.value;
    if (value) {
      this.setData({ value: value });
      this.search(value);
    }
  },
  search: function (value) {
    wx.showLoading({
      title: '搜索中',
    })
    var that = this;
    wx.request({
      url: app.globalData.base + '/api/v1/goods/info',
      method: "POST",
      data: {
        id: wx.getStorageSync("uid"),
        keywords: value,

      },
      success: function (res) {
        wx.hideLoading();
        if (res.statusCode==200) {
          that.setData({ list: res.data.data })//查找到的数据
          that.setData({ has_serach: true });
        } else {
          //无数据等错误情况
          wx.showModal({
            title: '提示',
            content: '无搜索结果',
            showCancel: false
          })
        }
      }
    })

  },
  back: function () {
    wx.navigateBack()
  },
  to_detail: function (event) {
    var id = event.currentTarget.dataset.id;
    wx.navigateTo({
      url: "/pages/detail/detail?id=" + id
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    //历史搜索
    wx.request({
      url: app.globalData.base + '/api/index/history_search',
      method: "POST",
      data: {
        id: wx.getStorageSync("uid")
      },
      success: function (res) {
        console.log(res)
        if (res.statusCode == 200) {
          that.setData({ history_list: res.data.data })
        } else {
          //无数据等错误情况
        }
      }
    })
    //热门搜索
    wx.request({
      url: app.globalData.base + '/api/index/hot_search',
      method: "POST",
      data: {
        id: wx.getStorageSync("uid")
      },
      success: function (res) {
        console.log(res)
        if (res.statusCode == 200) {
          that.setData({ hot_list: res.data.data });
        } else {
          //无数据等错误情况
        }
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