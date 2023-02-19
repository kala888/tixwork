import { CommonRule } from '@/components/value-type/common-column';
import ApiConfig from '@/http/api-config';
import Q from '@/http/http-request/q';
import useProfile from '@/services/use-profile';
import type { ProFormInstance } from '@ant-design/pro-components';
import { ProDescriptions, ProForm, ProFormText, ProFormTextArea } from '@ant-design/pro-components';
import { message } from 'antd';
import { useEffect, useRef } from 'react';
import AvatarSetting from './components/avatar-setting';
import styles from './styles.less';

const ProfileSetting = () => {
  const formRef = useRef<ProFormInstance>();
  const { profile, syncProfile } = useProfile();
  const { user, postGroup, roleGroup } = profile;

  useEffect(() => {
    formRef.current?.setFieldsValue(user);
  }, [user]);

  const handleFinish = async (values) => {
    Q.post(ApiConfig.profile, values).then((res) => {
      if (res.code === 200) {
        message.success('更新基本信息成功');
        syncProfile();
      }
    });
  };

  const submitter = {
    resetButtonProps: {
      style: {
        display: 'none',
      },
    },
    submitButtonProps: {
      children: '更新基本信息',
    },
  };

  return (
    <div className={styles.accountSetting}>
      <ProDescriptions dataSource={user} size="middle" column={2} className={styles.header}>
        <ProDescriptions.Item label="账号" dataIndex={'userName'} />
        <ProDescriptions.Item label="注册日期" dataIndex={'createTime'} valueType={'date'} />
        <ProDescriptions.Item label="所属部门">
          {user?.dept?.name} / {postGroup}
        </ProDescriptions.Item>
        <ProDescriptions.Item label="角色"> {roleGroup}</ProDescriptions.Item>
      </ProDescriptions>

      <div className={styles.content}>
        <div className={styles.left}>
          <ProForm
            formRef={formRef}
            layout="vertical"
            onFinish={handleFinish}
            submitter={submitter}
          >
            <ProFormText width="md" name="nickName" label="昵称" rules={[CommonRule.required]} />
            <ProFormText width="md" name="email" label="邮箱" rules={[CommonRule.email]} />
            <ProFormTextArea name="remark" label="个人简介" placeholder="个人简介" />
          </ProForm>
        </div>
        <div className={styles.right}>
          <AvatarSetting imageUrl={user?.avatar} onChange={syncProfile} />
        </div>
      </div>
    </div>
  );
};

export default ProfileSetting;
