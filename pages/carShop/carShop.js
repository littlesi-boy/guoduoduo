// pages/carShop/carShop.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    num: 0,
    base: app.globalData.base,
    total: 0, //总金额 
    allsel: false, //全选 
    checked: [],
    shopcarData: [], //购物车数据,
    count: 1,
    myCart: false,
    cartNext: true,
    checkedId: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  buysomething: function(options) {
    wx.switchTab({
      url: '../index/index',
    })
  },
  back: function() {
    console.log('哈哈哈')
    wx.switchTab({
      url: '../index/index',
    })
  },
  onLoad: function(options) {


  },
  checkedTap: function(e) {

    var index = e.currentTarget.dataset.index;
    var id = e.currentTarget.dataset.id;
    console.log(e.currentTarget.dataset.id)
    var num = this.data.num
      ++num
    var array = [];
    array.push({
      goods_id: e.currentTarget.dataset.id,
      count: num
    })
    this.setData({
      checkedId: array
    })
    var checked = this.data.checked;
    if (checked[index].checked) {
      checked[index].checked = false;
    } else {
      checked[index].checked = true;
    }
    this.setData({
      checked: checked
    });
    this.calculate();

  },
  allcheckedTap: function() {
    var allsel = this.data.allsel;
    var checked = this.data.checked;
    if (checked.length > 0) {
      if (allsel) {
        checked.forEach(function(item) {
          item.checked = false;
        })
      } else {
        checked.forEach(function(item) {
          item.checked = true;
        })
      }
      this.setData({
        checked: checked
      })
      this.calculate();
    }

  },
  calculate: function() {
    var checked = this.data.checked;
    var all = true;
    var count = this.data.count
    var total = 0;
    if (checked.length > 0) {
      checked.forEach(function(item) {
        if (!item.checked) {
          all = false;
        } else {
          total += parseFloat(item.goods_price * count)
        }
      })
    } else {
      all = false;
    }
    this.setData({
      allsel: all
    });
    this.setData({
      total: parseFloat(total).toFixed(1)
    });
  },
  to_createorder: function(event) {
    var that = this
    var checked = this.data.checked;
    var total = this.data.total;
    var hasChecked = false;
    var selectedArr = [];
    if (checked.length > 0) {
      checked.forEach(function(item) {
        if (item.checked) {
          hasChecked = true;
          selectedArr.push(item);
        }
      })

    } else {
      return;
    };
    if (hasChecked) {

      var selectedArrStr = JSON.stringify(selectedArr)

      console.log(selectedArrStr)
      wx.navigateTo({
        url: '../createorder/createorder?params=' + selectedArrStr
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '请选择商品',
        showCancel: false
      })
    }

  },
  numchangeTap: function(e) {
    var that = this;
    var type = e.currentTarget.dataset.type;
    // var shopcarData = that.data.shopcarData;
    var id = e.currentTarget.dataset.id;
    var index = e.currentTarget.dataset.index
    var goods = that.data.shopcarData
    var count = that.data.count
    if (type == 0) {
      goods[index].count = goods[index].count - 1;
      that.setData({
        count: goods[index].count,
        shopcarData: goods
      })
    } else {
      goods[index].count = goods[index].count + 1;
      that.setData({
        count: goods[index].count,
        shopcarData: goods
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
        count: count
      },
      success: function(res) {

        if (res.statusCode == 200) {

          wx.hideLoading();
        }

      }
    })
    that.calculate()
  },

  //删除事件

  del: function(e) {
    var that = this;
    // console.log(e)  
    var id = e.currentTarget.dataset.id;
    console.log(id)
    var index = e.currentTarget.dataset.index;
    var count = this.data.count
    // wx.showModal({
    //   title: '提示',
    //   content: '确定删除？',
    //   success: function (res) {
    //     if (res.confirm) {
    //       wx.showLoading({
    //         title: '删除中。。',
    //       })
    wx.request({
      url: app.globalData.base + '/api/v1/cart/post',
      method: "POST",
      data: {
        id: id,
        count: count
      },
      header: {
        token: wx.getStorageSync("token")
      },
      success: function(res) {
        console.log(res)
        if (res.statusCode == 200) {
          var shopcarData = that.data.shopcarData;
          shopcarData.splice(index, 1);
          that.setData({
            shopcarData: shopcarData
          })
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function(options) {
    var that = this;

    var id = that.options.id;


    that.setData({
      allsel: false
    })
    that.setData({
      total: 0.0
    })
    wx.request({
      url: app.globalData.base + '/api/v1/cart/get',
      method: "GET",
      header: {
        token: wx.getStorageSync("token")
      },
      success: function(res) {
        if (res.statusCode == 200) {
          that.setData({
            checked: [],
            myCart: false,
            cartNext: true,
            shopcarData: res.data.data.list
          });

        } else {
          that.setData({
            myCart: true
          })
        }
        var checked = that.data.checked;
        var shopcarData = that.data.shopcarData;
        var newArr = [];
        if (shopcarData.length > 0) {
          shopcarData.forEach(function(item) {
            newArr.push({
              goods_id: item.goods_id,
              checked: false,
              goods_img: item.goods_img,
              goods_price: item.goods_price,
              goods_name: item.goods_name,
              count: 1
            });
            item.count = 1
            // that.setData({ total: item.goods_price * item.count })
          })

          if (checked.length > 0) {
            newArr.forEach(function(item) {
              checked.forEach(function(citem) {
                if (item.id == citem.id) {
                  item.checked = citem.checked
                }
              })
            })
          }
          that.setData({
            checked: newArr
          })
        } else {
          that.setData({
            myCart: true
          })
        }

        that.setData({
          shopcarData: shopcarData
        })

      }
    })


  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})