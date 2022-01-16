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
    wx.login({
      success (res) {
        console.log(res, 'login')
        if (res.code) {
          //发起网络请求
          
        } else {
          console.log('登录失败！' + res.errMsg)
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
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    })
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
  },
  getWeartherDataFn () {
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
    
    //  console.log(res, 'ress')
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
