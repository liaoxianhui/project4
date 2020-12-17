import api from "../../http/api"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    arr1: [],
    giftNo: ''
  },
  clicklistdetail(e) {
    let id = e.currentTarget.dataset.item.id
    wx.navigateTo({
      url: `/pages/listdetail/listdetail?id=${id}`
    })
  },
  onClick(e) {
    let index = e.detail.index
    console.log(index)
    if (index === 0) {
      this.getRecommend()
    } else if (index === 4) {
      this.getChinese()
    } else if (index === 5) {
      this.getpopular()
    } else if (index === 6) {
      this.getlightMusic()
    } else if (index === 7) {
      this.getRock()
    } else if (index === 8) {
      this.getballad()
    } else if (index === 9) {
      this.getElectronics()
    } else if (index === 1) {
      this.getofficial()
    } else if (index === 3) {
      this.getessence()
    }
  },
  //精品
  getessence() {
    api.essence().then(res => {
      console.log(res.playlists)
      this.setData({
        arr1: res.playlists
      })
    }).catch(err => {
      console.log(err)
    })
  },
  //官方
  getofficial() {
    api.official().then(res => {
      console.log(res.playlists)
      this.setData({
        arr1: res.playlists
      })
    }).catch(err => {
      console.log(err)
    })
  },
  //民谣
  getballad() {
    api.ballad().then(res => {
      console.log(res.playlists)
      this.setData({
        arr1: res.playlists
      })
    }).catch(err => {
      console.log(err)
    })
  },
  //电子
  getElectronics() {
    api.Electronics().then(res => {
      console.log(res.playlists)
      this.setData({
        arr1: res.playlists
      })
    }).catch(err => {
      console.log(err)
    })
  },
  // 摇滚
  getRock() {
    api.Rock().then(res => {
      console.log(res.playlists)
      this.setData({
        arr1: res.playlists
      })
    }).catch(err => {
      console.log(err)
    })
  },
  // 华语
  getChinese() {
    api.Chinese().then(res => {
      console.log(res.playlists)
      this.setData({
        arr1: res.playlists
      })
    }).catch(err => {
      console.log(err)
    })
  },
  // 流行
  getpopular() {
    api.popular().then(res => {
      console.log(res.playlists)
      this.setData({
        arr1: res.playlists
      })
    }).catch(err => {
      console.log(err)
    })
  },
  // 轻音乐
  getlightMusic() {
    api.lightMusic().then(res => {
      console.log(res.playlists)
      this.setData({
        arr1: res.playlists
      })
    }).catch(err => {
      console.log(err)
    })
  },

  // 推荐歌单
  getRecommend() {
    api.personalized().then(res => {
      console.log(res)
      this.setData({
        arr1: res.result
      })
    }).catch(err => {
      console.log(err)
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getRecommend()
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