import Taro from '@tarojs/taro'
import { Label, Text, View } from '@tarojs/components'
import { AtImagePicker, AtProgress } from 'taro-ui'

import './ele-form.scss'
import EleHelper from '../ele-helper'
import uploadFiles from '../../service/file-upload/file-upload.service'

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
    defaultValue: [],
  }

  state = {
    files: [],
    progress: 0,
  }

  componentDidMount() {
    const { defaultValue = [] } = this.props
    this.setState({
      files: defaultValue.map((it) => ({ url: it.imageUrl })),
    })
  }

  saveImageToForm = () => {
    const { formKey, name } = this.props
    console.log('save images to form', name, formKey, this.state.files)
    Taro.eventCenter.trigger('form-value-changed', {
      name,
      value: this.state.files,
      formKey,
    })
  }

  uploadNewFiles = (files = []) => {
    const todoList = files.filter((it) => {
      const { url = '' } = it
      return url.startsWith('http://tmp') || url.startsWith('wxfile://tmp')
    })
    const resetProgress = () => {
      this.setState({ progress: 0 })
    }

    uploadFiles({
      todoList,
      onProgress: ({ progress }) => {
        this.setState({ progress })
      },
      onStart: resetProgress,
      onComplete: resetProgress,
      onSuccess: (result) => {
        const { remoteFile, sourceFile } = result

        this.setState(
          (preState) => {
            const newFiles = preState.files.map((it) => {
              if (it.url === sourceFile) {
                return {
                  url: remoteFile,
                }
              }
              return it
            })
            return { files: newFiles }
          },
          () => this.saveImageToForm()
        )
      },
    })
  }

  handleFileChange = (files, operationType) => {
    const { maxLength } = this.props
    if (operationType === 'remove') {
      this.setState(
        {
          files,
        },
        () => this.saveImageToForm()
      )
      return
    }

    if (operationType === 'add') {
      if (files.length < this.state.files.length || files.length <= maxLength) {
        this.setState(
          {
            files,
          },
          () => this.uploadNewFiles(files)
        )
      } else {
        Taro.showModal({
          title: '提示',
          content: `最多可以上传${maxLength}张图片`,
          showCancel: false,
        })
      }
      return
    }
    console.error('未知操作')
  }

  onImageClick = (index, file) => {
    Taro.previewImage({ urls: [file.url] })
  }

  render() {
    const { title, brief, maxLength, className, customStyle } = this.props
    const { files: imageList = [], progress } = this.state

    const briefText = brief || (maxLength > 1 ? `最多可以上传${maxLength}个文件` : '')
    const showAddBtn = imageList.length < maxLength
    const rootClass = EleHelper.classNames('ele-image-picker', className)
    const count = maxLength - imageList.length

    return (
      <View className={rootClass} style={customStyle}>
        <Label className='label-text'>{title}</Label>
        <AtImagePicker
          className='ele-image-picker-icon'
          count={count}
          length={maxLength}
          showAddBtn={showAddBtn}
          multiple
          files={imageList}
          onChange={this.handleFileChange}
          onImageClick={this.onImageClick}
        />
        <Text className='note'>{briefText}</Text>
        {progress > 0 && <AtProgress percent={progress} />}
      </View>
    )
  }
}
