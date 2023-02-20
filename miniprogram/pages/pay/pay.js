// miniprogram/pages/pay/pay.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    consignee_addr:""
  },
  clickEvent(){
wx.navigateTo({
  url: '../addAddress/addAddress',
})
  },
  onSubmit(){
    var token="Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIzLCJpYXQiOjE1NjQ3MzAwNzksImV4cCI6MTAwMTU2NDczMDA3OH0.YPt-XeLnjV-_1ITaXGY2FhxmCe4NvXuRnRB8OMCfnPo"
    var header={Authorizeation:token}
   var ShopCar=wx.getStorageSync('shopCar')||[]
   console.log(ShopCar)
   var data2=ShopCar.filter(item=>{
     return  item.ischecked==true
   })
    
   var total=null
      data2.forEach(item=>{
         total+=item.goods_price
      })

   var order_price=total
   var consignee_addr=this.consignee_addr
   var goods=data2
  var goods_=[]
  goods.forEach(item=>goods_.push({
    goods_id:item.goods_id,
    goods_number:item.num,
    goods_price:item.goods_price
  }))
  const orderParams={order_price,consignee_addr,goods_};
 wx.request({
     url: 'https://api-hmugo-web.itheima.net/api/public/v1/my/orders/create',
     data:orderParams,
     method:"POST",
     header:header,
     success:res=>{
       console.log(res)
     }
     
   })
   console.log(data2)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  console.log(options)
           
     var ShopCar=wx.getStorageSync('shopCar')||[]
       console.log(ShopCar)
       var data2=ShopCar.filter(item=>{
         return  item.ischecked==true
       })
       
       var total=null
       data2.forEach((item,index)=>{
         total+=item.goods_price*item.num 
         console.log(total)
       })
       console.log(total)
       this.setData({
         total:total*100
       })
       this.setData({
           checkedProduct:data2,
            goods_name:data2.goods_name,
            goods_price:data2.goods_price,
            goods_small_logo:data2.goods_small_logo,
            num:data2.num
       })
        var Info=wx.getStorageSync('ReceiptInfo')
          var data=Info.filter(item=>{
                return item.ischecked==true
          }) 
        
           if(data.length==0 && !options.username){
             this.setData({
              username:Info[0].username,
              number:Info[0].number,
              position:Info[0].position,
              message:Info[0].message,
              ischecked:Info[0].ischecked
             })
             consignee_addr=position+message
             console.log('h3aha')
           }else if(options.username){
            this.setData({
              username:options.username,
              number:options.number,
              position:options.position,
              message:options.message,
              ischecked:options.ischecked
            })
            console.log('h2aha')
           } else{
             this.setData({
              username:data[0].username,
              number:data[0].number,
              position:data[0].position,
              message:data[0].message,
              ischecked:data[0].ischecked
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

  onUnload:function () {
    let pages = getCurrentPages().length - 1;
   
      console.log('需要销毁的页面：'+pages);
      wx.navigateBack({
        delta:pages
      })
   
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