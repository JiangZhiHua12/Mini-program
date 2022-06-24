// miniprogram/pages/productDetail/productDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dateilInfo:{},
    color:''
  },
  previewImage(e){
    console.log(e)
    var pre= e.currentTarget.dataset.imgsrc;
    var current=e.currentTarget.dataset.imgmid
    var pic=e.currentTarget.dataset.imgarr
    var pic_arr=[]
    pic.forEach(item=>{
          pic_arr.push(item.pics_big)
    })
    wx.previewImage({
      current:current, // 当前显示图片的http链接
      urls:pic_arr // 需要预览的图片http链接列表
    })
  },
addShopCar(e){
     
      //首先得获取购物车本地存储
      var ShopCar=wx.getStorageSync('shopCar')||[]
      console.log(ShopCar)
      //查找本地存储有没有改商品通过查询id进行比较
    
      if(ShopCar==[]){
        ShopCar.push(this.dateilInfo)
        //console.log('haha')
      } else{
        var index=ShopCar.findIndex(item=>item.goods_id==this.dateilInfo.goods_id)
        console.log(index)
        if(index===-1){
              //本地存储购物车中没有
              this.dateilInfo.num=1
              ShopCar.push(this.dateilInfo)
        }else{
          ShopCar[index].num++
        }
      }
      wx.setStorageSync('shopCar',ShopCar)
      console.log(wx.getStorageSync('shopCar'))
      wx.showToast({
        title: '加入购物车成功',
        icon:'success',
        mask:'true'
      })
},
star(e){
       var star=wx.getStorageSync('star')||[]
       var id=e.currentTarget.dataset.id
       var index=star.findIndex(item=>item.goods_id==id)
       var obj=this.dateilInfo
       console.log(obj)
       if(index==-1){
           star.push(obj)
           wx.setStorageSync('star', star)
            this.setData({
              color:"orangered"
            })
           wx.showToast({
             title: '收藏成功',
           })
       }else{
         var data=star.filter(item=>{
           return item.goods_id!=id
         })
         wx.setStorageSync('star', data)
         this.setData({
          color:""
        })
         console.log(wx.getStorageSync('star'))
        wx.showToast({
          title: '已取消收藏',
        })
       }
},

  onLoad:async function (options) {
     var star=wx.getStorageSync('star')
       var index=star.findIndex(item=>item.goods_id==options.id)
       if(index==-1){
           this.setData({
             color:""
           })
       }else{
        this.setData({
          color:"orangered"
        })
       }
   wx.request({
     url: `https://api-hmugo-web.itheima.net/api/public/v1/goods/detail?goods_id=${options.id}`,
     success:res=>{
       
       this.setData({
         dateil:res.data.message.pics,
         dateilInfo:res.data.message,
         id:options.id
       })
       this.dateilInfo=res.data.message
       console.log(this.dateilInfo);
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