import Taro from '@tarojs/taro'
import { Text, View } from '@tarojs/components'
import { AtIcon } from 'taro-ui'
import classNames from 'classnames'
import { isEmpty, isNotEmpty, noop } from '@/nice-router/nice-router-util'
import './style.scss'

class Tree extends Taro.PureComponent {
  config = {
    component: true,
    usingComponents: {
      'sub-tree': './tree',
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

    const { selected, onChange, expandAll } = this.props
    const { value, nodes, disabled, title, brief } = this.props

    const isTrunk = isNotEmpty(nodes)
    const isSelected = selected === value

    const actionIcon = visible ? 'chevron-down' : 'chevron-right'

    const subTreeClass = classNames('tree-subtree', { hidden: !visible })
    const treeItemClass = classNames('tree-item', { selected: isSelected, disabled })

    return (
      <View className='tree'>
        <View className={treeItemClass} onClick={this.handleItemSelect}>
          {isTrunk && (
            <View className='tree-item-action-icon'>
              <AtIcon value={actionIcon} size='18' />
            </View>
          )}

          <Text className='tree-item-title'>{title}</Text>
          <Text className='tree-item-brief'>{brief}</Text>

          {isSelected && (
            <View className='tree-item-selected-icon'>
              <AtIcon value='check' size='18' />
            </View>
          )}
        </View>

        <View className={subTreeClass}>
          {nodes.map((it) => {
            const { id } = it
            return (
              // eslint-disable-next-line react/jsx-no-undef
              <SubTree key={id} selected={selected} onChange={onChange} expandAll={expandAll} {...it} />
            )
          })}
        </View>
      </View>
    )
  }
}

export default Tree
