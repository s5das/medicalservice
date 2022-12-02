import { getInfoByPage } from '../../../services/api/customer'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    items: [],
    pagenum: 1,
    maxnum: 1000
  },

  showdetail(e) {
    const kfLink = e.currentTarget.dataset.kflink
    wx.openCustomerServiceChat({
      extInfo: { url: kfLink },
      corpId: 'ww562acecf4b6b8caf'
    })
  },

  onReachBottom() {
    if (this.data.pagenum <= this.data.maxnum) {
      this.getdata()
    }
  },
  getdata() {
    getInfoByPage(true, this.data.pagenum).then((res) => {
      console.log(res)
      const items = this.data.items.concat(res.history_list)
      const maxnum = Math.ceil(res.total_num / 10)
      const pagenum = this.data.pagenum + 1
      this.setData({
        items,
        maxnum,
        pagenum
      })
    })
  },
  onLoad() {
    this.getdata()
  },
  onPullDownRefresh: function () {
    this.setData({
      items: [],
      pagenum: 1,
      maxnum: 1000
    })
    this.getdata()
    wx.stopPullDownRefresh()
  }
})
