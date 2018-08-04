Page({

    data: {
        musicList:[]
    },

    onLoad() {
        const that = this;
        wx.setNavigationBarTitle({
            title: '歌单',
        });
        wx.getStorage({
            key: 'musicList',
            success: function(res) {
                that.setData({
                    musicList: res.data
                })
            },
        })
    },
    //跳转到音乐播放页面
    skipPlayMusic(e){
        //音乐栈 音乐的id 图片
        let musics = [];
        if (e.currentTarget.dataset.music){
            //单曲播放
            musics.push(e.currentTarget.dataset.music);
        } else if (e.currentTarget.dataset.musiclist){
            //全部播放
            musics = e.currentTarget.dataset.musiclist;
        }

        const ms = wx.getStorageSync("currMusic");

        if (ms) {
            //如果点击的是单曲，添加到栈的后面
            if (musics.length == 1) {
                ms.unshift(musics[0]);
                musics = ms;
                wx.setStorage({
                    key: 'currMusic',
                    data: musics,
                    success() {
                        wx.navigateTo({
                            url: '../../../../play_music/index?type=1',
                            success() {
                                wx.showToast({
                                    icon: "none",
                                    title: "添加成功"
                                })
                            }
                        })
                    }
                })
            } else {
                wx.showModal({
                    title: '提示',
                    content: '播放全部将会替换当前的播放列表，是否继续',
                    success: function (res) {
                        if (res.confirm) {
                            wx.setStorage({
                                key: 'currMusic',
                                data: musics,
                                success() {
                                    wx.navigateTo({
                                        url: '../../../../play_music/index?type=1',
                                    })
                                }
                            })
                        }
                    }
                });
            }
        }else{
            wx.setStorage({
                key: 'currMusic',
                data: musics,
                success() {
                    wx.navigateTo({
                        url: '../../../../play_music/index?type=1'
                    })
                }
            })
        }
    }
})