// miniprogram/pages/registered/registered.js
import Notify from '../../miniprogram_npm/@vant/weapp/notify/notify';
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
blur_username(e){
           console.log(e)
            console.log(e.detail.value.length)
            if(e.detail.value==""){
              this.setData({
                message_username:'用户名不能为空'
              })
            } else if(e.detail.value.length<2 || e.detail.value.length>5){
              console.log('ccc')
              this.setData({
                message_username:'用户名长度必须在2~5之间'
              })
            } else {
              this.setData({
                message_username:'',
                username:e.detail.value
              })
            }
   },
   blur_password(e){
    console.log(e)
    console.log(e.detail.value.length)
    if(e.detail.value==""){
      this.setData({
        message_password:'密码不能为空'
      })
    } else if(e.detail.value.length<5 || e.detail.value.length>18){
      console.log('ccc')
      this.setData({
        message_password:'密码长度必须在6~18之间'
      })
    } else {
      this.setData({
        message_password:'',
        password:e.detail.value
      })
    }
   },
   clickEvent(e){
   console.log(e)
       if(e.currentTarget.dataset.password=="" && e.currentTarget.dataset.username==""){
            var userArr=wx.getStorageSync('userArr')||[]
            var userObj={username:e.currentTarget.dataset.name,password:e.currentTarget.dataset.pass}
            var index=userArr.findIndex(item=>item.username==e.currentTarget.dataset.name)
            if(index==-1){
                   userArr.push(userObj)
                   wx.setStorageSync('userArr',userArr)
                   wx.redirectTo({
                     url: '../login/login?message=ok',
                   })

            }else{
              Notify({ type: 'danger', message: '用户名已经存在！！' });
            }
            
          
           
       }
   },
   login(){
     wx.redirectTo({
       url: '../login/login',
     })
   },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    wx.hideHomeButton({
      success: function() {
     
      },
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