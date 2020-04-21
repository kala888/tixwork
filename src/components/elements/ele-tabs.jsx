import { useState } from '@tarojs/taro'
import { AtTabs } from 'taro-ui'
import NavigationService from '@/nice-router/navigation.service'
import { LoadingType } from '@/nice-router/nice-router-util'

function EleTabs({ tabs }) {
  const selectedIdx = tabs.findIndex((it) => it.selected)
  const { current, setCurrent } = useState(selectedIdx)

  const handelTabSwitch = (index) => {
    setCurrent(index)
    const tab = tabs[index]
    NavigationService.ajax(
      tab,
      {},
      {
        loading: LoadingType.barLoading,
      }
    )
  }

  const scroll = tabs.length > 4
  return (
    tabs.length > 0 && (
      <AtTabs animated={false} current={current} scroll={scroll} tabList={tabs} onClick={handelTabSwitch} />
    )
  )
}

EleTabs.defaultProps = {
  tabs: [],
}
export default EleTabs
