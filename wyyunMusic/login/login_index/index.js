Page({
    data: {
        title:"登陆"
    },
    /**
     * 跳转到首页
     */
    skipIndexPage(){
        wx.switchTab({
            url: "../../index/tarbar/found/index"
        })
    },
    /**
     * 微信登陆
     */
    loginByWX() {
        wx.showToast({
            title: '客官别急，该功能正在开发中',
            icon: 'none',
            duration: 2000
        })
    },
    /**
     * QQ登陆
     */
    loginByQQ() {
        wx.showToast({
            title: '客官别急，该功能正在开发中',
            icon: 'none',
            duration: 2000
        })
    },
    /**
     * 微博登陆
     */
    loginByBlog() {
        wx.showToast({
            title: '客官别急，该功能正在开发中',
            icon: 'none',
            duration: 2000
        })
    },
    /**
     * 网易云登陆
     */
    loginByEmail() {
        wx.showToast({
            title: '客官别急，该功能正在开发中',
            icon: 'none',
            duration: 2000
        })
    },
})