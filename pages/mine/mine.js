Page({
  data: {},

  onLoad() {},

  logout() {
    wx.navigateTo({
      url: '../login/login'
    })
  },

  onShow() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        active: 2
      })
    }
  }
})
