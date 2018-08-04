Page({

    data: {
        array: ["请选择性别",'男', '女'],
        customItem:"全部",
        user: {
            name: "请输入用户名",
            sex: 0,
            birth: "请选择出生日期",
            region: ["请选择地区"],
            img: "../../../../../imgs/img3.png",
            bg:"../../../../../imgs/img3.png"
        }
    },
    /**
     * 页面加载完
     */
    onLoad() {
        //修改标题
        wx.setNavigationBarTitle({
            title: '我的资料',
        })
    },
    onShow(){
        const that = this;
        //获取用户信息
        wx.getStorage({
            key: 'user',
            success: function (res) {
                that.setData({
                    user: res.data
                })
            },
            fail() {
                console.log("userInfo fail....");
            }
        })
    },
    /**
     * 更换头像/背景
     */
    changeImg(e){
        const that = this;
        wx.chooseImage({
            // 最多可以选择的图片张数，默认9
            count: 1,
            // original 原图，compressed 压缩图，默认二者都有
            sizeType: ['original', 'compressed'],
            // album 从相册选图，camera 使用相机，默认二者都有
            sourceType: ['album', 'camera'],
            success: function (res) {
                if (e.currentTarget.id === "img"){
                    that.setData({
                        //key值取得是data中定义的属性
                        "user.img": res.tempFilePaths
                    });
                }else{
                    that.setData({
                        "user.bg": res.tempFilePaths
                    });
                }
                wx.setStorage({
                    key: 'user',
                    data: that.user
                })
            },
            fail: function () {
                console.log("失败了...")
            },
            complete: function () {
                console.log("完成了...")
            }
        })
    },
    /**
     * 输入名字
     */
    inputName(e){
        wx.navigateTo({
            url: './updataName/index?name=' + e.currentTarget.id,
            success(){
                wx.setNavigationBarTitle({
                    title: '修改用户名',
                })
            }
        })
    },
    /**
     * 性别选择
     */
    bindPickerChange(e) {
        this.setData({
            "user.sex":e.detail.value
        });
        this.updataUserInfo(this.data.user);
    },
    /**
     * 时间选择器
     */
    bindDateChange(e) {
        this.setData({
            "user.birth": e.detail.value
        });
        this.updataUserInfo(this.data.user);
    },
    /**
     * 城市选择器
     */
    bindRegionChange(e){
        
        this.setData({
            "user.region" : e.detail.value
        });
        this.updataUserInfo(this.data.user);
    },
    /**
     * 更新用户信息
     */
    updataUserInfo(user){
        wx.request({
            url: "http://localhost:3000/user/update/",
            method: "Get",
            dataType: "json",
            data: {
                gender: user.sex,
                signature: "测试签名",
                nickname: user.name,
                birthday: user.birth,
                province: user.region[0],
                city: user.region[1]
            },
            success(res) {
                wx.setStorage({
                    key: 'user',
                    data: user
                })
            },
            fail(e) {
                console.log(e)
            }
        })
    }
})