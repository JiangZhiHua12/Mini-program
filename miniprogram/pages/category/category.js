// miniprogram/pages/category/category.js
//import Notify from '@vant/weapp/dist/notify/notify';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activeKey:0,
    detail:0,
  },
  onChange(event){
    //Notify({ type: 'primary', message: event.detail });
    //console.log(event.detail)
    this.setData({
      detail:event.detail
    })
  },
  clickEvent(event){
        console.log(event.currentTarget.dataset.id)
        var  id=event.currentTarget.dataset.id
        wx.navigateTo({
          url: `../productList/productList?id=${id}`,
        })
  },

 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad:function (options) {
     wx.request({
       url: 'https://api-hmugo-web.itheima.net/api/public/v1/categories',
       success:res=>{
        console.log(res.data.message)
         this.setData({
           cat_List:res.data.message
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