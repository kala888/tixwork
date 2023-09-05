import ObjectEntityInfo from '@/components/detail/object-entity-info';
import BasePage from '@/components/layout/base-page';
import ApiConfig from '@/http/api-config';
import type { API } from '@/http/api-types';
import { useGet } from '@/http/use-http';
import { useParams } from '@umijs/max';

const columns: any[] = [
  {
    title: '配置',
    dataIndex: 'configKey',
  },
  {
    title: 'AccessKey',
    dataIndex: 'accessKey',
    group: '安全设置',
  },
  {
    title: 'SecretKey',
    dataIndex: 'secretKey',
    group: '安全设置',
  },

  {
    title: 'Bucket',
    dataIndex: 'bucketName',
    group: 'Bucket',
  },
  {
    title: 'Prefix',
    dataIndex: 'prefix',
    group: 'Bucket',
  },
  {
    title: 'Endpoint',
    dataIndex: 'endpoint',
    group: 'Bucket',
  },
  {
    title: 'Domain',
    dataIndex: 'domain',
    group: 'Bucket',
  },
  {
    title: 'Https?',
    dataIndex: 'isHttps',
    valueType: 'radioButton',
    valueEnum: {
      Y: {
        text: '是',
        status: 'Error',
      },
      N: {
        text: '否',
        status: 'Processing',
      },
    },
    group: 'Bucket',
  },
  {
    title: 'Region',
    dataIndex: 'region',
    group: 'Bucket',
  },
  {
    title: 'Status',
    dataIndex: 'status',
    valueType: 'radioButton',
    valueEnum: {
      '1': {
        text: '停用',
        status: 'Error',
      },
      '0': {
        text: '启用',
        status: 'Processing',
      },
    },
  },
  {
    title: 'AccessPolicy',
    dataIndex: 'accessPolicy',
    group: '权限',
  },
  {
    title: '备注',
    dataIndex: 'remark',
    group: '其他',
  },
];

export default function DetailPage() {
  const params = useParams<{ objectType; id }>();
  const { data } = useGet<API.OssConfig>(ApiConfig.ossConfig + '/' + params?.id);
  return (
    <BasePage title="OSS 配置详情" brief={data?.configKey}>
      <ObjectEntityInfo columns={columns} dataSource={data} />
    </BasePage>
  );
}
