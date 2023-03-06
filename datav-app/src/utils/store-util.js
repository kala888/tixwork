import AsyncStorage from '@react-native-community/async-storage'

export default class StoreUtil {
  static setData = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value)
    } catch (e) {
      // ToastUtil.show('数据存储失败！');
    }
  }

  static getData = async (key) => {
    try {
      const value = await AsyncStorage.getItem(key)
      if (value !== null) {
        // value previously stored
        return value
      }
    } catch (e) {
      // ToastUtil.show('数据获取储失败！');
    }
  }
  static async getJsonData(key) {
    const p = await AsyncStorage.getItem(key).then((value) => {
      try {
        const jsonValue = JSON.parse(value)
        return jsonValue
      } catch (e) {
        return {}
      }
    })
    return p
  }

  static removeData = async (key) => {
    try {
      await AsyncStorage.removeItem(key)
    } catch (e) {
      // remove error
    }
  }

  static clearAll = async () => {
    try {
      await AsyncStorage.clear()
    } catch (e) {
      // clear error
    }
  }
}
