// pages/statusDetail/statusDetail.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showMask: false,
    showBox: false,
    showReason:false,
    //   fffff   
    content:"",
    imgbase: app.globalData.imgbase,
    checked1:false,
    checked2: false,
    checked3: false,
    checked4: false,
    id:"",  
    reason:""

  },
  to_goodsdetail: function (event) {
    var id = this.data.id;
    wx.navigateTo({
      url: "/pages/goodsdetail/goodsdetail?id=" + id
    })
  },
  show_write: function (e) {
    var that=this;

    that.setData({ showBox: true })
    that.setData({ showMask: true })
  },
  close: function () {
    this.setData({ showBox: false })
    this.setData({ showMask: false })
  },

  pay:function(){
    var that=this;
    var content=this.data.content;
    wx.showModal({
      title: '提示',
      content: '是否支付',
      success: function (res) {
        if (res.confirm) {
          wx.request({
            url: app.globalData.baseUrl + '/api/orders/orderinfo',
            method: "POST",
            data: {
              order_num: content.order_num,
              shop_id: content.shop_id
            },
            success: function (res) {
              if (res.data.code == 1) {

                wx.showToast({
                  title: '支付成功'
                })
                wx.navigateTo({
                  url: "/pages/success/success"
                })
                that.setData({ status: 2 });
              } else {
                wx.showModal({
                  title: '提示',
                  content: res.data.msg,
                  showCancel: false
                })

              }
            }
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  
  },
  toDel: function () {
    var content = this.data.content;
    wx.request({
      url: app.globalData.baseUrl + '/api/orders/del_order',
      method: "POST",
      data: {
        id:content.id
      },
      success: function (res) {
        if (res.data.code == 1) {
          wx.showToast({
            title: '删除订单成功'
          })
          setTimeout(function(){
            wx.switchTab({
              url: '/pages/my/my',
            })
          },500)
          
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
  checkedTap1: function (e) {
    // console.log(e)
    var checked1 = this.data.checked;
    checked1 = !checked1;
    this.setData({ 
      checked1: checked1,
      checked2: false,
      checked3: false,
      checked4: false,
      reason: "不想要了" });

  },
  checkedTap2: function (e) {
    // console.log(e)
    var checked2 = this.data.checked2;
    checked2 = !checked2;
    this.setData({ 
      checked2: checked2 ,
      checked1: false,
      checked3: false,
      checked4: false,
      reason: "无法签收"
    });
  },
  checkedTap3: function (e) {
    // console.log(e)
    var checked3 = this.data.checked3;
    checked3 = !checked3;
    this.setData({ 
      checked3: checked3,
      checked1: false,
      checked2: false,
      checked4: false,
      reason: "重复购买" 

       });
  },
  checkedTap4: function (e) {
    // console.log(e)
    var checked4 = this.data.checked4;
    checked4 = !checked4;
    this.setData({ 
      checked4: checked4 ,
      checked1: false,
      checked2: false,
      checked3: false, 
      reason: "其他" 
    });
  },
  to_drawback:function(){
    var content =this.data.content;
    // console.log(id)
    wx.navigateTo({
      url: '/pages/drawback/drawback?id=' + content.id + '&order_num=' + content.order_num + '&shop_id=' + content.shop_id
    })
  },

  to_tuikuan: function () {
    // console.log(e)
    var content =this.data.content;
    var that = this;
    wx.request({
      url: app.globalData.baseUrl + '/api/orders/order_refund',
      method: "POST",
      data: {
        shop_id: content.shop_id,
        order_id: content.id
      },
      success: function (res) {
        // console.log(res);
        if (res.data.code == 1) {
          wx.showToast({
            title: '已提交退款申请',
            complete:function(){
              setTimeout(function(){
                wx.redirectTo({
                  url: '/pages/afterdetail/afterdetail?ordernum=' + content.order_num
                })
              },500)
            }
          })
          
        } else {
          wx.showModal({
            title: '提示',
            content: res.data.msg
          })
        }
      }
    })
   
  },
  to_cancelorder:function(){
    this.setData({ showReason: true})

  },

  cancel_order: function (reason){
    this.setData({ showReason: false });
    // console.log(e)
    // console.log("id:" + this.data.id + ",reason:" + this.data.reason)
    var that=this;
    wx.request({
      url: app.globalData.baseUrl + '/api/orders/cancel_order',
      method: "POST",
      data: {
        id: that.data.id,
        reason: that.data.reason 
      },
      success: function (res) {
        // console.log(res);
        if(res.data.code==1){
          wx.showToast({
            title: '取消订单成功'
          })
          that.setData({ status : 4})
        }else{
          wx.showModal({
            title: '提示',
            content: res.data.msg
          })
        }
      }
    })
  },
  sub_cancel:function(){
    wx.request({
      url: app.globalData.baseUrl + '/api/orders/order_refund',
      method: "POST",
      data: {
        shop_id: 1,
        order_id:this.data.id

      },
      success: function (res) {
        // console.log(res)
        if(res.data.code==1){
          wx.showModal({
            title: '提示',
            content: '申请退款成功',
          })
          
        }else{
          wx.showModal({
            title: '提示',
            content: res.data.msg,
          })
        }
        

      }
    })
  },
  //拨打电话
  to_tel:function(e){
   console.log(e)
    var telephone = e.currentTarget.dataset.telephone;
    wx.makePhoneCall({
      phoneNumber: 'telephone',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    var status = options.status;
    this.setData({ status : status});
    var ordernum = options.ordernum;
    // console.log(ordernum)
    wx.request({
      url: app.globalData.baseUrl + '/api/orders/order_detail',
      method: "POST",
      data: {
        order_num: ordernum
      },
      success: function (res) {
        console.log(res)
        that.setData({content:res.data.data})
        that.setData({id:res.data.data.id})
    
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
   * 
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})