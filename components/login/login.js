// components/login/login.js
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
  },

  /**
   * 组件的方法列表
   */
  methods: {
    signupclick() {
      wx.navigateTo({
        url: `/pages/signup/signup`
      })
    },
  }
})
