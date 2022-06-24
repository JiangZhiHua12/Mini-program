// miniprogram/pages/shopcar/shopcar.js
import Dialog from '../../miniprogram_npm/@vant/weapp/dialog/dialog';
import Notify from '../../miniprogram_npm/@vant/weapp/notify/notify';
Page({

  /**
   * 页面的初始数
   */
  data: {
    shopList:[],
     catList:[],
     index:null,
     total:0,
     checked:true
  },
  addclickEvent(e){
    console.log(e)
    var index=e.currentTarget.dataset.id
    var ShopCar=wx.getStorageSync('shopCar')
    ShopCar[index].num++
    wx.setStorageSync('shopCar',ShopCar)||[]
    //console.log(ShopCar
    this.num=ShopCar[index].num
    //console.log(this.num)
      if(e.currentTarget.dataset.ischecked==true){
                
        var data=wx.getStorageSync('shopCar').filter((item,index)=>{
          return  item.ischecked==true
  })
  console.log(data)
  var total=null
 
  data.forEach((item,index)=>{
         total+=item.goods_price*item.num
         
  })
  this.setData({
    total:total*100
  })
      }
    this.setData({
      shopList:ShopCar,
    })},

   declickEvent(e){
       console.log(e)
       var index=e.currentTarget.dataset.id
        var ShopCar=wx.getStorageSync('shopCar')||[]
        if(ShopCar[index].num>1){
          ShopCar[index].num--
        }
      
        wx.setStorageSync('shopCar',ShopCar)
        this.num=ShopCar[index].num
       // console.log(wx.getStorageSync('shopCar')||[])
            if(e.currentTarget.dataset.ischecked==true){
              console.log('haha')
              var data=wx.getStorageSync('shopCar').filter((item,index)=>{
                return  item.ischecked==true
        })
        console.log(data)
        var total=null
       
        data.forEach((item,index)=>{
               total+=item.goods_price*item.num
               
        })
        this.setData({
          total:total*100
        })
            }
        this.setData({
          shopList:ShopCar,
        })
   },

   checkboxChange(e){
     console.log(e)
              if(e.detail.value.length>0){
                
                var index=e.currentTarget.dataset.id
                console.log(index)
                var ShopCar=wx.getStorageSync('shopCar')||[]            
                ShopCar[index].ischecked=true
                wx.setStorageSync('shopCar', ShopCar)
                console.log(wx.getStorageSync('shopCar')||[])
                 //过滤缓存数组中没有被选中的
                 var data=wx.getStorageSync('shopCar').filter((item,index)=>{
                         return  item.ischecked==true
                 })
                 console.log(data)
                  if(data.length==wx.getStorageSync('shopCar').length){
                    this.setData({
                      ched:"checked"
                    })
                  }
                 var total=null
                 data.forEach((item,index)=>{
                        total+=item.goods_price*item.num
                        
                 })
             
              }
               else{
                 console.log('haha')
                
                var index=e.currentTarget.dataset.id
                var ShopCar=wx.getStorageSync('shopCar')||[]
                ShopCar[index].ischecked=false
                wx.setStorageSync('shopCar', ShopCar)
                console.log(wx.getStorageSync('shopCar'))
                //console.log(wx.getStorageSync('shopCar')||[]
                 //过滤缓存数组中没有被选中的
                 var data=wx.getStorageSync('shopCar').filter((item,index)=>{
                         return  item.ischecked==true
                 })
                 console.log(data)
                 var total=null
                 data.forEach((item,index)=>{
                        total+=item.goods_price*item.num
                        
                 })
                 this.setData({
                  ched:''
                 })
          
               }
               this.setData({
                total:total*100,
                shopList:ShopCar
              })
                     
   },
   isallChecked(e){
     console.log(e)
         if(e.detail.value.length>0){
          var ShopCar=wx.getStorageSync('shopCar')||[]
          ShopCar.forEach(item=>{
            item.ischecked=true
          })
          wx.setStorageSync('shopCar', ShopCar)
            
             var total=null
                 ShopCar.forEach((item,index)=>{
                        total+=item.goods_price*item.num 
                 })
          this.setData({
            isallChecked:"checked",
            total:total*100
           })
         }
       else{
        var shopCar=wx.getStorageSync('shopCar')||[]
        shopCar.forEach(item=>{
          item.ischecked=false
        })
        wx.setStorageSync('shopCar', shopCar)
        this.setData({
          isallChecked:"",
          total:0
         })
       }
   },
   onClose(event) {
     //console.log(event)
     this.setData({
       id:event.currentTarget.dataset.id
     })
    const { position, instance } = event.detail;
    switch (position) {
      case 'left':
      case 'cell':
        instance.close();
        break;
      case 'right':
        Dialog.confirm({
          message: '确定删除吗？',
        }).then(() => {
          instance.close();
        });
        break;
    }
  },

 
  Confirm(e){
    console.log(e)
    wx.showLoading({
      title: '加载中'
    },2000)
  
      var index=e.currentTarget.dataset.id
      var ShopCar=wx.getStorageSync('shopCar')||[]
      ShopCar.splice(index,1);
      //console.log(ShopCar)
      wx.setStorageSync('shopCar', ShopCar)
      console.log(wx.getStorageSync('shopCar')||[])
      wx.hideLoading({
        
      })
      this.setData({
        shopList:ShopCar
      })
  },
  onClickButton(e){
  console.log(e)
      if(e.currentTarget.dataset.totalprice==0){
        Notify({ type: 'warning', message: '您还没有选择商品！！' });
      }else{
        wx.navigateTo({
          url: '../pay/pay',
        })
      }
  },
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中'
    },2000)
 
           var shopCar=wx.getStorageSync('shopCar')||[]
              shopCar.forEach(item=>{
                item.ischecked=false
              })
              wx.setStorageSync('shopCar', shopCar)
           this.shopList=shopCar
           this.setData({
               shopList:shopCar,
              num:shopCar.num
           })
           this.shopList=shopCar
           console.log(this.shopList)
           wx.hideLoading({
        
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