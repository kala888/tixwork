import Taro from '@tarojs/taro'
import UserCard from '@/components/biz/user-card'

import '../listof.scss'

export default class SmallUserCardTemplate extends Taro.PureComponent {
  render() {
    const { item = {} } = this.props
    const {
      employee: { employer = {}, employee: { faceImage: avatar, name, contactInfo: phone } = {}, job = {} } = {},
    } = item

    return (
      <UserCard
        avatar={avatar}
        name={name}
        company={employer.name}
        role={job.name}
        phone={phone}
        className='two-column-user-card'
      />
    )
  }
}
