Page({

    data: {
        user: {},
        login: false
    },
    onLoad() {
        wx.setNavigationBarTitle({
            title: '我的账号',
        })
    },
    onShow() {
        const that = this;
        let user = {};
        //先判断是否登陆了。存在account即登陆了
        wx.getStorage({
            key: 'account',
            success: function(res) {
                //根据用户的id，得到用户的相关信息
                wx.request({
                    url: "http://localhost:3000/user/detail",
                    method: "Get",
                    dataType: "json",
                    data: {
                        uid: res.data.id
                    },
                    success(res) {
                        const data = res.data;
                        user = {
                            name: data.profile.nickname,
                            sex: data.profile.gender,
                            birth: data.profile.birthday,
                            region: [data.profile.province, data.profile.city],
                            img: data.profile.avatarUrl,
                            bg: data.profile.backgroundUrl,
                            //创建的歌单
                            playlistCount: data.profile.playlistCount,
                            //等级
                            level: data.level
                        }
                        //存到local
                        wx.setStorage({
                            key: 'user',
                            data: user,
                            success() {
                                that.setData({
                                        login: true
                                    }),
                                    that.setData({
                                        user: user
                                    })
                            }
                        })
                    }
                })
            },
            fail() {
                //表示没有登陆 是游客身份
                user = {
                    name: "音乐人",
                    sex: 1,
                    birth: "1998-09-01",
                    region: ["上海市", "上海市", "浦东新区"],
                    img: "../../../../../imgs/img1.png",
                    bg: "../../../../../imgs/img1.png"
                };
                //存到local
                wx.setStorage({
                    key: 'user',
                    data: user,
                    success() {
                        that.setData({
                                login: false
                            }),
                            that.setData({
                                user: user
                            })
                    }
                })
            }
        });
    },
    /**
     * 退出登陆，跳转到登陆首页
     */
    exitLogin() {
        wx.reLaunch({
            url: '../../../login/login_index/index',
            success() {
                //清空缓存
                wx.clearStorage();
            }
        })
    },
    /**
     * 跳转到我的资料页面
     */
    skipMyInfoPage() {
        if (this.data.login) {
            wx.navigateTo({
                url: './myInfo/index',
                success() {
                    wx.setNavigationBarTitle({
                        title: "我的资料"
                    })
                }
            })
        } else {
            wx.showToast({
                icon: 'none',
                title: '对不起，请您先登陆',
            })
        }
    }
})