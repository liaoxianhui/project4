import api from "../../http/api"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone: "",
    username: "",
    password: "",
    code: null,
  },
  inputphone(e) {
    // console.log(e)
    this.setData({
      phone: e.detail
    })
  },
  inputemail(e) {
    // console.log(e)
    this.setData({
      username: e.detail
    })
  },
  inputpassword(e) {
    // console.log(e)
    this.setData({
      password: e.detail
    })
  },
  clickemail() {
    if (this.data.username !== '' && this.data.password !== '') {
      this.getEmail()
    } else {
      wx.showToast({
        title: '请输入完整！',
        icon: 'none',
      })
    }
  },
  tapphone(e) {
    if (this.data.phone !== '' && this.data.password !== '') {
      this.getDataSign()
    } else {
      wx.showToast({
        title: '请输入完整！',
        icon: 'none',
      })
    }

  },
  onClick(e) {
    // wx.showToast({
    //   title: `点击标签 ${e.detail.name}`,
    //   icon: 'none',
    // });
  },
  getData() {
    // 注册
    // captcha: 验证码
    // phone : 手机号码
    // password: 密码
    // nickname: 昵称
    api.register().then(res => {
      console.log(res)
    }).catch(err => {
      console.log(err)
    })
  },
  getDataSign() {
    // 登录
    api.cellphone(this.data.phone, this.data.password).then(res => {
      console.log(res)
      let id = res.account.id
      if (res.code === 200) {
        wx.switchTab({
          url: `/pages/find/find`
        })
        wx.setStorageSync('loginid', id)
      }
    }).catch(err => {
      console.log(err)
    })
  },
  getEmail() {
    // 登录
    api.email(this.data.username, this.data.password).then(res => {
      console.log(res)
      let id = res.account.id
      if (res.code === 200) {
        wx.switchTab({
          url: `/pages/find/find`
        })
        wx.setStorageSync('loginid', id)
      }
    }).catch(err => {
      console.log(err)
    })
  },
  getStatus() {
    api.status().then(res => {
      console.log(res)
    }).catch(err => {
      console.log(err)
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