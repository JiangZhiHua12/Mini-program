// miniprogram/pages/writerAddress/writerAddress.js
import Notify from '../../miniprogram_npm/@vant/weapp/notify/notify';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show: false,
    checked:'false',
    position:"省、市、区",
  
    areaList:{
      province_list: {
        110000: '北京市',
        120000: '天津市',
        130000:'河北省',
        140000:'山西省',
        150000:'内蒙古自治区'   ,     
       
        430000:"湖南省"


      },
      city_list: {
        110100: '北京市',
        120100: '天津市',
        130100:'石家庄市',
        130200:'唐山市',
        130300:'秦皇岛市',
        140100:"太原市",
        150100:"呼和浩特市",
        430100:"长沙市"
      },
      county_list: {
        110101: '东城区',
        110102: '西城区',
        430102:' 芙蓉区',
        430103:'天心区',
        430104:'岳麓区',
        430105:'开福区',     
        430111:'雨花区',
        430121:'长沙县',
        430122:'望城县',
        430124:'宁乡县'
        // ....
      },
    }
  },
  clickEvent(e){
console.log(e)
this.setData({ show: true });
  },
cancel(){
  this.setData({ show: false });
},

  onClose() {
    this.setData({ show: false });
  },
  confirm(e){
     console.log(e)
     var name_one=e.detail.values[0].name
     var name_tow=e.detail.values[1].name
     var name_three=e.detail.values[2].name
     this.setData({
       position:`${name_one}  ${name_tow}  ${name_three}`
     })
     this.setData({ show: false });
  },
  onChange({ detail }){
    console.log(detail)
    this.setData({
      checked:detail
    })
  },
  blur_username(e){
    console.log(e)
    this.setData({
      username:e.detail.value
    })
  },
  blur_number(e){
    console.log(e)
    this.setData({
      number:e.detail.value
    })
  },
  blur_position(e){
    console.log(e)
    this.setData({
      position:e.detail.value
    })
  },
  blur_message(e){
    console.log(e)
    this.setData({
      message:e.detail.value
    })
  },
  saveInfo(e){
       console.log(e)
     var username=e.currentTarget.dataset.username
     var number=e.currentTarget.dataset.number
     
     var position=e.currentTarget.dataset.position
     var message=e.currentTarget.dataset.message
     var ischecked=e.currentTarget.dataset.checked
     if(!username){
      Notify({ type: 'warning', message: '用户名不能为空' });
     }else if(!number){
      Notify({ type: 'warning', message: '手机号不能为空' });
     }else if(position=="省、市、区"){
      Notify({ type: 'warning', message: '所在地区不能为空' });
     }
     else if(!message){
      Notify({ type: 'warning', message: '详细地址不能为空' });
     }
     else{
         var Info=wx.getStorageSync('ReceiptInfo')||[]
         var obj={
           username:username,
           number:number,
           position:position,
           message:message,
           ischecked:ischecked
        }
           if(obj.ischecked==true){
             Info.forEach(item=>{
                  item.ischecked=false
             })
             Info.unshift(obj)
             wx.setStorageSync('ReceiptInfo', Info)
 
           }
           else{
            Info.push(obj)
            wx.setStorageSync('ReceiptInfo', Info)
           }
        
        console.log(wx.getStorageSync('ReceiptInfo')||[])
     }
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