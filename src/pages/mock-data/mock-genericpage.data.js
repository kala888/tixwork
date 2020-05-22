const imageUrl =
  'https://doublechain.oss-cn-hangzhou.aliyuncs.com/logo/logo_1024_no_background.png?x-oss-process=style/small'

const storeLocation = {
  type: 'store-location',
  imageUrl,
  phoneNumber: '13880964614',
  name: '优荣小店',
  summary: '品牌形象店',
  address: '成都市高新区天祥广场',
  latitude: 104.06476,
  longitude: 30.5702,
}
// const popup = {
//   bgColor: '#fff',
//   kids: [
//     {
//       id: '222',
//       type: 'text',
//       text: '快去这里',
//     },
//     {
//       id: '333',
//       type: 'image',
//       mode: 'widthFix',
//       imageUrl,
//     },
//   ],
// }
const carousel = {
  items: [
    {
      id: '111',
      imageUrl:
        'https://m.360buyimg.com/babel/s4452x2847_jfs/t1/14091/26/13274/199705/5c9ddff8Ed70acc30/58ec03551e31ab37.jpg!q70.dpg',
    },
    {
      id: '222',
      imageUrl:
        'https://m.360buyimg.com/babel/s4452x2847_jfs/t1/11169/21/14138/103437/5c9dfa1dE94665f1b/c6fb5bd28ef6b882.jpg!q70.dpg',
    },
    {
      id: '333',
      imageUrl:
        'https://m.360buyimg.com/babel/s4452x2847_jfs/t30127/115/1411890733/172577/bfcee38a/5cdeb742N7b09ca60.jpg!q70.dpg',
    },
  ],
  height: 200,
}
const fab = {
  icon: 'app',
}

const boxBar = {
  lineOfItems: 5,
  kids: [
    {
      id: '111',
      title: '五书定位',
      imageUrl:
        'https://m.360buyimg.com/babel/s153x153_jfs/t24268/339/495785252/12541/59fb8cac/5b31e8daN4225a095.jpg!q70.dpg',
    },
    {
      id: '222',
      title: '装修设计',
      imageUrl:
        'https://m.360buyimg.com/babel/s153x153_jfs/t21610/3/1729780573/15883/fe5ad522/5b31e85bNffb09af3.jpg!q70.dpg',
    },
    {
      id: '333',
      title: '自主调价',
      imageUrl:
        'https://m.360buyimg.com/babel/s153x153_jfs/t23413/313/491967629/14808/517b7d49/5b31e8d1N985ae7e3.jpg!q70.dpg',
    },
    {
      id: '444',
      title: '装修辅料',
      imageUrl:
        'https://m.360buyimg.com/babel/s153x153_jfs/t1/3933/33/9211/13517/5bac4845E11fbdd46/985d7735e419766b.jpg!q70.dpg',
    },
    {
      id: '555',
      title: '装修攻略',
      imageUrl:
        'https://m.360buyimg.com/babel/s153x153_jfs/t23554/365/505863911/13001/735a7073/5b31e8e5N91dc44e7.jpg!q70.dpg',
    },
  ],
}
const footer = {
  tabs: [
    {
      code: '1',
      id: '1',
      title: '领取中心',
      imageUrl:
        'https://img12.360buyimg.com/jdphoto/s72x72_jfs/t6160/14/2008729947/2754/7d512a86/595c3aeeNa89ddf71.png',
      selectedImage:
        'https://img14.360buyimg.com/jdphoto/s72x72_jfs/t17251/336/1311038817/3177/72595a07/5ac44618Na1db7b09.png',
      text: 'new',
    },
    {
      code: '2',
      id: '2',
      title: '找折扣',
      imageUrl:
        'https://img20.360buyimg.com/jdphoto/s72x72_jfs/t15151/308/1012305375/2300/536ee6ef/5a411466N040a074b.png',
      selected: true,
    },
    {
      code: '3',
      id: '3',
      title: '领会员',
      imageUrl:
        'https://img10.360buyimg.com/jdphoto/s72x72_jfs/t5872/209/5240187906/2872/8fa98cd/595c3b2aN4155b931.png',
      text: '100',
      max: '99',
    },
  ],
}

