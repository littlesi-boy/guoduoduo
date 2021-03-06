// pages/up/up.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: "",
    phone:wx.getStorageSync('userInfo').telephone,
    newPhone:''
  },
  to_code:function(e){
    var newPhone = this.data.newPhone;
    var reg = /^1\d{10}$/;
    if (!reg.test(newPhone)){
      wx.showModal({
        title: '提示',
        content: '请输出正确的手机号',
        showCancel:false
      });
      return;
    }
    wx.navigateTo({
      url: '/pages/code/code?phone=' + newPhone
    })
  },
  getphone:function(e){
    var value=e.detail.value;
    this.setData({ newPhone: value})
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
        console.log(res)
        that.setData({ content: res.data.data })
       // that.setData({ userInfo: userInfo })
        // wx.setStorageSync("uid", res.data.data.id);
        // wx.setStorageSync("userInfo", res.data.data);
      }
    })
   //that.setData({ userInfo: userInfo })
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