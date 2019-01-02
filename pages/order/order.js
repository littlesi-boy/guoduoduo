// pages/order/order.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    scrollTop: 100,
    type:999,
    list:[],
    base: app.globalData.base,
    page:1,
    hasMore:true,
    id:0,
    order_num:1,
    status0:true,
    status1:false,
    status2:false,
    status3:false,
    status5:false
  },
  tap: function (e) {
    for (var i = 0; i < order.length; ++i) {
      if (order[i] === this.data.toView) {
        this.setData({
          toView: order[i + 1]
        })
        break
      }
    }
  },
  tapMove: function (e) {
    this.setData({
      scrollTop: this.data.scrollTop + 10
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (option) {
    var that=this;
    var type=option.type
    if(type==1){
      that.tabChange1()
    }else if(type==2){
      that.tabChange2()
    }else if(type==3){
      that.tabChange3()
    }else if(type==4){
      that.tabChange4()
    }else{
      var type = 999;
      that.setData({ type: type });
      wx.request({
        url: app.globalData.base + '/api/v1/order/get',
        method: "GET",
        header: {
          token: wx.getStorageSync("token"),
        },
        success: function (res) {
          // console.log(res)
          if (res.statusCode == 200) {
            that.setData({ list: res.data.data.list })
          } else {
            that.setData({ list: [] })
          }

        }
      })
    }


  },
  reserve:function(e){
    var id=e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/order_detail/order_detail?id='+id,
    })
  },
  payfor:function(e){
    var consignee_id = app.globalData.currentAddr
    var goods_id=e.currentTarget.dataset.goods_id
    var count=e.currentTarget.dataset.count
    var that=this
    wx.request({
      url: app.globalData.baseUrl + '/order',
      method: "POST",
      data: {
        products: [{ goods_id: goods_id},{count:count}],
        consignee_id: consignee_id ? consignee_id : 'default'
      },
      header: {
        token: wx.getStorageSync("token")
      },

      success: function (res) {
        // console.log(res)
        that.setData({
          token: wx.getStorageSync("token")
        })
        if (res.statusCode == 200) {
        
          wx.setStorageSync('order_id', res.data.order_id)
          that.getPreOrder(that.data.token, res.data.order_id)

        }
        else {
          wx: wx.showModal({
            title: '提示',
            content: res.data.msg,
          })

        }

      }
    })
  },

  getPreOrder: function (token, order_id) {
    if (token) {
      wx.request({
        url: app.globalData.baseUrl + '/pay/pre_order',
        method: 'POST',
        header: {
          token: token
        },
        data: {
          id: order_id
        },
        success: function (res) {
          var preData = res.data
          wx.requestPayment({
            timeStamp: preData.timeStamp.toString(),
            nonceStr: preData.nonceStr,
            package: preData.package,
            signType: preData.signType,
            paySign: preData.paySign,
            success: function (res) {
              wx.navigateTo({
                url: "/pages/success/success"
              })
            }
          })
        }
      })
    }
  },
  
  delOrder:function(e){
    var orderId=e.currentTarget.dataset.id;
    var that=this
    wx.request({
      url: app.globalData.baseUrl + '/order',
      method: "POST",
      header: {
        token: wx.getStorageSync("token"),
      },
      data: {
        products: [
          {
            goods_id: orderId,
            count: that.data.count
          }
        ]
      },
      success: function (res) {
        if (res.statusCode == 200) {
          wx.showToast({
            title: '删除订单成功'
          })
          

        } else {
          wx.showModal({
            title: '提示',
            content: res.data.msg,
            showCancel: false
          })
        }
      }
    })
  },
  tabChange1:function(e){
    this.setData({
      status0: false,
      status1: true,
      status2: false,
      status3: false,
      status5: false,
    })
    var that=this;
    var type = 0;
    that.setData({ type: type });
    wx.request({
      url: app.globalData.base + '/api/v1/order/get/pay_status/0',
      method: "GET",
      header: {
        token: wx.getStorageSync("token"),
      },
     
      success: function (res) {
        console.log(res)
        if (res.statusCode==200){
          that.setData({ list: res.data.data.list})
        }else{
          that.setData({ list: [] })
        }
       
      }
    })

  },
  tabChange2: function (e) {
    this.setData({
      status0: false,
      status1: false,
      status2: true,
      status3: false,
      status5: false,
    })
    var that = this;
    var type = 1;
    that.setData({ type: type });
    wx.request({
      url: app.globalData.base + '/api/v1/order/get/shipping_status/0',
      method: "GET",
      header: {
        token: wx.getStorageSync("token"),
      },

      success: function (res) {
        console.log(res)
        if (res.statusCode == 200) {
          that.setData({ list: res.data.data.list })
        } else {
          that.setData({ list: [] })
        }

      }
    })

  },
  tabChange3: function (e) {
    this.setData({
      status0: false,
      status1: false,
      status2: false,
      status3: true,
      status5: false,
    })
    var that = this;
    var type = 2;
    that.setData({ type: type });
    wx.request({
      url: app.globalData.base + '/api/v1/order/get/shipping_status/1',
      method: "GET",
      header: {
        token: wx.getStorageSync("token"),
      },

      success: function (res) {
        console.log(res)
        if (res.statusCode == 200) {
          that.setData({ list: res.data.data.list })
        } else {
          that.setData({ list: [] })
        }

      }
    })

  },
  tabChange4: function (e) {
    this.setData({
      status0: false,
      status1: false,
      status2: false,
      status3: false,
      status5:true
    })
    var that = this;
    var type = 3;
    that.setData({ type: type });
    wx.request({
      url: app.globalData.base + '/api/v1/order/get/order_status/1',
      method: "GET",
      header: {
        token: wx.getStorageSync("token"),
      },

      success: function (res) {
        console.log(res)
        if (res.statusCode == 200) {
          that.setData({ list: res.data.data.list })
        } else {
          that.setData({ list: [] })
        }

      }
    })

  },
  tabChange: function (e) {
    this.setData({
      status0:true,
      status1:false,
      status2: false,
      status3: false,
      status5: false,
    })
    var type = 999;
    that.setData({ type: type });
    this.onLoad()
  },
  toDetail:function(e){
    // console.log(e)
    var ordernum = e.currentTarget.dataset.num;
    var id=e.currentTarget.dataset.id;
    var status = e.currentTarget.dataset.status;
    wx.navigateTo({
      url: '/pages/detail/detail?id=' + id,
    })
  },
  to_afterdetail: function (e) {
    var ordernum = e.currentTarget.dataset.num;
    // console.log(ordernum)
    wx.navigateTo({
      url: '/pages/afterdetail/afterdetail?ordernum=' + ordernum,
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
    this.setData({page:1});
    var type=this.data.type;
    var that=this;
    wx.request({
      url: app.globalData.baseUrl + '/order',
      method: "POST",
      data: {
        status: type,
        page:1
      },
      success: function (res) {
        // console.log(res)
        if (res.statusCode == 200) {
          that.setData({ list: res.data.data.list })
        } else {
          that.setData({ list: {} })
        }
        //停止下拉刷新
        wx.stopPullDownRefresh();
      }
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var list=this.data.list;
    var hasMore = this.data.hasMore;
    var type=this.data.type;
    var page=this.data.page;
    var that = this;
    if (hasMore){
      page++;
      wx.request({
        url: app.globalData.baseUrl + '/order',
        method: "POST",
        data: {
          status: type,
          page: page
        },
        success: function (res) {
          // console.log(res)
          if (res.statusCode == 200) {
            list = list.concat(res.data.data.list);
            that.setData({ list: list });
            that.setData({ page: page });
          } else {
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