const breakLine = {
  color: '#e4b479',
  fontColor: '#e4b479',
  customStyle: { margin: '20rpx 0px', padding: '0px 100px' },
}

const shopList = {
  dataContainer: {
    shop1: {
      id: 'shop1',
      title: '百安居天府新区店',
      brief: '【装修旗舰店】免费测量，预定送智能家居',
      displayMode: 'auto',
      imageUrl: 'http://www.eastphoto.cn/indexImages/ep-012136603.jpg',
    },
    shop2: {
      id: 'shop2',
      title: '湛蓝科技',
      brief: '【空气治理专家】持牌机构，空气治理去甲醛',
      displayMode: 'image-on-left',
      imageUrl:
        'https://m.360buyimg.com/babel/s370x259_jfs/t1/20729/24/4177/80676/5c2f1aeaE062589aa/ee7cc78db75d62ed.jpg!q70.dpg',
    },
    shop3: {
      id: 'shop3',
      title: '小金狗回收',
      brief: '高科技环保企业，可再生资源再利用',
      displayMode: 'image-on-bottom',
      imageUrl:
        'https://m.360buyimg.com/babel/s823x404_jfs/t21784/201/795134266/176047/3dad2026/5b18c66eN8c4deacf.jpg!q70.dpg',
    },
  },
  list: [{ id: 'shop1' }, { id: 'shop2' }, { id: 'shop3' }],
}

const articleList = {
  dataContainer: {
    article1: {
      id: 'article1',
      title: '装修如何高质量又省钱',
      displayMode: 'auto',
      imageList: [
        { id: 1, imageUrl: 'http://www.eastphoto.cn/indexImages/ep-012136603.jpg' },
        {
          id: 2,
          imageUrl:
            'https://m.360buyimg.com/babel/s823x404_jfs/t21784/201/795134266/176047/3dad2026/5b18c66eN8c4deacf.jpg!q70.dpg',
        },
        {
          id: 3,
          imageUrl:
            'https://m.360buyimg.com/babel/s370x259_jfs/t1/20729/24/4177/80676/5c2f1aeaE062589aa/ee7cc78db75d62ed.jpg!q70.dpg',
        },
      ],
    },
    article2: {
      id: 'article2',
      title: '挑选电器有技巧',
      displayMode: 'only-title',
      imageList: [
        { id: 1, imageUrl: 'http://www.eastphoto.cn/indexImages/ep-012136603.jpg' },
        {
          id: 2,
          imageUrl:
            'https://m.360buyimg.com/babel/s823x404_jfs/t21784/201/795134266/176047/3dad2026/5b18c66eN8c4deacf.jpg!q70.dpg',
        },
        {
          id: 3,
          imageUrl:
            'https://m.360buyimg.com/babel/s370x259_jfs/t1/20729/24/4177/80676/5c2f1aeaE062589aa/ee7cc78db75d62ed.jpg!q70.dpg',
        },
      ],
    },
    article3: {
      id: 'article3',
      title: '水电改造攻略',
      brief: '水电改造是坑货么？会不会被装修公司坑？难道没有合理的高质量水电改造？让我们一起来给大家分析一下',
      displayMode: 'single-image',
      imageList: [
        { id: 1, imageUrl: 'http://www.eastphoto.cn/indexImages/ep-012136603.jpg' },
        {
          id: 2,
          imageUrl:
            'https://m.360buyimg.com/babel/s823x404_jfs/t21784/201/795134266/176047/3dad2026/5b18c66eN8c4deacf.jpg!q70.dpg',
        },
        {
          id: 3,
          imageUrl:
            'https://m.360buyimg.com/babel/s370x259_jfs/t1/20729/24/4177/80676/5c2f1aeaE062589aa/ee7cc78db75d62ed.jpg!q70.dpg',
        },
      ],
    },

    article4: {
      id: 'article4',
      title: '吊顶么？',
      displayMode: 'double-image',
      imageList: [
        { id: 1, imageUrl: 'http://www.eastphoto.cn/indexImages/ep-012136603.jpg' },
        {
          id: 2,
          imageUrl:
            'https://m.360buyimg.com/babel/s823x404_jfs/t21784/201/795134266/176047/3dad2026/5b18c66eN8c4deacf.jpg!q70.dpg',
        },
        {
          id: 3,
          imageUrl:
            'https://m.360buyimg.com/babel/s370x259_jfs/t1/20729/24/4177/80676/5c2f1aeaE062589aa/ee7cc78db75d62ed.jpg!q70.dpg',
        },
      ],
    },
  },
  list: [{ id: 'article1' }, { id: 'article2' }, { id: 'article3' }, { id: 'article4' }],
}

