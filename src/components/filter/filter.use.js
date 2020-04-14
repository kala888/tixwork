import { isEmpty, noop } from '@/nice-router/nice-router-util'
import { useEffect, useState } from '@tarojs/taro'

export const useFilter = (initial, onChange = noop) => {
  const [filter, setFilter] = useState(initial)

  const onFilterChange = (value) => {
    setFilter((preState) => {
      const newState = { ...preState, ...value }
      onChange(newState)
      return newState
    })
  }
  return [filter, onFilterChange]
}

export const useFilterTabs = (filter, max, initialTabs = [], fixedFirst) => {
  const [tabs, setTabs] = useState([])
  const [activeTabs, setActiveTabs] = useState([])
  console.log('useFilterTabs1', tabs, initialTabs)

  useEffect(() => {
    setTabs(initialTabs)
  }, [initialTabs])

  useEffect(() => {
    // 这里重新算一下key，不然偶尔会触发，两次渲染后，button的key重复的bug
    const tabsInViewport = findActiveTabs(tabs, filter.selected, max, fixedFirst).map((it, idx) => ({
      key: it.id + '_' + idx,
      ...it,
    }))
    console.log('useFilterTabs2', tabs, tabsInViewport)
    setActiveTabs(tabsInViewport)
  }, [filter, tabs])

  return { tabs, setTabs, activeTabs }
}

export const findActiveTabs = (items = [], selected, max, fixedFirst) => {
  if (isEmpty(items) || items.length <= max) {
    return items
  }
  const tempInx = items.findIndex((it) => it.id === selected.id)
  const selectedIndex = tempInx > -1 ? tempInx : 0
  // 下边界超了，就取max个
  if (selectedIndex < max - 2) {
    return items.slice(0, max)
  }

  const maxItemLength = fixedFirst ? max - 1 : max
  const startIndex = selectedIndex - parseInt(maxItemLength / 2)
  const endIndex = startIndex + maxItemLength
  let result = fixedFirst ? items.slice(0, 1) : []
  if (endIndex > items.length - 1) {
    // 上边界超了，就取，倒数max个
    return result.concat(items.slice(-maxItemLength))
  }
  return result.concat(items.slice(startIndex, startIndex + maxItemLength))
}
