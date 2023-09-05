import BasePage from '@/components/layout/base-page';
import TableList from '@/components/table-list';
import type { EleValueType } from '@/components/value-type';
import CommonColumn from '@/components/value-type/common-column';
import ApiConfig from '@/http/api-config';
import Q from '@/http/http-request/q';
import type { ProColumnType } from '@ant-design/pro-components';
import { App } from 'antd';
import { useRef } from 'react';

const columns: ProColumnType<any, EleValueType>[] = [
  {
    title: '状态',
    dataIndex: 'status',
    align: 'center',
    valueType: 'radioButton',
    valueEnum: {
      '0': {
        text: '成功',
        status: 'Processing',
      },
      '1': {
        text: '失败',
        status: 'Error',
      },
    },
    width: 100,
    hideInSearch: true,
  },
  {
    title: '系统模块',
    dataIndex: 'title',
    align: 'center',
    width: 100,
    ellipsis: true,
    hideInSearch: true,
  },
  {
    title: '操作类型',
    dataIndex: 'businessType',
    align: 'center',
    valueType: 'Tag',
    width: 100,
    valueEnum: {
      '0': '其它',
      '1': '创建',
      '2': '修改',
      '3': '删除',
    },
    hideInSearch: true,
  },
  {
    title: '请求方式',
    dataIndex: 'requestMethod',
    align: 'center',
    width: 100,
    ellipsis: true,
    hideInSearch: true,
  },
  {
    title: 'URL',
    dataIndex: 'url',
    width: 150,
    ellipsis: true,
    hideInSearch: true,
  },
  {
    title: '参数',
    dataIndex: 'param',
    align: 'center',
    width: 150,
    ellipsis: true,
    hideInSearch: true,
  },
  {
    title: 'JSON结果',
    dataIndex: 'jsonResult',
    align: 'center',
    width: 150,
    ellipsis: true,
    hideInSearch: true,
  },
  {
    title: '错误消息',
    dataIndex: 'errorMsg',
    align: 'center',
    width: 150,
    ellipsis: true,
    hideInSearch: true,
  },
  {
    title: '用户类型',
    dataIndex: 'operatorType',
    align: 'center',
    valueType: 'Tag',
    width: 100,
    hideInSearch: true,
    valueEnum: {
      SYSTEM: '后台用户',
      CLIENT: '手机端用户',
    },
  },
  {
    title: '操作人员',
    dataIndex: 'userName',
    align: 'center',
    width: 100,
  },

  {
    title: '部门',
    dataIndex: 'deptName',
    align: 'center',
    width: 100,
    hideInSearch: true,
  },

  {
    title: '主机',
    dataIndex: 'ip',
    align: 'center',
    width: 100,
  },
  {
    title: '操作地点',
    dataIndex: 'location',
    align: 'center',
    width: 100,
    hideInSearch: true,
  },
  {
    title: '耗时',
    dataIndex: 'takeUpTime',
    align: 'center',
    width: 100,
    hideInSearch: true,
  },
  {
    ...CommonColumn.createTime,
    width: 150,
  },
];

export default () => {
  const { modal, message } = App.useApp();
  const ref = useRef<any>();

  const actionList: any[] = [
    {
      code: 'clean',
      title: '清理全部',
      level: 'danger',
      onClick: () => {
        modal.confirm({
          title: '确定清理全部操作日志吗？',
          onOk: async () => {
            await Q.remove(ApiConfig.operationLog + '/clean');
            ref.current?.refresh();
            await message.success('清空成功');
          },
        });
      },
    },
  ];
  return (
    <BasePage>
      <TableList
        ref={ref}
        title="操作记录"
        resource={ApiConfig.operationLog}
        columns={columns}
        actionList={actionList}
        lineActionList={false}
        scroll={{ x: 1300 }}
      />
    </BasePage>
  );
};
