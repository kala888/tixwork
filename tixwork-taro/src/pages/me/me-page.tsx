import { View } from '@tarojs/components';
import ProfileInfo from '@/pages/me/profile-info';
import NavigationBox from '@/components/navigation/navigation-box';
import ActionIcon from '@/components/action-icon/action-icon';
import EleActionList from '@/components/elements/action-list/ele-action-list';
import ApiConfig from '@/utils/api-config';
import { useAjaxPullDown, usePageTitle } from '@/service/use-service';
import { useDidShow } from '@tarojs/taro';
import NavigationService from '@/nice-router/navigation-service';
import AuthTools from '@/utils/auth-tools';
import Q from '@/http/q';
import ObjectUtils from '@/utils/object-utils';
import NavigationLine from '@/listof/templates/navigation-line/navigation-line';
import { Profile } from '@/types';
import { useState } from 'react';
import _ from 'lodash';

import './me.less';

const defaultOrderActions = [
  {
    id: '1',
    code: 'PAY',
    icon: 'bizfont-wait-to-pay',
    title: '待付款',
    onClick: () => NavigationService.goPage('/pages/order/order-list-page', { status: 'PAY' }),
  },
  {
    id: '2',
    code: 'DELIVERY',
    icon: 'bizfont-wait-for-delivery',
    title: '待发货',
    onClick: () => NavigationService.goPage('/pages/order/order-list-page', { status: 'DELIVERY' }),
  },
  {
    id: '3',
    code: 'RECEIVE',
    icon: 'bizfont-wait-receive',
    title: '待收货',
    onClick: () => NavigationService.goPage('/pages/order/order-list-page', { status: 'RECEIVE' }),
  },
  {
    id: '4',
    code: 'RETURN',
    icon: 'bizfont-return',
    title: '售后',
    onClick: () => NavigationService.goPage('/pages/order/order-list-page', { status: 'RETURN' }),
  },
];

export default function MePage() {
  const [data, setData] = useState<Profile>({} as any);

  const refresh = () => {
    Q.get(ApiConfig.Me).then((res) => {
      setData(res.data);
    });
  };

  usePageTitle(data);
  useAjaxPullDown(refresh);
  useDidShow(refresh);

  const { customerType, lineActions = [], nickName = '未登录', avatar, mobile, userId, orderActions } = data || {};
  const isLogin = ObjectUtils.isNotEmpty(userId);

  const goToLogin = () => NavigationService.goPage('/pages/login/login-page');

  const handleLogout = async () => {
    await AuthTools.logout();
    await NavigationService.dispatch('me/clear');
    await Q.post(ApiConfig.Logout);
    setData({} as any);
  };

  const footerActionList = isLogin
    ? [{ id: 'goLogout', title: '退出登录', onClick: handleLogout }]
    : [{ id: 'goLogin', title: '去登陆', onClick: goToLogin }];

  const handleViewOrders = () => NavigationService.goPage('/pages/order/order-list-page', { status: 'ALL' });
  const goToAboutUs = () => NavigationService.goPage('/pages/me/about-us');

  const theOrderActions = defaultOrderActions.map((it) => {
    const item = _.find(orderActions, { code: it.code }) || it;
    // @ts-ignore
    const quantity = _.toNumber(item?.brief);
    return {
      ...it,
      ...item,
      badge: quantity > 0 ? quantity : undefined,
    };
  });

  return (
    <View className={'me-page'}>
      <ProfileInfo nickName={nickName} avatar={avatar} mobile={mobile} customerType={customerType} />

      <View className='me-page-body'>
        {isLogin && (
          <View className='my-orders'>
            <NavigationBox
              title={'全部订单'}
              icon={<ActionIcon icon='bizfont-orders' />}
              onClick={handleViewOrders}
              items={theOrderActions}
            />
          </View>
        )}

        <View className='my-actions'>
          {lineActions.map((it) => (
            <NavigationLine key={it.code} title={it.title} prefixIcon={it.icon} linkToUrl={it.linkToUrl} />
          ))}
          <NavigationLine title='联系客服' prefixIcon={'bizfont-customer-center'} openType='contact' />
          <NavigationLine title='关于我们' prefixIcon={'bizfont-about-us'} onClick={goToAboutUs} />
        </View>
      </View>
      <View className='me-page-footer'>
        <EleActionList mode='full' items={footerActionList} />
      </View>
    </View>
  );
}
