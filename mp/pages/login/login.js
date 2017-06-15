// pages/login/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

    disabled: true,
    email: null,
    password: null
  
  },

  /**
   * 绑定用户输入邮箱
   */
  bindEmailInput(event){
    this.setData({
      email : event.detail.value  
    })
    this.setDisabled();
  },

  /**
  * 绑定用户输入密码
  */
  bindPasswordInput(event) {
    this.setData({
      password: event.detail.value 
    })
    this.setDisabled();
  },
  

  /**
  * 验证邮箱和密码是否输入
  */
  setDisabled() {
    this.setData({
      disabled: (this.data.email && this.data.password) ? false : true
    })
  },

  /**
   * 登录验证
   */
  login(callback){

    wx.request({

      url: 'http://localhost:8000/api/login', 
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        email: this.data.email,
        password: this.data.password
      },
      success: function (res) {
        if(res.data.token){
          wx.setStorageSync('token', res.data.token); // 登录成功缓存 token
          wx.showToast({
            title: '登录成功',
            icon: 'success'
          });
          wx.switchTab({
            url: '/pages/index/index',
          })
        } else {
          wx.showToast({
            title: '用户名或密码错误',
            icon: 'loading'
          })
        }
      }  
    })

  }
})