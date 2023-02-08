import { useEffect, useState } from 'react';
import _ from 'lodash';
import Taro, { useDidShow, useReady } from '@tarojs/taro';
import { isNotEmpty } from '@/utils/object-utils';
import EleActionList from '@/components/elements/action-list/ele-action-list';
import { getDeviceHeight } from '@/utils';
import classNames from 'classnames';
import { useAjaxPullDown, usePageTitle } from '@/service/use-service';
import { View } from '@tarojs/components';
import NavigationService from '@/nice-router/navigation-service';
import { ActionLike, ActionListLike } from '@/nice-router/nice-router-types';
import { EleTabsProps } from '@/components/elements/ele-tabs';
import Config from '@/utils/config';
import Listof, { ListofProps } from './listof';
import FlexLineItem from './templates/flex-line-item';
import FlexHeader from './flex-header';
import './styles.less';

type listofPageBaseProps = {
  pageTitle?: string;
  content?: string;
  searchAction?: Record<string, any>;
  header?: Record<string, string>;
  renderHeader?: Function;
  renderFooter?: Function;
} & ActionListLike &
  ActionLike &
  EleTabsProps &
  ListofProps;

function ListofPageBase(props: listofPageBaseProps) {
  const [height, setHeight] = useState();

  const { pageTitle = Config.name } = props;
  usePageTitle(pageTitle);
  useAjaxPullDown(props);
  useDidShow(() => NavigationService.ajax(props));

  const initialHeight = () => {
    Taro.createSelectorQuery()
      .select('#listof-header')
      .fields({ size: true }, (res) => {
        const deviceHeight = getDeviceHeight();
        const headerHeight = _.isNumber(res.height) ? res.height : 0;
        const footerHeight = isNotEmpty(props.actionList) || _.isFunction(renderFooter) ? 50 : 0;
        const theHeight = deviceHeight - headerHeight - footerHeight;
        console.log(
          'calc the height for listof without header and footer device',
          deviceHeight,
          'header',
          headerHeight,
          'footerHeight',
          footerHeight,
          'theHeight',
          theHeight
        );
        console.log('calc the height for listof without header and footer ', theHeight);
        // @ts-ignore
        setHeight(`${theHeight}px`);
      })
      .exec();
  };
  useReady(() => Taro.nextTick(() => setTimeout(initialHeight, 100)));

  const {
    tabs,
    items,
    listMeta,
    displayMode,
    emptyMessage,
    dataContainer,
    actionList = [],
    content, // rich-text
    searchAction = {},
    header,
    renderHeader,
    renderFooter,
    onItemClick,
  } = props;

  useEffect(() => {
    Taro.nextTick(initialHeight);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [header, searchAction, content, tabs, renderHeader]);

  const theHeader = (
    <>
      {isNotEmpty(header) && <FlexLineItem item={header} {...header} />}
      {isNotEmpty(searchAction) && <FlexHeader {...searchAction} type='search' />}
      {isNotEmpty(content) && <FlexHeader item={{ content }} displayMode='rich-text' />}
      {isNotEmpty(tabs) && <FlexHeader type='tabs' tabs={tabs} />}
    </>
  );
  const theFooter = <EleActionList mode={['footer-bar', 'colorful']} items={actionList} />;

  const rootClass = classNames('listof-page', classNames);

  return (
    <View className={rootClass}>
      <View id='listof-header'>{renderHeader ? renderHeader() : theHeader}</View>
      <Listof
        dataContainer={dataContainer}
        items={items}
        listMeta={listMeta}
        displayMode={displayMode}
        emptyMessage={emptyMessage}
        height={height}
        longList
        onItemClick={onItemClick}
      />
      <View id='listof-footer'> {renderFooter ? renderFooter() : theFooter}</View>
    </View>
  );
}

export default ListofPageBase;
