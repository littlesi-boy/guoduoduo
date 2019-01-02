//index.js
//获取应用实例
const app = getApp()
Page({
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    marqueePace: 2,//滚动速度
    marqueeDistance: 280,//初始滚动距离
    animationData:{},
    text: '鲜果必达',
    marqueeDistance2: 0,
    marquee2copy_status: false,
    marquee2_margin: 50,
    size: 14,
    judge:true,
    percent:20,
    per:10,
    orientation: 'left',//滚动方向
    interval: 2000,// 时间间隔
    base: app.globalData.base,
    baseUrl:app.globalData.baseUrl,
    arrayList:[],
    imgUrls: [],
    cube:[],
    showMask: false,
    showBox: true,
    page: 1,
    hasMore: true,
    interval1:'',
    coupon_putawary: "",
    discounts: [{ id: 0, url: './image/优惠券.png' }, { id: 1, url: './image/优惠券.png' }, { id: 2, url: './image/优惠券.png' }],
    fruitUrls: [{ icon: '', title: '店长推荐' }, { icon: '', title: '当季热销' }, { icon: '', title: '进口水果' }, { icon: '', title: '其他商品' }],
    indicatorDots: true,
    autoplay: true,
    duration: 1000
  },

  onShareAppMessage: function (res) {
    console.log(res)
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '果小小水果连锁',
      path: './index/index'
    }
  },
  nagvite:function(){
    clearInterval(this.data.interval1)
    wx.switchTab({
      url: '../carShop/carShop',
    })
  },
  pursess: function(e){
    var id=e.currentTarget.dataset.id
    console.log(e)
    clearInterval(this.data.interval1)
    wx.navigateTo({
      url: "/pages/detail/detail?id="+id,
    })
  },
  onPullDownRefresh: function () {
    wx.showNavigationBarLoading() //在标题栏中显示加载
    //模拟加载
    setTimeout(function () {
      // complete
      wx.hideNavigationBarLoading() //完成停止加载
      wx.stopPullDownRefresh() //停止下拉刷新
    }, 1500);
  },
  percent:function(){
    var that=this
    var val=setTimeout(function(){
      that.setData({percent:percent++})
    },20000)
    var vals=setTimeout(function(){
     if(that.data.per<86){
       that.setData({ per: per++ })
     }else if(that.data.per>10 && that.data.per==86){
        that.setData({per:per--})
     }

    },65000)
  },
  onShow: function () {
    var vm = this;
    var length = vm.data.text.length * vm.data.size;//文字长度
    var windowWidth = wx.getSystemInfoSync().windowWidth;// 屏幕宽度
    vm.setData({
      length: length,
      windowWidth: windowWidth,
      marquee2_margin: length < windowWidth ? windowWidth - length : vm.data.marquee2_margin//当文字长度小于屏幕长度时，需要增加补白
    });
    vm.run1();// 水平一行字滚动完了再按照原来的方向滚动
  },
  run1: function () {
    var vm = this;
    var animation = wx.createAnimation({
      duration: 900,
      timingFunction: 'ease',
    })
    vm.animation = animation
    vm.setData({
      interval1:setInterval(() => {
        var query = wx.createSelectorQuery();
        query.select('#tip-des').boundingClientRect()
        if (query.select('#tip-des') == null||undefined) {
          clearInterval(interval1);
          return;
        }
        query.exec(res => {
          var left = res[0].left;
          if (left < 236) {
            // console.log(query.select('#tip-des'))
            animation.translateY(14).step()
            vm.setData({
              animationData: animation.export()
            })
          }
        })
        if (vm.data.marqueeDistance > 6) {
          vm.setData({
            marqueeDistance: 0.9 * vm.data.marqueeDistance - vm.data.marqueePace,
          });
        } else {
          animation.translateY(-10).step()
          vm.setData({
            marqueeDistance: vm.data.windowWidth-10,
          });
      
        }
      }, vm.data.interval)
    })

  },
  firstI:function(e){
    var id=e.currentTarget.dataset.id
    clearInterval(this.data.interval1)
    wx.navigateTo({
      url: '/pages/detail/detail?id=' + id,
    })
  },
  secondI: function (e) {
    var id = e.currentTarget.dataset.id
    clearInterval(this.data.interval1)
    wx.navigateTo({
      url: '/pages/detail/detail?id=' + id,
    })
  },
  thirdI: function (e) {
    var id = e.currentTarget.dataset.id
    clearInterval(this.data.interval1)
    wx.navigateTo({
      url: '/pages/detail/detail?id=' + id,
    })
  },
  onReady:function(params){
    var that=this;
    wx.request({
      // base: app.globalData.base,
      url: app.globalData.base + '/api/v1/goods/info',
      method: 'GET',
      success:function(res){
        if(res.statusCode==200){
          that.setData({
            arrayList: res.data.data.list
          })
        }
        return -1;
      }
    })
  },
  serviceLink:function(){
    wx.navigateTo({
      url: '/pages/afterservice/afterservice',
    })
  },

  onLoad: function (options) {
    var that = this   
    wx.getSetting({
      success: function (res) {
        // if (!res.authSetting['scope.userLocation']) {
        //   wx.authorize({
        //     scope: 'scope.userLocation',
        //     success() {
        //       wx.getLocation()
        //     }
        //   })
        // }
        if (!res.authSetting['scope.userInfo']) {
          wx.authorize({
            scope: 'scope.userInfo',
            success(){
              wx.navigateTo({
                url: '/pages/login/login',
              })
            }
          })
         
        } else{
          wx.switchTab({
            url: '/pages/index/index'
          })
        }
      }
    })
    wx.request({
      url: app.globalData.base +'/api/v1/banner/info',
      method: 'GET',
      success: function (res) {
        if (res.statusCode == 200) {
          console.log(res.data.data.list[0].url)
          that.setData({
            imgUrls: res.data.data.list
          })
        }
        return -1;
      }
    })
    wx.request({
      url: app.globalData.base + '/api/v1/cate/icon',
      method: 'GET',
      success: res => {
        if (res.statusCode == 200) {
          that.setData({
            fruitUrls: res.data.data.list
          })
        }
        return -1;
      }
    })
    wx.request({
      url: app.globalData.base +'/api/v1/cube/info',
      method:'GET',
      
      success:res=>{
        if(res.statusCode==200){
          // let banner = 'fruitUrls[' + res.data.data.link_id+'].url'
          that.setData({
            cube:res.data.data.list
          })
        }
        return -1;
      }
    })
    //判读审核是否通过
    // wx.request({
    //   url: app.globalData.baseUrl + '/api/my/userinfo',
    //   method: "POST",
    //   data: {
    //     id: wx.getStorageSync("uid"),
    //   },
    //   success: function (res) {
    //     console.log(res)
    //     if (res.data.data.is_pass == 0) {
    //       wx.navigateTo({
    //         url: '/pages/auditing/auditing'
    //       })
    //       console.log(222)
    //     }
    //   }
    // })
  //   wx.request({
  //     url: app.globalData.baseUrl + '/api/index/coupon_putawary',
  //     method: "POST",
  //     data: {
  //       id: wx.getStorageSync("uid"),
  //     },
  //     success: function (res) {
  //       console.log(res)
  //       that.setData({ coupon_putawary: res.data.data })
  //       var coupon_putawary = that.data.coupon_putawary
  //       if (that.data.coupon_putawary) {
  //         that.setData({ showBox: true })
  //         that.setData({ showMask: true })
  //       } else {
  //         that.setData({ showBox: false })
  //         that.setData({ showMask: false })
  //       }

  //     }
  //   })

  //   this.onPullDownRefresh()
  // },
  // to_detail: function (event) {
  //   var id = event.currentTarget.dataset.id;
  //   wx.navigateTo({
  //     url: "/pages/detail/detail?id=" + id
  //   })
  },
 
  to_search: function (event) {
    wx.navigateTo({
      url: "/pages/search/search"
    })
  },
  onHide:function(){
    clearInterval(this.data.interval1)
  },
  changeProperty: function (e) {
    var propertyName = e.currentTarget.dataset.propertyName
    var newData = {}
    newData[propertyName] = e.detail.value
    this.setData(newData)
  },
  changeIndicatorDots: function (e) {
    this.setData({
      indicatorDots: !this.data.indicatorDots
    })
  },
  skip:function(e){
    app.searchWord=e.currentTarget.dataset.id
    wx.switchTab({
      url:'../classify/classify',
    })
  },
  onUnload:function(){
    clearInterval(this.data.interval1)
  },
  changeAutoplay: function (e) {
    this.setData({
      autoplay: !this.data.autoplay
    })
  },
  intervalChange: function (e) {
    this.setData({
      interval: e.detail.value
    })
  },
  touchSingle: function (e) {
    console.log(e.currentTarget.dataset.tip)
    let disc = 'discounts[' + e.currentTarget.dataset.tip + '].url'
    this.setData({
      [disc]: './image/我的优惠券.png'
    })
  },

  durationChange: function (e) {
    this.setData({
      duration: e.detail.value
    })
  }
  
})
