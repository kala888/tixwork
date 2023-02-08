import { ScrollView } from '@tarojs/components';
import Modal from '@/components/modal';
import { useVisible } from '@/service/use-service';
import EleFlex from './ele-flex';

export default function ElePopup(props: Record<string, any>) {
  const { visible, close } = useVisible(true);
  return (
    <Modal visible={visible} onCancel={close}>
      <ScrollView scrollY scrollWithAnimation scrollTop={0} style='max-height: 750rpx;'>
        <EleFlex {...props} />
      </ScrollView>
    </Modal>
  );
}
