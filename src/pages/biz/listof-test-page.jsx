import Listof from '@/listof/listof'
import SectionBar from '@/components/section-bar/section-bar'
import { View } from '@tarojs/components'
import './styles.scss'
import { mockBusinessCardList, mockImageOnBottomList, mockMovieList, mockNewsList, mockProductList, mockUserList } from './mock-data/mock-list.data'

function HelloDaaSPage() {
  const mockList = mockUserList.map((it) => ({ ...it, linkToUrl: 'https://www.baidu.com/' }))
  return (
    <View className='hello-daas'>
      <SectionBar title='用户卡片' brief='displayMode：user' />
      <Listof list={mockList} displayMode='user' />

      <SectionBar title='卡片' brief='displayMode：card' />
      <Listof list={mockBusinessCardList} displayMode='card' />

      <SectionBar title='文件卡片' brief='displayMode：card，documentUrl不为空' />
      <Listof list={mockMovieList} displayMode='card' />

      <SectionBar title='上图+下文字，水平滑动' brief='displayMode：image-on-top-horizontal' />
      <Listof list={mockNewsList.slice(0, 3)} horizontal displayMode='image-on-top-horizontal' />

      <SectionBar title='上图+下文字 两排' brief='displayMode：image-on-top-waterfall' />
      <Listof list={mockNewsList.slice(0, 3)} displayMode='image-on-top-waterfall' />

      <SectionBar title='上图+下文字' brief='displayMode：image-on-top' />
      <Listof list={mockNewsList.slice(0, 2)} displayMode='image-on-top' />

      <SectionBar title='上文字+下图' brief='displayMode：image-on-bottom' />
      <Listof list={mockImageOnBottomList} displayMode='image-on-bottom' />

      <SectionBar title='商品' brief='displayMode：product' />
      <Listof list={mockProductList} displayMode='product' />

      <SectionBar title='Auto系列' brief='displayMode：auto|single-image|double-image|three-image' />
      <Listof list={mockNewsList} displayMode='auto' />
    </View>
  )
}

HelloDaaSPage.options = {
  addGlobalClass: true,
}
export default HelloDaaSPage
