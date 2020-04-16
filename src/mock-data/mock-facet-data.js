const mockCategory = [
  {
    id: '0',
    name: '全部',
    icon: 'iconmumen',
  },
  {
    id: '2',
    name: '定制家居我牛逼',
    icon: 'iconmumen',
  },
  {
    id: '3',
    name: '木门',
    icon: 'iconmumen',
  },
  {
    id: '4',
    name: '铝门窗',
    icon: 'iconlvbaomupingkaichuang',
  },
  {
    id: '5',
    name: '卫浴',
    icon: 'iconweiyu',
  },
  {
    id: '6',
    name: '地板',
    icon: 'icondiban',
  },
  {
    id: '7',
    name: '电器/照明',
    icon: 'iconzhinengjiaju',
  },
  {
    id: '8',
    name: '吊顶',
    icon: 'icondiaoding',
  },
  {
    id: '9',
    name: '墙纸/墙布',
    icon: 'iconqiangzhi',
  },
  {
    id: '10',
    name: '陶瓷',
    icon: 'iconcizhuan',
  },
  {
    id: '11',
    name: '橱柜',
    icon: 'iconchugui',
  },
  {
    id: '12',
    name: '硅藻泥',
    icon: 'iconzhaoshangxiaochengxu-guizaoni',
  },
  {
    id: '13',
    name: '楼梯',
    icon: 'iconkujialeqiyezhan_jichengqiangmiansheji',
  },
  {
    id: '14',
    name: '淋浴房',
    icon: 'iconxinfeng',
  },
  {
    id: '15',
    name: '五金配件',
    icon: 'iconwujingongju',
  },
  {
    id: '16',
    name: '窗帘',
    icon: 'iconyoupinwangtubiao-',
  },
  {
    id: '17',
    name: '成品家具',
    icon: 'iconjiaju',
  },
  {
    id: '18',
    name: '晾衣架',
    icon: 'iconliangyijia',
  },
  {
    id: '19',
    name: '净水器',
    icon: 'iconjingshuiqi',
  },
  {
    id: '20',
    name: '集成墙面',
    icon: 'iconkujialeqiyezhan_jichengqiangmiansheji',
  },
  {
    id: '21',
    name: '油漆/涂料',
    icon: 'icontuliao',
  },
  {
    id: '22',
    name: '其它类别',
    icon: 'icongengduo',
  },
  {
    id: '23',
    name: '全铝定制',
    icon: 'iconmugongbancai',
  },
  {
    id: '24',
    name: '智能家居',
    icon: 'iconziyuan',
  },
  {
    id: '25',
    name: '集成灶',
    icon: 'iconjichengzao-',
  },
  {
    id: '26',
    name: '建材',
    icon: 'iconpingtai_jicheng',
  },
  {
    id: '27',
    name: '管线',
    icon: 'iconguandao',
  },
  {
    id: '28',
    name: '照明',
    icon: 'iconhuo',
  },
]
const mockPriceFacet = [
  { id: 'price-1', name: '5万以下' },
  { id: 'price-2', name: '5-10万' },
  { id: 'price-3', name: '10-25万' },
  { id: 'price-4', name: '25万以上' },
]
const mockAreaFacet = [
  { id: 'area-1', name: '大源片区' },
  { id: 'area-2', name: '中和片区' },
  { id: 'area-3', name: '市中心' },
  { id: 'area-4', name: '万安镇' },
]
const mockFacetData = {
  code: 'category',
  title: '类别',
  list: mockCategory,
  facetList: [
    { id: 2, code: 'price', title: '价格区间', list: mockPriceFacet },
    { id: 3, code: 'area', title: '所在区域', list: mockAreaFacet },
  ],
}
export default mockFacetData
