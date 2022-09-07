import { useEffect } from 'react';
import NavigationService from '@/nice-router/navigation-service';
import { View } from '@tarojs/components';
import { Current } from '@tarojs/taro';
import _ from 'lodash';
import ListofPageBase from '@/listof/listof-page-base';
import Listof from '@/listof/listof';
import { useVisible } from '@/service/use-service';

import useModel from '@/model/use-model';
import LoadingType from '@/nice-router/loading-type';
import FloatLayout from '@/components/float-layout';
import './object-picker-page.less';

function ObjectPickerPage() {
  const { visible, close, show } = useVisible(false);
  const { root = {} as any } = useModel('objectPicker');

  // q如果变化了，就发送一个后台请求
  // @ts-ignore
  const { linkToUrl } = Current.router.params;
  // @ts-ignore
  useEffect(() => {
    if (linkToUrl) {
      NavigationService.ajax(
        linkToUrl,
        {},
        {
          loading: LoadingType.Modal,
        }
      );
    }
    return () => NavigationService.dispatch('objectPicker/clear');
  }, [linkToUrl]);

  const { selectedItems = [], inbound = {} } = root;
  const { list = [], maxSelectCount } = inbound;

  const handleCommit = async () => await NavigationService.back(selectedItems);

  const actionList = [
    { id: 'object-action-1', title: `已选 ${selectedItems.length}`, onClick: show },
    { id: 'object-action-2', title: `确定`, onClick: handleCommit },
  ];

  const theList = list.map((it) => ({
    ...it,
    checked: _.findIndex(selectedItems, { id: it.id }) > -1,
  }));

  return (
    <View className='object-picker'>
      <ListofPageBase {...inbound} list={theList} displayMode='object-picker' actionList={actionList} />
      <FloatLayout
        className='large-float-layout'
        visible={visible}
        onCancel={close}
        title={`已选择，最多可选${maxSelectCount}`}
      >
        <Listof items={selectedItems} displayMode='object-picker-popup' emptyMessage='还没有选择！' />
        <View className='object-picker-popup-bottom' />
      </FloatLayout>
    </View>
  );
}

export default ObjectPickerPage;
