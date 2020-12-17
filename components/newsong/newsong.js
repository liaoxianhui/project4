// components/newsong/newsong.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    arr: {
      type: Array
    },
    arr1: {
      type: Array
    },
    arr2: {
      type: Array
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    num: 1
  },

  /**
   * 组件的方法列表
   */
  methods: {
    newsongtap1() {
      this.setData({
        num: 1
      })
    },
    newsongtap2() {
      this.setData({
        num: 2
      })
    },
    newsongtap3() {
      this.setData({
        num: 3
      })
    },
    clicksongdetail(e) {
      let id = e.currentTarget.dataset.item.id
      let ids = []
      for (let index = 0; index < this.data.arr.length; index++) {
        ids.push(this.data.arr[index].id)
      }
      wx.navigateTo({
        url: `/pages/play/play?id=${id}&ids=${ids}`
      })
    },
    clicklistdetail(e) {
      let id = e.currentTarget.dataset.item.id
      wx.navigateTo({
        url: `/pages/listdetail/listdetail?id=${id}`
      })
    },
    clickmore() {
      if (this.data.num === 1) {
        wx.navigateTo({
          url: `/pages/songmore/songmore`
        })
      }
    },
  }
})
