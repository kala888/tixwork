import { useEffect, useState } from 'react';
import NavigationBox from '@/components/navigation/navigation-box';
import MockService from '@/nice-router/request/mock-service';
import ServerImage from '@/server-image/server-image';
import { usePageTitle, usePullDown } from '@/service/use-service';
import { ApiConfig } from '@/utils/config';
import { View } from '@tarojs/components';
import { useSelector } from 'react-redux';
import { useDidShow } from '@tarojs/taro';
import NavigationService from '@/nice-router/navigation-service';
import { isNotEmpty } from '@/nice-router/nice-router-util';
import EleActionList from '@/components/elements/action-list/ele-action-list';
import Listof from '@/listof/listof';
import { EleButtonProps } from '@/components/elements/ele-button';
import './me.scss';

const Box_Navigator_List = [
  {
    id: '4',
    code: 'FINE_DECORATION',
    imageUrl: MockService.randomImage(),
    title: '发起申请',
  },
  {
    id: '3',
    code: 'BIZ_CHAIN',
    icon: 'app-2',
    title: '我发起',
  },
];

const LineItem_Navigator_List = [
  {
    id: '1',
    code: 'my-wrong-list',
    icon: 'app',
    title: '我参与的项目',
  },
  {
    id: '2',
    code: 'my-favorite-list',
    icon: 'app-2',
    title: '我的收藏',
  },
];

function MePage() {
  // @ts-ignore
  const root = useSelector((state) => state.me);
  const [footerActionList, setFooterActionList] = useState<EleButtonProps[]>([]);

  const refresh = () => NavigationService.ajax(ApiConfig.FooterMe);

  usePageTitle(root);
  usePullDown(ApiConfig.FooterMe);
  useDidShow(refresh);

  const handleGoLogin = () => NavigationService.navigate('/pages/login/login-page');
  const handleLogout = () => {
    NavigationService.dispatch('app/logout');
    NavigationService.dispatch('me/clear');
    NavigationService.ajax(ApiConfig.Logout);
  };

  useEffect(() => {
    if (isNotEmpty(root)) {
      setFooterActionList([{ id: 'goLogout', title: '退出登录', onClick: handleLogout }]);
    } else {
      setFooterActionList([{ id: 'goLogin', title: '去登陆', onClick: handleGoLogin }]);
    }
  }, [root]);

  const {
    boxNavigatorList = Box_Navigator_List,
    navigationLineItems = LineItem_Navigator_List,
    name = '用户A',
    brief = '超级管理员',
    avatar,
  } = root;

  return (
    <View className='me-page'>
      <View className='me-page-header'>
        <View className='me-page-header-info'>
          <ServerImage className='me-avatar' src={avatar || MockService.randomImage()} />
          <View className='me-title'>
            <View className='me-title-name'>{name}</View>
            <View className='me-title-brief'>{brief}</View>
          </View>
        </View>

        <View className='me-page-header-actions'>
          <NavigationBox items={boxNavigatorList} />
        </View>
      </View>

      <View className='me-page-body'>
        <Listof items={navigationLineItems} displayMode='navigation-line' />
      </View>

      <EleActionList mode='full' items={footerActionList} />
    </View>
  );
}

export default MePage;
