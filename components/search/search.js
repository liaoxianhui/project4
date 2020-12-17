// components/search/search.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    username: {
      type: String
    },
    userimg: {
      type: String
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    show: false,
    checked: false,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    catalogtap() {
      this.setData({ show: true, })
    },
    onClose() {
      this.setData({ show: false });
    },
    onChange({ detail }) {
      // 需要手动对 checked 状态进行更新
      this.setData({ checked: detail });
    },
    clicksign() {
      wx.navigateTo({
        url: `/pages/signup/signup`
      })
    },
    searchfocus() {
      wx.navigateTo({
        url: `/pages/search/search`
      })
    },
    clickexit() {
      wx.clearStorageSync("loginid")
      wx.redirectTo({
        url: `/pages/signup/signup`
      })
      // this.triggerEvent("clearid")
    },
  }
})
