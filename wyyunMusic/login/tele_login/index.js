Page({

    data: {

    },
    /**
     * 用户登陆
     */
    userLogin(e) {
        wx.getStorage({
            key: 'regist_info',
            success: function(res) {
                let user_info = res.data;
                /**
                 * 校验用户名和密码
                 */
                const tele = e.detail.value.telephone;
                const pass = e.detail.value.passwd;

                if(tele === user_info.telephone && pass === user_info.passwd){
                    //从后台返回的用户信息
                    const user = {
                        name: "音乐人",
                        sex: 1,
                        birth: "1998-09-01",
                        region: ["上海市", "上海市", "浦东新区"],
                        img: "../../../../../imgs/img1.png",
                        bg: "../../../../../imgs/img1.png"
                    }
                    //存储到本地
                    wx.setStorage({
                        key: 'user',
                        data: user,
                        success() {
                            //跳转到首页
                            wx.switchTab({
                                url: '../../index/tarbar/found/index'
                            })
                        }
                    })
                }else{
                    wx.showToast({
                        icon:"none",
                        title: '用户名或密码错误'
                    })
                }
            },
            fail(){
                wx.redirectTo({
                    url: '../../regist/index',
                    success(){
                        wx.showToast({
                            icon: "none",
                            title: '该用户不存在请先注册'
                        })
                    }
                })
            }
        })
    },
    onLoad(){
        wx.setNavigationBarTitle({
            title: '手机号登陆',
        })
    }
})