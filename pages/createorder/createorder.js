
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goods:[],
    params:[],
    goodsTotal:0,
    subtotal:0,
    content:"",
    shop_name: "",
    shopkeeper: "",
    time: "",
    address: "",
    limit_money:"",
    coupon_money:"",
    send_fee:10,
    coupon_id:0,
    address_id:0,
    order_num:"",
    shop_id:0,
    remark:"",
    scrollTop: 100,
    type: 999,
    list: [],
    base: app.globalData.base,
    page: 1,
    hasMore: true,
    userInfo:[],
   count:1,
    token:'',
    adds:'',
    currentArress: '',
  },
  to_remark: function (e) {
    var that = this;
    var remark = e.detail.value;
    that.setData({ remark: remark })
  },
  show_write: function (e) {
    var that = this;
    var remark=that.data.remark;
    var image = that.data.goods;
    var goods_name = '';
    var goods_image = '';
    var cart_id = '';
    for (var i = 0; i < image.length; i++) {
      goods_name = image[i]['goods_name'] + ',';
      goods_image += image[i]['goods_image'] + ',';
      cart_id += image[i]['cart_id'] + ',';
    }
    var goods_total_price = that.data.goodsTotal;
    var order_total_price = 0;
    var expressage_price = 0;
    var coupon_price = 0;
    if (that.data.send_fee > goods_total_price) {
      expressage_price = that.data.send_fee;
      if (that.data.limit_money > 0) {
        coupon_price = that.data.limit_money;
        order_total_price = goods_total_price - that.data.limit_money + that.data.send_fee
      } else {
        order_total_price = goods_total_price + that.data.send_fee
      }
    } else {
      if (that.data.limit_money > 0) {
        order_total_price = goods_total_price - that.data.limit_money
      } else {
        order_total_price = goods_total_price
      }
    }
    var coupon_id = that.data.coupon_id;
    var consignee_id = app.globalData.currentAddr
    wx.request({
      url: app.globalData.baseUrl + '/order',
      method: "POST",

      data: {
        products:that.data.goods,
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
        if(res.statusCode==200){
       
          wx.setStorageSync('order_id', res.data.order_id)
          that.getPreOrder(that.data.token, res.data.order_id)

        }
        else{
          wx:wx.showModal({
            title: '提示',
            content: res.data.msg,
          })
          
        }
    
      }
    })

  },
  editNow:function(){
    wx.navigateTo({
      url: '/pages/addr/addr',
    })
  },
  getPreOrder:function(token,order_id){
    if(token){
      wx.request({
        url: app.globalData.baseUrl+ '/pay/pre_order',
        method:'POST',
        header:{
          token:token
        },
        data:{
          id:order_id
        },
        success:function(res){
          var preData=res.data
          wx.requestPayment({
            timeStamp: preData.timeStamp.toString(),
            nonceStr: preData.nonceStr,
            package: preData.package,
            signType: preData.signType,
            paySign: preData.paySign,
            success:function(res){
              wx.navigateTo({
               url: "/pages/success/success"
            })
            }
          })
        }
      })
    }
  },
  delOrder: function (e) {
    var orderId = e.currentTarget.dataset.id;
    var that = this
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
  tabChange: function (e) {
    var that = this;
    var type = e.currentTarget.dataset.type;
    that.setData({ type: type });
    wx.request({
      url: app.globalData.baseUrl + '/order',
      method: "POST",
      header: {
        token: wx.getStorageSync("token"),
      },
      data: {
        status: type,
        page: 1
      },
      success: function (res) {
        console.log(res)
        if (res.statusCode == 200) {
          that.setData({ list: res.data.data.list })
        } else {
          that.setData({ list: {} })
        }

      }
    })

  },
  toDetail: function (e) {
    // console.log(e)
    var ordernum = e.currentTarget.dataset.num;
    var id = e.currentTarget.dataset.id;
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

 
to_addr:function(event){
    wx.navigateTo({
      url: "/pages/addr/addr"
    })
  },
  to_coupon: function (e) {
    var money = e.currentTarget.dataset.money
    wx.navigateTo({
      url: '/pages/coupon/coupon?money='+money,
    })
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
  close: function () {
    this.setData({ showBox: false })
    this.setData({ showMask: false })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    

    wx.request({
      url: getApp().globalData.baseUrl + '/consignee/get',
      method:'GET',
      header: {
        token: wx.getStorageSync("token"),
      },
      success:function(res){
          if(res.statusCode==200){
            var list=res.data.data.list
            list.forEach(function(item){
              if(item.is_default){
                that.setData({
                  adds:item.province+item.city+item.country+item.detail
                })
              }
            })
          }
      }

    })
    var jsonStr=options.params
    jsonStr = jsonStr.replace(" ", "");
    var userInfo = wx.getStorageSync("userInfo");
    that.setData({ userInfo: userInfo })
    if (typeof jsonStr != 'object') {
      jsonStr = jsonStr.replace(/\ufeff/g, "");
      var jj = JSON.parse(jsonStr);
      console.log(jj)
      that.setData({
        goods:jj
      })
    }
var params=that.data.goods
var sum=0
if(params.length>0){
  params.forEach(function(item){
    sum+=item.subtotal*item.count
  })
  that.setData({
    goodsTotal:sum
  })
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
    var that=this
    var currentArress = app.globalData.currentArress
    if (currentArress){
      that.setData({
        currentArress: currentArress,
       
      })
    }
   
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