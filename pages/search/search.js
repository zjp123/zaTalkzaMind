// pages/search/search.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    arr: [],
    triggered: false,
    inputVal: "",
    i: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({searchFn: this.searchFn.bind(this)})
  },
  searchFn: function (value) {
      return new Promise((resolve, reject) => {
          if (this.data.i % 2 === 0) {
              setTimeout(() => {
                  resolve([{text: '搜索结果', value: 1}, {text: '搜索结果2', value: 2}])
              }, 200)
          } else {
              setTimeout(() => {
                  resolve([])
              }, 200)

          }
          this.setData({
              i: this.data.i + 1
          })
      })
  },
  selectResult (e) {
      console.log('select result', e.detail)
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  onPulling(e) {
    console.log('onPulling:', e)
  },
  onPusing () {
    if (this._freshing) return
    this._freshing = true
    setTimeout(() => {
        const arr = []
        for (let i = 0; i < 10; i++) arr.push(i)
        this.setData({
            arr: this.data.arr.concat(arr)
        })

      this.setData({
        triggered: false,
      })
      this._freshing = false
    }, 1000)
  },
  onRefresh() {
    if (this._freshing) return
    this._freshing = true
    // setTimeout(() => {
    //   this.setData({
    //     triggered: false,
    //   })
    //   this._freshing = false
    // }, 3000)
    setTimeout(() => {
        const arr = []
        for (let i = 0; i < 10; i++) arr.push(i)
        this.setData({
            arr
        })

      this.setData({
        triggered: false,
      })
      this._freshing = false
    }, 1000)
  },

  onRestore(e) {
    console.log('onRestore:', e)
  },

  onAbort(e) {
    console.log('onAbort', e)
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})