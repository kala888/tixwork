import { View } from '@tarojs/components'
import Taro from '@tarojs/taro'
import classNames from 'classnames'
import EleForm from '@/genericform/form/ele-form'

import EleFab from '../elements/ele-fab'
import EleText from '../elements/ele-text'
import EleImage from '../elements/ele-image'
import EleButton from '../elements/ele-button'
import EleCarousel from '../elements/ele-carousel'
import EleMessageSwiper from '../elements/ele-message-swiper'
import EleBreakLine from '../elements/ele-break-line'
import EleWhiteSpace from '../elements/ele-white-space'
import EleStoreLocation from '../elements/ele-store-location'
import ElePopup from './ele-popup'
import EleFooterTabs from '../elements/ele-footer-tabs'
import EleNavigationBox from '../elements/ele-navigation-box'
import EleQRCode from '../elements/ele-qrcode'
import EleMoreActions from '../elements/ele-more-actions'
import EleListof from '../elements/ele-listof'

import '../styles.scss'

export default class EleFlex extends Taro.PureComponent {
  static options = {
    multipleSlots: true,
    addGlobalClass: true,
  }

  static defaultProps = {
    flex: 1,
    kids: [], //children的同义词，不用children，微信有问题
    formKey: null,
    customStyle: {},
    className: null,
  }

  config = {
    component: true,
    usingComponents: {
      'ele-flex-box': './ele-flex',
    },
  }

  render() {
    const { flex, kids, customStyle = {}, className } = this.props
    const rootClass = classNames(className, { 'flex-column': !className })

    return (
      <View className={rootClass} style={{ flex, ...customStyle }}>
        {kids.map((it) => {
          const { flex: itemFlex = 1, id } = it
          if (it.type === 'text') return <EleText key={id} {...it} />
          if (it.type === 'image') return <EleImage key={id} {...it} />
          if (it.type === 'button') return <EleButton key={id} {...it} />
          if (it.type === 'carousel') return <EleCarousel key={id} {...it} />
          if (it.type === 'message-swiper') return <EleMessageSwiper key={id} {...it} />
          if (it.type === 'break-line') return <EleBreakLine key={id} {...it} />
          if (it.type === 'white-space') return <EleWhiteSpace key={id} {...it} />
          if (it.type === 'box-bar') return <EleNavigationBox key={id} {...it} />
          if (it.type === 'fab') return <EleFab key={id} {...it} />
          if (it.type === 'store-location') return <EleStoreLocation key={id} {...it} />
          if (it.type === 'popup') return <ElePopup key={id} {...it} />
          if (it.type === 'footer-tabs') return <EleFooterTabs key={id} {...it} />
          if (it.type === 'qrcode') return <EleQRCode key={id} {...it} />
          if (it.type === 'more-actions') return <EleMoreActions key={id} {...it} />
          if (it.type === 'listof') return <EleListof key={id} {...it} />

          if (it.type === 'form') return <EleForm key={id} {...it} fields={it.kids} />

          if (it.type === 'flex')
            return (
              // Taro && wechat-mini-program could not support self reference, using it as mini-program component
              <View key={id} className='flex-row' style={{ flex: itemFlex }}>
                <View style={{ width: '100%', height: '100%' }}>
                  {/* eslint-disable-next-line react/jsx-no-undef */}
                  <EleFlexBox {...it} />
                </View>
              </View>
            )
        })}
      </View>
    )
  }
}
