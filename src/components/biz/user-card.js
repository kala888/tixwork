import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtModal } from 'taro-ui'
import classNames from 'classnames'
import EleImage from '@/genericpage/elements/ele-image'
import './styles.scss'

class UserCard extends Taro.Component {
  state = {
    showModal: false,
  }

  close = () => {
    this.setState({ showModal: false })
  }

  open = () => {
    if (this.props.phone) {
      this.setState({ showModal: true })
    }
  }

  handleMakeCall = () => {
    this.close()
    const { phone } = this.props
    if (phone) {
      Taro.makePhoneCall({ phoneNumber: phone })
    }
  }

  render() {
    const { avatar, name, company, role, phone, className } = this.props
    const cardClass = classNames('user-card', className)
    return (
      <View className={cardClass}>
        <AtModal
          isOpened={this.state.showModal}
          title='是否拨打电话?'
          cancelText='取消'
          confirmText='确认'
          onCancel={this.close}
          onConfirm={this.handleMakeCall}
          content={`${name}---${phone}`}
        />
        <EleImage src={avatar} className={['ele-avatar', 'small']} />
        <View className='user-card-content'>
          <View className='user-card-content-role'>{role}</View>
          <View className='user-card-content-split' />
          <View className='user-card-content-name'>{name}</View>
        </View>
        {company && <View className='user-card-company'>{company}</View>}
        <View className='user-card-phone' onClick={this.open}>
          {phone}
        </View>
      </View>
    )
  }
}

export default UserCard
