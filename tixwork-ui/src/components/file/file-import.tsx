import ObjectUtils from '@/utils/object-utils';
import { InfoCircleOutlined, ThunderboltOutlined, UploadOutlined } from '@ant-design/icons';
import { Button, Modal, notification, Popover, Space, Typography, Upload } from 'antd';
import classNames from 'classnames';
import React, { useState } from 'react';
import styles from './styles.less';

type FileImportType = {
  title?: string | React.ReactElement;
  linkToUrl: string;
  onSuccess?: (resp: any) => void;
  onFailed?: (resp: any) => void;
  templateUrl?: string;
  templateTips?: string;
};

export default function FileImport(props: FileImportType) {
  const [loading, setLoading] = useState(false);

  const {
    title = '导入',
    linkToUrl,
    onSuccess,
    onFailed,
    templateUrl,
    templateTips = '下载导入用模版',
  } = props;

  const uploadPrams = {
    name: 'file',
    showUploadList: false,
    action: linkToUrl,
    headers: {
      authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    onChange(info) {
      if (info.file.status !== 'uploading') {
        setLoading(true);
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        setLoading(false);
        notification.success({ message: `数据导入成功` });
        if (onSuccess) {
          onSuccess(info);
        }
      } else if (info.file.status === 'error') {
        setLoading(false);
        const { response: { data = [], msg = '导入异常' } = {}, name } = info?.file || {};
        const content = (
          <div>
            <div>
              <Typography.Text type="warning">
                {`文件《${name}》，导入时发生错误，请修正后重试`}
              </Typography.Text>
            </div>
            {data.map((it, idx) => (
              <div key={it + '_' + idx}>
                <Space>
                  <InfoCircleOutlined style={{ color: 'red' }} />
                  {it}
                </Space>
              </div>
            ))}
          </div>
        );
        Modal.error({
          title: msg,
          content,
        });
        if (onFailed) {
          onFailed(info);
        }
      }
    },
  };

  const clxUpload = classNames(styles.importButtonUpload, 'button-color-cyan');
  const clxTemplate = classNames(styles.importButtonTemplate, 'button-color-cyan');

  return (
    <div className={styles.importButton}>
      <Upload {...uploadPrams}>
        <Button loading={loading} className={clxUpload}>
          <UploadOutlined />
          {title}
        </Button>
      </Upload>
      {ObjectUtils.isNotEmpty(templateUrl) && (
        <Popover content={templateTips} trigger="hover">
          <Button className={clxTemplate} href={templateUrl}>
            <ThunderboltOutlined />
          </Button>
        </Popover>
      )}
    </div>
  );
}
