import Taro from '@tarojs/taro'
import { Text, View } from '@tarojs/components'
import { AtIcon } from 'taro-ui'
import classNames from 'classnames'
import { isEmpty, isNotEmpty, noop } from '@/nice-router/nice-router-util'
import './style.scss'

class EleTree extends Taro.PureComponent {
  config = {
    component: true,
    usingComponents: {
      'sub-tree': './ele-tree',
    },
  }

  static defaultProps = {
    expandAll: false,
    nodes: [],
    onChange: noop,
  }

  static = {
    visible: false,
  }

  handleItemSelect = () => {
    const { onChange, value, disabled, nodes } = this.props
    if (disabled) {
      return
    }
    const isLeaf = isEmpty(nodes)
    if (isLeaf) {
      onChange(value)
    } else {
      this.setState((preState) => ({
        visible: !preState.visible,
      }))
    }
  }

  render() {
    const { visible } = this.state

    const { selectedValue, onChange, expandAll } = this.props
    const { value, nodes, disabled, name, brief } = this.props

    const isTrunk = isNotEmpty(nodes)
    const selected = selectedValue === value
    console.log('1123123', selectedValue, value, selectedValue === value)

    const actionIcon = visible ? 'chevron-down' : 'chevron-right'

    const subTreeClass = classNames('ele-tree-subtree', { hidden: !visible })
    const treeItemClass = classNames('ele-tree-item', { selected, disabled })

    return (
      <View className='ele-tree'>
        <View className={treeItemClass} onClick={this.handleItemSelect}>
          {isTrunk && (
            <View className='ele-tree-item-action-icon'>
              <AtIcon value={actionIcon} size='18' />
            </View>
          )}

          <Text className='ele-tree-item-title'>{name}</Text>
          <Text className='ele-tree-item-brief'>{brief}</Text>

          {selected && (
            <View className='ele-tree-item-selected-icon'>
              <AtIcon value='check' size='18' />
            </View>
          )}
        </View>

        <View className={subTreeClass}>
          {nodes.map((it) => {
            const { id } = it
            return (
              // eslint-disable-next-line react/jsx-no-undef
              <SubTree key={id} selectedValue={selectedValue} onChange={onChange} expandAll={expandAll} {...it} />
            )
          })}
        </View>
      </View>
    )
  }
}

export default EleTree
