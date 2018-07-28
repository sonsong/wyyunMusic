Page({

    data: {
        title:"注册"
    },
    onLoad() {
        wx.setNavigationBarTitle({
            title: '用户注册',
        })
    },
    /**
     * 手机号注册
     */
    registByTele(e){
        let regist_info = {
            telephone : e.detail.value.telephone,
            passwd : e.detail.value.passwd
        };
        //存到本地
        wx.setStorage({
            key: 'regist_info',
            data: regist_info,
            success(){
                //跳转到登陆页面
                wx.redirectTo({
                    url: '../login/tele_login/index',
                    success(){
                        wx.showToast({
                            title: '注册成功',
                            icon: 'success',
                            duration: 2000
                        })
                    }
                })
            }
        })
    },
    /**
    * 微信注册
    */
    loginByWX() {
        wx.showToast({
            title: '客官别急，该功能正在开发中',
            icon: 'none',
            duration: 2000
        })
    },
    /**
     * QQ注册
     */
    loginByQQ() {
        wx.showToast({
            title: '客官别急，该功能正在开发中',
            icon: 'none',
            duration: 2000
        })
    },
    /**
     * 微博注册
     */
    loginByBlog() {
        wx.showToast({
            title: '客官别急，该功能正在开发中',
            icon: 'none',
            duration: 2000
        })
    },
    /**
     * 网易云注册
     */
    loginByEmail() { },
})