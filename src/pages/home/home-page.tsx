import EleCarousel from '@/components/elements/ele-carousel';
import ActionFloor from '@/components/biz/action-floor';
import SectionBar from '@/components/section-bar/section-bar';
import Listof from '@/listof/listof';
import { useAjaxPullDown, usePageTitle } from '@/service/use-service';
import { View } from '@tarojs/components';
import { useEffect, useState } from 'react';
import './home.less';
import useResource from '@/http/use-resource';

type HomeDataType = {
  slideList: any[];
  actionList: any[];
  productList: any[];
};

function HomePage(props) {
  const [root, setRoot] = useState<HomeDataType>();
  const resource = useResource<HomeDataType>('user');
  // const { root } = useModel<CommonModel<HomeDataType>>('home');

  usePageTitle(root);
  useAjaxPullDown(props);

  console.log('root....', root);
  useEffect(() => {
    // NavigationService.ajax('mock-home-page/');
    resource.get(1).then(resp => {
      setRoot(resp);
    });

  }, []);

  //
  // useEffect(() => {
  //   NavigationService.ajax(
  //     'mock-home-page/',
  //     {},
  //     {
  //       onSuccess: (data, resp) => {
  //         console.log('ajax....,', data, resp);
  //       },
  //     }
  //   );
  //   // HttpRequest.customRequest(ApiConfig.FooterHome).then((resp) => {
  //   //   console.log('resp111....,', resp);
  //   //   console.log('resp1111....,', resp.responseData);
  //   // });
  //   //
  //   // Q.get<HomeData>(ApiConfig.FooterHome).then((resp) => {
  //   //   console.log('resp222....,', resp);
  //   //   console.log('resp2222....,', resp.data.slideList);
  //   // });
  // }, []);

  const { slideList = [], actionList = [], productList = [] } = root || data;

  return (
    <View className='home-page'>
      <EleCarousel className='home-page-carousel' items={slideList} />
      <View className='home-page-action-floor'>
        <ActionFloor actionList={actionList} />
        <SectionBar title='促销抢购' linkToUrl='page:///pages/biz/listof-test-page' />
        <Listof items={productList} displayMode='product' />
      </View>
    </View>
  );
}

export default HomePage;
