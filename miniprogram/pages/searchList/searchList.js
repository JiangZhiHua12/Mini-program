// miniprogram/pages/searchList/searchList.js
import Notify from '../../miniprogram_npm/@vant/weapp/notify/notify';
import Dialog from '../../miniprogram_npm/@vant/weapp/dialog/dialog';
Page({

  /**
   * 页面的初始数据
   */
  data: {
  show:"none"
  },
  onClose(e){
       console.log(e)
       var index=e.currentTarget.dataset.index
       var history=wx.getStorageSync('history')
       history.splice(index,1)
       wx.setStorageSync('history', history)
       this.setData({
         tag:wx.getStorageSync('history')
       })
  },
  
delete(){
  Dialog.confirm({
    message: '确认删除所有历史记录?',
  })
    .then(() => {
      // on confirm
    })
    .catch(() => {
      // on cancel
    });
},
confirm(){
    history=[]
    wx.setStorageSync('history', history)
    this.setData({
      tag:history
    })
},
  onChange(e){
    console.log(e)
     
   
       var query=e.detail
       this.setData({
         query:e.detail
       })
       wx.request({
         url: `https://api-hmugo-web.itheima.net/api/public/v1/goods/search?query=${query}&&pagenum=${1}&&pagesize=${8}`,
         success:res=>{
           console.log(res)
           if(query==""){
             this.setData({
              serachList:"",
              show:"none"
             })
           } else{
            this.setData({
              serachList:res.data.message.goods,
              show:"block"
             })
           }
          
         }
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
  Jump(e){

    var query=e.currentTarget.dataset.query
    wx.navigateTo({
      url: `../productList/productList?query=${query}`,
    })
       
  },
  tag(e){
    var query=e.currentTarget.dataset.query
    wx.navigateTo({
      url: `../productList/productList?query=${query}`,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      console.log(wx.getStorageSync('history'))
      var query=wx.getStorageSync('history')
      this.setData({
        tag:query
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
      this.setData({
        tag:wx.getStorageSync('history')
      })
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