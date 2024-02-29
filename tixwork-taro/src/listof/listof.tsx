import NavigationService from '@/nice-router/navigation-service';
import { ScrollView, View } from '@tarojs/components';
import ObjectUtils from '@/utils/object-utils';
import FooterTips from '@/listof/footer-tips';
import { useLoading } from '@/service/use-service';
import ActionUtil from '@/utils/action-util';
import { enrichListOfEntity } from '@/utils';
import FlexLineItem, { FlexLineItemProps } from './templates/flex-line-item';
import { ActionLike } from '@/nice-router/nice-router-types';
import LoadingType from '@/nice-router/loading-type';
import NiceRouterUtils from '@/nice-router/nice-router-utils';
import ListofUtil from './listof-util';
import './listof.less';
import React from 'react';

export type ListofProps = {
  items?: FlexLineItemProps[];
  emptyMessage?: string | React.ReactNode;
  dataContainer?: Record<string, any>;
  listMeta?: ActionLike;
  displayMode?: string;
  onItemClick?: Function;
  horizontal?: boolean;
  longList?: boolean;
  height?: number | string;
  mode?: 'horizontal' | 'vertical';
  className?: string;
  itemProps?: Record<string, any>;
};

function Listof(props: ListofProps) {
  const { loading, showLoading, hideLoading } = useLoading(false);
  const { items = [], emptyMessage } = props;

  if (ObjectUtils.isEmpty(items)) {
    if (ObjectUtils.isEmpty(emptyMessage)) {
      return null;
    }
    return <View className='listof-empty-message'>{emptyMessage}</View>;
  }

  const { itemProps = {}, dataContainer, listMeta = {}, displayMode, onItemClick, horizontal = false } = props;
  const { longList = false, mode, className, height } = props;

  const hasNextPage = ActionUtil.isActionLike(listMeta);
  //longList=无限循环list 展示footer
  let showFooter = longList;
  //但是，如果没有下一页，且list比较小, 就不展示footer了
  if (!hasNextPage && items.length < 15) {
    showFooter = false;
  }

  const loadMore = () => {
    if (!hasNextPage) {
      return;
    }
    showLoading();
    NavigationService.ajax(
      listMeta,
      {},
      {
        loading: LoadingType.BarLoading,
        arrayMerge: 'append',
        onSuccess: () => {
          hideLoading();
        },
      }
    );
  };

  // @ts-ignore
  const flexLineItems = enrichListOfEntity({ dataContainer, targetList: items });

  const itemWidth = ListofUtil.getItemWidth(displayMode);
  const rootClass = NiceRouterUtils.getExtMode({ horizontal }, mode).classNames('listof-view', className);
  const containerClass = NiceRouterUtils.getExtMode({ multiple: itemWidth }).classNames('listof-view-container');

  return (
    <ScrollView
      className={rootClass}
      scrollY={!horizontal}
      scrollX={horizontal}
      lowerThreshold={100}
      onScrollToLower={loadMore}
      style={{ height }}
    >
      <View className={containerClass}>
        {flexLineItems.map((item, index) => (
          <FlexLineItem
            key={`${item.id}_${item.code}_${item.title}`}
            index={index}
            item={item}
            onItemClick={onItemClick}
            displayMode={displayMode}
            horizontal={horizontal}
            {...itemProps}
          />
        ))}
      </View>

      {showFooter && <FooterTips hasNextPage={hasNextPage} loading={loading} onLoadMore={loadMore} />}
    </ScrollView>
  );
}

export default Listof;
