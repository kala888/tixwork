import Q from '@/http/http-request/q';
import { useLoading, useOpen } from '@/services/use-service';
import ObjectUtils from '@/utils/object-utils';
import { DownloadOutlined } from '@ant-design/icons';
import { useEmotionCss } from '@ant-design/use-emotion-css';
import { Button, message, Popconfirm } from 'antd';
import FileSaver from 'file-saver';
import _ from 'lodash';
import React from 'react';

type FileExportType = {
  title?: string | React.ReactElement;
  popupTitle?: string | React.ReactElement;
  linkToUrl: string;
  params?: Record<string, any>;
};

export default function FileExport(props: FileExportType) {
  const { loading, showLoading, hideLoading } = useLoading(false);
  const { open, close, show } = useOpen();

  const { popupTitle, title = '导出Excel', linkToUrl, params } = props;

  const handleOk = async () => {
    if (ObjectUtils.isEmpty(linkToUrl)) {
      message.warning('请配置URL');
      return;
    }
    showLoading();
    console.log('props', props);
    const theParams = _.isFunction(params) ? params() : params || {};
    try {
      const resp = await Q.post(linkToUrl, theParams, {
        responseType: 'blob',
        getResponse: true,
      });
      const file = new File([resp.data as any], 'preview.pdf', {
        type: 'application/octet-stream',
      });
      // @ts-ignore
      const fileName = decodeURI(resp.headers['download-filename']);
      FileSaver.saveAs(file, fileName);
      close();
    } finally {
      hideLoading();
    }
  };

  const css = useEmotionCss(({ token }) => ({
    '.ant-btn': {
      backgroundColor: '#68945c',
      borderColor: ' #68945c',
      color: '#fff',
      '&:hover, &:active': {
        color: '#eee !important',
        backgroundColor: '#9bb496 !important',
        borderColor: ' #9bb496 !important',
      },
    },
  }));

  // authorization: `Bearer ${localStorage.getItem('token')}`,

  return (
    <Popconfirm
      title={popupTitle || '确定是否导出当前查询数据？'}
      open={open}
      onConfirm={handleOk}
      okButtonProps={{ loading }}
      onCancel={close}
    >
      <div className={css}>
        <Button loading={loading} onClick={show}>
          <DownloadOutlined />
          {title}
        </Button>
      </div>
    </Popconfirm>
  );
}
