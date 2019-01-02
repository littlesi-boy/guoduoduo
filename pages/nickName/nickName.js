Page({

  /**
   * 页面的初始数据
   */
  data: {
   

  },
  translate: function () {
    this.animation.translate(Math.random() * 500 - 50, Math.random() * 500 - 50).step()
    this.setData({ animation: this.animation.export() })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  nickSub:function(e){
    this.setData({
      newNick: e.detail.value
    })
  },
  submit:function(){
    var that=this
    if(this.data.newNick==''){
   wx.showModal({
     title: '提示',
     content: '编辑内容为空 是否确定结束会话',
     duration: 2000
   })
    }else{
      wx.request({
        url: '',
        header: {
          token: wx.getStorageSync("token"),
        },
        data:{
          newNick:that.data.newNick
        },
        success:function(res){
          wx.showToast({
            title: '发送成功..!',
            icon:'success',
            duration: 1500
          })
        }
      })
    }
  },
  onLoad: function (options) {
    this.setData({
      isShow:true
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.animation = wx.createAnimation()
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