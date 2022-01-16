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
  request({ url, data = {}, header = {}, method = "GET", success = () => { }, fail = () => { } }){
    return new Promise((resolve,reject)=>{
      this._request(url, data, header, method, resolve, reject);
    })
  }
  _request(url, data, header, method, resolve, reject){
    wx.request({
      url: base_url + url,
      data: data,
      header: header,
      method: method,
      success: (res) => {
        let data = res.data;
        if ((data.status != undefined && data.status == "ok") || data.error_code === 0) {
          resolve(data || data.data)
        } else {
          reject();
          wx.showModal({
            title: '错误信息',
            content: '错误信息',
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
        reject();
        wx.showToast({
          title: '接口出错了',
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
