// wyyunMusic/index/tarbar/my/localMusics/index.js
Page({

    data: {
        flag: 'single',
        _flag: 'song'
    },

    onLoad: function(options) {
        wx.setNavigationBarTitle({
            title: '本地音乐',
        })
    },

    selectNav(e) {
        const _type = e.currentTarget.id;
        let selectName = "single";
        if (_type === 'show') {
            selectName = 'show'
        } else if (_type === 'mv') {
            selectName = 'mv'
        }
        this.setData({
           flag : selectName
        })
    },
    selectMusicType(e){
        const _type = e.currentTarget.id;
        let selectName = "song";
        if (_type === 'singer') {
            selectName = 'singer'
        } else if (_type === 'album') {
            selectName = 'album'
        }
        this.setData({
            _flag: selectName
        })
    }
})