const baseUrl = 'http://aftersale.divergentcloud.com'

export default function (url, options) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: baseUrl + url,
      header: { Authorization: 'Bearer '.concat(wx.getStorageSync('token')) },
      ...options,
      success: (res) => {
        if (res.data.code === 0) {
          resolve(res.data.data)
        } else {
          console.log(res.data.msg)
        }
      },
      fail: (err) => {
        console.log(err.errMsg)
      }
    })
  })
}
