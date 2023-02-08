import EleCarousel from '@/components/elements/ele-carousel';
import ActionFloor from '@/components/biz/action-floor';
import SectionBar from '@/components/section-bar/section-bar';
import Listof from '@/listof/listof';
import { useAjaxPullDown, usePageTitle } from '@/service/use-service';
import { View } from '@tarojs/components';
import useModel from '@/model/use-model';
import { CommonModel } from '@/model/models';
import { useEffect } from 'react';
import NavigationService from '@/nice-router/navigation-service';
import './home.less';

type HomeDataType = {
  slideList: any[];
  actionList: any[];
  productList: any[];
};

function HomePage(props) {
  const { root } = useModel<CommonModel<HomeDataType>>('home');

  usePageTitle(root);
  useAjaxPullDown(props);

  console.log('root....', root);
  useEffect(() => {
    NavigationService.ajax('mock-home-page/');
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

  const { slideList = [], actionList = [], productList = [] } = root;

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
