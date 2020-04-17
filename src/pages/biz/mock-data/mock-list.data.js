const mockNewsList = [
  {
    id: '11',
    title: '美国众议长称第四轮经济救助计划至少1万亿美元',
    imageUrl: 'https://doublechain.oss-cn-hangzhou.aliyuncs.com/nice-router/news-7.jpeg',
  },
  {
    id: '22',
    title: '华为 P40 Pro+ 的十倍光变是怎样实现的？',
    brief: '从过去的数字变焦、混合变焦，再到今天的光学变焦，手机的远摄能力正如它们的性能一样在不停变化',
    imageList: [
      {
        id: '1',
        imageUrl: 'https://doublechain.oss-cn-hangzhou.aliyuncs.com/nice-router/news-1.jpeg',
      },
      {
        id: '2',
        imageUrl: 'https://doublechain.oss-cn-hangzhou.aliyuncs.com/nice-router/news-2.jpeg',
      },
    ],
  },
  {
    id: '22',
    title: '我退役了，要专注练习龙吸水',
    brief: '退役专注龙吸水！“田径泥石流”张国伟的沙雕日常',
    imageList: [
      {
        id: '1',
        imageUrl: 'https://doublechain.oss-cn-hangzhou.aliyuncs.com/nice-router/news-3.jpeg',
      },
      {
        id: '2',
        imageUrl: 'https://doublechain.oss-cn-hangzhou.aliyuncs.com/nice-router/news-4.jpeg',
      },
      {
        id: '3',
        imageUrl: 'https://doublechain.oss-cn-hangzhou.aliyuncs.com/nice-router/news-5.jpeg',
      },
    ],
  },
  {
    id: '333',
    title: '中国发布新冠肺炎疫情信息、推进疫情防控国际合作纪事',
  },
]
const mockImageOnBottomList = [
  {
    id: '11',
    title: '震撼！武汉230组高铁动车整装待发',
    displayMode: 'image-on-bottom',
    imageUrl: 'https://doublechain.oss-cn-hangzhou.aliyuncs.com/nice-router/news-6.jpeg',
  },
]
const mockProductList = [
  {
    id: 1,
    preTag: '促',
    tags: ['专业', '防水'],
    brand: '3M',
    name: '成人雨衣半透明',
    price: 13.8,
    imageUrl: 'https://doublechain.oss-cn-hangzhou.aliyuncs.com/nice-router/product-1.jpg',
  },
  {
    id: 2,
    preTag: '快',
    tags: ['Enjoy', '厨房切菜刀'],
    brand: '双立人',
    name: '红点',
    price: 329.0,
    imageUrl: 'https://doublechain.oss-cn-hangzhou.aliyuncs.com/nice-router/product-5.jpg',
  },
  {
    id: 3,
    preTag: '柴',
    tags: ['香', '五常'],
    brand: '柴火大院',
    name: '真五常稻花香香米',
    price: 72.99,
    imageUrl: 'https://doublechain.oss-cn-hangzhou.aliyuncs.com/nice-router/product-2.jpg',
  },
  {
    id: 4,
    preTag: '买',
    tags: ['iPhone', 'HDR'],
    brand: '苹果',
    name: '新品 iPhone11 Pro',
    price: 9088.0,
    imageUrl: 'https://doublechain.oss-cn-hangzhou.aliyuncs.com/nice-router/product-3.png',
  },
  {
    id: 5,
    preTag: '坑',
    tags: ['半成品'],
    brand: '必胜客',
    name: '想吃披萨又觉得外面的披萨不卫生又贵',
    price: 39.2,
    imageUrl: 'https://doublechain.oss-cn-hangzhou.aliyuncs.com/nice-router/product-4.jpg',
  },
  {
    id: 6,
    preTag: '包邮',
    tags: ['好用'],
    brand: '小米',
    name: '巨能写中性笔10支装',
    price: 9.8,
    imageUrl: 'https://doublechain.oss-cn-hangzhou.aliyuncs.com/nice-router/product-6.jpg',
  },
]

const defaultDocument = 'https://doublechain.oss-cn-hangzhou.aliyuncs.com/nice-router/README.docx'
const mockMovieList = [
  {
    id: 1,
    title: '始动/启动/青春催落去(台)',
    brief:
      '离家出走的叛逆儿泽日（朴正民饰）与盲目踏入社会并满腔热血的尚弼（丁海寅饰），在遇见长风饭馆的厨师长猛男哥（马东锡饰）后，让自己明白了什么是世间愉快与开心的故事。',
    createTime: new Date('2019-10-11'),
    status: '韩剧',
    documentUrl: defaultDocument,
    imageUrl: 'https://doublechain.oss-cn-hangzhou.aliyuncs.com/nice-router/movie-1.jpg',
  },
  {
    id: 2,
    title: '《多力特的奇幻冒险》BD中英双字幕',
    brief:
      '失去妻子后的7年中，约翰·杜立德医生把自己关在庄园里与动物相伴。当时年轻的女王身患重病，杜立德医生不情愿出门冒险，前往神秘的岛屿寻找治疗方法，这让他重获勇气和智慧，因为他击败了老对手，还发现了奇妙的新生物。',
    createTime: new Date('2020-02-05'),
    status: '喜剧',
    documentUrl: defaultDocument,
    imageUrl: 'https://doublechain.oss-cn-hangzhou.aliyuncs.com/nice-router/movie-2.jpg',
  },
]
const mockBusinessCardList = [
  {
    id: 1,
    title: '和珅',
    brief: '职位：总经理\n电话:13888888888\n 成都双链科技有限责任公司',
    status: 'VIP',
    imageUrl: 'https://doublechain.oss-cn-hangzhou.aliyuncs.com/nice-router/avatar-1.png',
  },
  {
    id: 2,
    title: '张无忌',
    brief: '职位：CEO\n电话:13900000001\n 中国三条腿（集团）公司',
    status: 'VP',
    imageUrl: 'https://doublechain.oss-cn-hangzhou.aliyuncs.com/nice-router/avatar-2.jpg',
  },
]
const mockUserList = [
  {
    id: 1,
    title: '小陈不哭',
    brief: '欢迎打赏人气主播',
    imageUrl: 'https://doublechain.oss-cn-hangzhou.aliyuncs.com/nice-router/avatar-3.jpg',
  },
  {
    id: 2,
    title: '柠檬',
    brief: '少女风，直播中。。。。',
    imageUrl: 'https://doublechain.oss-cn-hangzhou.aliyuncs.com/nice-router/avatar-4.jpg',
  },
  {
    id: 3,
    title: '嗯嗯嗯',
    brief: '关注我，嗯嗯嗯',
    imageUrl: 'https://doublechain.oss-cn-hangzhou.aliyuncs.com/nice-router/avatar-5.jpg',
  },
]

export { mockNewsList, mockImageOnBottomList, mockProductList, mockMovieList, mockBusinessCardList, mockUserList }
