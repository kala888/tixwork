import Q from '@/http/http-request/q';
import { useLoading, useOpen } from '@/services/use-service';
import ObjectUtils from '@/utils/object-utils';
import { DownloadOutlined } from '@ant-design/icons';
import { useEmotionCss } from '@ant-design/use-emotion-css';
import { Button, message, Popconfirm } from 'antd';
import FileSaver from 'file-saver';
import React from 'react';

type FileExportType = {
  title?: string | React.ReactElement;
  linkToUrl: string;
  params: Record<string, any>;
};

export default function FileExport(props: FileExportType) {
  const { loading, showLoading, hideLoading } = useLoading(false);
  const { open, close, show } = useOpen();

  const { title = '导出Excel', linkToUrl, params = {} } = props;

  const handleOk = async () => {
    if (ObjectUtils.isEmpty(linkToUrl)) {
      message.warning('请配置URL');
      return;
    }
    showLoading();
    try {
      const resp = await Q.post(linkToUrl, params, {
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
      backgroundColor: '#13c2c2',
      borderColor: ' #13c2c2',
      color: '#fff',
      '&:hover, &:active': {
        color: '#fff',
        backgroundColor: '#36cfc9',
        borderColor: ' #36cfc9',
      },
    },
  }));

  // authorization: `Bearer ${localStorage.getItem('token')}`,

  return (
    <Popconfirm
      title="确定是否导出当前查询数据？"
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
