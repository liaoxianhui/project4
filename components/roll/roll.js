// components/roll/roll.js
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

  },

  /**
   * 组件的方法列表
   */
  methods: {
    clickrecommend(e) {
      let index = e.currentTarget.dataset.index
      if (index === 2) {
        wx.navigateTo({
          url: `/pages/recommendmore/recommendmore`
        })
      }
    },
  }
})
