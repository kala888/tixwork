import Taro from '@tarojs/taro'
import { Button, Progress, Text, View } from '@tarojs/components'
import { AtImagePicker } from 'taro-ui'
import NavigationService from '@/nice-router/navigation.service'
import EleImagePicker from '@/genericpage/form/ele-image-picker'

import { getTempImageList, getWebImageList } from '../../service/file-upload.tools'
import uploadFileToOss from '../../service/file-upload.service'



const MAX_SIZE = 9

export default class HelloDaaSPage extends Taro.Component {

  constructor() {
    super(...arguments)
    this.state = {
      files: [{
        url: 'http://q02t08ijf.bkt.clouddn.com/logo_1024_no_background.png',
      }],
      progress: 0,
      showAdd: true,
      cancelTask: null,
    }
  }

  componentDidMount() {
    // this.getOssToken()
  }

  handleImagePickerChange = (files, operationType, index) => {
    console.log('handleImagePickerChange', files, operationType, index)

    switch (operationType) {
      case 'remove':
        console.log('remove clicked', index, files)
        this.setState({ files })
        if (files.length < 8) {
          this.setState({ showAdd: true })
        }
        break
      case 'add':
        const tempFiles = getTempImageList(files)
        console.log('tempFiles', tempFiles)
        if (tempFiles.length > 0) {
          this.uploadImage(tempFiles)
        }
        break
      default:
        break
    }
  }

  uploadImage = async (tempFilePaths) => {
    const onSuccess = async (resp) => {
      console.log('API.getOssToken:', resp)
      const { downloadPrefix = '', home = '', token = '', uploadPrefix = '' } = resp

      const options = {
        upToken: token,
        uploadPrefix,
        downloadPrefix,
        home,
      }

      console.log('tempFilePaths list:', tempFilePaths)

      for (let i = 0; i < tempFilePaths.length; i++) {
        const filePath = tempFilePaths[i]
        await uploadFileToOss(filePath, options, (status) => {
          const { progress } = status
          this.setState({ progress })
        }, cancelTask => {
          this.setState({ cancelTask })
        })
          .then(res => {
            let ossImages = []
            console.log('uploadFileToOSS', res)
            ossImages.push(res)
            console.log('ossImages', ossImages)
            const webImages = getWebImageList(this.state.files)
            console.log('webImages', webImages)
            const newList = webImages.concat(ossImages)
            console.log('newList', newList)
            this.setState({
              files: newList.map(it => {
                return {
                  'url': it,
                }
              }),
            })
            if (newList.length > 9) {
              this.setState({ showAdd: false })
            }

          })
          .catch(err => {
            console.log('err', err)

            Taro.showToast({
              title: `上传凭证失败:${err}`,
              icon: 'none',
            })
            this.setState({ progress: 0 })
          })
      }
    }


    NavigationService.ajax('testOss/', {}, {
      onSuccess,
    })


  }

  didCancel = () => {
    const { cancelTask } = this.state
    if (cancelTask && typeof cancelTask === 'function') {
      cancelTask()
    }
  }


  render() {
    const { showAdd, files, progress } = this.state
    return (
      <View>
        <EleImagePicker />
        <Text>Hello World</Text>
        <View>
          <AtImagePicker
            showAddBtn={showAdd}
            files={files}
            onChange={this.handleImagePickerChange.bind(this)}
            length={3}
            sizeType={['original', 'compressed']}
            sourceType={['album', 'camera']}
            count={MAX_SIZE - files.length}
          />
          <Button onClick={this.didCancel.bind(this)}>Cancel</Button>
          <Progress percent={progress} />
        </View>
      </View>

    )
  }
}
