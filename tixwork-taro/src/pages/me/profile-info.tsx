import { Text, View } from '@tarojs/components';
import ActionIcon from '@/components/action-icon/action-icon';
import ServerImage from '@/server-image/server-image';
import profileBgImg from '@/assets/user-bg.png';
import memberCardImg from '@/assets/vip-card.png';
import profileFooterImg from '@/assets/user-footer.png';

import './profile-info.less';
import ObjectUtils from '@/utils/object-utils';
import NavigationService from '@/nice-router/navigation-service';
import { CustomerType } from '@/types';
import CandidateUtils from '@/utils/candidate-utils';

type ProfileInfoProps = {
  nickName?: string;
  brief?: string;
  mobile?: string;
  avatar?: string;
  customerType?: CustomerType;
};

export default function ProfileInfo(props: ProfileInfoProps) {
  const { nickName, brief, avatar, customerType } = props;

  const hasName = ObjectUtils.isNotEmpty(nickName) && nickName !== '微信用户';

  const goToUpdateProfile = () => NavigationService.goPage('/pages/me/user-profile-update');

  return (
    <View className='profile-info'>
      <View className={'user-card'}>
        <View className='user-avatar'>
          {ObjectUtils.isNotEmpty(avatar) ? (
            <ServerImage src={avatar} />
          ) : (
            <ActionIcon icon='bizfont-user' className='bizfont-profile' />
          )}
        </View>
        <View className='user-title'>
          <View className='user-name' onClick={goToUpdateProfile}>
            {hasName ? nickName : '更新昵称'}
          </View>
          <View className='user-mobile'>{brief}</View>
        </View>
      </View>

      <ServerImage src={profileBgImg} className='profile-info-bg-img' />
      <View className='member-card'>
        <ServerImage src={memberCardImg} className='member-card-img' />
      </View>

      <View className='profile-footer'>
        <ServerImage src={profileFooterImg} />
      </View>

      <View className={'member-title'}>
        <ActionIcon icon='bizfont-vip' className='member-type-icon' />
        <Text>{CandidateUtils.getCustomerType(customerType)}</Text>
      </View>
    </View>
  );
}
