import { useEffect, useState } from 'react';
import SectionBar from '@/components/section-bar/section-bar';
import Listof from '@/listof/listof';
import { View } from '@tarojs/components';

import './styles.less';
import Q from '@/http/q';

function HelloDaaSPage() {
  const [root, setRoot] = useState<any>({});

  useEffect(() => {
    Q.get('mock-listof-test/').then((resp) => setRoot(resp.data));
  }, []);

  const {
    singleItemList = [],
    productList = [],
    newsList = [],
    cardList = [],
    userList = [],
    movieList = [],
    businessCardList = [],
  } = root;
  return (
    <View className='hello-daas'>
      <SectionBar title='卡片-大卡片' brief='big-card' />
      <Listof items={businessCardList} displayMode='big-card' />
      <Listof items={movieList} displayMode='big-card' />

      <SectionBar title='卡片-水平卡片' brief='h-card' />
      <Listof items={singleItemList} displayMode='h-card' />

      <SectionBar title='卡片-垂直卡片(两个装)' brief='v-card' />
      <Listof items={singleItemList} displayMode='v-card' />

      <SectionBar title='卡片-用户卡片' brief='user' />
      <Listof items={userList} displayMode='user' />

      <SectionBar title='基础卡片' brief='card' />
      <View className='note'>通过mode来控制card，获取更多效果</View>
      <View className='note'>
        mode=horizontal|vertical, circle, avatar,vertical-small, small|large,default|normal|primary|warn|darger
      </View>
      <Listof items={cardList} displayMode='card' />

      {/*<SectionBar title='上图+下文字，水平滑动' brief='displayMode：image-on-top-horizontal' />*/}
      <SectionBar title='电商-商品' brief='product' />
      <Listof items={productList} displayMode='product' />

      <SectionBar title='图文-水平滑动' brief='article-small' />
      <Listof items={movieList} displayMode='article-small' horizontal />

      <SectionBar title='通用图文-Auto系列' />
      <View className='note'> displayMode=auto|single-image|double-image|three-image</View>
      <Listof items={newsList} displayMode='auto' />

      <SectionBar title='图片在下方的Auto' brief='image-on-bottom' />
      <Listof items={newsList.slice(1, 2)} displayMode='image-on-bottom' />
    </View>
  );
}

export default HelloDaaSPage;
