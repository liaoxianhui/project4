
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // name: '后来',
  },

  // listenerButtonPlay: function () {
  //   var that = this
  //   var name = that.data.name
  //   var src = "http://m8.music.126.net/20201217095855/1adb9e725357494fc4cb7546593cc99e/ymusic/34e8/3965/6880/2775fc3cd464c0b32ffb9ba5ef93951a.mp3"
  //   console.log(src)
  //   bgMusic.title = name;   //必须设置title，否则不会播放
  //   bgMusic.src = src;　　//如果需要页面加载完成自动播放背景音乐，解除注释，背景音乐默认赋值上src后就自动播放
  //   bgMusic.onTimeUpdate(() => { //监听音频播放进度
  //     console.log(bgMusic.currentTime)
  //   })
  //   bgMusic.onEnded(() => { //监听音乐自然播放结束
  //     console.log("音乐播放结束");
  //     that.listenerButtonPlay()    //r如果需要音乐结束后继续循环播放，解除注释
  //   })
  // },
  // 停止播放
  // listenerButtonStop: function () {
  //   bgMusic.stop()
  // },
  //有时我们并不需要自动播放背景音乐，需要手动控制，随便加个点击事件
  // autoMusic: function (e) {
  //   var that = this;
  //   that.setData({
  //     auto: !that.data.auto
  //   });
  //   if (that.data.auto) {
  //     bgMusic.title = that.data.src      //这个地方必须放在判断里，放在外边你会发现你暂停音乐暂停不了
  //     bgMusic.src = that.data.src
  //     bgMusic.play();
  //     console.log("播放")
  //   } else {
  //     bgMusic.pause();
  //     console.log("暂停")
  //   }
  // },
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