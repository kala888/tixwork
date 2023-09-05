import Q from '@/http/http-request/q';
import ObjectUtils from '@/utils/object-utils';
import { InfoCircleOutlined, ThunderboltOutlined, UploadOutlined } from '@ant-design/icons';
import { useEmotionCss } from '@ant-design/use-emotion-css';
import { App, Button, Popover, Space, Typography, Upload } from 'antd';
import classNames from 'classnames';
import _ from 'lodash';
import React, { useState } from 'react';

type FileImportType = {
  title?: string | React.ReactElement;
  linkToUrl: string;
  onSuccess?: (resp: any) => void;
  onFailed?: (resp: any) => void;
  templateUrl?: string;
  templateTips?: string;
};

export default function FileImport(props: FileImportType) {
  const { modal, notification } = App.useApp();
  const [loading, setLoading] = useState(false);

  const { title = '导入', linkToUrl, onSuccess, onFailed, templateUrl, templateTips = '下载导入用模版' } = props;

  const uploadPrams = {
    name: 'file',
    showUploadList: false,
    action: linkToUrl,
    headers: Q.authHeader(),
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
        const fileName = _.get(info, 'file.name');
        const message = _.get(info, 'file.response.msg', `文件《${fileName}》，导入时发生错误，请修正后重试`);
        const data = _.get(info, 'file.response.data') || [];
        const content = (
          <div>
            <div>
              <Typography.Text type="warning">{message}</Typography.Text>
            </div>
            {data &&
              data.map((it, idx) => (
                <div key={it + '_' + idx}>
                  <Space>
                    <InfoCircleOutlined style={{ color: 'red' }} />
                    {it}
                  </Space>
                </div>
              ))}
          </div>
        );
        modal.error({
          title: '导入异常',
          content,
        });
        if (onFailed) {
          onFailed(info);
        }
      }
    },
  };
  const css = useEmotionCss(({ token }) => ({
    '.ant-btn': {
      backgroundColor: '#faab00',
      borderColor: ' #faab00',
      color: '#fff',
      '&:hover, &:active': {
        color: '#fff',
        backgroundColor: '#ffc53d',
        borderColor: ' #ffc53d',
      },
    },
    '.upload-button': {
      borderTopRightRadius: 0,
      borderBottomRightRadius: 0,
      paddingRight: 2,
      '&:hover, &:active': {
        zIndex: 99999,
      },
    },
    '.upload-template': {
      marginLeft: -1,
      paddingRight: 10,
      paddingLeft: 10,
      borderTopLeftRadius: 0,
      borderBottomLeftRadius: 0,
    },
  }));

  const rootCls = classNames('file-import', {
    [css]: ObjectUtils.isNotEmpty(templateUrl),
  });

  return (
    <div className={rootCls}>
      <Upload {...uploadPrams}>
        <Button loading={loading} className={'upload-button'}>
          <UploadOutlined />
          {title}
        </Button>
      </Upload>
      {ObjectUtils.isNotEmpty(templateUrl) && (
        <Popover content={templateTips} trigger="hover">
          <Button className={'upload-template'} href={templateUrl}>
            <ThunderboltOutlined />
          </Button>
        </Popover>
      )}
    </div>
  );
}
