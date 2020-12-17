import api from "../../http/api"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: null,
    username: null,
    userimg: null,
  },
  getlocal() {
    this.setData({
      id: wx.getStorageSync('loginid') || null
    })
    this.getData()
    console.log(this.data.id)
  },
  getData() {
    // 用户信息
    if (this.data.id != null) {
      api.userdetail(this.data.id).then(res => {
        console.log(res)
        this.setData({
          username: res.profile.nickname,
          userimg: res.profile.avatarUrl
        })
      }).catch(err => {
        console.log(err)
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options)

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function (options) {
    this.getlocal()
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