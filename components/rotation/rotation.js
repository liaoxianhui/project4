import api from '../../http/api'
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    arr: {
      type: Array
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    indicatorDots: true,
    vertical: false,
    autoplay: true,
    interval: 2000,
    duration: 500
  },

  /**
   * 组件的方法列表
   */
  methods: {
    tapplay(e) {
      let id = e.currentTarget.dataset.item.encodeId
      let arrid = []
      for (const key of this.data.arr) {
        if (key.encodeId !== '0') {
          arrid.push(key.encodeId)
        }
      }
      // console.log(arrid)
      // console.log(id)
      if (id === '0') {
        wx.showToast({
          title: `不能播放！`,
          icon: 'none',
        })
      } else {
        wx.navigateTo({
          url: `/pages/play/play?id=${id}&ids=${arrid}`
        })
      }
    },
  }
})
