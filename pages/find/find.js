import api from "../../http/api"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: null,
    username: null,
    userimg: null,
    arr: [],
    arr1: [],
    arr2: [],
    arr3: [],
    arr4: [],
    arr5: [],
    arrti: [
      {
        name: "每日推荐",
        images: '/assets/images/recommend.png',
        id: 1
      },
      {
        name: "私人FM",
        images: '/assets/images/private.png',
        id: 2
      },
      {
        name: "歌单",
        images: '/assets/images/songsheet.png',
        id: 3
      },
      {
        name: "排行榜",
        images: '/assets/images/rankinglist.png',
        id: 4
      },
      {
        name: "直播",
        images: '/assets/images/livebroadcast.png',
        id: 5
      },
      {
        name: "数字专辑",
        images: '/assets/images/album.png',
        id: 6
      },
      {
        name: "唱聊",
        images: '/assets/images/songchat.png',
        id: 7
      },
      {
        name: "游戏专区",
        images: '/assets/images/game.png',
        id: 8
      },
    ],
  },
  getDatauser() {
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
  getlocal() {
    this.setData({
      id: wx.getStorageSync('loginid') || null
    })
    console.log(this.data.id)
    this.getDatauser()
  },
  getData() {
    // 轮播图
    api.banner().then(res => {
      // console.log(res)
      this.setData({
        arr: res.banners
      })
    }).catch(err => {
      console.log(err)
    })
    // 推荐
    api.personalized().then(res => {
      // console.log(res.result)
      this.setData({
        arr1: res.result
      })
    }).catch(err => {
      console.log(err)
    })
    // 新歌
    api.newsong().then(res => {
      // console.log(res)
      this.setData({
        arr2: res.result
      })
    }).catch(err => {
      console.log(err)
    })
    // 新碟
    api.album().then(res => {
      // console.log(res)
      this.setData({
        arr3: res.albums
      })
    }).catch(err => {
      console.log(err)
    })
    // 数字专辑
    api.djprogram().then(res => {
      // console.log(res)
      this.setData({
        arr4: res.result
      })
    }).catch(err => {
      console.log(err)
    })
    // "云音乐歌手榜"
    api.toplist().then(res => {
      // console.log(res)
      this.setData({
        // arr3: res.list
      })
    }).catch(err => {
      console.log(err)
    })
    // 榜单内容摘要
    api.abstract().then(res => {
      // console.log(res.list)
      this.setData({
        arr5: res.list
      })
    }).catch(err => {
      console.log(err)
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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