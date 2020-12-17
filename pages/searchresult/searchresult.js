import api from "../../http/api"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputdefault: '',
    inputvalue: '',
    value: '',
    type: 1018,
    active: 0,
    limit: 30,
    arr: [],
    arr1: [],
    arrhistory: [],
    flag: 0,
  },
  clickvideo(e) {
    console.log(e)
    let vid = e.currentTarget.dataset.item.vid
    wx.navigateTo({
      url: `/pages/video/video?id=${vid}`
    })
  },
  clicklistdetail(e) {
    let id = e.currentTarget.dataset.item.id
    wx.navigateTo({
      url: `/pages/listdetail/listdetail?id=${id}`
    })
  },
  clicksingle() {
    this.setData({
      type: 1,
      active: 1,
    })
    this.getData()
  },
  clicksingle1() {
    this.setData({
      type: 1000,
      active: 2,
    })
    this.getData()
  },
  clicksingle2() {
    this.setData({
      type: 1014,
      active: 3,
    })
    this.getData()
  },
  clicksingle3() {
    this.setData({
      type: 10,
      active: 8,
    })
    this.getData()
  },
  clicksingle4() {
    this.setData({
      type: 100,
      active: 7,
    })
    this.getData()
  },
  clicksingle5() {
    this.setData({
      type: 1002,
      active: 9,
    })
    this.getData()
  },
  searchkeyword(e) {
    console.log(e.currentTarget.dataset.item.keyword)
    let value = e.currentTarget.dataset.item.keyword
    this.setData({
      flag: 0,
      value: value,
    })
    this.getData()
  },
  inputblur() {
    // if (this.data.flag === 2) {
    //   this.setData({
    //     flag: 0
    //   })
    // }
  },
  inputfocus(e) {
    // console.log(e)
    if (this.data.value !== '') {
      this.setData({
        flag: 2,
      })
      this.getsuggest()
    }
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
  confirmsearch(e) {
    let value = e.detail.value
    if (value === '') {
      this.setData({
        value: this.data.inputvalue,
        flag: 0,
      })
    } else {
      this.setData({
        value: value,
        flag: 0,
      })
    }
    this.getData()
    this.getsearch()
  },
  inputsearch(e) {
    // console.log(e)
    let value = e.detail.value
    if (value !== '') {
      this.setData({
        value: value,
        flag: 2,
      })
      this.getsuggest()
    } else {
      this.setData({
        value: value,
        flag: 0
      })
    }
  },
  getsuggest() {
    api.suggest(this.data.value).then(res => {
      // console.log(res.result.allMatch)
      this.setData({
        arr: res.result.allMatch
      })
    }).catch(err => {
      console.log(err)
    })
  },
  getData() {
    wx.showLoading({
      title: '搜索中',
    })
    // 搜索
    api.search(this.data.value, this.data.type, this.data.limit).then(res => {
      console.log(res.result)
      this.setData({
        arr1: res.result
      })
      wx.hideLoading()
      //隐藏导航条加载动画
      wx.hideNavigationBarLoading();
      //停止下拉刷新
      wx.stopPullDownRefresh();
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
    console.log(options)
    this.setData({
      value: options.value
    })
    this.getData()
    this.gethistory()
  },
  // 方法
  onClick(e) {
    //  1: 单曲, 10: 专辑, 100: 歌手, 1000: 歌单, 1002: 用户, 1004: MV, 1006: 歌词, 1009: 电台, 1014: 视频, 1018:综合
    let title = e.detail.title
    console.log(e)
    if (title === "单曲") {
      this.setData({
        type: 1,
        active: e.detail.index,
      })
    } else if (title === "专辑") {
      this.setData({
        type: 10,
        active: e.detail.index,
      })
    } else if (title === "歌手") {
      this.setData({
        type: 100,
        active: e.detail.index,
      })
    } else if (title === "歌单") {
      this.setData({
        type: 1000,
        active: e.detail.index,
      })
    } else if (title === "用户") {
      this.setData({
        type: 1002,
        active: e.detail.index,
      })
    } else if (title === "视频") {
      this.setData({
        type: 1014,
        active: e.detail.index,
      })
    } else if (title === "综合") {
      this.setData({
        type: 1018,
        active: e.detail.index,
      })
    }
    this.getData()
  },
  clicksong(e) {
    console.log(e)
    let id = e.currentTarget.dataset.item.id
    let ids = []
    for (const iterator of this.data.arr1.songs) {
      ids.push(iterator.id)
    }
    wx.navigateTo({
      url: `/pages/play/play?id=${id}&ids=${ids}`
    })
  },
  clicksong1(e) {
    console.log(e)
    let id = e.currentTarget.dataset.item.id
    let ids = []
    for (const iterator of this.data.arr1.song.songs) {
      ids.push(iterator.id)
    }
    wx.navigateTo({
      url: `/pages/play/play?id=${id}&ids=${ids}`
    })
  },
  clickdel() {
    this.setData({
      value: ''
    })
  },
  clickback() {
    wx.redirectTo({
      url: `/pages/search/search`
    })
  },
  gethistory() {
    this.setData({
      arrhistory: wx.getStorageSync('searchhistory') || []
    })
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
    wx.showNavigationBarLoading()
    wx.showLoading({
      title: '刷新中...',
    })
    this.getData();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if (this.data.active !== 0) {
      this.setData({
        limit: this.data.limit + 1
      })
      wx.showLoading({
        title: '加载中',
      })
      api.search(this.data.value, this.data.type, this.data.limit).then(res => {
        if (res.code === 200) {
          if (this.data.active === 1) {
            this.data.arr1.songs = this.data.arr1.songs.concat(res.result.songs)
            this.setData({
              arr1: this.data.arr1
            })
            console.log(this.data.arr1)
          } else if (this.data.active === 2) {
            this.data.arr1.playlists = this.data.arr1.playlists.concat(res.result.playlists)
            this.setData({
              arr1: this.data.arr1
            })
            console.log(this.data.arr1)
          } else if (this.data.active === 3) {
            this.data.arr1.videos = this.data.arr1.videos.concat(res.result.videos)
            this.setData({
              arr1: this.data.arr1
            })
            console.log(this.data.arr1)
          } else if (this.data.active === 7) {
            this.data.arr1.videos = this.data.arr1.videos.concat(res.result.videos)
            this.setData({
              arr1: this.data.arr1
            })
            console.log(this.data.arr1)
          } else if (this.data.active === 8) {
            this.data.arr1.videos = this.data.arr1.videos.concat(res.result.videos)
            this.setData({
              arr1: this.data.arr1
            })
            console.log(this.data.arr1)
          } else if (this.data.active === 9) {
            this.data.arr1.videos = this.data.arr1.videos.concat(res.result.videos)
            this.setData({
              arr1: this.data.arr1
            })
            console.log(this.data.arr1)
          }
        }
        wx.hideLoading({})
      }).catch(err => {
        console.log(err)
        wx.hideLoading({})
      })
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})