import ActionIcon from '@/components/elements/action-icon';
import BasePage from '@/components/layout/base-page';
import TableList from '@/components/table-list';
import type { TableListApi } from '@/components/table-list/table-list-types';
import type { EleValueType } from '@/components/value-type';
import ApiConfig from '@/http/api-config';
import type { API } from '@/http/api-types';
import FileTypeUtils from '@/services/file-type-utils';
import type { ProColumnType } from '@ant-design/pro-components';
import { Image } from 'antd';
import { useRef } from 'react';
import OSSUpload from './oss-upload';

const columns: ProColumnType<API.OssObject, EleValueType>[] = [
  {
    title: '图片/文件',
    dataIndex: 'url',
    align: 'center',
    width: 70,
    render: (text, record) => {
      const fileType = FileTypeUtils.getFileTypeBySuffix(record);
      if (fileType === 'image') {
        return (
          <Image
            width={40}
            src={text as any}
            style={{
              maxHeight: 40,
              objectFit: 'cover',
              borderRadius: 2,
            }}
          />
        );
      }
      const icon = FileTypeUtils.getFileIconByType(fileType);
      return <ActionIcon icon={icon} size={30} />;
    },
    search: false,
  },
  {
    title: '文件名',
    dataIndex: 'fileName',
    align: 'center',
    ellipsis: true,
    copyable: true,
    width: 180,
  },
  {
    title: '源文件名',
    dataIndex: 'originalName',
    align: 'center',
  },

  {
    title: '地址',
    dataIndex: 'url',
    align: 'center',
    ellipsis: true,
    copyable: true,
    width: 182,
    search: false,
  },

  {
    title: '上传人',
    dataIndex: 'createBy',
    width: 100,
    align: 'center',
  },
  {
    title: '服务商',
    dataIndex: 'service',
    width: 80,
    align: 'center',
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    align: 'center',
    hideInForm: true,
    hideInSearch: true,
    width: 142,
  },
];

export default () => {
  const ref = useRef<TableListApi<any>>();

  const lineActionList = [
    { code: 'download', title: '下载' },
    { code: 'remove', title: '删除' },
  ];

  const actionList = [<OSSUpload key="file" title={'上传文件'} onSuccess={() => ref.current?.refresh()} />];

  return (
    <BasePage>
      <TableList<API.OssObject>
        rowKey="key"
        title="文件管理"
        ref={ref}
        resource={ApiConfig.ossObject}
        columns={columns}
        formProps={{ columns }}
        actionList={actionList}
        lineActionList={lineActionList}
      />
    </BasePage>
  );
};
