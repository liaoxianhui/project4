import api from "../../http/api"
const bgMusic = wx.getBackgroundAudioManager() //创建背景音乐

Page({
  /**
   * 页面的初始数据
   */
  data: {
    action: {
      method: "play"
    },
    bottom: null,
    obj: null,
    id: null,
    ids: [],
    url: '',
    arr: [],
    arr1: [],
    flag: true,
    arr2: [],
    num: 1,
    numplay: 1,
    idd: null,
    margintop: 0,
    marginindex: 0,
    max: 100,
    sliderend: "00:00",
    sliderstart: "00:00",
    move: 0,
    loop: false,
    show: false,
  },
  // 背景音乐
  listenerButtonPlay: function () {
    var that = this
    var name = that.data.arr.name
    var src = that.data.url
    console.log(name + "--------" + src)
    bgMusic.title = name;   //必须设置title，否则不会播放
    bgMusic.src = src;　　//如果需要页面加载完成自动播放背景音乐，解除注释，背景音乐默认赋值上src后就自动播放
    bgMusic.onTimeUpdate(() => { //监听音频播放进度
      let currentTime = bgMusic.currentTime
      let slidertime = bgMusic.duration
      let sliderminute = Math.floor(slidertime / 60)
      let slidersecond = Math.floor(slidertime % 60)
      let currentTimeminute = Math.floor(currentTime / 60)
      let currentTimesecond = Math.floor(currentTime % 60)
      if (sliderminute < 10) {
        sliderminute = '0' + sliderminute
      }
      if (slidersecond < 10) {
        slidersecond = '0' + slidersecond
      }
      if (currentTimeminute < 10) {
        currentTimeminute = '0' + currentTimeminute
      }
      if (currentTimesecond < 10) {
        currentTimesecond = '0' + currentTimesecond
      }
      this.setData({
        sliderend: sliderminute + ':' + slidersecond,
        sliderstart: currentTimeminute + ':' + currentTimesecond,
        max: bgMusic.duration,
        move: bgMusic.currentTime
      })
      let nowtime = bgMusic.currentTime
      let arrtime = this.data.arr1
      if (this.data.marginindex >= 5) {
        this.setData({
          margintop: (this.data.marginindex - 5) * 40
        })
      }
      if (this.data.marginindex === arrtime.length - 2) {
        if (nowtime >= arrtime[arrtime.length - 1][0]) {
          this.setData({
            marginindex: arrtime.length - 1
          })
        }
      } else {
        for (let index = 0; index < arrtime.length; index++) {
          if (index === arrtime.length - 1) {
            if (nowtime >= arrtime[index][0]) {
              this.setData({
                marginindex: index
              })
            }
          } else {
            if (nowtime >= arrtime[index][0] && nowtime < arrtime[index + 1][0]) {
              this.setData({
                marginindex: index
              })
            }
          }
        }
      }
      if (nowtime === 0) {
        this.setData({
          marginindex: 0,
          margintop: 0,
        })
      }
    })
    bgMusic.onEnded(() => { //监听音乐自然播放结束
      console.log("音乐播放结束");
      this.setData({
        bottom:null,
        flag: true
      })
      if (this.data.numplay === 1) {
        that.listenerButtonPlay()    //r如果需要音乐结束后继续循环播放，解除注释
      } else if (this.data.numplay === 2) {
        this.clicknextsong()
      } else {
        this.getrandom()
      }
    })
  },
  // 播放列表里  点击播放
  clickchangesong(e) {
    this.setData({
      flag: true
    })
    let id = e.currentTarget.dataset.item.id
    this.setData({
      id: id,
    })
    this.setData({
      action: {
        method: "paused"
      }
    })
    this.getData()
  },
  // 长按 保存图片
  clicklong() {
    let that = this
    wx.showActionSheet({
      itemList: ['保存到相册'],
      success(res) {
        let url = that.data.arr.al.picUrl;
        wx.getSetting({
          success: (res) => {
            // console.log(res);
            if (!res.authSetting['scope.writePhotosAlbum']) {   // 未授权
              wx.authorize({
                scope: 'scope.writePhotosAlbum',
                success: () => {
                  that.saveImgSuccess(url);
                },
                fail: (res) => {
                  // console.log(res);
                  wx.showModal({
                    title: '保存失败',
                    content: '请开启访问手机相册的权限',
                    success(res) {
                      wx.openSetting()
                    }
                  })
                }
              })
            } else {  // 已授权
              that.saveImgSuccess(url);
            }
          },
          fail: (res) => {
            // console.log(res);
          }
        })
      },
      fail(res) {
        // console.log(res.errMsg)
      }
    })
  },
  // 点击 查看播放列表歌曲
  clicksonglist() {
    let idd = this.data.id
    this.setData({
      idd: idd
    })
    this.setData({
      show: true,
      id: this.data.ids,
      flag: false,
    })
    this.getsongdetail()
    this.setData({
      id: idd
    })
  },
  // 关闭  播放列表
  onClose() {
    this.setData({ show: false });
  },
  // 播放到结尾的事件
  playended() {
    this.setData({
      flag: true
    })
    if (this.data.numplay === 1) {
      this.getData()
    } else if (this.data.numplay === 2) {
      this.clicknextsong()
    } else {
      this.getrandom()
    }
  },
  // 随机播放的事件
  getrandom() {
    while (true) {
      let random = Math.floor(Math.random() * this.data.arr1.length)
      if (random !== this.data.ids.indexOf(this.data.id)) {
        let id = this.data.ids[random]
        this.setData({
          id: id
        })
        break
      }
    }
    this.setData({
      margintop: 0, marginindex: 0,
    })
    this.getData()
  },
  // 点击播放的模式：单曲、循环、随机播放
  clickplay() {
    if (this.data.numplay === 1) {
      this.setData({
        numplay: 2
      })
      wx.showToast({
        title: '循环播放',
        icon: "none"
      })
    } else if (this.data.numplay === 2) {
      this.setData({
        numplay: 3
      })
      wx.showToast({
        title: '随机播放',
        icon: "none"
      })
    } else {
      this.setData({
        numplay: 1
      })
      wx.showToast({
        title: '单曲播放',
        icon: "none"
      })
    }
  },
  // 上一曲
  clickprevsong() {
    this.setData({
      flag: true
    })
    let idcurrent
    for (let index = 0; index < this.data.ids.length; index++) {
      if (this.data.id === this.data.ids[index]) {
        idcurrent = index
      }
    }
    let idprev = idcurrent === 0 ? this.data.ids.length - 1 : idcurrent - 1
    this.data.id = this.data.ids[idprev]
    this.setData({
      id: this.data.id,
      action: {
        method: "paused"
      }
    })
    this.getData()
    this.setData({
      margintop: 0,
      marginindex: 0,
    })
  },
  // 下一曲
  clicknextsong() {
    this.setData({
      flag: true
    })
    let idcurrent
    for (let index = 0; index < this.data.ids.length; index++) {
      if (this.data.id == this.data.ids[index]) {
        idcurrent = index
        break
      }
    }
    let idprev = idcurrent === this.data.ids.length - 1 ? 0 : idcurrent + 1
    this.data.id = this.data.ids[idprev]
    this.setData({
      id: this.data.id,
      action: {
        method: "paused"
      }
    })
    this.getData()
    this.setData({
      margintop: 0,
      marginindex: 0,
    })
  },
  // 拖动进度条后发生的事件
  drag(e) {
    this.setData({
      action: {
        method: "setCurrentTime",
        data: e.detail.value,
      }
    })
    wx.seekBackgroundAudio({
      position: e.detail.value
    })
  },
  // 当播放进度改变时触发
  changetime(e) {
    let currentTime = e.detail.currentTime
    let slidertime = e.detail.duration
    let sliderminute = Math.floor(slidertime / 60)
    let slidersecond = Math.floor(slidertime % 60)
    let currentTimeminute = Math.floor(currentTime / 60)
    let currentTimesecond = Math.floor(currentTime % 60)
    if (sliderminute < 10) {
      sliderminute = '0' + sliderminute
    }
    if (slidersecond < 10) {
      slidersecond = '0' + slidersecond
    }
    if (currentTimeminute < 10) {
      currentTimeminute = '0' + currentTimeminute
    }
    if (currentTimesecond < 10) {
      currentTimesecond = '0' + currentTimesecond
    }
    this.setData({
      sliderend: sliderminute + ':' + slidersecond,
      sliderstart: currentTimeminute + ':' + currentTimesecond,
      max: e.detail.duration,
      move: e.detail.currentTime
    })
    let nowtime = e.detail.currentTime
    let arrtime = this.data.arr1
    if (this.data.marginindex >= 5) {
      if (this.data.bottom != 'bottom') {
        this.setData({
          margintop: (this.data.marginindex - 5) * 40
        })
        console.log(this.data.bottom)
      }
    }
    if (this.data.marginindex === arrtime.length - 2) {
      if (nowtime >= arrtime[arrtime.length - 1][0]) {
        this.setData({
          marginindex: arrtime.length - 1
        })
      }
    } else {
      for (let index = 0; index < arrtime.length; index++) {
        if (index === arrtime.length - 1) {
          if (nowtime >= arrtime[index][0]) {
            this.setData({
              marginindex: index
            })
          }
        } else {
          if (nowtime >= arrtime[index][0] && nowtime < arrtime[index + 1][0]) {
            this.setData({
              marginindex: index
            })
          }
        }
      }
    }
    if (nowtime === 0) {
      this.setData({
        marginindex: 0,
        margintop: 0,
      })
    }
  },
  // 滚动条到底部
  tolower(e) {
    console.log(e)
    this.setData({
      bottom: e.detail.direction
    })
  },
  // 单曲封面、歌词的切换
  tapsongimg() {
    if (this.data.num === 1) {
      this.setData({
        num: 2
      })
    } else {
      this.setData({
        num: 1
      })
    }
  },
  // 播放、暂停的切换
  tapplay() {
    let play = this.data.action.method
    if (play == "play") {
      this.setData({
        action: { method: "pause" }
      })
      bgMusic.pause()
    } else {
      this.setData({
        action: { method: "play" }
      })
      bgMusic.play()
    }
  },
  // 歌曲的音源
  getData() {
    // 歌曲url
    api.songurl(this.data.id).then(res => {
      console.log(res.data[0].url)
      let url = res.data[0].url
      this.setData({
        url: url,
      })
    }).catch(err => {
      console.log(err)
    })
    this.getsongdetail()
  },
  // 歌曲详情
  getsongdetail() {
    api.songDetail(this.data.id).then(res => {
      console.log(res)
      if (this.data.flag === true) {
        let url = res.songs[0]
        this.setData({
          arr: url,
          obj: res.songs,
        })
        this.getlyric()
      } else {
        this.setData({
          arr2: res.songs
        })
      }
      this.listenerButtonPlay()
    }).catch(err => {
      console.log(err)
    })
  },
  // 歌词
  getlyric() {
    if (this.data.obj.length !== 0) {
      api.lyric(this.data.id).then(res => {
        console.log(res)
        let arrlyric = []
        let result = res.lrc.lyric
        let splictlyric = result.split("\n")
        let time = /\[\d{2}\:\d{2}\.\d{2,3}\]/
        splictlyric.forEach(element => {
          let timereplace = element.replace(time, "")
          let timetake = element.match(time)
          if (timetake !== null) {
            let second = timetake[0].slice(1, -1)
            let colon = second.split(":")
            let finaltime = parseFloat(colon[0]) * 60 + parseFloat(colon[1])
            arrlyric.push([finaltime, timereplace])
          }
        });
        let lyric = []
        arrlyric.map(item => {
          if (item[1] !== "") {
            lyric.push(item)
          }
        })
        this.setData({
          arr1: lyric,
          action: {
            method: "play"
          }
        })
      }).catch(err => {
        console.log(err)
      })
    } else {
      wx.showModal({
        content: '没有找到音源，不能播放，是否返回？',
        success: (result) => {
          if (result.confirm) {
            wx.navigateBack({
              delta: 1,
            })
          } else {
            console.log('已取消！')
          }
        },
      })
    }
  },
  /**
  * 生命周期函数--监听页面加载
  */
  onLoad: function (options) {
    let id = options.id
    let ids = options.ids.split(',')
    this.setData({
      id: id,
      ids: ids,
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