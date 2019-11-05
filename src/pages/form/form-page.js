import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import ElePicker from '@/genericpage/form/ele-picker'
import EleTextarea from '@/genericpage/form/ele-textarea'
import EleImagePicker from '@/genericpage/form/ele-image-picker'
import EleSwitch from '@/genericpage/form/ele-switch'
import EleUserPicker from '@/genericpage/form/ele-user-picker'
import EleButton from '@/genericpage/elements/ele-button'

import './form.scss'

export default class FormPage extends Taro.PureComponent {
  render() {
    return (
      <View className='form-page'>
        <ElePicker
          title='标题'
          mode='selector'
          rangeKey='title'
          displayMode='left-brief'
          range={[{ title: '关于装修的很多提示' }, { title: '钱的问题' }, { title: '投诉' }, { title: '举报' }]}
        />

        <EleTextarea title='通知内容' placeholder='请输入通知内容2' />

        <EleImagePicker title='图片上传' />

        <EleSwitch title='是否需要回执？？' color='#52A7F8' />
        <EleUserPicker title='标题332' />

        <EleButton title='提交通知' className='submit-button' full={false} />
      </View>
    )
  }
}
