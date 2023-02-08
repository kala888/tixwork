import { Text, View } from '@tarojs/components';
import './styles.less';
import classNames from 'classnames';

type FloatLayoutType = {
  visible: boolean;
  onCancel: () => void;
  title?: string | false;
  children: any;
  className?: any;
};

export default function FloatLayout(props: FloatLayoutType) {
  const { visible, title, onCancel, className } = props;
  if (!visible) {
    return null;
  }
  const rootCls = classNames('float-layout', { active: visible }, className);
  return (
    <View className={rootCls}>
      <View className='float-layout__overlay' onClick={onCancel}></View>
      <View className='float-layout__container layout'>
        {title && (
          <View className='layout-header'>
            {title}
            <Text className='close-img iconfont iconfont-cc-close-crude' onClick={onCancel} />
          </View>
        )}
        <View className='layout-body'>{props.children}</View>
      </View>
    </View>
  );
}
