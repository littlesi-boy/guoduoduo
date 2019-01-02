//app.js
App({
  onLaunch: function () {
   
    wx.checkSession({
      success() {
        // session_key 未过期，并且在本生命周期一直有效
      },
      fail() {
        // session_key 已经失效，需要重新执行登录流程
        wx.showToast({
          title: '请点击登录',
          icon: 'none'
        })
      }
    });

  },


  globalData: {
    currentArress:'',
    currentAddr:'',
      userInfo: null,
      base: 'https://cadmin.guoxiaoxiao.net',
    baseUrl: "https://cadmin.guoxiaoxiao.net/api/v1"
  }
})