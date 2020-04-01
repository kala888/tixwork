import Taro from '@tarojs/taro'

import EleCard from '@/genericpage/elements/ele-card'

class CardTemplate extends Taro.PureComponent {
  static options = {
    addGlobalClass: true,
  }
  render() {
    const { item = {}, className } = this.props
    const { imageUrl, title, brief, createTime, actionList, status } = item

    return (
      <EleCard
        title={title}
        imageUrl={imageUrl}
        brief={brief}
        time={createTime}
        status={status}
        actionList={actionList}
        className={className}
      />
    )
  }
}

export default CardTemplate
