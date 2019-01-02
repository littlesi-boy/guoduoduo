// pages/add_shop/add_shop.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgs: [],
    imageurl: [],
    region: ["", "", ""],

  },
  bindRegionChange: function (e) {
    var value = e.detail.value;
    this.setData({ region: value })
  },
  //选择图片
  selectedImg: function () {
    var imgs = this.data.imgs;
    var imageurl = this.data.imageurl;
    var that = this;
    wx.chooseImage({
      count: 9 - imgs.length, // 默认9
      sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        var imgsrc = res.tempFilePaths;
        imgs = imgs.concat(imgsrc);
        //that.uploadimg(imgs)
        for (var i = 0; i < imgs.length; i++) {
          wx.showLoading({
            title: '图片处理中',
          })
          wx.uploadFile({
            url: app.globalData.baseUrl + '/api/my/uploadimg',//仅为示例，非真实的接口地址//接口连接
            filePath: imgs[i],
            name: 'file',
            formData: {
              'user': 'test'
            },
            success: function (res) {
              wx.hideLoading();
              imageurl.push(res.data)
              that.setData({
                imageurl: imageurl
              });
            }
          })
        }
        var imageurl = [];
        // console.log(imgs)
        that.setData({
          imgs: imgs
        });

      }
    })
  },

  //删除照片
  delect_img: function (e) {
    var index = e.currentTarget.dataset.index;
    var imgs = this.data.imgs;
    var imageurl = this.data.imageurl;
    imgs.splice(index, 1);
    imageurl.splice(index, 1);
    this.setData({ imgs: imgs });
    this.setData({ imageurl: imageurl });
  },
  formSubmit: function (e) {
    // console.log(e)
    var value = e.detail.value;
    var addr = value.addr;
    // console.log(addr)
    var people_name = value.people_name;
    var store_name = value.store_name;
    var tel = value.tel;
    var province = this.data.region[0];
    var city = this.data.region[1];
    var county = this.data.region[2];
    var imageurl = this.data.imageurl.join(",");
    if (!addr) {
      wx.showModal({
        title: '提示',
        content: '请输入地址',
        showCancel: false
      })
      return;
    }
    if (!tel) {
      wx.showModal({
        title: '提示',
        content: '请输入手机号',
        showCancel: false
      })
      return;
    }
    if (!store_name) {
      wx.showModal({
        title: '提示',
        content: '请输入门店名称',
        showCancel: false
      })
    }
    if (!people_name) {
      wx.showModal({
        title: '提示',
        content: '请输入联系人名称',
        showCancel: false
      })
    }
    var that = this;
    wx.request({
      url: app.globalData.baseUrl + '/api/my/add_shop',
      method: "POST",
      data: {
        shop_id: wx.getStorageSync("uid"),
        shop_name: store_name,
        shopkeeper: people_name,
        address: addr,
        province: province,
        city: city,
        county: county,
        shop_image: imageurl,
        telephone:tel
      },
      success: function (res) {
        wx.navigateBack({
          
        })
   
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