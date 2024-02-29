import { useEffect } from 'react';
import NavigationService from '@/nice-router/navigation-service';
import { useAjaxPullDown, usePageTitle } from '@/service/use-service';
import { View } from '@tarojs/components';
import Taro, { useShareAppMessage } from '@tarojs/taro';
// import Config from '@/nice-router/nice-router.config';
import classNames from 'classnames';
import _ from 'lodash';
import Config from '@/utils/config';
import ApiConfig from '@/utils/api-config';
import EleFlex from './ele-flex';
import './styles.less';

function GenericPageBase(props) {
  console.log('generic page', props);
  const { pageTitle = Config.name, pageLinkToUrl = ApiConfig.Home } = props;
  usePageTitle(pageTitle);
  useAjaxPullDown(props);

  // q如果变化了，就发送一个后台请求
  const { q } = Taro.useRouter().params;
  useEffect(() => {
    if (q) {
      const uri = decodeURIComponent(q);
      NavigationService.view(uri);
    }
  }, [q]);

  useShareAppMessage((res) => {
    if (res.from === 'button') {
      const shareAction: any = _.get(res, 'target.dataset.extraData', {});
      const { title, linkToUrl, imageUrl } = shareAction;
      const encodePath = encodeURIComponent(linkToUrl || pageLinkToUrl);
      return {
        title: title || pageTitle,
        path: `/pages/generic-page?q=${encodePath}`,
        imageUrl,
      };
    }
    const encodePath = encodeURIComponent(pageLinkToUrl);
    return {
      title: pageTitle,
      path: encodePath,
    };
  });

  const { className } = props;
  const rootClass = classNames('generic-page', className);
  return (
    <View className={rootClass}>
      <EleFlex {...props} />
    </View>
  );
}

export default GenericPageBase;