const messageSwiper = {
  imageUrl: 'https://m.360buyimg.com/babel/jfs/t22534/23/795940699/14893/3457ee4/5b442279N1dde2af1.png',
  items: [
    { id: 1, text: '恭喜城北旗舰店，大麦1个亿' },
    { id: 2, text: '热烈庆祝优荣之星成功上市' },
  ],
}

const productList = {
  displayMode: 'product',
  numColumns: 2,
  list: [{ id: 'p1' }, { id: 'p2' }, { id: 'p3' }, { id: 'p4' }],
  dataContainer: {
    p1: {
      id: 'p1',
      preTag: '自营',
      tags: ['618'],
      brand: '西门子',
      name: '大冰箱，超级大，610L让你生活无忧，心情好才是真的好',
      price: 500.12,
      imageUrl: 'http://www.eastphoto.cn/indexImages/ep-012136603.jpg',
    },
    p2: {
      id: 'p2',
      preTag: '双链小超',
      tags: ['券'],
      brand: '可口可乐',
      name: '300ml，冰霜开心',
      price: 2.5,
      imageUrl:
        'https://m.360buyimg.com/babel/s823x404_jfs/t21784/201/795134266/176047/3dad2026/5b18c66eN8c4deacf.jpg!q70.dpg',
    },
    p3: {
      id: 'p3',
      preTag: '',
      tags: [''],
      brand: '靓家私',
      name: '这是一个超级大的家居',
      price: 200.12,
      imageUrl:
        'https://m.360buyimg.com/babel/s370x259_jfs/t1/20729/24/4177/80676/5c2f1aeaE062589aa/ee7cc78db75d62ed.jpg!q70.dpg',
    },
    p4: {
      id: 'p4',
      preTag: '官方旗舰',
      tags: ['券'],
      brand: '美丽新时代',
      name: '毛巾被，超级大的那么中，估计有100斤，全国包邮',
      price: 30000.55,
      imageUrl,
    },
  },
}

const waterfallList = {
  displayMode: 'image-on-top-waterfall',
  numColumns: 2,
  list: [{ id: 'p1' }, { id: 'p2' }, { id: 'p3' }],
  dataContainer: {
    p1: {
      id: 'p111',
      title: '大冰箱',
      brief: '￥ 200.12',
      imageUrl: 'http://www.eastphoto.cn/indexImages/ep-012136603.jpg',
    },
    p2: {
      id: 'p222',
      title: '电视',
      brief: '$ 120',
      imageUrl:
        'https://m.360buyimg.com/babel/s823x404_jfs/t21784/201/795134266/176047/3dad2026/5b18c66eN8c4deacf.jpg!q70.dpg',
    },
    p3: {
      id: 'p333',
      title: '洗衣机',
      brief: '￥ 11.33',
      imageUrl:
        'https://m.360buyimg.com/babel/s370x259_jfs/t1/20729/24/4177/80676/5c2f1aeaE062589aa/ee7cc78db75d62ed.jpg!q70.dpg',
    },
  },
}

