import Taro from '@tarojs/taro'
import { AtButton } from 'taro-ui'
import NavigationService from '@/nice-router/navigation.service'
import './ele.scss'
import EleHelper from '../ele-helper'

// form中组件封装后，button 不会触发form的handle方法问题
// https://github.com/NervJS/taro-ui/issues/96

// {
//   type: 'button',
//   linkToUrl: '',
//   btnType: 'share',
//   uiType:'primary'
// }
export default class EleButton extends Taro.PureComponent {
  static options = {
    addGlobalClass: true,
  }

  static defaultProps = {
    title: '',
    btnType: '',
    size: null,
    uiType: 'primary',
    customStyle: {},
    full: false,
    className: null,
    circle: null,
    onGetUserInfo: null,
  }

  handleScan = async () => {
    const res = Taro.scanCode()
    const arg = encodeURIComponent(res.result)
    const { linkToUrl } = this.props
    const actionPath = `${linkToUrl}${arg}/`
    console.log('I want to access ', actionPath)
    NavigationService.view(actionPath)
  }

  handlePreview = async () => {
    const { linkToUrl } = this.props
    console.log('preview document', linkToUrl)
    if (!linkToUrl) {
      return
    }
    try {
      Taro.showLoading({ title: '正在打开文件...', mask: true })
      const res = await Taro.downloadFile({ url: linkToUrl })
      await Taro.openDocument({ filePath: res.tempFilePath })
    } catch (e) {
      Taro.showToast({ title: '文件打开失败，稍后重试', icon: 'none' })
    } finally {
      Taro.hideLoading()
    }
  }

  handleDownload = async () => {
    const { linkToUrl } = this.props
    if (!linkToUrl) {
      return
    }
    try {
      Taro.showLoading({ title: '正在下载文件...', mask: true })
      await Taro.downloadFile({ url: linkToUrl })
    } catch (e) {
      Taro.showToast({ title: '下载文件失败，稍后重试', icon: 'none' })
    } finally {
      Taro.hideLoading()
    }
  }

  handleClick = () => {
    const { btnType = '', linkToUrl, onClick } = this.props
    if (onClick) {
      onClick()
      return
    }

    if (btnType === 'submit' || btnType === 'share' || btnType === 'getUserInfo') {
      return
    }

    if (btnType === 'open-document') {
      this.handlePreview()
      return
    }
    if (btnType === 'download') {
      this.handleDownload()
      return
    }
    if (btnType === 'scanner') {
      this.handleScan()
      return
    }

    console.log('btnType is', btnType, 'just do view action')
    NavigationService.view(linkToUrl)
  }

  render() {
    const { title, btnType, size, uiType, customStyle, className, full, circle, onGetUserInfo } = this.props

    let { openType } = this.props

    if (!openType && (btnType === 'share' || btnType === 'getPhoneNumber' || btnType === 'getUserInfo')) {
      openType = btnType
    }

    const formType = btnType === 'submit' || btnType === 'reset' ? btnType : null

    const rootClass = EleHelper.classNames('ele-button', className)

    return (
      <AtButton
        circle={circle}
        type={uiType}
        className={rootClass}
        openType={openType}
        formType={formType}
        size={size}
        full={full}
        customStyle={customStyle}
        onClick={this.handleClick}
        onGetUserInfo={onGetUserInfo}
      >
        {title}
        {this.props.children}
      </AtButton>
    )
  }
}
