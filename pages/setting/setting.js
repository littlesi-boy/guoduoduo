// pages/setting/setting.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:"",
    imgbase: app.globalData.imgbase,
  },
  to_edit:function(e){
    wx.navigateTo({
      url: '/pages/edit/edit',
    })
  },
  to_up: function (e) {
    wx.navigateTo({
      url: '/pages/up/up',
    })
  },
  to_manage: function (e) {
    wx.navigateTo({
      url: '/pages/store_manage/store_manage',
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var userInfo = wx.getStorageSync("userInfo");
    wx.request({
      url: app.globalData.baseUrl + '/api/my/userinfo',
      method: "POST",
      data: {
        id: userInfo.id,
      },
      success: function (res) {
        // console.log(res)
        that.setData({ content: res.data.data })
        that.setData({ userInfo: userInfo })
        // wx.setStorageSync("uid", res.data.data.id);
        // wx.setStorageSync("userInfo", res.data.data);
      }
    })
    that.setData({ userInfo: userInfo })
    // console.log(userInfo)
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