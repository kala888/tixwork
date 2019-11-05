import Taro from '@tarojs/taro'
import { Label, Text, View } from '@tarojs/components'
import { AtImagePicker } from 'taro-ui'

import './ele-form.scss'
import EleHelper from '../ele-helper'

export default class EleImagePicker extends Taro.PureComponent {
  static options = {
    addGlobalClass: true,
  }

  static defaultProps = {
    title: '',
    brief: '',
    maxLength: 4,
    className: null,
    customStyle: {},
  }

  state = {
    files: [],
  }

  onChange = (files) => {
    console.log(files)
    const { maxLength } = this.props

    if (files.length < this.state.files.length || files.length <= maxLength) {
      this.setState({
        files,
      })
      return
    }

    Taro.showModal({
      title: '提示',
      content: `最多可以上传${maxLength}张图片`,
      showCancel: false,
    })
  }

  onFail = (mes) => {
    console.log(mes)
  }

  onImageClick = (index, file) => {
    console.log(index, file)
  }

  render() {
    const { title, brief, maxLength, className, customStyle } = this.props

    const briefText = brief || (maxLength > 1 ? `最多可以上传${maxLength}个文件` : '')
    const imageList = this.state.files

    const showAddBtn = imageList.length < maxLength

    const rootClass = EleHelper.classNames('ele-image-picker', className)

    return (
      <View className={rootClass} style={customStyle}>
        <Label className='label-text'>{title}</Label>
        <AtImagePicker
          className='ele-image-picker-icon'
          count={maxLength}
          length={4}
          showAddBtn={showAddBtn}
          multiple
          files={imageList}
          onChange={this.onChange}
          onFail={this.onFail}
          onImageClick={this.onImageClick}
        />
        <Text className='note'>{briefText}</Text>
      </View>
    )
  }
}
