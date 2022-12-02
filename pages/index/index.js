import { getInfoByPage, getLink } from '../../services/api/customer'
let startPoint
Page({
  data: {
    items: [],
    //  按钮位置参数
    buttonTop: 0,
    buttonLeft: 0,
    windowHeight: '',
    windowWidth: ''
  },

  connect() {
    let kflink
    getLink(-1).then((res) => {
      kflink = res.kf_link
      console.log(kflink)
      wx.openCustomerServiceChat({
        extInfo: { url: kflink },
        corpId: 'ww562acecf4b6b8caf',
        fail(err) {
          console.log(err)
        }
      })
    })
  },

  onShow() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        active: 0
      })
    }
  },

  showdetail(e) {
    const kfLink = e.currentTarget.dataset.kflink
    wx.openCustomerServiceChat({
      extInfo: { url: kfLink },
      corpId: 'ww562acecf4b6b8caf'
    })
  },
  moreInfo() {
    wx.navigateTo({
      url: './detail/detail'
    })
  },
  //  可拖动悬浮按钮点击事件
  btn_Suspension_click: function () {
    //  这里是点击购物车之后将要执行的操作
    wx.showToast({
      title: '点击成功',
      icon: 'success',
      duration: 1000
    })
  },
  //  以下是按钮拖动事件
  buttonStart: function (e) {
    startPoint = e.touches[0] //  获取拖动开始点
  },
  buttonMove: function (e) {
    const endPoint = e.touches[e.touches.length - 1] //  获取拖动结束点
    //  计算在X轴上拖动的距离和在Y轴上拖动的距离
    const translateX = endPoint.clientX - startPoint.clientX
    const translateY = endPoint.clientY - startPoint.clientY
    startPoint = endPoint //  重置开始位置
    let buttonTop = this.data.buttonTop + translateY
    let buttonLeft = this.data.buttonLeft + translateX
    //  判断是移动否超出屏幕
    if (buttonLeft + 50 >= this.data.windowWidth) {
      buttonLeft = this.data.windowWidth - 50
    }
    if (buttonLeft <= 0) {
      buttonLeft = 0
    }
    if (buttonTop <= 0) {
      buttonTop = 0
    }
    if (buttonTop + 50 >= this.data.windowHeight) {
      buttonTop = this.data.windowHeight - 50
    }
    this.setData({
      buttonTop,
      buttonLeft
    })
  },
  onLoad() {
    getInfoByPage(true, 1).then((res) => {
      this.setData({
        items: res.history_list.slice(0, 3)
      })

      var that = this
      wx.getSystemInfo({
        success: function (res) {
          console.log(res)
          // 屏幕宽度、高度
          console.log('height=' + res.windowHeight)
          console.log('width=' + res.windowWidth)
          // 高度,宽度 单位为px
          that.setData({
            windowHeight: res.windowHeight,
            windowWidth: res.windowWidth,
            buttonTop: res.windowHeight * 0.7, // 这里定义按钮的初始位置
            buttonLeft: res.windowWidth * 0.7 //  这里定义按钮的初始位置
          })
        }
      })
    })
  }
})
