const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return `${[year, month, day].map(formatNumber).join('/')} ${[hour, minute, second].map(formatNumber).join(':')}`
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : `0${n}`
}

import {base_url} from "../config.js";
 
class HTTP{
  request({ url, data = null, header = {}, method = "GET", success = () => { }, fail = () => { } }){
    return new Promise((resolve,reject)=>{
      this._request(url, data, header, method, resolve, reject);
    })
  }
  _request(url, data, header, method, resolve, reject){
    wx.request({
      url: base_url + url,
      data: data,
      header: {...header, 'Authorization': 'Bearer ' + (wx.getStorageSync('token') || '')},
      method: method,
      success: (res) => {
        let data = res.data;
        if ((data.code === 200) || data.error_code === 0) {
          resolve(data || data.data)
        } else {
          reject(res);
          wx.showModal({
            title: '错误信息',
            content: JSON.stringify(res),
            success(res) {
              if (res.confirm) {
                console.log('用户点击确定')
              } else if (res.cancel) {
                console.log('用户点击取消')
              }
            }
          })
        }
 
      },
      fail: (err) => {
        reject(err);
        wx.showToast({
          title: JSON.stringify(err),
          icon: 'none',
          duration: 1000
        })
      }
    })
  }
} 
 
// export {HTTP}

module.exports = {
  formatTime,
  HTTP
}
