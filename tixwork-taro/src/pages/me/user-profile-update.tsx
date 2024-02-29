import { Button, Form, Input, View } from '@tarojs/components';
import FormItem from '@/components/form/form-item';
import { useEffect, useState } from 'react';
import ObjectUtils from '@/utils/object-utils';
import EleButton from '@/components/elements/ele-button';
import ActionIcon from '@/components/action-icon/action-icon';
import './user-profile-update.less';
import ServerImage from '@/server-image/server-image';
import Taro from '@tarojs/taro';
import uploadFile from '@/utils/file-upload';
import Q from '@/http/q';
import ApiConfig from '@/utils/api-config';
import NavigationService from '@/nice-router/navigation-service';

export default function UserProfileUpdate() {
  const [profile, setProfile] = useState<{
    avatar?: string;
    nickName?: string;
  }>();

  useEffect(() => {
    Q.get(ApiConfig.Me).then((resp) => setProfile(resp.data));
  }, []);

  if (ObjectUtils.isEmpty(profile)) {
    return <View>加载中</View>;
  }

  const handleSubmit = async (e) => {
    const avatar = profile?.avatar;
    const nickName = e.detail.value?.nickName;
    if (ObjectUtils.isEmpty(avatar)) {
      await Taro.showToast({ title: '请上传头像', icon: 'none' });
      return;
    }
    if (ObjectUtils.isEmpty(nickName)) {
      Taro.showToast({ title: '请填写昵称', icon: 'none' });
      return;
    }
    const resp = await Q.post(ApiConfig.updateProfile, { nickName, avatar });
    if (resp.data === true) {
      Taro.showToast({ title: '更新成功', icon: 'none' });
      await NavigationService.back();
      return;
    }
    Taro.showToast({ title: '更新失败', icon: 'none' });
  };

  const handleAvatarChange = async (e) => {
    const data = await uploadFile(e.detail.avatarUrl);
    setProfile((pre) => ({ ...pre, avatar: data?.url }));
  };

  return (
    <Form onSubmit={handleSubmit}>
      <View className='user-profile-update'>
        <Button open-type='chooseAvatar' onChooseAvatar={handleAvatarChange} className='transparent-btn'>
          <View className='user-profile-update-avatar'>
            {ObjectUtils.isEmpty(profile?.avatar) ? (
              <ActionIcon icon='bizfont-user' className='bizfont-profile' />
            ) : (
              <ServerImage src={profile?.avatar as any} />
            )}
          </View>
        </Button>

        <View className='user-profile-update-name'>
          <FormItem label='昵称' required>
            <Input name='nickName' type='nickname' placeholder='请填写昵称' defaultValue={profile?.nickName} />
          </FormItem>
        </View>

        <View className='user-profile-update-button'>
          <EleButton type='primary' formType='submit'>
            更新
          </EleButton>
        </View>
      </View>
    </Form>
  );
}
