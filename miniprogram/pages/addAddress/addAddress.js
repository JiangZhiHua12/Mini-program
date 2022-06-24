// miniprogram/pages/addAddress/addAddress.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  onClickButton(){
   wx.navigateTo({
     url: '../writerAddress/writerAddress',
   })
  },
  clickEvent(e){
       var index=e.currentTarget.dataset.index
       var InfoObj=wx.getStorageSync('ReceiptInfo')[index]
       console.log(InfoObj)
       wx.redirectTo({
        url: `../pay/pay?username=${InfoObj.username}&&number=${InfoObj.number}&&position=${InfoObj.position}&&message=${InfoObj.message}&&ischecked=${InfoObj.ischecked}`, 
      })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
           var Info=wx.getStorageSync('ReceiptInfo')
           console.log(Info)
             if(Info[0].ischecked==true){
               this.setData({
                 tag:'默认',
                 Info:Info
               })
             } else{
              this.setData({
                tag:"",
                 Info:Info
               })
               console.log('haha')
             }
          
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