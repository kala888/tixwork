import { View } from '@tarojs/components';
import { useVisible } from '@/service/use-service';
import ActionIcon from '@/components/action-icon/action-icon';
import EleInput, { EleInputType } from '@/components/form/field/ele-input';
import classNames from 'classnames';

export default function ElePassword(props: EleInputType) {
  const { visible, toggle } = useVisible(false);
  const type = visible ? 'text' : 'safe-password';
  const rootCls = classNames('ele-password', props.className);
  return (
    <EleInput
      placeholder='请输入密码'
      type={type}
      password={!visible}
      bordered={false}
      maxlength={12}
      {...props}
      className={rootCls}
    >
      <View onClick={toggle}>{visible ? <ActionIcon icon='eye' /> : <ActionIcon icon='eye-off' />}</View>
    </EleInput>
  );
}
