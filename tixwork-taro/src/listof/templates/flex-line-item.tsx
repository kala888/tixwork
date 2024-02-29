import React, { useEffect, useRef, useState } from 'react';
import _ from 'lodash';
import ActionUtil from '@/utils/action-util';
import NavigationService from '@/nice-router/navigation-service';
import { View } from '@tarojs/components';

import { getExtMode } from '@/nice-router/nice-router-utils';
import FlexInfoList from '@/components/info-list/flex-info-list';

import ListofUtil from '../listof-util';
import AutoTemplate from './auto/auto-template';
import CardTemplate from './card/card-template';
import RichTextTemplate from './rich-text-template';
import ObjectPickerItem from './card/object-picker-item';
import ObjectPickerPopupItem from './card/object-picker-popup-item';
import ProductItem from './product/product-item';
import NavigationLine from './navigation-line/navigation-line';

import './flex-line-item.less';
import Spin from '@/components/spin';
import OrderItem from '@/listof/templates/order-item/order-item';

export type FlexLineItemProps = {
  id?: string;
  hashCode?: string;
  item?: any;
  bordered?: boolean;
  horizontal?: boolean;
  className?: string;
  displayMode?: string;
  index?: number;
  onItemClick?: Function;
  [key: string]: any;
};

function FlexLineItem(props: FlexLineItemProps) {
  const [loading, setLoading] = useState(false);
  const timer = useRef();

  const { id, hashCode } = props;

  useEffect(() => {
    return () => clearTimeout(timer.current);
  }, [id, hashCode]);

  const startLoading = () => {
    if (timer.current) {
      clearTimeout(timer.current);
    }
    setLoading(true);
    // @ts-ignore
    timer.current = setTimeout(() => stopLoading(), 3000);
  };
  const stopLoading = () => setLoading(false);

  const { onItemClick, item = {}, bordered = true, horizontal, className, ...others } = props;
  const displayMode = _.get(item, 'displayMode', props.displayMode || 'auto')
    .toLowerCase()
    .trim();

  // 使用节流，3面内的点击只算一次
  const handleClick = _.throttle(() => {
    console.log('item....click');
    if (onItemClick) {
      onItemClick(item);
      return;
    }

    if (ListofUtil.isSelfHoldClickTemplate(displayMode, item)) {
      return;
    }

    if (ActionUtil.isActionLike(item)) {
      startLoading();
      NavigationService.view(
        item,
        {},
        {
          statInPage: item.ajax,
          onSuccess: () => stopLoading(),
        }
      );
    }
  }, 3000);

  const wrapperClass = getExtMode({ 'no-border': !bordered }).classNames('flex-line-item', className, {
    click: ActionUtil.isActionLike(item),
  });

  const itemProps = { ...others, horizontal, item };
  const itemWidth = ListofUtil.getItemWidth(displayMode);

  return (
    <View onClick={handleClick} className={wrapperClass} style={{ width: itemWidth }}>
      {displayMode === 'auto' && <AutoTemplate {...itemProps} />}

      {displayMode === 'only-title' && <AutoTemplate showImageCount={0} {...itemProps} />}
      {displayMode === 'single-image' && <AutoTemplate showImageCount={1} {...itemProps} />}
      {displayMode === 'double-image' && <AutoTemplate showImageCount={2} {...itemProps} />}
      {displayMode === 'three-image' && <AutoTemplate showImageCount={3} {...itemProps} />}
      {displayMode === 'image-on-bottom' && <AutoTemplate {...itemProps} mode='image-on-bottom' />}
      {displayMode === 'image-on-top' && <AutoTemplate {...itemProps} />}
      {displayMode === 'article-small' && <AutoTemplate {...itemProps} mode='small' />}

      {displayMode === 'card' && <CardTemplate {...itemProps} />}
      {displayMode === 'image-on-left' && <CardTemplate {...itemProps} />}
      {displayMode === 'document' && <CardTemplate {...itemProps} />}

      {displayMode === 'navigation-line' && <NavigationLine {...itemProps} {...item} />}

      {displayMode === 'big-card' && <CardTemplate {...itemProps} mode={['horizontal', 'large']} />}
      {displayMode === 'h-card' && <CardTemplate {...itemProps} mode={['horizontal']} />}
      {displayMode === 'v-card' && <CardTemplate {...itemProps} mode={['vertical']} />}
      {displayMode === 'user' && <CardTemplate {...itemProps} mode={['horizontal', 'circle', 'avatar']} />}

      {displayMode === 'rich-text' && <RichTextTemplate {...itemProps} {...item} />}
      {displayMode === 'object-picker' && <ObjectPickerItem {...itemProps} />}
      {displayMode === 'object-picker-popup' && <ObjectPickerPopupItem {...itemProps} />}
      {displayMode === 'info-list' && <FlexInfoList {...item} foldable />}

      {displayMode === 'product' && <ProductItem {...itemProps} {...item} />}

      {displayMode === 'order' && <OrderItem itemProps={itemProps} order={item as any} />}

      {loading && (
        <View className='inline-loading'>
          <Spin size='large' />
        </View>
      )}
    </View>
  );
}

export default React.memo(FlexLineItem);
