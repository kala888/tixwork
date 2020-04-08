import Taro, { useEffect, usePullDownRefresh, useState } from '@tarojs/taro'
import Config from '@/utils/config'
import { ajaxPullDownRefresh } from '@/utils/index'

export function useVisible(initial = false) {
  const [visible, setVisible] = useState(initial)
  const show = () => setVisible(true)
  const close = () => setVisible(false)
  const toggle = () => setVisible(!visible)
  return {
    visible,
    show,
    close,
    toggle,
  }
}

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
