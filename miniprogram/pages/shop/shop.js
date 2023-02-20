// miniprogram/pages/shop/shop.js
import Notify from '../../miniprogram_npm/@vant/weapp/notify/notify';
Page({

  /**
   * 页面的初始数据
   */
  data: {
     
  },
  cat(){
wx.navigateTo({
  url: 'pages/category/category',
})
  }, 
  confirmTap(e){
    console.log(e)
          if(e.detail===""){
            Notify({ type: 'warning', message: '搜索内容不能为空' });
          }else{
            var query=e.detail
            wx.navigateTo({
              url: `../productList/productList?query=${query}`,
            })
          }
  },
  clickEvent(){
    wx.navigateTo({
      url: `../searchList/searchList`,
    })
    console.log('haha')
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var username = getApp().globalData.showDialog
    console.log(username)
  
      if(username!==undefined){
        Notify({ type: 'success', message: '欢迎您'+username });
      }
    //轮播图数据
      wx.request({
        url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata',
        success:res=>{
         // console.log(res)
          this.setData({
            swiperList:res.data.message
          })

        }
      })
      //导航栏数据
      wx.request({
        url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/catitems',
        success:res=>{
          console.log(res)
          this.setData({
          cat_home:res.data.message
          })
        }
      })
      //商品内容信息
      wx.request({
        url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/floordata',
        success:res=>{
          console.log(res)
          this.setData({
          cat_info:res.data.message
          })
        }
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