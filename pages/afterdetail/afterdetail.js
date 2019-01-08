
const app = getApp()
Page({


  data: {
    content:"",
    imgbase: app.globalData.baseUrl,
    id:""
  },
  to_goodsdetail: function (event) {
    var id = this.data.id;
    wx.navigateTo({
      url: "/pages/goodsdetail/goodsdetail?id=" + id
    })
  },


  onLoad: function (options) {
    var that=this;
    var ordernum = options.ordernum;
    console.log(ordernum)
    wx.request({
      url: app.globalData.baseUrl + '/api/orders/order_detail',
      method: "POST",
      data: {
        order_num: ordernum
      },
      success: function (res) {
         console.log(res)
        that.setData({ content: res.data.data })
        that.setData({ id: res.data.data.id })

      }
    })
  },


  onReady: function () {
  
  },

 
  onShow: function () {
  
  },


  onHide: function () {
  
  },


  onUnload: function () {
  
  },


  onPullDownRefresh: function () {
  
  },


  onReachBottom: function () {
  
  },


  onShareAppMessage: function () {
  
  }
})