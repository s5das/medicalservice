// import { login } from './utils/api/customer'
App({
  globalData: {},

  onLaunch() {
    // wx.login({
    //   async success(res) {
    //     if (res.code) {
    //       //  发起网络请求
    //       let logininfo
    //       try {
    //         logininfo = await login(res.code)
    //       } catch (err) {
    //         console.log(err)
    //       }

    //       console.log(logininfo)
    //     } else {
    //       console.log('登录失败！' + res.errMsg)
    //     }
    //   }
    // })
    wx.setStorageSync(
      'token',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjciLCJleHAiOjE2NzA3MTA0MDQsImlhdCI6MTY2OTk1OTQyM30.qtyk9H8KgaGccRZTZrEjFkwOTUHUaUIlPqglYVi2QMo'
    )
  }
})
