import { useLoading, useVisible } from '@/services/use-service';
import { DownloadOutlined } from '@ant-design/icons';
import { Button, notification, Popconfirm } from 'antd';
import axios from 'axios';
import { saveAs } from 'file-saver';
import React from 'react';

type FileExportType = {
  title?: string | React.ReactElement;
  linkToUrl: string;
  params: Record<string, any>;
};

export default function FileExport(props: FileExportType) {
  const { loading, showLoading, hideLoading } = useLoading(false);
  const { visible, close, show } = useVisible();

  const { title = '导出Excel', linkToUrl, params = {} } = props;

  const showTips = async (resp) => {
    const blob = new Blob([resp?.data], { type: 'application/octet-stream' });
    const result = JSON.parse(await blob.text());
    notification.error({ message: result?.msg });
  };
  const handleOk = async () => {
    showLoading();
    try {
      const resp = await axios({
        method: 'post',
        url: linkToUrl,
        data: params,
        responseType: 'blob',
        headers: { authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      try {
        //1. 尝试转换resp到json，如果报错，说明返回的是文件。否则展示异常数据
        await showTips(resp);
      } catch (e) {
        //2. 这里是正常的文件处理逻辑
        const blob = new Blob([resp.data], { type: 'application/octet-stream' });
        saveAs(blob, decodeURI(resp.headers['download-filename']));
      }
    } catch (error) {
      // @ts-ignore
      await showTips(error.response);
    }
    hideLoading();
    close();
  };

  // authorization: `Bearer ${localStorage.getItem('token')}`,

  return (
    <Popconfirm
      title="确定是否导出当前查询数据？"
      open={visible}
      onConfirm={handleOk}
      okButtonProps={{ loading }}
      onCancel={close}
    >
      <Button className="button-color-cyan" loading={loading} onClick={show}>
        <DownloadOutlined />
        {title}
      </Button>
    </Popconfirm>
  );
}
