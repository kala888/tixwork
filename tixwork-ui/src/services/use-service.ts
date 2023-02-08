import _ from 'lodash';
import { useEffect, useRef, useState } from 'react';

type VoidFn = () => void;

// boolean类型的控制属性，show，close，toggle
export function useVisible(initial = false): {
  visible: boolean;
  show: VoidFn;
  close: VoidFn;
  toggle: VoidFn;
} {
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

// 这只page的title
export function usePageTitle(value) {
  throw new Error('TODO 需要实现' + value);
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
