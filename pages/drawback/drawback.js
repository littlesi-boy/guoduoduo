// pages/drawback/drawback.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goods:"",
    price:"",
    imgs: [],
    backUrls: [],
    id:"",
    intriduce:"",
    shop_id:''

  },
  //选择图片
  selectedImg: function () {
    var imgs = this.data.imgs;
    var that = this;
    wx.chooseImage({
      count: 9 - imgs.length, // 默认9
      sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        var imgsrc = res.tempFilePaths;
        imgs = imgs.concat(imgsrc);
        that.uploadimg({
          url: app.globalData.baseUrl + '/api/my/uploadimg',//这里是你图片上传的接口
          path: imgsrc//这里是选取的图片的地址数组
        });
        that.setData({
          imgs: imgs
        });

      }
    })
  },
  uploadimg: function (imgs) {
    var that = this,
      i = imgs.i ? imgs.i : 0,//当前上传的哪张图片
      success = imgs.success ? imgs.success : 0,//上传成功的个数
      fail = imgs.fail ? imgs.fail : 0;//上传失败的个数
    var backUrls = this.data.backUrls;
    wx.showLoading({
      title: '图片处理中',
    })
    wx.uploadFile({
      url: imgs.url,
      filePath: imgs.path[i],
      name: 'file',//这里根据自己的实际情况改
      formData: null,//这里是上传图片时一起上传的数据
      success: (resp) => {
        success++;//图片上传成功，图片上传成功的变量+1
        // console.log(resp);
        wx.hideLoading();
        backUrls.push(resp.data);
        that.setData({ backUrls: backUrls });
        // console.log(i);
        //这里可能有BUG，失败也会执行这里,所以这里应该是后台返回过来的状态码为成功时，这里的success才+1
      },
      fail: (res) => {
        fail++;//图片上传失败，图片上传失败的变量+1
        console.log('fail:' + i + "fail:" + fail);
      },
      complete: () => {
        // console.log(i);
        i++;//这个图片执行完上传后，开始上传下一张
        if (i == imgs.path.length) {   //当图片传完时，停止调用          
          // console.log('执行完毕');
          // console.log('成功：' + success + " 失败：" + fail);
        } else {//若图片还没有传完，则继续调用函数
          // console.log(i);
          imgs.i = i;
          imgs.success = success;
          imgs.fail = fail;
          that.uploadimg(imgs);
        }

      }
    });
  },
  del_img: function (e) {
    var imgs = this.data.imgs;
    var backUrls = this.data.backUrls;
    var index = e.currentTarget.dataset.index;
    imgs.splice(index, 1);
    backUrls.splice(index, 1);
    this.setData({ imgs: imgs });
    this.setData({ backUrls: backUrls });
  },
  get_goods: function (e) {
    console.log(e)
    var goods = e.detail.value;
    this.setData({ goods: goods });
  },
  get_price: function (e) {
    // console.log(e);
    var price = e.detail.value;
    this.setData({ price: price });
  },
  get_intriduce: function (e) {
    // console.log(e);
    var intriduce = e.detail.value;
    this.setData({ intriduce: intriduce });
  },
  formSubmit: function (e) {
    var that=this;
    var goods=that.data.goods;
    var price = that.data.price;
    var intriduce = that.data.intriduce;
    var backurl = that.data.backUrls;
    var shop_id = that.data.shop_id;
    var id=that.data.id;
    wx.request({
      url: app.globalData.baseUrl + '/api/orders/apply_refund',
      method: "POST",
      data: {
        shop_id: shop_id,
        orders_id: id,
        refund_goods: goods,
        refund_money: price,
        introduce: intriduce,
        image: backurl
      },
      success: function (res) {
        if(res.data.code==1){
          var order_num = that.data.order_num;
          wx.redirectTo({
            url: '/pages/afterdetail/afterdetail?ordernum=' + order_num,
          })
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var id = options.id;
    that.setData({ id: id, order_num: options.order_num, shop_id: options.shop_id});

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