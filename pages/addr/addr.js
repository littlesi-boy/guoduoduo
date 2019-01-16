// pages/addr/addr.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    custName:'',
    region:['','',''],
    details:'',
    phone:'',
    shows:false,
    addsub:false,
    userInfo:[],
    isDefault:false,
    
  },

  clear:function(e){
      e.detail.value=''
  },

  addSub:function(){
    wx.navigateTo({
      url: '/pages/client/client',
    })
  },

  onLoad: function (options) {
   
},
radioChange: function(e){
  var id=e.detail.value
 
},
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function (options) {
    var that = this;
    var userInfo = wx.getStorageSync("userInfo");
    that.setData({
      userInfo: userInfo
    })
    wx.request({
      url: getApp().globalData.baseUrl + '/consignee/get',
      method: "GET",
      header: {
        token: wx.getStorageSync("token"),
      },
      success: function (res) {
        console.log(res)
        if (res.statusCode == 200) {
          var lists = res.data.data.list
          lists.forEach(function (item) {
            item.checked = false
          })
          that.setData({ list: lists })
        }
      }
    })
  },
  binds: function (e) {
    var currentArress = e.currentTarget.dataset.addrs
    var detail = e.currentTarget.dataset.detail
    app.globalData.currentArress = currentArress
    console.log(currentArress)
    var items = this.data.list;
    items.forEach(function (item) {
      if (item.detail == detail) {
        app.globalData.currentAddr = item.id
      }
    })
    for (var i = 0; i < items.length; i++) {
      for (var j = 0; j < items.length; j++) {
        if (items[j].checked && j != i) {
          items[i].checked = false
        }
      }

    }
    setTimeout(function () { wx.navigateBack() }, 1400)
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