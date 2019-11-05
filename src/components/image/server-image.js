import Taro from '@tarojs/taro'
import { Image } from '@tarojs/components'
import m_ from '@/utils/mini-lodash'
import ImageTools from './image-tools'

export default class ServerImage extends Taro.PureComponent {
  getUrl = () => {
    const { uri, src, size = 'normal' } = this.props
    let url = m_.trim(uri || src || '')
    const result = {}
    if (url) {
      switch (size) {
        case 'thumbnail':
          result.src = ImageTools.loadThumbnailImg(url)
          break
        case 'tiny':
          result.src = ImageTools.loadTinyImg(url)
          break
        case 'small':
          result.src = ImageTools.loadSmallImg(url)
          break
        case 'middle':
          result.src = ImageTools.loadMiddleImg(url)
          break
        case 'normal':
          result.src = ImageTools.loadNormalImg(url)
          result.thumb = ImageTools.loadThumbnailImg(url)
          break
        case 'large':
          result.src = ImageTools.loadLargeImg(url)
          result.thumb = ImageTools.loadThumbnailImg(url)
          break
        case 'xlarge':
          result.src = ImageTools.loadXLargeImg(url)
          result.thumb = ImageTools.loadThumbnailImg(url)
          break
        case 'origin':
          result.src = ImageTools.loadOriginImg(url)
          result.thumb = ImageTools.loadThumbnailImg(url)
          break
        default:
          result.src = ImageTools.loadServerImage(url)
          result.thumb = ImageTools.loadThumbnailImg(url)
      }
    }
    return result
  }

  render() {
    const { style = {}, mode = 'scaleToFill', className } = this.props
    console.log('adsfasdfasdf', mode)
    const { src } = this.getUrl()
    return <Image src={src} style={style} mode={mode} className={className} />
  }
}
