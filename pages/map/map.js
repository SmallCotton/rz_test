//logs.js
const util = require('../../utils/util.js')
const iconPath = "/resources/images/marker1.png";
const selectedIconPath = "/resources/images/marker2.png";
const iconWidth = 38;
const iconHeight = 40;
const citys = [{ 'cid': '0', 'city': '北京' }, { 'cid': '1', 'city': '天津' }, { 'cid': '2', 'city': '上海' }];
 
Page({
  data: {
    citys: citys,
    city: '北京',
    value: [0],
    stores:[
      { id: 0, title: "FOSSIL悠唐购物中心店", display: "none", distance: '360m', address: "海淀区但境界甲一号欧美汇购物中心一层", tel: "010-234345", range:"周一至周日 10:00-22:00"},
      { id: 1, title: "FOSSIL北京百货大楼店", display: "none", distance: '860m', address: "海淀区但境界甲一号欧美汇购物中心一层", tel: "010-234345", range: "周一至周日 10:00-22:00"},
      { id: 2, title: "FOSSIL东方新天地店", display: "none", distance: '1000m', address: "海淀区但境界甲一号欧美汇购物中心一层", tel: "010-234345", range: "周一至周日 10:00-22:00"},
      { id: 3, title: "FOSSIL凯德MALL店", display: "none", distance: '1.2KM', address: "海淀区但境界甲一号欧美汇购物中心一层", tel: "010-234345", range: "周一至周日 10:00-22:00"},
      { id: 4, title: "FOSSIL荟聚购物中心店", display: "none", distance: '1.6KM', address: "海淀区但境界甲一号欧美汇购物中心一层", tel: "010-234345", range: "周一至周日 10:00-22:00"}
    ],
    markers: [
      {
      iconPath: iconPath,
      id: 0,
      title:"FOSSIL悠唐购物中心店",
      //label:{content:"FOSSIL广州小蛮腰店",x:-50,y:-50},
      //callout: { content: "FOSSIL悠唐购物中心店", display:"BYCLICK"},
      latitude: 39.921741,
      longitude: 116.440439,
      width: iconWidth,
      height: iconHeight
      },
      {
        iconPath: iconPath,
        id: 1,
        title: "FOSSIL北京百货大楼店",
        //label:{content:"FOSSIL广州小蛮腰店",x:-50,y:-50},
        //callout: { content: "FOSSIL北京百货大楼店", display: "ALWAYS" },
        latitude: 39.913752,
        longitude: 116.410094,
        width: iconWidth,
        height: iconHeight
      },
      {
        iconPath: iconPath,
        id: 2,
        title: "FOSSIL东方新天地店",
        //label:{content:"FOSSIL广州小蛮腰店",x:-50,y:-50},
        //callout: { content: "FOSSIL东方新天地店", display: "ALWAYS" },
        latitude: 39.909421,
        longitude: 116.41459,
        width: iconWidth,
        height: iconHeight
      },
      {
        iconPath: iconPath,
        id: 3,
        title: "FOSSIL凯德MALL店",
        //label:{content:"FOSSIL广州小蛮腰店",x:-50,y:-50},
        //callout: { content: "FOSSIL凯德MALL店", display: "ALWAYS" },
        latitude: 39.971331,
        longitude: 116.447518,
        width: iconWidth,
        height: iconHeight
      },
      {
        iconPath: iconPath,
        id: 4,
        title: "FOSSIL荟聚购物中心店",
        //label:{content:"FOSSIL广州小蛮腰店",x:-50,y:-50},
        //callout: { content: "FOSSIL荟聚购物中心店", display: "ALWAYS" },
        latitude: 39.787486,
        longitude: 116.327024,
        width: iconWidth,
        height: iconHeight
      }
      ],
    polyline: [{
      points: [{
        longitude: 113.3245211,
        latitude: 23.10229
      }, {
        longitude: 113.324520,
        latitude: 23.21229
      }],
      color: "#FF0000DD",
      width: 2,
      dottedLine: true
    }],
    controls: [{
      id: 123,
      iconPath: '/resources/images/location.png',
      position: {
        left: 0,
        top: 300 - 50,
        width: 30,
        height: 30
      },
      clickable: true
    }]
  },
  bindChange: function (e) {
    const val = e.detail.value
    this.setData({
      city: this.data.citys[val[0]]['city']
    })
  },
  regionchange(e) {
    console.log(e.type)
  },
  markertap(e) {
    console.log(e.markerId);
    this.selectStore(e.markerId);
  },
  /**
   * 导航到门店
   */
  navigateToStore:function(storeId){
    console.log(storeId);
    var marker = this.findMarker(storeId);
    if (marker != null) {
      var lng = marker.longitude;
      var lat = marker.latitude;
      console.log(lng);
      console.log(lat);
      wx.openLocation({
        latitude: lat,
        longitude: lng,
        name: marker.title
      });
    }
  },
  controltap(e) {
    console.log(e.controlId)
  },
  findMarker(markerId){
    var markers = this.data.markers;
    for(var i = 0; i < markers.length; i++){
      if (markers[i].id == markerId){
        return markers[i];
      }
    }
    return null;
  },
  /**
   * 点击商店
   */
  tapStore:function(e){
    console.log(e);
    // wx.showToast({
    //   title: 'title' + e.target.dataset.store
    // })
    var dataSet = e.currentTarget.dataset;
    var storeId = dataSet.store;
    this.selectStore(storeId);
  },
  selectStore: function(storeId){
    var stores = this.data.stores;
    for (var i = 0; i < stores.length; i++) {
      if (stores[i].id == storeId) {
        stores[i].display = stores[i].display == 'block' ? 'none' : 'block';
      }else{
        stores[i].display = 'none';
      }
    }

    //处理marker
    var markers = this.data.markers;
    for (var i = 0; i < markers.length; i++) {
      markers[i].iconPath = iconPath;
      if (markers[i].id == storeId) {
        markers[i].iconPath = selectedIconPath;
      }
    }
    this.setData({
      stores: stores,
      markers: markers
    });
  },
  /**
   * 点击门店
   */
  tapStoreLocation:function(e){
    console.log('tap store location');
    var storeId = e.currentTarget.dataset.store;
    this.navigateToStore(storeId);
  },
  /**
   * 拨打电话
   */
  tapStoreTel:function(e){
    var tel = e.currentTarget.dataset.tel;
    wx.makePhoneCall({
      phoneNumber: tel //仅为示例，并非真实的电话号码
    });
  }
})
