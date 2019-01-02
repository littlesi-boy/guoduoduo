// pages/myself/myself.js
var app=getApp()
Page({
  data: {
    userInfo:[],
    content: "",
    newNick: '',
    showModalStatus: false,
    scrollTop: 400,
    gxx:false,
    animationData:{},
    fus:true
  },
  nav_to: function (e) {
    var url = e.currentTarget.dataset.url;
    wx.navigateTo({
      url: url
    })
  },
swip_to:function(e){
  var url = e.currentTarget.dataset.url;
  wx.switchTab({
    url: url,
  })
},
  to_purse: function (e) {
    var balance = e.currentTarget.dataset.balance;
    wx.navigateTo({
      url: "/pages/purse/purse?balance=" + balance
    })
  },
  nickSub: function (e) {
    this.setData({
      newNick: e.detail.value
    })
  },
  submit: function (e) {
    var that = this
    var userInf=that.data.userInfo
    var newNick = that.data.newNick
    if (this.data.newNick == '') {
      wx.showModal({
        title: '提示',
        content: '编辑内容为空 是否确定结束会话',
        duration: 2000,
        success(res){
          if(res.confirm){
            that.setData({
              showModalStatus:false
            })
          }
        }
      })
    } else {
      userInf.nickName = newNick
      that.setData({
        userInfo: userInf
      })
      wx.setStorageSync('userInfo', that.data.userInfo)
      setTimeout(function(){
        that.setData({
          showModalStatus: false,
          gxx: false
        })
      }, 800)
 
    }
  },
  linkEdit:function(){
    var that=this
    var animation = wx.createAnimation({
      duration: 500,
      timingFunction: "linear",
      delay: 100
    })
    that.animation = animation
    animation.translateY(0).step()
    that.setData({
      animationData: animation.export(),
      showModalStatus: true,
    })
    setTimeout(function () {
      animation.translateY(-300).step()
      that.setData({
        animationData: animation.export()
      })
    }.bind(this), 500)
  },
  hideModal: function () {
    // 隐藏遮罩层
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 100
    })
    this.animation = animation
    animation.translateY(0).step()
    this.setData({
      animationData: animation.export(),
    })
    setTimeout(function () {
      animation.translateY(-300).step()
      this.setData({
        animationData: animation.export(),
        showModalStatus: false
      })
    }.bind(this), 200)
  },
  to_obligation: function (event) {
    wx.navigateTo({
      url: "/pages/obligation/obligation"//待付款
    })
  },
  to_process: function (event) {
    wx.navigateTo({
      url: "/pages/process/process"//备货中
    })
  },
  to_dispatching: function (event) {
    wx.navigateTo({
      url: "/pages/dispatching/dispatching"//配送中
    })
  },
  to_finish: function (event) {
    wx.navigateTo({
      url: "/pages/finish/finish"//已完成
    })
  },
  to_manage: function (e) {
    wx.navigateTo({
      url: '/pages/store_manage/store_manage',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  signin:function(){
    wx.navigateTo({
      url: '/pages/register/register',
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
    var that = this;
    var userInfo = wx.getStorageSync("userInfo");
    that.setData({ userInfo: userInfo })
    // wx.request({
    //   url: app.globalData.baseUrl + '/login',
    //   method: "POST",
    //   data: {
    //     id: userInfo.id,
    //   },
    //   success: function (res) {
    //     // console.log(res)
    //     that.setData({ content: res.data.data })
    //     // wx.setStorageSync("uid", res.data.data.id);
    //     // wx.setStorageSync("userInfo", res.data.data);
    //   }
    // })
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