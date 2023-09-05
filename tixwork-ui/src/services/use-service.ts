import BizSchema from '@/biz-models/biz-schema';
import ObjectUtils from '@/utils/object-utils';
import { useSearchParams } from '@umijs/max';
import { TabsProps } from 'antd';
import _ from 'lodash';
import useMergedState from 'rc-util/es/hooks/useMergedState';
import { useEffect, useRef, useState } from 'react';

type VoidFn = () => void;

export const usePageTitle = (title, brief: any = '') => {
  const list = [title, _.isString(brief) && brief, BizSchema.Root?.title];
  const content = list.filter((it) => ObjectUtils.isNotEmpty(it)).join('-');
  setTimeout(() => {
    document.title = content;
  }, 200);
};

type useOpenType = (
  value?: boolean,
  options?: {
    value: boolean;
    onChange: (v: boolean) => void;
  },
) => {
  open: boolean;
  show: VoidFn;
  close: VoidFn;
  toggle: VoidFn;
  setOpen: (v: boolean) => void;
};

// boolean类型的控制属性，show，close，toggle
export const useOpen: useOpenType = (initial = false, options) => {
  const [visible, setVisible] = useMergedState(initial, options);
  const show = () => setVisible(true);
  const close = () => setVisible(false);
  const toggle = () => setVisible(!visible);
  return {
    open: visible,
    setOpen: setVisible,
    show,
    close,
    toggle,
  };
};

export function useLoading(initial = false): {
  loading: boolean;
  showLoading: VoidFn;
  hideLoading: VoidFn;
} {
  const [loading, setLoading] = useState(initial);
  const showLoading = () => setLoading(true);
  const hideLoading = () => setLoading(false);
  return {
    loading,
    showLoading,
    hideLoading,
  };
}

// 倒计时
export function useCountdown(maxCount = 60, onEndOfCounting?: () => void) {
  const [second, setSecond] = useState(maxCount);
  const [counting, setCounting] = useState(false);
  const interval = useRef();

  const startCount = () => setCounting(true);

  useEffect(() => {
    if (!counting) {
      return;
    }
    setCounting(true);
    console.log('countdown....run');
    // @ts-ignore
    interval.current = setInterval(() => {
      setSecond((t) => {
        const result = t - 1;
        console.log('countdown....run....', result);
        if (result === 0) {
          clearInterval(interval.current);
          setCounting(false);
          if (_.isFunction(onEndOfCounting)) {
            onEndOfCounting();
          }
          return maxCount;
        }
        return result;
      });
    }, 1000);
    // eslint-disable-next-line consistent-return
    return () => clearInterval(interval.current);
  }, [counting, maxCount, onEndOfCounting]);
  return {
    second,
    counting,
    startCount,
  };
}

export function useTabsWithView(items: TabsProps['items'], defaultTab: string) {
  const [view, setView] = useState<string>(defaultTab);
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedViewKey = (searchParams.get('view') || defaultTab) as string;
  useEffect(() => {
    const selectedTab = items?.find((it) => it.key === selectedViewKey);
    if (selectedTab) {
      setView(selectedViewKey);
    } else {
      setView(defaultTab);
    }
  }, [selectedViewKey]);

  const changeView = (v) => {
    setView(v);
    setSearchParams({ view: v as any });
  };
  return {
    activeKey: view,
    onChange: changeView,
    items,
  };
}
