// components/rankinglist/rankinglist.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    arr: {
      type: Array
    },
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    clicksongdetail(e) {
      console.log(e)
      // let id = e.currentTarget.dataset.item.id
      // wx.navigateTo({
      //   url: `/pages/play/play?id=${id}`
      // })
    },
  }
})
