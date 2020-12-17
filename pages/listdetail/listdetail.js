import api from "../../http/api"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: null,
    arr: [],
    arrsong: [],
    arrsongdetail: [],
  },
  clickplaysong(e) {
    let id = e.currentTarget.dataset.item.id
    let ids = []
    for (const iterator of this.data.arrsongdetail) {
      ids.push(iterator.id)
    }
    wx.navigateTo({
      url: `/pages/play/play?id=${id}&ids=${ids}`
    })
  },
  getsongdetail() {
    this.data.arr.trackIds.map(item => {
      this.data.arrsong.push(item.id)
      this.setData({
        arrsong: this.data.arrsong
      })
    })
    // 歌曲详情
    api.songDetail(this.data.arrsong).then(res => {
      console.log(res.songs)
      this.setData({
        arrsongdetail: res.songs
      })
      wx.hideLoading()
    }).catch(err => {
      console.log(err)
    })
  },
  getData() {
    // 歌单详情
    wx.showLoading({
      title: `加载中`
    })
    api.playlistDetail(this.data.id).then(res => {
      console.log(res.playlist)
      let arr = res.playlist
      this.setData({
        arr: arr
      })
      this.getsongdetail()
    }).catch(err => {
      console.log(err)
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id: options.id
    })
    this.getData()
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