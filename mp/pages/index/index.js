Page({
  data: {

    // 轮播图
    imgUrls: [
      'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
    ],
    indicatorDots: true,  // 是否显示面板指示点
    autoplay: true, // 是否自动切换
    interval: 3000,  // 自动切换时间间隔
    duration: 3000,    // 滑动时长

    lessons: [],  // 课程列表
    pageIndex: 1,  // 课程加载次数
    lessonsLoading: false,  // 是否在加载课程数据
    isLastPage: false,  // 是否为最后一页

    // 消息循环列表
    notices: [],
    scrollTop: 0

  },

  /**
   * 消息滚动循环
   */
  onReady(){
    setInterval(()=> {
      this.setData({
        scrollTop: this.data.scrollTop >= 30 ? 0 : this.data.scrollTop + 15
      })
    }, 2000)
  },
  
  /**
   * 获取通知列表以及默认课程列表
   */
  onLoad() {
    this.getNotice((notices) => this.setData({
      notices: notices
    }));
    this.setLessons();
  },

  /**
   * 上拉加载上一页内容
   */
  upperLessons(){
    if (this.data.pageIndex !== 1 && !this.data.lessonsLoading){
        this.setData({
          pageIndex: this.data.pageIndex - 1
        })
      }
      this.setLessons();
  },

   /**
    * 下拉加载下一页内容
    */
   lowerLessons() {
     if (!this.data.isLastPage && !this.data.lessonsLoading){
      this.setData({
        pageIndex: this.data.pageIndex + 1
      });
      this.setLessons();
    }
  },


  /**
   * 获取通知列表
   */
  getNotice(callback){
    wx.request({
      url: 'http://localhost:8000/api/notices',
      success(res){
        callback(res.data);
      }
    })
  },

  /**
   * 设置课程列表
   */
  setLessons(){
    this.setData({
      lessonsLoading: true
    });

    this.getLessons((courses) => {
      this.setData({
        lessons: courses.data,
        lessonsLoading: false,
        isLastPage: courses.meta.pagination.current_page == courses.meta.pagination.total_pages
      })
    })
  },


  /**
   * 获取课程列表
   */
  getLessons(callback) {
    wx.request({
      url: 'http://localhost:8000/api/lessons?page=' + this.data.pageIndex,
      success(res) {
        callback(res.data);
      }
    })
  }

})