const horizontalList = {
  displayMode: 'image-on-top',
  horizontal: true,
  list: [{ id: 'p1' }, { id: 'p2' }, { id: 'p3' }],
  dataContainer: {
    p1: {
      id: 'p11',
      title: '暖水瓶',
      brief: '￥ 30.00',
      imageUrl: 'http://www.eastphoto.cn/indexImages/ep-012136603.jpg',
    },
    p2: {
      id: 'p22',
      title: '保温杯',
      brief: '$ 444.00',
      imageUrl:
        'https://m.360buyimg.com/babel/s823x404_jfs/t21784/201/795134266/176047/3dad2026/5b18c66eN8c4deacf.jpg!q70.dpg',
    },
    p3: {
      id: 'p33',
      title: '垃圾处理器',
      brief: '￥ 1221.33',
      imageUrl:
        'https://m.360buyimg.com/babel/s370x259_jfs/t1/20729/24/4177/80676/5c2f1aeaE062589aa/ee7cc78db75d62ed.jpg!q70.dpg',
    },
  },
}

const richText = {
  content:
    '<h2 style="padding-left: 20px;margin-top:20px;text-align:center"><strong>西红柿炒鸡蛋的家庭做法</strong></h2>\n' +
    '<h4 style="padding-left: 20px;margin-top:20px">原料：</h4>\n' +
    '<ul>\n' +
    '<li style="list-style-type: none;">\n' +
    '<ul>\n' +
    '<li>西红柿 <span style="color: #e03e2d;">150g</span></li>\n' +
    '<li>鸡蛋 <span style="color: #e03e2d;">3枚</span></li>\n' +
    '<li>葱 <span style="color: #e03e2d;">15g</span></li>\n' +
    '<li>盐 <span style="color: #e03e2d;">3g</span></li>\n' +
    '<li>油 <span style="color: #e03e2d;">10g</span></li>\n' +
    '<li>料酒 <span style="color: #e03e2d;">10g</span></li>\n' +
    '</ul>\n' +
    '</li>\n' +
    '</ul>\n' +
    '<p style="padding-left: 20px;"><img alt="" src="https://nice-router.oss-cn-chengdu.aliyuncs.com/food-1.jpg" /></p>\n' +
    '<h4 style="padding-left: 20px;">步骤：</h4>\n' +
    '<ol>\n' +
    '<li style="list-style-type: none;">\n' +
    '<ol>\n' +
    '<li>油，锅里放</li>\n' +
    '<li>鸡蛋，锅里放</li>\n' +
    '<li>西红柿，锅里放</li>\n' +
    '<li>豁楞，出锅</li>\n' +
    '</ol>\n' +
    '</li>\n' +
    '</ol>\n' +
    '<p style="padding-left: 20px;"><img alt="" src="https://nice-router.oss-cn-chengdu.aliyuncs.com/food-2.jpg" /></p>',
}

const mockGenericPageData = {
  // pageTitle: 'Nice router 社区',
  pageTitle: '双11大促销',
  kids: [
    { id: '66', type: 'fab', ...fab },
    { id: '0', type: 'carousel', ...carousel },
    { id: '1', type: 'box-bar', ...boxBar },
    { id: '2', type: 'notice-bar', ...messageSwiper },
    { id: '3', type: 'break-line', text: '商家', ...breakLine },
    { id: '4', type: 'listof', ...shopList },
    { id: '5', type: 'break-line', text: '精品文章', ...breakLine, color: '#39a7fc', fontColor: '#39a7fc' },
    { id: '6', type: 'listof', ...articleList },
    { id: '7', type: 'break-line', text: '商品列表', ...breakLine },
    { id: '8', type: 'listof', ...productList },
    { id: '9', type: 'listof', ...waterfallList },
    { id: '10', type: 'break-line', text: '精品商家推荐', ...breakLine },
    { id: '11', type: 'listof', ...horizontalList },
    { id: '13', type: 'break-line', text: '线下门店', ...breakLine },
    { id: '14', type: 'store-location', ...storeLocation },
    { id: '14.1', type: 'break-line' },
    { id: '15', type: 'break-line', text: '一道菜', ...breakLine },
    { id: '16', type: 'rich-text', ...richText },

    // { id: '41', type: 'popup', ...popup },
    { id: '9999', type: 'break-line' },
    { id: '9999.1', type: 'white-space' },
    { id: '9999.2', type: 'white-space' },
    { id: '9999.3', type: 'footer-tabs', ...footer },
  ],
}

export default mockGenericPageData
