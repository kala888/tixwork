import MockService from '@/nice-router/request/mock-service'
import mockGenericPageData from './mock-genericpage.data'
import mockForm2Data from './mock-form2.data'
import mockForm1Data from './mock-form.data'

const documentUrl = 'https://nice-router.oss-cn-chengdu.aliyuncs.com/README.docx'
const videoUrl = 'https://nice-router.oss-cn-chengdu.aliyuncs.com/video.mp4'
const slideList = [
  { id: 1, imageUrl: MockService.randomImage() },
  { id: 2, imageUrl: MockService.randomImage() },
  { id: 3, imageUrl: MockService.randomImage(), videoUrl },
]

const productList = [
  {
    id: 1,
    preTag: '促',
    tags: ['专业', '防水'],
    brand: '3M',
    name: '成人雨衣半透明，粉色佳人',
    price: 13.8,
    imageUrl: 'https://nice-router.oss-cn-chengdu.aliyuncs.com/product-1.jpg',
  },
  {
    id: 2,
    preTag: '柴',
    tags: ['香', '五常'],
    brand: '柴火大院',
    name: '真五常稻花香香米',
    price: 72.99,
    imageUrl: 'https://nice-router.oss-cn-chengdu.aliyuncs.com/product-2.jpg',
  },
  {
    id: 3,
    preTag: '买',
    tags: ['iPhone', 'HDR'],
    brand: '苹果',
    name: '新品 iPhone11 Pro',
    price: 9088.0,
    imageUrl: 'https://nice-router.oss-cn-chengdu.aliyuncs.com/product-3.png',
  },
  {
    id: 4,
    preTag: '坑',
    tags: ['半成品'],
    brand: '必胜客',
    name: '想吃披萨又觉得外面的披萨不卫生又贵',
    price: 39.2,
    imageUrl: 'https://nice-router.oss-cn-chengdu.aliyuncs.com/product-4.jpg',
  },
]
const newsList = [
  {
    id: '11',
    title: '美国众议长称第四轮经济救助计划至少1万亿美元',
    imageUrl: 'https://nice-router.oss-cn-chengdu.aliyuncs.com/news-7.jpeg',
  },
  {
    id: '22',
    title: '华为 P40 Pro+ 的十倍光变是怎样实现的？',
    brief: '从过去的数字变焦、混合变焦，再到今天的光学变焦，手机的远摄能力正如它们的性能一样在不停变化',
    imageList: [
      {
        id: '1',
        imageUrl: 'https://nice-router.oss-cn-chengdu.aliyuncs.com/news-1.jpeg',
      },
      {
        id: '2',
        imageUrl: 'https://nice-router.oss-cn-chengdu.aliyuncs.com/news-2.jpeg',
      },
    ],
  },
  {
    id: '33',
    title: '我退役了，要专注练习龙吸水',
    brief: '退役专注龙吸水！“田径泥石流”张国伟的沙雕日常',
    imageList: [
      {
        id: '1',
        imageUrl: 'https://nice-router.oss-cn-chengdu.aliyuncs.com/news-3.jpeg',
      },
      {
        id: '2',
        imageUrl: 'https://nice-router.oss-cn-chengdu.aliyuncs.com/news-4.jpeg',
      },
      {
        id: '3',
        imageUrl: 'https://nice-router.oss-cn-chengdu.aliyuncs.com/news-5.jpeg',
      },
    ],
  },
  {
    id: '44',
    title: '中国发布新冠肺炎疫情信息、推进疫情防控国际合作纪事',
  },
]

const movieList = [
  {
    id: 1,
    title: '始动/启动/青春催落去(台)',
    brief:
      '离家出走的叛逆儿泽日（朴正民饰）与盲目踏入社会并满腔热血的尚弼（丁海寅饰），在遇见长风饭馆的厨师长猛男哥（马东锡饰）后，让自己明白了什么是世间愉快与开心的故事。',
    createTime: new Date('2019-10-11'),
    status: '韩剧',
    documentUrl,
    imageUrl: 'https://nice-router.oss-cn-chengdu.aliyuncs.com/movie-1.jpg',
  },
  {
    id: 2,
    title: '《多力特的奇幻冒险》BD中英双字幕',
    brief:
      '失去妻子后的7年中，约翰·杜立德医生把自己关在庄园里与动物相伴。当时年轻的女王身患重病，杜立德医生不情愿出门冒险，前往神秘的岛屿寻找治疗方法，这让他重获勇气和智慧，因为他击败了老对手，还发现了奇妙的新生物。',
    createTime: new Date('2020-02-05'),
    status: '喜剧',
    documentUrl,
    imageUrl: 'https://nice-router.oss-cn-chengdu.aliyuncs.com/movie-2.jpg',
  },
]

