import request from '../request'

export const login = (code) => {
  return new Promise((resolve, reject) => {
    wx.request({
      url: `http://aftersale.divergentcloud.com/wizz/aftersale/account/customer/login?code=${code}`,
      method: 'POST',
      success: (res) => {
        if (res.data.code === 0) {
          resolve(res)
        } else {
          console.log(res.data.msg)
          reject(res.data.msg)
        }
      },
      fail: (err) => {
        reject(err)
      },
      header: { 'content-type': 'x-www-form-urlencoded' }
    })
  })
}

export const getLink = (productModelId) => {
  return request(`/wizz/aftersale/consult/getKfLink/${productModelId}`, {
    method: 'GET'
  })
}

export const getInfoByPage = (isFirstQuery, pageNum) => {
  return request(
    `/wizz/aftersale/consult/getHistories/${isFirstQuery}/${pageNum}`
  )
}

export const getAllType = () => {
  return request('/wizz/aftersale/product-type/all')
}

export const getProductByTypeId = (productTypeId) => {
  return request('/wizz/aftersale/product-model/getByTypeId', {
    data: { productTypeId }
  })
}
