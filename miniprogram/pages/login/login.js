// miniprogram/pages/login/login.js
import Notify from '../../miniprogram_npm/@vant/weapp/notify/notify';

const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
    registered(){
        
        
           wx.redirectTo({
             url: '../registered/registered',
           })
    },
blur_username(e){
   console.log(e)
   this.setData({
      username:e.detail.value
   })
},
blur_password(e){
  console.log(e)
  this.setData({
    password:e.detail.value
 })
},
clickEvent(e){
  console.log(e)
      


     var name=e.currentTarget.dataset.username
     var pass=e.currentTarget.dataset.password
  var userObj=wx.getStorageSync('userArr')||[]
  console.log(userObj)
  if(name==undefined || name=="" ){
  
    this.setData({
      message_username:"用户名不能为空",
      message_password:""
    }) 
    console.log('123sds')
  }else if(pass==undefined || pass=="" ){
    this.setData({
      message_username:"",
      message_password:"密码不能为空"
    })
  }
  else{
    this.setData({
      message_username:"",
      message_password:""
    })
    var Obj=userObj.filter(item=>{
      return  item.username==name && item.password==pass
}) 
if(Obj.length==0){
  Notify({ type: 'danger', message: '用户名或密码错误！！' });
  } else{
   
      wx.request({
        url: `api/public/v1/users/wxlogin?rawData=${Obj[0].username}&&encryptedData=${Obj[0].username}&&iv=${Obj[0].username}&&signature=${Obj[0].username}&&code=${Obj[0].username}`,
        success:res=>{
          console.log(res)
        }
      })

    console.log(Obj[0].username)
    getApp().globalData.showDialog = Obj[0].username;
      wx.login({
        timeout: 1000,
        success:res=>{
          console.log(res.code )
              this.setData({
                code:res.code
              })
        }
      })
     wx.switchTab({
       url: '../shop/shop',
     })

    console.log('ahah11')
  }
  }
   
},


clear_name(){
  this.setData({
    username:""
  })
},
clear_pass(){
  this.setData({
    password:""
  })
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      console.log(options)
      if(options.query=="ok"){
        Notify({ type: 'success', message: '退出成功！！' });
      }
      var message=options.message
      if(message!=undefined){
        Notify({ type: 'success', message: '注册成功！！' });
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