import { EleValueType } from '@/components/value-type';
import { API } from '@/http/api-types';
import ObjectUtils from '@/utils/object-utils';
import { ProColumnType } from '@ant-design/pro-components';
import { Space, Tag } from 'antd';
import StatusCell from './component/status-cell';
import TimeCell from './component/time-cell';

export const columns: ProColumnType<API.Config, EleValueType>[] = [
  {
    title: 'ID',
    dataIndex: 'id',
    hideInSearch: true,
    width: 60,
  },
  {
    title: '客户端Key',
    dataIndex: 'clientKey',
    align: 'center',
  },
  {
    title: 'Client ID',
    dataIndex: 'clientId',
    copyable: true,
    width: 280,
  },
  {
    title: '密钥',
    dataIndex: 'clientSecret',
    hideInSearch: true,
  },
  {
    title: '认证登录授权类型',
    dataIndex: 'grantTypeList',
    hideInSearch: true,
    render: (text) => (
      <Space>
        {ObjectUtils.parseToArray(text).map((it) => (
          <Tag key={it}>{it}</Tag>
        ))}
      </Space>
    ),
  },
  {
    title: '设备类型',
    dataIndex: 'deviceType',
    hideInSearch: true,
  },
  {
    title: '活跃有效期',
    dataIndex: 'activeTimeout',
    tooltip: '活跃Token超时时间: 指定时间时间无操作则过期。单位：秒',
    width: 90,
    hideInSearch: true,
    render: (text) => <TimeCell seconds={text} />,
  },
  {
    title: '最大有效期',
    dataIndex: 'timeout',
    tooltip: 'Token固定超时时间: Token固定超时时间，最大生命时间。单位：秒',
    width: 90,
    hideInSearch: true,
    render: (text) => <TimeCell seconds={text} />,
  },
  {
    title: '状态',
    dataIndex: 'status',
    align: 'center',
    hideInSearch: true,
    width: 80,
    render: (text, record) => <StatusCell value={text} id={record.id} />,
  },

  // {
  //     title: '创建时间',
  //     key: 'createTime',
  //     dataIndex: 'createTime',
  //     valueType: 'dateTime',
  //     hideInSearch: true,
  //     width: 140,
  // },
  // {
  //     title: '更新时间',
  //     key: 'updateTime',
  //     dataIndex: 'updateTime',
  //     valueType: 'dateTime',
  //     hideInSearch: true,
  //     width: 140,
  // },
];
