Page({

    data: {

    },
    /**
     * 重置密码下一步
     */
    nextResetPass() { 
        wx.showToast({
            title: '别改了, 密码都不记得，还好意思？',
            icon: 'none',
            duration: 2000
        })
    },
    onLoad() {
        wx.setNavigationBarTitle({
            title: '密码重置',
        })
    }
})













