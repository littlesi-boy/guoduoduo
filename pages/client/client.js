
const app = getApp()
Page({


  data: {
    custName: '',
    region: ['', '', ''],
    details: '',
    phone: '',
    shows: false,
    addsub: false,
    userInfo: [],
    defaults: 0,
    fus:true,
    adds:''
  },
  return_home: function (e) {
   wx.navigateBack()
  },
  clear: function (e) {
    e.detail.value = ''
  }, 
  bindRegionChange: function (e) {
    var value = e.detail.value;
    this.setData({ region: value })
  },
  handleInputAddr: function (e) {
    var value = e.detail.value;
    this.setData({
      details: value
    })
  },
  handleInputPhone: function (e) {
    this.setData({
      phone: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  handleName: function (e) {
    this.setData({
      custName: e.detail.value
    })
  },
  submit: function (e) {
    var that = this
    var phone = that.data.phone;
    var custName = that.data.custName
    var region = that.data.region
    var details = that.data.details
    var defaults = that.data.defaults
    if (this.data.Code == '') {
      wx.showToast({
        title: '请输入验证码',
        image: '/images/error.png',
        duration: 2000
      })
      return;
    } else if (this.data.details == '') {
      wx.showToast({
        title: '详细地址没有填快卖小哥哥会迷路喔~',
        image: '/images/error.png',
        duration: 2000
      })
      return
    }
    else {
      wx.showModal({
        title: '提示',
        content: '是否设为默认地址',
        success(res) {
          if (res.confirm) {
            that.setData({
              defaults:1
            })
         setTimeout(that.sendArr,1000)
          } else if (res.cancel) {
           that.setData({
             defaults: 0
           })
            setTimeout(that.sendArr, 1000)
          }
        },
      })
     
    }
   
  },
  sendArr: function () {
    var that = this
    var phone = that.data.phone;
    var custName = that.data.custName
    var region = that.data.region
    var details = that.data.details
    var defaults = that.data.defaults
    wx.request({
      url: getApp().globalData.baseUrl + '/consignee/create',
      method: "POST",
      data: {
        coachid: phone,//电话
        region: region, //省市区
        custName: custName,//姓名  -------Address
        details: details, //详细地址
        defaults: defaults
      },
      header: {
        token: wx.getStorageSync("token"),
      },
      success: function (res) {
        wx.showToast({
          title: '提交成功~',
          icon: 'loading',
          duration: 2000
        })
        console.log(res)
        that.setData({
          success: true,
          shows: true
        })
        setTimeout(function () { that.setData({ shows: false }) }, 1500)
      }

    })
  },
  onLoad: function (options) {
    var that = this;
    var userInfo = wx.getStorageSync("userInfo");

    wx.request({
      url: getApp().globalData.baseUrl + '/consignee/get',
      method: "GET",
      header: {
        token: wx.getStorageSync("token"),
      },
      success: function (res) {
        console.log(res)
        if (res.statusCode == 200) {
          that.setData({ list: res.data.data.list })
        }
      }
    })
  },
  select: function (e) {
    console.log(e)
    var id = e.currentTarget.dataset.id;
    var address = e.currentTarget.dataset.address;
    var shop_name = e.currentTarget.dataset.shop_name;
    var shopkeeper = e.currentTarget.dataset.shopkeeper;

    var pages = getCurrentPages();
    var Page = pages[pages.length - 1];//当前页
    var prevPage = pages[pages.length - 2];  //上一个页面
    var info = prevPage.data //取上页data里的数据也可以修改
    prevPage.setData({ address: address })//设置数据
    prevPage.setData({ shop_name: shop_name })//设置数据
    prevPage.setData({ shopkeeper: shopkeeper })//设置数据
    prevPage.setData({ address_id: id })//设置数据
    console.log(id)
    // prevPage.setData({ pname: pname })//设置数据
    // console.log(pname+"----"+name)

    wx.navigateBack()
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