const businessCardList = [
  {
    id: 1,
    title: '和珅',
    brief: '职位：总经理\n电话:13888888888\n 成都双链科技有限责任公司',
    status: 'VIP',
    imageUrl: 'https://nice-router.oss-cn-chengdu.aliyuncs.com/avatar-1.png',
  },
  {
    id: 2,
    title: '张无忌',
    brief: '职位：CEO\n电话:13900000001\n 中国三条腿（集团）公司',
    status: '牛',
    imageUrl: 'https://nice-router.oss-cn-chengdu.aliyuncs.com/avatar-2.jpg',
  },
]
const userList = [
  {
    id: 1,
    title: '小陈不哭',
    brief: '欢迎打赏人气主播',
    imageUrl: 'https://nice-router.oss-cn-chengdu.aliyuncs.com/avatar-3.jpg',
  },
  {
    id: 2,
    title: '柠檬',
    brief: '少女风，直播中。。。。',
    imageUrl: 'https://nice-router.oss-cn-chengdu.aliyuncs.com/avatar-4.jpg',
  },
  {
    id: 3,
    title: '嗯嗯嗯',
    brief: '关注我，嗯嗯嗯',
    imageUrl: 'https://nice-router.oss-cn-chengdu.aliyuncs.com/avatar-5.jpg',
  },
]

const obj = {
  title: '我看好的ETF',
  brief: '亏钱，割韭菜',
  flag: '牛',
  imageUrl: MockService.defaultImage,
  status: '待处理',
}
const cardList = [
  //竖版
  //横版-没图
  {
    id: '131',
    ...obj,
    mode: ['vertical', 'default', 'vertical-small'],
    imageUrl: '',
    flag: '急',
    actionList: [
      {
        btnType: 'confirm',
        id: 1,
        title: '删除',
        extraData: {
          title: '确认是否删除？',
          text: '确定是否放弃这个Item，并删除么？',
          actionList: [
            {
              title: '真的删除',
            },
          ],
        },
      },
    ],
  }, // 默认的 horizontal
  { id: '132', ...obj, mode: ['vertical', 'normal'], imageUrl: '', flag: '急' }, // 默认的 horizontal
  { id: '133', ...obj, mode: ['vertical', 'primary'], imageUrl: '', flag: '如' }, // 默认的 horizontal
  { id: '134', ...obj, mode: ['vertical', 'warn'], imageUrl: '', flag: '律' }, // 默认的 horizontal
  { id: '135', ...obj, mode: ['vertical', 'danger'], imageUrl: '', flag: '令' }, // 默认的 horizontal

  //默认，imageOnLeft
  { id: '1', ...obj, status: '待处理' }, //方图，一行title，一行brief，小的flag+最多3个字

  //竖版
  { id: '11', ...obj, mode: ['vertical'] }, // 竖版，1/2屏幕宽，小的flag+最多3个字
  { id: '12', ...obj, mode: ['vertical', 'vertical-small', 'circle'] }, // 竖版，小圆图，1/2屏幕宽，小的flag+最多3个字

  //横版-有图
  { id: '231', ...obj, mode: ['horizontal'] }, // 默认的 horizontal
  { id: '232', ...obj, mode: ['horizontal', 'circle', 'small'] }, //小圆图
  { id: '243', ...obj, mode: ['horizontal', 'circle', 'avatar'] }, //头像，带光圈
  { id: '254', ...obj, mode: ['horizontal', 'circle', 'large'] }, //大圆图
  {
    id: '25',
    ...obj,
    mode: ['horizontal', 'large'],
    brief: '真的牛逼不需要解释\n真的牛逼不需要解释\n真的牛逼不需要解释\n真的牛逼不需要解释',
  }, //大方图

  //横版-没图
  { id: '31', ...obj, mode: ['horizontal', 'default', 'small'], imageUrl: '', flag: '急' }, // 默认的 horizontal
  { id: '32', ...obj, mode: ['horizontal', 'normal'], imageUrl: '', flag: '急' }, // 默认的 horizontal
  { id: '33', ...obj, mode: ['horizontal', 'primary', 'large'], imageUrl: '', flag: '如' }, // 默认的 horizontal
  { id: '34', ...obj, mode: ['horizontal', 'warn'], imageUrl: '', flag: '律' }, // 默认的 horizontal
  { id: '35', ...obj, mode: ['horizontal', 'danger'], imageUrl: '', flag: '令' }, // 默认的 horizontal
]

const homePageData = {
  slideList,
  actionList: [
    {
      id: 1,
      title: 'Listof 测试',
      brief: '有惊喜',
      linkToUrl: 'page:///pages/biz/listof-test-page',
    },
    {
      id: 2,
      title: 'GenericPage 测试',
      brief: '省心',
      linkToUrl: 'mock-generic-page/',
    },
    {
      id: 3,
      title: 'GenericForm 测试',
      brief: '牛逼',
      linkToUrl: 'mock-generic-form/',
    },
    {
      id: 4,
      title: 'H5 测试',
      brief: '某度',
      linkToUrl: 'https://www.baidu.com',
    },
    {
      id: 5,
      title: 'Login 页面',
      brief: '通用',
      linkToUrl: 'page:///pages/login/login-page',
    },
  ],
  productList,
}

const initial = () => {
  MockService.mockResp('mock-home-page/', 'com.terapico.appview.HomePage', homePageData)
  MockService.mockResp('mock-generic-form/', 'com.terapico.caf.viewcomponent.GenericFormPage', mockForm1Data)
  MockService.mockResp('mock-generic-form-2/', 'com.terapico.caf.viewcomponent.GenericFormPage', mockForm2Data)
  MockService.mockResp('mock-generic-page/', 'com.terapico.caf.viewcomponent.GenericPage', mockGenericPageData)
  MockService.mockResp('mock-listof-test/', 'xx', {
    singleItemList: [userList[0]],
    productList,
    newsList,
    cardList,
    businessCardList,
    movieList,
    userList,
  })
}

const TestData = {
  initial,
}

export default TestData
