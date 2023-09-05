import ApiConfig from '@/http/api-config';
import Q from '@/http/http-request/q';
import FileTypeUtils, { FileType } from '@/services/file-type-utils';
import { ensureArray } from '@/utils';
import ObjectUtils from '@/utils/object-utils';
import { UploadOutlined } from '@ant-design/icons';
import { useEmotionCss } from '@ant-design/use-emotion-css';
import { App, Button, Upload } from 'antd';
import { Flex } from 'antd-mobile-alita';
import type { RcFile, UploadFile } from 'antd/es/upload/interface';
import { UploadListType } from 'antd/es/upload/interface';
import React, { useEffect, useState } from 'react';

const checkFileType = (file: RcFile, accept?: FileType | FileType[]) => {
  if (ObjectUtils.isEmpty(accept)) {
    return true;
  }
  const allows = ensureArray(accept);
  let type = FileTypeUtils.getFileTypeByMime(file.type);
  if (type === 'file') {
    type = FileTypeUtils.getFileTypeBySuffix(file.name);
  }
  return allows.includes(type);
};
const checkFileSize = (file: RcFile, maxSize: number) => file.size / 1024 / 1024 < maxSize;

const toFile = (fileUrl) => {
  const fileName = fileUrl.substring(fileUrl.lastIndexOf('/') + 1);
  return {
    name: fileName,
    uid: fileUrl,
    status: 'done',
    url: fileUrl,
  } as UploadFile;
};

type UploadType = {
  value?: string | string[];
  single?: boolean;
  width?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
  maxCount?: number;
  disabled?: boolean;
  onPreview?: (file: UploadFile) => void;
  beforeUpload?: (file: RcFile) => void;
  listType?: UploadListType;
  accept?: FileType | FileType[];
  maxFileSize?: number; //单位MB
  [key: string]: any;
};

const _Upload = (props: UploadType) => {
  const { message } = App.useApp();
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const {
    listType = 'picture',
    beforeUpload,
    onPreview,
    value = [],
    single = false,
    onChange,
    width = 'lg',
    disabled,
    accept,
    maxFileSize = 5,
    ...rest
  } = props;

  useEffect(() => {
    if (ObjectUtils.isEmpty(value)) {
      return;
    }
    const list = ensureArray(value).map(toFile);
    setFileList(list);
  }, [value]);

  const maxCount = single ? 1 : props.maxCount || 3;

  const handleChange = (info) => {
    const list = info.fileList;
    if (info.file.status === 'done' && info.file.response) {
      if (ObjectUtils.isNotEmpty(info.file.response.data.url)) {
        const result = info.fileList
          .map((it) => it.url || it.response.data.url)
          .filter((it) => ObjectUtils.isNotEmpty(it));
        if (onChange) {
          onChange(single ? result[0] : result);
        }
        message.success('上传成功');
      } else {
        message.error('上传失败');
      }
    }
    setFileList(list);
  };

  const handleBeforeUpload = (file: RcFile) => {
    const typeCheck = checkFileType(file, accept);
    if (!typeCheck) {
      message.error('文件类型不对，只能上传' + accept + '类型的文件');
    }
    const sizeCheck = checkFileSize(file, maxFileSize);
    if (!sizeCheck) {
      message.error('文件大小不能超过' + maxFileSize + 'MB');
    }
    const beforeUploadCheck = beforeUpload && beforeUpload(file);
    return typeCheck && sizeCheck && beforeUploadCheck;
  };

  const buttonCls = useEmotionCss(({ token }) => ({
    '.anticon': {
      color: token.colorTextLabel,
    },
    div: {
      marginLeft: 6,
      color: token.colorTextLabel,
      display: 'inline-block',
    },
  }));
  const UploadButton = listType === 'text' || listType === 'picture' ? Button : Flex;

  return (
    <Upload
      listType={listType}
      action={ApiConfig.upload}
      fileList={fileList}
      onChange={handleChange}
      maxCount={maxCount}
      onPreview={onPreview}
      headers={Q.authHeader()}
      beforeUpload={handleBeforeUpload}
      {...rest}
    >
      {fileList.length < maxCount && !disabled && (
        <UploadButton className={buttonCls}>
          <UploadOutlined />
          <div>点击上传</div>
        </UploadButton>
      )}
    </Upload>
  );
};

export default React.memo(_Upload);
