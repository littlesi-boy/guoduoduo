// pages/tel/tel.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone: '',
    count: 60,
    tcode: '',//正确验证码
    code:''//用户输入验证码
  },
  getPhoneValue: function (e) {
    this.setData({
      phone: e.detail.value
    })
  },
  getCodeValue:function(e){
    this.setData({
      code: e.detail.value
    })
  },
  getcode: function () {
    var phone = this.data.phone;
    console.log(phone)
    var count = this.data.count;
    var reg = /^1\d{10}$/;
    if (!reg.test(phone)) {
      wx.showModal({
        title: '提示',
        content: '请输入正确的手机号码',
        showCancel: false
      })
      return;
    }
    // console.log(phone)
    var that = this;
    wx.showLoading({
      title: '加载中。。',
    })
    wx.request({
      url: app.globalData.baseUrl + '/api/my/code',
      method: "POST",
      data: {
        telephone: phone,
      },
      success: function (res) {
        wx.hideLoading();
        if(res.statusCode==200){
          that.setData({ tcode: res.data.data})
          wx.showToast({
            title: '发送验证码成功请注意查收'
          })
          var timer = setInterval(function () {
            count--;
            if (count == 0) {
              clearInterval(timer);
              count = 60
            }
            that.setData({ count: count })
          }, 1000)
        }
      


      }
    })
  },
  toBind: function () {
    var tel = this.data.phone;
    var tcode = this.data.tcode;
    var code=this.data.code;
    var backurl = this.data.backurl;
    var reg = /^1\d{10}$/;
    if (!reg.test(tel)) {
      wx.showModal({
        title: '提示',
        content: '请输入正确的手机号码',
        showCancel: false
      })
      return;
    }
    if (!code) {
      wx.showModal({
        title: '提示',
        content: '请输入验证码',
        showCancel: false
      })
    }
    console.log(code);
    console.log(tcode);
    if (code != tcode) {
      wx.showModal({
        title: '提示',
        content: '请输入正确的验证码',
        showCancel: false
      })
      return;
    }
    var that = this;
    wx.showLoading({
      title: '绑定中。。',
    })
    wx.request({
      url: app.globalData.baseUrl + '/api/my/binding_telephone',
      method: "POST",
      data: {
        id: wx.getStorageSync("uid"),
        telephone: tel,
      },
      success: function (res) {
        wx.hideLoading();
        // console.log(res)
        wx.showToast({
          title: '绑定成功',
        })
        setTimeout(function(){
          wx.navigateTo({
            url: '/pages/improve/improve',
          })
        },500)
       
      }
    });
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