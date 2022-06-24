// miniprogram/pages/productList/productList.js
import Notify from '../../miniprogram_npm/@vant/weapp/notify/notify';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    active: 0,
  },
  onChange(event) {

  },
  onPullDownRefresh: function () {
 
  },

  clickEvent(event){
    console.log(event)
    var id=event.currentTarget.dataset.id
    var index=event.currentTarget.dataset.index
    wx.navigateTo({
      url: `../productDetail/productDetail?id=${id}&&index=${index}`,
    })
  },
  confirmTap(e){
    console.log(e)
          if(e.detail===""){
            Notify({ type: 'warning', message: '搜索内容不能为空' });
          }else{
            var query=e.detail
           wx.request({
             url: `https://api-hmugo-web.itheima.net/api/public/v1/goods/qsearch?query=${query}&&pagenum=${1}&&pagesize=${100}`,
             success:res=>{
              console.log(res)
              
              this.setData({
                productList:res.data.message,
                detail:query,
               
              })
             }
           })
          }
 
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
    if(options.query===undefined){
      wx.request({
        url: `https://api-hmugo-web.itheima.net/api/public/v1/goods/search?cid=${options.id}&&pagenum=${1}&&pagesize=${1000}`,
        success:res=>{
        console.log(res.data.message);
        console.log('haha')
          this.setData({
              productList:res.data.message.goods,
             
          })
          var data=res.data.message.goods
          var priceList=data.sort(function(item1,item2){
                    if(item1.goods_price<item2.goods_price){
                      return -1
                    }else if(item1.goods_price>item2.goods_price){
                     return 1
                    }
                    else{
                      return 0
                    }
          })
          console.log(priceList)
          this.setData({
            priceList:priceList
          })
     }})
    }
else{
  var history=wx.getStorageSync('history')||[]
  var obj={
    query:options.query
  }
  history.push(obj)
  wx.setStorageSync('history', history)
  wx.request({
    url: `https://api-hmugo-web.itheima.net/api/public/v1/goods/search?query=${options.query}&&pagenum=${1}&&pagesize=${100}`,
    success:res=>{
      console.log(res)
       console.log('123')
      this.setData({
        productList:res.data.message.goods,
        detail:options.query,
        
      })
      var data=res.data.message.goods
      var priceList=data.sort(function(item1,item2){
                if(item1.goods_price<item2.goods_price){
                  return -1
                }else if(item1.goods_price>item2.goods_price){
                 return 1
                }
                else{
                  return 0
                }
      })
      console.log(priceList)
      this.setData({
        priceList:priceList
      })
    }
  })
}

  
   
  }

,

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