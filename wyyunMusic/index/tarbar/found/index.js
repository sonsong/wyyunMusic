Page({
    data: {
        flag: 0,
        imgUrls: [],
        indicatorDots: true,
        autoplay: true,
        interval: 5000,
        duration: 1000,
        //首页推荐的歌单
        recommendMusicList:[],
        baseURL : "http://localhost:3000"
    },
    onShow(){
        const that = this;
        that.setData({
            imgUrls: ["http://p1.music.126.net/ML3uwyAzLl9CeY8ctv2OSw==/109951163425722270.jpg",
                "http://p1.music.126.net/5rrvM3NzfN_2Z79EWPBCcA==/109951163425714206.jpg",
                "http://p1.music.126.net/rGjPZF59THEpaxa7Ky26EQ==/109951163424327759.jpg",
                "http://p1.music.126.net/6PxF6qYAbkUKl3jrGEVWXQ==/109951163425841290.jpg"] 
        }),
        //获取首页的推荐歌曲
        wx.request({
            url: that.data.baseURL + '/personalized',
            method: "Get",
            dataType: "json",
            data: {},
            success(res) {
                const data = res.data.result;
                let _musicList = [];
                for (let i = 0; i < data.length; i+=3) {
                    _musicList.push(data.slice(i, i+3));
                }
                that.setData({
                    recommendMusicList: _musicList
                })
                wx.setStorage({
                    key: 'recommendMusic',
                    data: data,
                })
                
                
            }
        })
    },
    /**
     * 跳转到推荐歌单详细
     */
    skipMusicListDetail(e){
        const that = this;
        const musicId = e.currentTarget.id;
        //获取歌单详细
        wx.request({
            url: that.data.baseURL + "/playlist/detail",
            method:"get",
            dataType:"json",
            data:{
                id:musicId
            },
            success(res){
                const data = res.data.playlist.tracks;
                let details = [];
                for (let index of data) {
                    let music = {
                        id: index.id,
                        name: index.name,
                        mv: index.mv
                    }
                    let authors = "";
                    let singers = "";
                    for (let item of index.ar) {
                        authors += item.name + "/";
                    }
                    singers = authors;

                    authors += index.al.name;

                    music.auth = authors;
                    music.picUrl = index.al.picUrl;
                    music.singers = singers;

                    details.push(music);
                };
                wx.setStorage({
                    key: 'musicList',
                    data: details,
                    success(){
                        wx.navigateTo({
                            url: './musicListDetail/index',
                        })
                    }
                })
            }
        })
    },
    /**
     * 注意： 直接赋值并不会改变页面的状态
     */
    getPageType(e) {
        const id = e.currentTarget.id;
        let _flag = 0;
        let _imgUrls = "";
        if (id == 0) {
            _imgUrls = ["http://p1.music.126.net/ML3uwyAzLl9CeY8ctv2OSw==/109951163425722270.jpg",
                "http://p1.music.126.net/5rrvM3NzfN_2Z79EWPBCcA==/109951163425714206.jpg",
                "http://p1.music.126.net/rGjPZF59THEpaxa7Ky26EQ==/109951163424327759.jpg",
                "http://p1.music.126.net/6PxF6qYAbkUKl3jrGEVWXQ==/109951163425841290.jpg"
            ]
        } else if (id == 1) {
            _imgUrls = ["http://p1.music.126.net/cR8tRszafyYha_Uqk17tBw==/109951163425443444.jpg",
                "http://p1.music.126.net/aYEC2T6k5qR68EMX0iRoVA==/109951163425722647.jpg",
                "http://p1.music.126.net/WLLJPtvEqxdhRvNKb5cCbg==/109951163425731386.jpg"
            ]
            _flag = 1;
        }

        this.setData({
            imgUrls: _imgUrls,
            flag: _flag
        })
    },
    skipPlayMusic(){
        wx.navigateTo({
            url: '../../../play_music/index?type=0',
        })
    }
})