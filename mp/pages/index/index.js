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

    // 课程列表
    lessons: [
      {
        title: "标题1",
        content: "酸辣粉机绿山咖啡结束啦看风景了开始打飞机卢萨卡",
        author: "Zen"
      },
      {
        title: "标题2",
        content: "酸辣粉机绿山咖啡结束啦看风景了开始打飞机卢萨卡",
        author: "Zen"
      },
      {
        title: "标题3",
        content: "酸辣粉机绿山咖啡结束啦看风景了开始打飞机卢萨卡",
        author: "Zen"
      }
    ]
  }
})