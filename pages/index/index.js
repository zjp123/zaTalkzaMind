// index.js
// 获取应用实例
const app = getApp()
const Utils =  require('../../utils/util') 
const fetchFn = new Utils.HTTP()
Page({
  data: {
    userInfo: wx.getStorageSync('userInfo') || {},
    hasUserInfo: false,
    banya: false,
    sanzi: true,
    circular: true,
    liubian: true,
    hexian: true,
    indicatorDots: true,
    vertical: false,
    autoplay: true,
    interval: 2000,
    duration: 500,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    canIUseGetUserProfile: false,
    images: [
      '../../images/1.jpeg',
      '../../images/2.jpeg',
      '../../images/3.jpeg',
      '../../images/4.jpeg',
      '../../images/5.jpeg',
    ],
    weatherData: {
      
    },
    canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl') && wx.canIUse('open-data.type.userNickName') // 如需尝试获取用户信息可改为false
  },
  // 事件处理函数
  bindViewTap() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  goToMap() {
    wx.navigateTo({
      url: '../map/map'
    })
  },
  onLoad() {
    console.log(this.userInfo, 'userInfo')
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    }
  },
  getOpenId () {
    const that = this
    wx.login({
      async success (res) {
        console.log(res, 'login')
        const code = res.code
        if (res.code) {
          //发起网络请求
          console.log(code, 'code')
          const result = await fetchFn.request({ 
            // url: 'http://0.0.0.0:8080/api/string',
            url: 'https://www.zjpzjp.com/api/login',
            method: 'post',
            data: {
              // code: res.code,
              code: code,
              userInfo: wx.getStorageSync('userInfo') || {}
            }
           })
           if (result.data.result.openid) {
              wx.showToast({
                title: '登陆成功',
                icon: 'success',
                duration: 1500
              })
           } else {
              wx.showToast({
                title: '登陆失败',
                icon: 'error',
                duration: 1500
              })
           }
           
          
           console.log('登陆信息', result)
           wx.setStorageSync('openid', result.data.result.openid)
          //  wx.setStorageSync('session_key', result.data.result.session_key)
           wx.setStorageSync('token', result.data.result.token)
           const res = await fetchFn.request({ 
            url: 'https://apis.juhe.cn/simpleWeather/query', 
            data: {
              city: '阜阳',
              key: '2d323f647f8807681253ae2983d35efb'
            }
           })
           
           that.setData({
             weatherData: res
           })

        } else {
          console.log('code获取失败' + res.errMsg)
        }
      }
    })
  },
  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res)
        wx.setStorageSync('userInfo', res.userInfo)
        wx.setStorageSync('loginParam', {
          cloudID: res.cloudID || '',
          encryptedData: res.encryptedData || '',
          iv: res.iv || '',
          signature: res.signature || '',
        })
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
        // 授权之后去登陆
        this.getOpenId()
      }
    })
  },
  async getWeartherDataFn () {
    console.log(wx.getStorageSync('token'), 'token')
    if (!wx.getStorageSync('token')) {
      wx.showModal({
        title: '提示',
        content: '此功能需要获取您的授权才可使用',
        confirmText: '去授权',
        success: (res) => {
          if (res.confirm) {
            console.log('用户点击确定')
            this.getUserProfile()
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
      return
    }
    const res = await fetchFn.request({ 
      url: 'https://apis.juhe.cn/simpleWeather/query', 
      data: {
        city: '阜阳',
        key: '2d323f647f8807681253ae2983d35efb'
      }
     })
     
     this.setData({
       weatherData: res
     })
    /*
    wx.getSetting({
      success: async (res) => {
        console.log(res.authSetting, 'getSetting')
        // res.authSetting = {
        //   "scope.userInfo": true,
        //   "scope.userLocation": true
        // }
        if (res.authSetting['scope.userInfo']) {
          const res = await fetchFn.request({ 
            url: 'http://apis.juhe.cn/simpleWeather/query', 
            data: {
              city: '阜阳',
              key: '2d323f647f8807681253ae2983d35efb'
            }
           })
           this.setData({
             weatherData: res
           })
        }
      },
      fail (res) {
        console.log(res, '没有授权')
        wx.showModal({
          title: '提示',
          content: '此功能需要获取您的授权才可使用',
          confirmText: '去授权',
          success (res) {
            if (res.confirm) {
              console.log('用户点击确定')
              this.getUserProfile()
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })
      }   
    })
    */
    //  console.log(res, 'ress')
  },
  showBanya () {
    this.setData({
      banya: !this.data.banya
    })
  },
  showSanzi () {
    this.setData({
      sanzi: !this.data.sanzi
    })
  },
  showLiubian () {
    this.setData({
      liubian: !this.data.liubian
    })
  },
  showHexian () {
    this.setData({
      hexian: !this.data.hexian
    })
  }
  // getUserInfo(e) {
  //   // 不推荐使用getUserInfo获取用户信息，预计自2021年4月13日起，getUserInfo将不再弹出弹窗，并直接返回匿名的用户个人信息
  //   console.log(e)
  //   this.setData({
  //     userInfo: e.detail.userInfo,
  //     hasUserInfo: true
  //   })
  // }
})
