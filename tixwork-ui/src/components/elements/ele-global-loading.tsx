import { Modal, Spin } from 'antd';

export default class EleGlobalLoading {
  static async showLoadingModal(text: string = '正在处理中') {
    Modal.info({
      modalRender: () => (
        <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
          <Spin size="large" tip={text} />
        </div>
      ),
      mask: true,
      maskClosable: false,
      closable: false,
    });
  }

  static hideLoadingModal() {
    Modal.destroyAll();
  }
}
