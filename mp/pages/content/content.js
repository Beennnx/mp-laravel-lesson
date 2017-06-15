// pages/content/content.js
const WxParse = require('../../wxParse/wxParse.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {

    currentId: null,
    token:null,
    lesson:[]
  
  },

  onLoad(options) {

    this.setData({
      currentId: options.id
    })

    let isFree = true ? options.is_free == "true" : false; // 字符串转 bool
    let token = wx.getStorageSync('token') ?  wx.getStorageSync('token') : '';
    if (!isFree && !token){
      wx.showModal({
        title: '收费课程',
        content: '请先进行登录',
        success: function (res) {
          if (res.confirm) {
            wx.redirectTo({
              url: '../login/login',
            })
          } else if (res.cancel) {
            wx.switchTab({
              url: '/pages/index/index',
            })
          }
        }
      })
    } else {
      this.setData({
        token: token
      })
      this.setLessonsDetail();
    }

 
  },

  /**
   * 获取课程详情
   */
  getLessonDetail(callback) {
    wx.request({
      url: 'http://localhost:8000/api/lessons/' + this.data.currentId + '?token=' + this.data.token,
      success(res) {
        if(res.data){
          callback(res.data);
        } else {
          wx.showModal({
            title: '身份验证失败',
            content: '是否重新登录',
            success: function (res) {
              if (res.confirm) {
                wx.redirectTo({
                  url: '/pages/login/login',
                })
              } else if (res.cancel) {
                wx.switchTab({
                  url: '/pages/index/index',
                })           
              }
            }
          })
        }     
      }
    })
  },

  /**
   * 设置课程详情
   */
  setLessonsDetail(){

    this.getLessonDetail((lesson)=>{
      lesson.data.content = WxParse.wxParse('content', 'md', lesson.data.content, this);
      this.setData({
        lesson: lesson.data,      
      })
    });
   
  }
 
})