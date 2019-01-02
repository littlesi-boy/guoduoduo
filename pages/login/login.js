//index.js
//获取应用实例
const app = getApp()
Page({
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
onLoad:function(option){
  if(app.globalData.userInfo){
wx.switchTab({
  url: '/pages/index/index',
})
  }else{
    wx.showToast({
      title: '请点击登录',
      icon:'none'
    })
  }
  
},
  onGotUserInfo: function (e) {
   if (e.detail.userInfo) {
      //用户按了允许授权按钮
      var that = this;
   
      //插入登录的用户的相关信息到数据库
      wx.login({
        success: function (res) {
          var code = res.code;
        if(res.code){
          wx.showLoading({
            title: '登录中',
          })
          wx.request({
            url: getApp().globalData.baseUrl + '/login',
            method: "POST",
            data: {
              code: code,
              nickname: e.detail.userInfo.nickName,
              headimg: e.detail.userInfo.avatarUrl,
              sex: e.detail.userInfo.gender
            },
            success: function (res) {
              console.log(res.data);
              wx.hideLoading();
              wx.setStorageSync('token', res.data.token);
              wx.setStorageSync('userInfo', e.detail.userInfo)
              app.globalData.userInfo = e.detail.userInfo
              // console.log(e.detail.userInfo)
              wx.switchTab({
                url: '/pages/index/index'
              })
            },

          });
        }

        }
      })
    } else {
      //用户按了拒绝按钮
      wx.showModal({
        title: '警告',
        content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!',
        showCancel: false,
        confirmText: '返回授权',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击了“返回授权”')
            wx.navigateBack()
          }
        }
      })
    }
  },

})
