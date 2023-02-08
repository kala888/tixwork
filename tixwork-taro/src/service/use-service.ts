import { useEffect, useRef, useState } from 'react';
import NavigationService from '@/nice-router/navigation-service';
import _ from 'lodash';
import Taro from '@tarojs/taro';
import ActionUtil from '@/utils/action-util';
import Config from '@/utils/config';
import LoadingType from '@/nice-router/loading-type';

// boolean类型的控制属性，show，close，toggle
export function useVisible(initial = false) {
  const [visible, setVisible] = useState(initial);
  const show = () => setVisible(true);
  const close = () => setVisible(false);
  const toggle = () => setVisible(!visible);
  return {
    visible,
    show,
    close,
    toggle,
  };
}

export function useLoading(initial = false) {
  const [loading, setLoading] = useState(initial);
  const hideLoading = () => setLoading(false);
  const showLoading = (timeout?: any) => {
    setLoading(true);
    if (timeout) {
      setTimeout(() => hideLoading(), timeout);
    }
  };
  return {
    loading,
    showLoading,
    hideLoading,
  };
}

// 这只page的title
export function usePageTitle(value) {
  useEffect(() => {
    let theTitle = _.isString(value) ? value : value?.pageTitle || value?.title || Config.name;
    Taro.setNavigationBarTitle({
      title: theTitle || Config.name,
    });
  }, [value]);
}

export function useAjaxPullDown(action: any) {
  usePullDown(action, true);
}

export function usePullDown(action: any, ajax?: boolean) {
  Taro.usePullDownRefresh(() => {
    if (!ActionUtil.isActionLike(action)) {
      Taro.stopPullDownRefresh();
      return;
    }

    NavigationService.view(
      action,
      {},
      {
        dataRefresh: true,
        statInPage: ajax,
        onSuccess: () => Taro.stopPullDownRefresh(),
        loading: LoadingType.Modal,
      }
    );
  });
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
          if (onEndOfCounting) {
            onEndOfCounting();
          }
          return maxCount;
        }
        return result;
      });
    }, 1000);
    return () => clearInterval(interval.current);
  }, [counting, maxCount, onEndOfCounting]);
  return {
    second,
    counting,
    startCount,
  };
}
