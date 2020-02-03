import Taro from '@tarojs/taro'
import { Text, View } from '@tarojs/components'
import EleButton from '@/genericpage/elements/ele-button'
import ServerImage from '@/components/image/server-image'

import './ele.scss'

import EleHelper from '../ele-helper'

class EleActionList extends Taro.PureComponent {
  static options = {
    addGlobalClass: true,
  }

  static defaultProps = {
    list: [],
    className: null,
    customStyle: {},
  }

  render() {
    const { customStyle, className } = this.props
    const { list } = this.props
    const rootClass = EleHelper.classNames('ele-action-list', className)

    return (
      <View className={rootClass} style={customStyle}>
        {list.map((it) => {
          const { customStyle: actionStyle = {}, id } = it
          return (
            <EleButton
              key={id}
              uiType={it.uiType}
              btnType={it.btnType}
              linkToUrl={it.linkToUrl}
              size='small'
              circle
              customStyle={{ ...actionStyle }}
              disabled={it.disabled}
              onClick={it.onClick}
            >
              <View className='ele-action-list-btn'>
                {it.imageUrl && (
                  <View className='ele-action-list-btn-image'>
                    <ServerImage src={it.imageUrl} />
                  </View>
                )}
                <Text> {it.title}</Text>
              </View>
            </EleButton>
          )
        })}
      </View>
    )
  }
}

export default EleActionList
