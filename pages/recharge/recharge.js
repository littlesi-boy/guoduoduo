// pages/recharge/recharge.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    toView: 'red',
    scrollTop: 100,
    list:[],
    pay_money: 0,
    currentId: 0,
    id:""
  },
  to_choose: function (e){
    var id = e.currentTarget.dataset.id;
    this.setData({
      currentId: e.currentTarget.dataset.money,
      pay_money: e.currentTarget.dataset.money,
      id: e.currentTarget.dataset.id
    })
  },
  to_pay:function(e){
    var that = this;
    wx.login({
      success: res => {

        //code 用于获取openID的条件之一 
        var code = res.code;
        var id=that.data.id;
        wx.request({
          url: app.globalData.baseUrl + '/api/wxpay/pay',
          method: "POST",
          data: {
            // money: 0.01,
            code: code,
            id: wx.getStorageSync("uid"),
            num_id:id
          },
          header: {
            "content-type": 'application/json' // 默认值 
          },
          success: function (res) { //后端返回的数据 
            var data = res.data;
            console.log(res);
            wx.requestPayment({
              'timeStamp': data['timeStamp'],
              'nonceStr': data['nonceStr'],
              'package': data['package'],
              'signType': data['signType'],
              'paySign': data['paySign'],
              success: function (www) {
                wx.showModal({
                  title: '支付成功',
                  content: '',
                })
              }
        })
      }
    }) 
      }
      })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.request({
      url: app.globalData.baseUrl + '/api/my/member_card',
      method: "POST",
      success: function (res) {
        console.log(res)
        that.setData({list:res.data.data})
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