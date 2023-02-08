import { useEffect, useState } from 'react';
import NavigationBox from '@/components/navigation/navigation-box';
import ServerImage from '@/server-image/server-image';
import { usePageTitle, usePullDown } from '@/service/use-service';
import ApiConfig from '@/utils/api-config';
import { View } from '@tarojs/components';
import { useDidShow } from '@tarojs/taro';
import NavigationService from '@/nice-router/navigation-service';
import { isNotEmpty } from '@/utils/object-utils';
import EleActionList from '@/components/elements/action-list/ele-action-list';
import Listof from '@/listof/listof';
import { EleButtonProps } from '@/components/elements/ele-button';
import MockService from '../../http/mock-service';
import useModel from '@/model/use-model';
import Q from '@/http/q';
import AuthTools from '@/utils/auth-tools';
import './me.less';

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
  const { root = {} as any } = useModel('me');
  const [footerActionList, setFooterActionList] = useState<EleButtonProps[]>([]);

  const refresh = () => NavigationService.ajax(ApiConfig.FooterMe);

  usePageTitle(root);
  usePullDown(ApiConfig.FooterMe);
  useDidShow(refresh);

  const handleGoLogin = () => NavigationService.goPage('/pages/login/login-page');
  const handleLogout = async () => {
    await AuthTools.logout();
    await NavigationService.dispatch('me/clear');
    await Q.get(ApiConfig.Logout);
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
