import api from "../../http/api"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    arr: [],
    arrsuggest: [],
    arrhistory: [],
    num: 10,
    flag: false,
    value: '',
    inputvalue: '',
    inputdefault: '',
  },
  inputfocus(e) {
    let value = e.detail.value
    if (value !== "") {
      this.setData({
        value: value,
        flag: true,
      })
      this.getsuggest()
    }
  },
  clicksuggest(e) {
    // console.log(e)
    this.setData({
      value: e.currentTarget.dataset.item.keyword
    })
    wx.redirectTo({
      url: `/pages/searchresult/searchresult?value=${this.data.value}`
    })
    this.getsearch()
  },
  clickhistory(e) {
    console.log(e)
    this.setData({
      value: e.currentTarget.dataset.item
    })
    // this.getsuggest()
    wx.redirectTo({
      url: `/pages/searchresult/searchresult?value=${this.data.value}`
    })
    this.getsearch()
  },
  clickclear() {
    wx.showModal({
      content: '确定要删除全部搜索记录吗？',
      success: (result) => {
        if (result.confirm) {
          wx.clearStorageSync('searchhistory')
          this.gethistory()
        }
      },
    })

  },
  gethistory() {
    this.setData({
      arrhistory: wx.getStorageSync('searchhistory') || []
    })
  },
  clickdel() {
    this.setData({
      value: '',
      flag: false,
    })
  },
  inputsearch(e) {
    // console.log(e)
    if (e.detail.value !== '') {
      this.setData({
        value: e.detail.value.trim(),
        flag: true,
      })
      this.getsuggest()
    } else {
      this.setData({
        flag: false,
        value:''
      })
    }
  },
  confirmsearch(e) {
    // console.log(e)
    if (this.data.value === '') {
      this.setData({
        value: this.data.inputvalue
      })
    }
    wx.redirectTo({
      url: `/pages/searchresult/searchresult?value=${this.data.value}`
    })
    this.getsearch()
  },
  getsearch() {
    if (this.data.arrhistory.indexOf(this.data.value) === -1) {
      this.data.arrhistory.unshift(this.data.value)
    } else {
      this.data.arrhistory.splice(this.data.arrhistory.indexOf(this.data.value), 1)
      this.data.arrhistory.unshift(this.data.value)
    }
    this.setData({
      arrhistory: this.data.arrhistory
    })
    wx.setStorageSync('searchhistory', this.data.arrhistory)
    this.gethistory()
  },
  clickhotsearch() {
    this.setData({
      num: 20
    })
  },
  clickhotword(e) {
    // console.log(e)
    this.setData({
      value: e.currentTarget.dataset.item.searchWord
    })
    // this.getsuggest()
    wx.redirectTo({
      url: `/pages/searchresult/searchresult?value=${this.data.value}`
    })
    this.getsearch()
  },
  clickback() {
    wx.switchTab({
      url: `/pages/find/find`
    })
  },
  getsuggest() {
    // 搜索建议
    api.suggest(this.data.value).then(res => {
      // console.log(res.result.allMatch)
      this.setData({
        arrsuggest: res.result.allMatch
      })
    }).catch(err => {
      console.log(err)
    })
  },
  getData() {
    // 热搜榜
    api.hotSearch().then(res => {
      // console.log(res.data)
      this.setData({
        arr: res.data
      })
    }).catch(err => {
      console.log(err)
    })
    // 默认搜索历史
    api.srarchHis().then(res => {
      // console.log(res.data)
      this.setData({
        inputdefault: res.data.showKeyword,
        inputvalue: res.data.realkeyword
      })
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
    this.getData()
    this.gethistory()
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