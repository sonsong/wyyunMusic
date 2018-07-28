Page({

    data: {
        user:{
            name:"请先登陆",
            img:"../../../../imgs/img1.png"
        }
    },
    onLoad(){
        wx.setNavigationBarTitle({
            title: '我的账号',
        })
    },
    onShow(){
        const that = this;
        wx.getStorage({
            key: 'user',
            success: function (res) {
                that.setData({
                    user: res.data
                })
            },
        });
    },
    /**
     * 退出登陆，跳转到登陆首页
     */
    exitLogin() {
        wx.reLaunch({
            url: '../../../login/login_index/index',
            success(){
                //清空缓存
                wx.clearStorage();
            }
        })
    },
    /**
     * 跳转到我的资料页面
     */
    skipMyInfoPage(){
        wx.navigateTo({
            url: './myInfo/index',
            success(){
                wx.setNavigationBarTitle({
                    title:"我的资料"
                })
            }
        })
    }
})