import Taro, { useEffect, usePullDownRefresh } from '@tarojs/taro'
import Config from '@/utils/config'
import { ajaxPullDownRefresh } from '@/utils/index'

export function usePageTitle(title = Config.name) {
  useEffect(() => {
    Taro.setNavigationBarTitle({
      title: title,
    })
  }, [title])
}

export function usePullDown(action) {
  usePullDownRefresh(() => {
    ajaxPullDownRefresh(action)
  })
}
