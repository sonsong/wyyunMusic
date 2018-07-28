Page({
    data: {
        name: ""
    },
    submit(e) {
        let name = e.detail.value.name;
        if (name) {
            wx.getStorage({
                key: 'user',
                success: function(res) {
                    let _user = res.data;
                    _user.name = name;
                    console.log("update")
                    console.log(_user);
                    //更新缓存内容
                    wx.setStorage({
                        key: 'user',
                        data: _user,
                        success() {
                            /**
                             * wx.navigateBack 页面回退 不回执行onload函数
                             */
                            wx.navigateBack({
                                delta:1
                            })
                        }
                    })
                    wx.setNavigationBarTitle({
                        title: '我的资料',
                    })
                },
                fail() {
                    console.log("updataName fail...")
                }
            });
        }
    },
    onLoad(options) {
        this.setData({
            name: options.name
        });
    }
})