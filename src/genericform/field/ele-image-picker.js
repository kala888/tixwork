import Taro from '@tarojs/taro'
import { Text, View } from '@tarojs/components'
import { AtImagePicker, AtProgress } from 'taro-ui'
import { noop } from '@/nice-router/nice-router-util'

import './styles.scss'
import uploadFiles from '../../service/file-upload/file-upload.service'

export default class EleImagePicker extends Taro.PureComponent {
  static options = {
    addGlobalClass: true,
  }

  static defaultProps = {
    brief: '',
    maxLength: 4,
    value: [],
    onChange: noop,
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
    this.props.onChange(this.state.files)
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
          content: `最多可以上传 ${maxLength} 张图片`,
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
    const { brief, maxLength } = this.props
    const { files: imageList = [], progress } = this.state

    const multiple = maxLength > 1
    const briefText = brief || (multiple ? `最多可以上传 ${maxLength} 个文件` : '')
    const showAddBtn = imageList.length < maxLength
    const count = maxLength - imageList.length

    //单行显示最大个数
    // const length = maxLength >= 4 ? 4 : maxLength

    return (
      <View>
        <AtImagePicker
          className='ele-image-picker-icon'
          count={count}
          length={4}
          showAddBtn={showAddBtn}
          multiple={multiple}
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
