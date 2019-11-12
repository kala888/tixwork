import Taro from '@tarojs/taro'
import { Block, View } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import ServerImage from '@/components/image/server-image'
import { formatTime } from '@/utils/index'

import './article.scss'

@connect(({ article }) => ({ ...article }))
export default class ArticleDetailPage extends Taro.PureComponent {
  handlePreviewImage = (imageUrl) => {
    Taro.previewImage({ urls: [imageUrl] })
  }

  render() {
    const { articleParagraphList = [], createTime, authorName, title } = this.props

    return (
      <View className='article-page'>
        <View className='article-page-body'>
          <View className='title'>{title}</View>
          <View className='user-info'>
            <View className='user-info-name'>{authorName}</View>
            <View className='user-info-time'>{formatTime(createTime)}</View>
          </View>
          <View className='content'>
            {articleParagraphList.map((it) => (
              <Block key={it.id}>
                <View className='content-txt'>{it.content}</View>
                {it.imageUrl && (
                  <View className='content-img' onClick={() => this.handlePreviewImage(it.imageUrl)}>
                    <ServerImage mode='widthFix' src={it.imageUrl} />
                  </View>
                )}
              </Block>
            ))}
          </View>
        </View>
      </View>
    )
  }
}
