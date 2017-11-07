var app = getApp()
Page({
  data: {
    imgUrls: [
      //'../../images/s1.jpg',
      '/resources/images/banner-1.png',
      '/resources/images/banner-2.png'
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    duration: 100,
    userInfo: {}
  },
  onLoad: function () {
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo
      })
    })
  },
  //事件处理函数
  bindViewTap: function () {
    // wx.navigateTo({
    //   url: '../logs/logs'
    // })
  },
  changeIndicatorDots: function (e) {
    this.setData({
      indicatorDots: !this.data.indicatorDots
    })
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
  durationChange: function (e) {
    this.setData({
      duration: e.detail.value
    })
  },
  map: function(e){
    wx.navigateTo({
      url: '../map/map',
    })
  },
  scan: function(e){
    wx.showModal({
      title: '商品保修服务',
      content: '尊敬的客户，您可以通过扫描商品二维码进入保修服务，点击【确定】开始扫描二维码',
      success:function(res){
        if (res.confirm){
          wx.scanCode({
            onlyFromCamera: true,
            success: (res) => {
              console.log('success:' + res)
              wx.navigateTo({
                url: '../msg/msg'
              })
            },
            fail: (res) => {
              console.log('fail:' + res)
              // wx.navigateTo({
              //   url: '../msg/msg'
              // })
            }
          });
        }
      }
    })
  }
})