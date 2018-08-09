Page({

    data: {
        baseURL: "http://localhost:3000",
        //当前播放的歌曲
        music: {},
        //当前播放的歌曲在音乐栈的位置
        position: 0,
        //控制音乐的播放状态
        play: true,

        //音乐器播放对象
        audioContext: "",

        //音乐栈
        musicStacks: "",
        //进度条的值
        value: 0,
        max: 0,
        //音乐的时长
        time: '00:00',
        //播放时间
        playTime: '00:00',
        //是否循环播放
        loop: true,
        //进度条定时器的id
        id: "",

        transform: "",
        rotate: 0,
        animation: "",
        _type: 0,

        display:"display:none",
        show:false
    },
    slideChange(e) {
        this.setData({
            value: e.detail.value
        })

    },
    onLoad(e) {
        const that = this;

        //页面跳转类型
        that.setData({
            _type: e.type
        });
        wx.getStorage({
            key: 'currMusic',
            success: function(res) {

                const data = res.data;
                //音乐id
                let ids = [];
                for (let index of data) {
                    ids.push(index.id);
                }

                //获取当前将播放的音乐的信息
                wx.request({
                    url: that.data.baseURL + '/music/url',
                    method: "get",
                    dataType: "json",
                    data: {
                        id: ids.toString()
                    },
                    success(res) {
                        //包含音乐所有信息的音乐栈
                        let musicStacks = [];

                        const _data = res.data.data;

                        for (let index of data) {
                            for (let _index of _data) {
                                if (index.id === _index.id) {
                                    index.url = _index.url;
                                    break;
                                }
                            }
                            musicStacks.push(index);
                        };

                        that.setData({
                            musicStacks: musicStacks
                        });
                        wx.setStorage({
                            key: 'currMusic',
                            data: musicStacks,
                        });

                        wx.getStorage({
                            key: 'play_position',
                            success: function(res) {
                                const data = res.data;
                                //播放第data首
                                that.setData({
                                    music: musicStacks[data]
                                });
                                that.createAudioPlay();
                            },
                            fail(){
                                //播放第一首
                                that.setData({
                                    music: musicStacks[0]
                                });
                                that.createAudioPlay();
                            }
                        })
                    }
                })
            },
            fail() {
                wx.showToast({
                    icon: "none",
                    title: "播放列表暂无音乐"
                })
            }
        })
    },
    //创建音乐播放器
    createAudioPlay() {
        const that = this;

        //计划播放的音乐
        const planPlay = that.data.music;
        this.setBatTitle(planPlay.name);

        const act = wx.createInnerAudioContext();
        this.setData({
            audioContext: act
        })
        
        //音乐源
        act.src = planPlay.url;
        //自动播放
        act.autoplay = true;
        //开始播放的位置
        act.startTime = 0;
        //遵从系统静音
        act.obeyMuteSwitch = true;
        //循环播放
        act.loop = false;

        //开始播放  只要音乐播放就会执行 seek函数不回
        act.onPlay(() => {
            //播放时长
            this.getPlayDuration(act);
            
            this.myRotate();
            let val = this.data.value;

            this.setIntervalTime(val, 0, 0);
        });

        //播放结束
        act.onEnded(() => {
            clearInterval(this.data.animation);
            this.setData({
                value: 0
            });
            clearInterval(this.data.id);

            //销毁当前实例
            act.destroy();
            //播放下一首
            let num = that.data.position;
            if (num == that.data.musicStacks.length - 1) {
                num = 0;
            } else {
                num++
            }
            let music = that.data.musicStacks[num];
            this.setData({
                music,
                position: num
            })

            wx.setStorageSync("play_position", num);
            //从新生成音乐实例
            that.createAudioPlay();
        });
    },
    //播放或暂定
    pauseOrPlayMusic() {
        const act = this.data.audioContext;
        let _play = !this.data.play;
        if (_play) {
            act.play();
        } else {
            act.pause();
            clearInterval(this.data.animation);
            clearInterval(this.data.id);
        }
        this.setData({
            play: _play
        })
    },
    //下一首\上一首
    nextMusic(e) {
        clearInterval(this.data.animation);
        this.setData({
            value: 0
        });
        clearInterval(this.data.id);

        const type = e.currentTarget.id;

        //音乐栈
        const musics = this.data.musicStacks;
        if(musics.length === 1){
            wx.showToast({
                icon:"none",
                title: '没有更多音乐啦',
            })
            return;
        }
        //当前播放的音乐
        let num = this.data.position;

        if (type === 'before') {
            //第一首切换到最后一首 上一首
            if (num == musics.length - 1) {
                num = 0;
            } else {
                num++;
            }
        } else if (type === 'after') {

            //第一首切换到最后一首 下一首
            if (num == 0) {
                num = musics.length - 1;
            } else {
                num--;
            }
        }
        wx.setStorageSync("play_position", num)

        //取出计划播放的音乐
        const nextMusic = musics[num];
        //停止当前音乐，并销毁该实例
        let act = this.data.audioContext;
        act.stop();
       // act.destroy();

        this.setData({
            music: nextMusic,
            position: num
        })

        //this.createAudioPlay();
        
        //音乐源
        act.src = nextMusic.url;
        this.setBatTitle(nextMusic.name);
    },
    //是否循环播放
    loopMusic() {
        let loop = !this.data.loop;
        let title = "顺序播放";
        this.setData({
            loop
        });
        if (loop) {
            title = "循环播放"
        }
        wx.showToast({
            icon: "none",
            title: title
        })
    },
    // 专辑图片旋转函数
    myRotate: function() {
        const that = this;
        let rotate = this.data.rotate;
        const animation = setInterval(() => {
            rotate++;
            let transform = `transform:rotate(${rotate}deg);`;
            that.setData({
                rotate
            });
            that.setData({
                transform
            });
        }, 30);
        that.setData({
            animation
        })
    },
    //拖动进度条， 跳到某个位置播放
    slideChangeHandle(e) {
        const that = this;

        const act = this.data.audioContext;
        let position = e.detail.value;

        //跳转到指定位置
        act.seek(position);

        let minit = parseInt(position / 60);
        let second = position % 60;

        this.playTimeFormat(minit, second);

        clearInterval(that.data.id);

        this.setIntervalTime(position, minit, second);
    },
    /**
     * 播放时间进度条 定时器
     */
    setIntervalTime(position, _minit, _second) {
        const that = this;

        let minit = minit;
        let second = second;
        const id = setInterval(() => {
            position++;
            if (that.data.max == position) {
                clearInterval(id);
            }

            minit = parseInt(position / 60);
            second = position % 60;

            this.playTimeFormat(minit, second);

            that.setData({
                value: position
            });

        }, 1000);

        that.setData({
            id
        })
    },
    /**
     * 播放时间格式化
     */
    playTimeFormat(minit, second) {
        if (second < 10) {
            this.setData({
                playTime: "0" + minit.toFixed(0) + ":0" + second
            })
        } else {
            this.setData({
                playTime: "0" + minit.toFixed(0) + ":" + second
            })
        }
    },
    //下载音乐 10M 最大限制
    downLoadMusic(e) {
        const url = e.currentTarget.dataset.url;
        wx.downloadFile({
            url: url,
            success(res) {
                wx.saveFile({
                    tempFilePath: res.tempFilePath,
                    success: function(res) {
                        wx.showToast({

                            title: '下载成功',
                        })
                    }
                })
            }
        })
    },
    //控制菜单列表的隐藏与显示
    showOrHiddenMusicList(){
        let show = !this.data.show;
        let display = "display:none"
        if(show){
            display = "display:inner-block"
        }
        this.setData({
            show,
            display
        })
    },
    //隐藏菜单列表
    closeMusicList(){
        this.setData({
            show:false,
            display:"display:none"
        })
    },
    playMusic(e){
        clearInterval(this.data.animation);
        this.setData({
            value: 0
        });
        clearInterval(this.data.id);

        //当前点击的音乐
        let music = e.currentTarget.dataset.music;
        let position = 0;

        let musics = this.data.musicStacks;
        for(let m in musics){
            if(musics[m].id === music.id){
                position = m;
                break;
            }
        }
        this.setData({
            music,
            position,
            display: 'display:none',
            show: 'false'
        });
        wx.setStorage({
            key: 'play_position',
            data: position,
        })

        //当前的音乐播放器
        let act = this.data.audioContext;
        act.stop();
       // act.destroy();

        //this.createAudioPlay();
        act.src = music.src;
        this.setBatTitle(music.name);
    },
    //设置歌名
    setBatTitle(name){
        wx.setNavigationBarTitle({
            title: name,
        })
    },
    //获取歌曲时常
    getPlayDuration(act){
        const that = this;
        let duration = 0;
       const intervalId =  setInterval(() => {
            duration = act.duration;
            if (duration !== 0) {
                clearInterval(intervalId);
                that.setData({
                    max: duration
                })

                let minit = parseInt(duration / 60);
                let second = duration % 60;
                if (second < 10) {
                    this.setData({
                        time: "0" + minit + ":0" + second.toFixed(0)
                    })
                } else {
                    this.setData({
                        time: "0" + minit + ":" + second.toFixed(0)
                    })
                }
            }
        }, 30);
    }
})