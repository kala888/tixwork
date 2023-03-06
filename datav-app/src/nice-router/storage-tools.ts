import AsyncStorage from '@react-native-community/async-storage'
import _ from 'lodash'
import { SHA1 } from 'crypto-es/lib/sha1.js'

const CACHE_PREFIX = ''
const CACHE_EXPIRATION_PREFIX = 'exp-'
const EXPIRY_UNITS = 1000 // seconds

const ONE_YEAR = 60 * 24 * 365


const getKeys = _.memoize((key = '') => {
  const short = SHA1(key).toString()
  console.log('SHA1(key).toString()', short)
  const theKey = CACHE_PREFIX + short
  const exprKey = CACHE_EXPIRATION_PREFIX + short
  return { theKey, exprKey }
})

const currentTime = () => Math.floor(new Date().getTime() / EXPIRY_UNITS)

const fail = () => Promise.reject(null)


const StorageTools = {
  PageCachePrefix: 'page-cache-',

  get(key: string, defaultValue?: any) {
    const { exprKey, theKey } = getKeys(key)
    return AsyncStorage.getItem(exprKey)
      .then((expiry) => {
        if (expiry && currentTime() >= parseInt(expiry, 10)) {
          AsyncStorage.multiRemove([exprKey, theKey]).then()
          return Promise.resolve(null)
        }
        return AsyncStorage.getItem(theKey)
          .then((value) =>
            Promise.resolve(value !== null ? JSON.parse(value) : defaultValue),
          )
          .catch(fail)
      })
      .catch(fail)
  },

  set(key: string, value: any = '', time: number = ONE_YEAR) {
    const { exprKey, theKey } = getKeys(key)
    if (time) {
      const strTime = (currentTime() + time).toString()
      return AsyncStorage.setItem(exprKey, strTime)
        .then(() => AsyncStorage.setItem(theKey, JSON.stringify(value)))
        .catch(fail)
    }
    AsyncStorage.removeItem(exprKey).then()
    return AsyncStorage.setItem(theKey, JSON.stringify(value))
  },

  remove(key: string) {
    const { exprKey, theKey } = getKeys(key)
    return AsyncStorage.multiRemove([exprKey, theKey])
  },

  isExpired(key: string) {
    const { exprKey } = getKeys(key)
    return AsyncStorage.getItem(exprKey)
      .then((expiry) => {
        const expired = expiry && currentTime() >= parseInt(expiry, 10)
        return Promise.resolve(expired)
      })
      .catch(fail)
  },

  flush() {
    return AsyncStorage.getAllKeys()
      .then((keys) => {
        const allKeys = keys.filter(
          (key) =>
            key.indexOf(CACHE_PREFIX) === 0 ||
            key.indexOf(CACHE_EXPIRATION_PREFIX) === 0,
        )
        return AsyncStorage.multiRemove(allKeys)
      })
      .catch(fail)
  },

  flushWithPrefix(prefix: String) {
    return AsyncStorage.getAllKeys()
      .then((keys) => {
        const allKeys = keys.filter(
          (key) =>
            key.indexOf(`${CACHE_PREFIX}${prefix}`) === 0 ||
            key.indexOf(`${CACHE_EXPIRATION_PREFIX}${prefix}`) === 0,
        )
        return AsyncStorage.multiRemove(allKeys)
      })
      .catch(fail)
  },

  flushExpired() {
    return AsyncStorage.getAllKeys()
      .then((keys) => {
        keys.forEach((key) => {
          if (key.indexOf(CACHE_EXPIRATION_PREFIX) === 0) {
            const exprKey = key
            return AsyncStorage.getItem(exprKey)
              .then((expiry) => {
                if (expiry && currentTime() >= parseInt(expiry, 10)) {
                  const theKey =
                    CACHE_PREFIX + key.replace(CACHE_EXPIRATION_PREFIX, '')
                  return AsyncStorage.multiRemove([exprKey, theKey])
                }
                return Promise.resolve()
              })
              .catch(fail)
          }
          return Promise.resolve()
        })
      })
      .catch(fail)
  },
}

// Always flush expired items on start time
StorageTools.flushExpired().then()

export default StorageTools

//
// import CacheStore from 'react-native-cache-store';
//
// CacheStore.set('key', 'value', 10); // Expires in 10 minutes
//
// CacheStore.get('key').then((value) => {
//   // Do something with value
// });
//
// CacheStore.isExpired('key')
//   .then(() => {/* true */ })
//   .catch(() => {/* false */})
