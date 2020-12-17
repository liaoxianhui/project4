const { default: api } = require("../../http/api")

// import api from "../../http/api"
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
    id: null
  },

  /**
   * 组件的方法列表
   */
  methods: {
    tapmore() {
      wx.navigateTo({
        url: '/pages/recommendmore/recommendmore',
      })
    },
    clickdetail(e) {
      // console.log(e.currentTarget.dataset.item)
      let id = e.currentTarget.dataset.item.id
      wx.navigateTo({
        url: `/pages/listdetail/listdetail?id=${id}`
      })
    },
  }
})
