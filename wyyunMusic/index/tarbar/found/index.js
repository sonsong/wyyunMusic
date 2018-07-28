Page({
    data: {
        type: "recommend",
        imgUrls: ["http://p1.music.126.net/ML3uwyAzLl9CeY8ctv2OSw==/109951163425722270.jpg",
            "http://p1.music.126.net/5rrvM3NzfN_2Z79EWPBCcA==/109951163425714206.jpg",
            "http://p1.music.126.net/rGjPZF59THEpaxa7Ky26EQ==/109951163424327759.jpg",
            "http://p1.music.126.net/6PxF6qYAbkUKl3jrGEVWXQ==/109951163425841290.jpg"
        ],
        indicatorDots: true,
        autoplay: true,
        interval: 5000,
        duration: 1000
    },
    /**
     * 注意： 直接复制并不会改变页面的状态
     */
    getPageType(e) {
        this.setData({
            type: e.target.id
        });
        if (e.target.id === 'recommend') {
            this.setData({
                imgUrls: ["http://p1.music.126.net/ML3uwyAzLl9CeY8ctv2OSw==/109951163425722270.jpg",
                    "http://p1.music.126.net/5rrvM3NzfN_2Z79EWPBCcA==/109951163425714206.jpg",
                    "http://p1.music.126.net/rGjPZF59THEpaxa7Ky26EQ==/109951163424327759.jpg",
                    "http://p1.music.126.net/6PxF6qYAbkUKl3jrGEVWXQ==/109951163425841290.jpg"
                ],
            });
        } else if (e.target.id === 'radio'){
            this.setData({
                imgUrls: ["http://p1.music.126.net/cR8tRszafyYha_Uqk17tBw==/109951163425443444.jpg",
                    "http://p1.music.126.net/aYEC2T6k5qR68EMX0iRoVA==/109951163425722647.jpg",
                    "http://p1.music.126.net/WLLJPtvEqxdhRvNKb5cCbg==/109951163425731386.jpg"
                ],
            }); 
        }
    }
})