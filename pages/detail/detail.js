
var WxParse = require('../../wxParse/wxParse.js');
const app = getApp()
Page({

  data: {
    showModalStatus:false,
    toView: 'descb',
    scrollTop: 400,
    shopcarData: [], //购物车数据 
    total: 0, //总金额 
    allsel: false, //全选 
    indicatorDots: true,
    autoplay: true,
    interval: 4000,
    duration: 1000,
    imgUrls: [],
    gdd:false,
    article:'',
    content: {},
    selectedArr:[],
    count:1,
    id:0,
    subtotal:0,
    gxx:false,
    sure:true,
    base: app.globalData.base
  },

  /**
   * 生命周期函数--监听页面加载
   */
  numchangeTap: function (e) {
    var that = this;
    var type = e.currentTarget.dataset.type;
    // var shopcarData = that.data.shopcarData;
    var id = e.currentTarget.dataset.id;
    var count=that.data.count
    if (type == 0) {
      count--;
      that.setData({
        count: count,
        subtotal: that.data.content.sale_price * count
      })
    } else {
      count++;
      that.setData({
        count: count,
        subtotal: that.data.content.sale_price * count
      })
    }
    wx.request({
      url: that.data.base + '/api/v1/cart/post',
      method: "POST",
      header: {
        token: wx.getStorageSync("token")
      },
      data: {
        id: id,
        count: that.data.count
      },
      success: function (res) {

        wx.hideLoading();
      }, error: function () {
        wx.showModal({
          title: '提示',
          content: '操作失败',
          showCancel: true
        })
      }
    })
  },

  purseCart:function(){
    this.setData({
      sure:false,
      count:1
    })
    this.addCart()

  },
  del: function (e) {
    var that = this;
    // console.log(e)
    var id = e.currentTarget.dataset.id;
    console.log(id)
    var index = e.currentTarget.dataset.index;
    wx.showModal({
      title: '提示',
      content: '确定删除？',
      success: function (res) {
        if (res.confirm) {
          wx.showLoading({
            title: '删除中...',
          })}
        setTimeout(function () {
          wx.hideLoading()
          that.hideModal()
        }, 2000)
      }})
    wx.request({
      url: that.data.base + '/api/v1/cart/post',
      method: "POST",
      header: {
        token: wx.getStorageSync("token")
      },
      data: {
        id: id,
        count: that.data.count
      },
      success: function (res) {
        console.log(res)
        if (res.statusCode == 200) {
          var content = that.data.content;
          content.splice(index, 1);
          that.setData({ content: content })
        }
      }
    })
   
  },

  next:function(e){
      var id=e.currentTarget.dataset.id
      var goods_img=e.currentTarget.dataset.goods_img
      var subtotal=e.currentTarget.dataset.subtotal
    var goods_name = e.currentTarget.dataset.goods_name
      var count=this.data.count
      var that = this
    var newArray = [];
    var selectedArr = that.data.selectedArr;
    selectedArr.push(id)
    selectedArr.push(count)
    selectedArr.push(subtotal)
    selectedArr.push(goods_img)
    selectedArr.push(goods_name)
    newArray.push({ subtotal: selectedArr[2], goods_id: selectedArr[0], count: selectedArr[1], goods_img: selectedArr[3], goods_name:selectedArr[4]})
    newArray = JSON.stringify(newArray)
      wx.navigateTo({
        url: '/pages/createorder/createorder?params=' + newArray,
      })
  },
  onLoad: function (options) {
    var that = this;
    var id = that.options.id;
    console.log(id)
    that.setData({
      id:id,
      showModalStatus: false
    })
    this.hideModal()
    wx.request({
      url: that.data.base + '/api/v1/goods/get/'+id,
      method: "GET",
      header: {
        token: wx.getStorageSync("token")
      },
      success: function (res) {
      WxParse.wxParse('article', 'html', res.data.data.list.detail, that, 5);
        // that.setData({
        //   article: res.data.data.list.detail
        // })
        if (res.data.data.list.sale_price==0){
          res.data.data.list.sale_price = res.data.data.market_price
          res.data.data.list.market_price="";
        }
        that.setData({ content: res.data.data.list, subtotal: res.data.data.list.sale_price})
      }
    })
  
  },
  to_cart:function(e){
    var id=e.currentTarget.dataset.id
    var count=this.data.count
          wx.switchTab({
            url: '/pages/carShop/carShop',
          })
  },
  addCart: function (e) {
    var that = this;
    var  count=this.data.count;
    console.log(count)
    var id=this.data.id
    console.log(id)
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    that.animation = animation
    animation.translateY(300).step()
    that.setData({
      animationData: animation.export(),
      showModalStatus: true
    })
    setTimeout(function () {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export()
      })
    }.bind(this), 500)
   
  },
  hideModal: function () {
    // 隐藏遮罩层
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    animation.translateY(300).step()
    this.setData({
      animationData: animation.export(),
    })
    setTimeout(function () {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export(),
        showModalStatus: false
      })
    }.bind(this), 200)
  },
  // to_cart:function(e){
    
  // }

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
    this.setData({
      showModalStatus:false
    })
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
      this.hideModal()
      this.setData({
        showModalStatus:false
      })
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