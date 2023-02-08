import { Text, View } from '@tarojs/components';
import './styles.less';
import classNames from 'classnames';
import { isNotEmpty } from '@/utils/object-utils';

type ModalType = {
  title?: string;
  content?: string;
  onCancel: () => void;
  children?: any;
  closable?: boolean;
  visible?: boolean;
};

const Modal = (props: ModalType) => {
  const { title, content, closable = true, visible = false, onCancel } = props;
  const hasContent = isNotEmpty(title) || isNotEmpty(content);
  const contentCls = classNames('modal-content', {
    whiteBackground: hasContent,
  });
  if (!visible) {
    return null;
  }
  return (
    <View className='modal-wrap'>
      <View className='modal-mask modal-show' />
      <View className='modal-box'>
        <View className={contentCls}>
          {isNotEmpty(title) && <View className='modal-title'>{title}</View>}
          {closable && <Text className='modal-close iconfont iconfont-close-circle' onClick={onCancel} />}
          {props.children}
        </View>
      </View>
    </View>
  );
};

export default Modal;
