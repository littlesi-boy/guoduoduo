
var app = getApp();
Page({
  data: {
    currType: 0,
    // 当前类型
    types: [],
    current:1,
    typeTree:[],
    baseUrl: app.globalData.baseUrl
  },
  onLoad: function (option) {
    
  },
  tap: function () {
    var that = this
    var currType = that.data.currType
    wx.request({
      url: that.data.baseUrl + '/cate/get/' + currType,
      method: 'GET',
      header: {
        token: wx.getStorageSync("token")
      },
      success: function (res) {
        var status = res.data.status;
        if (status == 200) {
          var catList = res.data.data.list;
          that.setData({
            typeTree: catList,
          });
          console.log(catList)
          console.log(that.data.typeTree)
        } else {
          wx.showToast({
            title: res.data.err,
            duration: 2000,
          });
        }
      },
      error: function (e) {
        wx.showToast({
          title: '网络异常！',
          duration: 2000,
        });
      }
    });
  },
  tapType: function (e) {
    var that = this;
    const currType = e.currentTarget.dataset.cat_id;
    that.setData({
      currType: currType
    });
    console.log(currType);
    wx.request({
      url: that.data.baseUrl + '/cate/get/'+currType,
      method: 'GET',
      // data: { cat_id: currType },
      header: {
        token: wx.getStorageSync("token")
      },
      success: function (res) {
        var status = res.data.status;
        if (status == 200) {
          var catList = res.data.data.list;
          that.setData({
            typeTree: catList,
          });
        } else {
          wx.showToast({
            title: res.data.err,
            duration: 2000,
          });
        }
      },
      error: function (e) {
        wx.showToast({
          title: '网络异常！',
          duration: 2000,
        });
      }
    });
  },
  onShow: function (option) {
    var val = app.searchWord;
    if(val!=undefined){
      this.setData({
        current: val
      })
    }
    var that = this;
    var current = this.data.current
    that.tap()
    wx.request({
      url: that.data.baseUrl + '/cate/info',
      method: 'GET',
      header: {
        token: wx.getStorageSync("token")
      },
      success: function (res) {
        //--init data 
        if (res.statusCode == 200) {
          var curr = current - 1
          console.log(curr)
          that.setData({
            currType: res.data.data.list[curr].id,
            types: res.data.data.list,
          })
          setTimeout(that.tap(),1000)
        } else {
          wx.showToast({
            title: res.data.err,
            duration: 2000,
          });
        }
      },
      error: function (e) {
        wx.showToast({
          title: '网络异常！',
          duration: 2000,
        });
      }
    });

  },

  back:function(){
    var pages=getCurrentPages()
    var currpage=pages[pages.length-1]
    var prevpage=pages[pages.length-2]
    wx.switchTab({
      url: '/pages/index/index',
    })
  }
  
})