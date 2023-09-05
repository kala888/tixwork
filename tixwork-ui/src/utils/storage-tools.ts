import ObjectUtils from '@/utils/object-utils';
import _ from 'lodash';

const SHA1 = require('sha1');

const setItem = (key: string, value: any) => localStorage.setItem(key, value);
const getItem = (key) => localStorage.getItem(key);
const removeItem = (key) => localStorage.removeItem(key);

const getItemKeys = () => Object.keys(localStorage.valueOf());

const CACHE_PREFIX = '';
const CACHE_EXPIRATION_PREFIX = 'exp-';
const EXPIRY_UNITS = 1000; // seconds

const getKeys = _.memoize((key = '') => {
  const short = SHA1(key).toString();
  console.log('SHA1(key).toString()', short);
  const theKey = CACHE_PREFIX + short;
  const exprKey = CACHE_EXPIRATION_PREFIX + short;
  return { theKey, exprKey };
});

const currentTime = () => Math.floor(new Date().getTime() / EXPIRY_UNITS);

const StorageTools = {
  PageCachePrefix: 'page-cache-',

  get(key: string, defaultValue: any) {
    const { exprKey, theKey } = getKeys(key);
    const expiry = getItem(exprKey);
    if (expiry && currentTime() >= parseInt(expiry, 10)) {
      removeItem(exprKey);
      removeItem(theKey);
      return defaultValue;
    }
    const value = getItem(theKey);
    return ObjectUtils.parseToObject(value, defaultValue);
  },

  /**
   *
   * Taro存储localStorage存的是对象 => {data:''}
   *
   * 所有H5中使用localStorage和Taro交互时候注意存取
   *
   * @param key
   * @param value
   * @param time unit: second
   *
   */
  set(key: string, value: any = '', time?: number) {
    const { exprKey, theKey } = getKeys(key);
    if (time) {
      const strTime = (currentTime() + time).toString();
      setItem(exprKey, strTime);
      setItem(theKey, JSON.stringify(value));
      return;
    }
    removeItem(exprKey);
    setItem(theKey, JSON.stringify(value));
  },

  remove(key: string) {
    const { exprKey, theKey } = getKeys(key);
    removeItem(exprKey);
    removeItem(theKey);
  },

  isExpired(key: string) {
    const { exprKey } = getKeys(key);
    const expiry = getItem(exprKey);
    if (_.isNumber(expiry) && expiry > 0) {
      const expired = expiry && currentTime() >= parseInt(expiry, 10);
      console.log('是否过期？', 1, expired, currentTime());
      return expired;
    }
    return true;
  },
  flush() {
    const keys = getItemKeys();
    // eslint-disable-next-line array-callback-return
    keys.map((key) => {
      const remove = key.indexOf(CACHE_PREFIX) === 0 || key.indexOf(CACHE_EXPIRATION_PREFIX) === 0;
      if (remove) {
        removeItem(key);
      }
    });
  },

  flushExpired() {
    const keys = getItemKeys();
    // eslint-disable-next-line array-callback-return
    keys.map((key) => {
      if (key.indexOf(CACHE_EXPIRATION_PREFIX) === 0) {
        const exprKey = key;
        const expiry = getItem(exprKey);
        if (expiry && currentTime() >= parseInt(expiry, 10)) {
          const theKey = CACHE_PREFIX + key.replace(CACHE_EXPIRATION_PREFIX, '');
          removeItem(exprKey);
          removeItem(theKey);
        }
      }
    });
  },
};

// Always flush expired items on start time
StorageTools.flushExpired();

export default StorageTools;
