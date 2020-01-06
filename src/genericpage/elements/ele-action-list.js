import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import EleButton from '@/genericpage/elements/ele-button'
import ServerImage from '@/components/image/server-image'

import './ele.scss'

import EleHelper from '../ele-helper'

class EleActionList extends Taro.PureComponent {
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
            <View key={id} className='ele-action-list-btn'>
              <EleButton
                uiType={it.uiType}
                btnType={it.btnType}
                linkToUrl={it.linkToUrl}
                size='small'
                circle
                customStyle={{ width: '100%', ...actionStyle }}
                disabled={it.disabled}
                onClick={it.onClick}
              >
                {it.imageUrl && <ServerImage my-class='ele-action-list-btn-image' src={it.imageUrl} />}
                {it.title}
              </EleButton>
            </View>
          )
        })}
      </View>
    )
  }
}

export default EleActionList
