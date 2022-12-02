import {
  getAllType,
  getProductByTypeId,
  getLink
} from '../../services/api/customer'

Page({
  data: {
    curentId: -1,
    list_items: [],
    product: []
  },

  onLoad() {
    let curentId = -1
    getAllType().then((res) => {
      if (res.length > 0) {
        curentId = res[0].type_id // 默认选中第一个
      }
      this.setData({
        list_items: res,
        curentId
      })
      this.getProduct()
    })
  },

  onShow() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        active: 1
      })
    }
  },
  getProduct() {
    if (this.data.currentId !== -1) {
      getProductByTypeId(this.data.curentId).then((res) => {
        this.setData({
          product: res
        })
      })
    }
  },
  handleSwitch(e) {
    this.setData({
      curentId: this.data.list_items[e.detail.current].type_id
    })
    this.getProduct()
  },
  getservice(e) {
    const modelId = e.currentTarget.dataset.modelid
    getLink(modelId).then((res) => {
      wx.openCustomerServiceChat({
        extInfo: { url: res.kf_link },
        corpId: 'ww562acecf4b6b8caf',
        fail(res) {
          console.log(res)
        }
      })
    })
  }
})
