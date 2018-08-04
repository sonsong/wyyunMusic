Page({

    data: {
        flag: 0,
        mvResult: []
    },
    onLoad() {
        wx.setNavigationBarTitle({
            title: '视频中心',
        })
    },
    onShow: function() {
        const that = this;
        //获取推荐的mv
        wx.request({
            url: "http://localhost:3000/personalized/mv",
            method: "Get",
            dataType: "json",
            success(res) {
                that.setData({
                    mvResult: res.data.result
                })
            }
        });
    },
    /**
     * 选择不同的mv
     *  0/推荐 1/mv 2/舞蹈 3/音乐 4/showtime
     */
    selectMvType(e){
        const id = e.currentTarget.id;
        let _flag = 0;
        if(id == 1){
            _flag = 1;
        }else if(id == 2){
            _flag = 2;
        } else if (id == 3) {
            _flag = 3;
        } else if (id == 4) {
            _flag = 4;
        }

        this.setData({
            flag : _flag
        })
    }
})