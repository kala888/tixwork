import { Block, View } from '@tarojs/components'
import Taro from '@tarojs/taro'

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
import EleCheckbox from '../form/ele-checkbox'
import EleImagePicker from '../form/ele-image-picker'
import EleInput from '../form/ele-input'
import ElePicker from '../form/ele-picker'
import EleRadio from '../form/ele-radio'
import EleSwitch from '../form/ele-switch'
import EleTextarea from '../form/ele-textarea'
import EleForm from '../form/ele-form'
import EleVcode from '../form/ele-vcode'
import EleQRCode from '../elements/ele-qrcode'
import EleMoreActions from '../elements/ele-more-actions'
import EleListof from '../elements/ele-listof'

import EleHelper from '../ele-helper'
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
    const { flex, kids, formKey, customStyle = {}, className } = this.props
    const rootClass = EleHelper.classNames(className, { 'flex-column': !className })

    return (
      <View className={rootClass} style={{ flex, ...customStyle }}>
        {kids.map((it) => {
          const { flex: itemFlex = 1, id } = it
          const ele = {
            ...it,
            formKey: formKey,
          }
          return (
            <Block key={id}>
              {/* ui elements*/}
              {it.type === 'text' && <EleText {...ele} />}
              {it.type === 'image' && <EleImage {...ele} />}
              {it.type === 'button' && <EleButton {...ele} />}
              {it.type === 'carousel' && <EleCarousel {...ele} />}
              {it.type === 'message-swiper' && <EleMessageSwiper {...ele} />}
              {it.type === 'break-line' && <EleBreakLine {...ele} />}
              {it.type === 'white-space' && <EleWhiteSpace {...ele} />}
              {it.type === 'box-bar' && <EleNavigationBox {...ele} />}
              {it.type === 'fab' && <EleFab {...ele} />}
              {it.type === 'store-location' && <EleStoreLocation {...ele} />}
              {it.type === 'popup' && <ElePopup {...ele} />}
              {it.type === 'footer-tabs' && <EleFooterTabs {...ele} />}
              {it.type === 'qrcode' && <EleQRCode {...ele} />}
              {it.type === 'more-actions' && <EleMoreActions {...ele} />}

              {/* form Biz*/}
              {it.type === 'listof' && <EleListof {...ele} />}

              {/* form elements*/}
              {it.type === 'checkbox' && <EleCheckbox {...ele} />}
              {it.type === 'image-picker' && <EleImagePicker {...ele} />}
              {it.type === 'input' && <EleInput {...ele} />}
              {it.type === 'picker' && <ElePicker {...ele} />}
              {it.type === 'radio' && <EleRadio {...ele} />}
              {it.type === 'switch' && <EleSwitch {...ele} />}
              {it.type === 'textarea' && <EleTextarea {...ele} />}
              {it.type === 'vcode' && <EleVcode {...ele} />}

              {/* container elements*/}
              {it.type === 'form' && <EleForm {...ele} />}
              {it.type === 'flex' && (
                // Taro && wechat-mini-program could not support self reference, using it as mini-program component
                <View className='flex-row' style={{ flex: itemFlex }}>
                  <View style={{ width: '100%', height: '100%' }}>
                    {/* eslint-disable-next-line react/jsx-no-undef */}
                    <EleFlexBox {...ele} />
                  </View>
                </View>
              )}
            </Block>
          )
        })}
      </View>
    )
  }
}
