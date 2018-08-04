Page({

    data: {
        show: false,
        recentCount : 0
    },

    onLoad: function(options) {
        wx.setNavigationBarTitle({
            title: '我的音乐',
        })
    },
    onShow(){
        const that = this;
        wx.getStorage({
            key: 'musicStacks',
            success: function(res) {
                const data = res.data;
                that.setData({
                    recentCount : data.length                    
                })
            }
        })
    },
    showMusicList() {
        this.setData({
            show: !this.data.show
        })
    },

    /**
     * e.currentTarget.id
     *  0/本地音乐 1/最近播放 2/我的电台 3/我的收藏
     */
    skipMusicDetailPage(e) {
        console.log(e)
        if(e.currentTarget.id === "0"){
            wx.navigateTo({
                url: './localMusics/index',
            })
        }
    }
})