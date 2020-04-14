import { View } from '@tarojs/components'
import PropTypes from 'prop-types'
import { AtDrawer, AtIcon } from 'taro-ui'
import { useVisible } from '@/service/use.service'
import { noop } from '@/nice-router/nice-router-util'
import classNames from 'classnames'
import './filter-bar.scss'
import { useFilter, useFilterTabs } from './filter.use'

const DEFAULT_FILTER_STATUS = {
  selected: { id: '0' },
}

function FilterBar({ items, onChange, fixedFirst = true }) {
  console.log('initial filterbar', items)
  // filter
  const [filter, onFilterChange] = useFilter(DEFAULT_FILTER_STATUS, onChange, true)
  const { tabs, activeTabs } = useFilterTabs(filter, 4, items, fixedFirst)
  const { visible, show, close } = useVisible(false)

  return (
    <View>
      <View className='filter-tabs'>
        {activeTabs.map((item) => {
          const { key, id, name } = item
          const itemClass = classNames('filter-tabs-item', {
            'fixed-first': fixedFirst,
            selected: filter.selected.id === id,
          })
          return (
            <View key={key} className={itemClass} onClick={() => onFilterChange({ selected: item })}>
              {name}
            </View>
          )
        })}
        <View className='filter-tabs-icon' onClick={show}>
          {visible ? <AtIcon value='chevron-up' size={20} /> : <AtIcon value='chevron-down' size={20} />}
        </View>
      </View>

      <AtDrawer width='90%' show={visible} onClose={close}>
        <View className='filter-draw'>
          <View className='filter-draw-group'>
            <View className='filter-draw-group-title'>类别选择</View>
            <View className='filter-draw-group-content'>
              {tabs.map((item) => {
                const { id, name } = item
                const itemClass = classNames('filter-draw-group-content-item', { selected: filter.selected.id === id })
                return (
                  <View key={id} className={itemClass} onClick={() => onFilterChange({ selected: item })}>
                    <View className='filter-draw-group-content-item-txt'>{name}</View>
                  </View>
                )
              })}
            </View>
          </View>
          <View className='filter-draw-footer' onClick={close}>
            完成
          </View>
        </View>
      </AtDrawer>
    </View>
  )
}

FilterBar.propTypes = {
  onChange: PropTypes.func,
}

FilterBar.defaultProps = {
  onChange: noop,
}

FilterBar.options = {
  addGlobalClass: true,
}

export default FilterBar
