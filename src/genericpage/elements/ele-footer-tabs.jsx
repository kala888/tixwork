import { useState } from '@tarojs/taro'
import { AtTabBar } from 'taro-ui'
import NavigationService from '@/nice-router/navigation.service'

function EleFooterTabs({ tabs, onClick }) {
  const [selectedIndex, setSelected] = useState(null)

  const selectTab = (value) => {
    setSelected(value)
    const selected = tabs[value]
    if (onClick) {
      onClick(selected)
      return
    }
    NavigationService.view(selected)
  }

  const current = selectedIndex !== null ? selectedIndex : tabs.findIndex((it) => it.selected)
  const tabList = tabs.map((it) => ({
    ...it,
    image: it.imageUrl,
  }))

  return <AtTabBar fixed tabList={tabList} onClick={selectTab} current={current} />
}

EleFooterTabs.options = {
  addGlobalClass: true,
}
EleFooterTabs.defaultProps = {
  tabs: [],
}
export default EleFooterTabs
