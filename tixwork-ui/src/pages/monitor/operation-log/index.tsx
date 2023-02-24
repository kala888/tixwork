import EleTableList from '@/components/ele-table-list/ele-table-list';
import BasePage from '@/components/layout/base-page';
import type { EleValueType } from '@/components/value-type';
import CommonColumn from '@/components/value-type/common-column';
import ApiConfig from '@/http/api-config';
import type { ProColumnType } from '@ant-design/pro-components';

const columns: ProColumnType<any, EleValueType>[] = [
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
      '1': '新建',
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
    align: 'center',
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
    ...CommonColumn.status,
    width: 100,
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
      '0': '其它',
      '1': '后台用户',
      '2': '手机端用户',
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
  return (
    <BasePage title="操作记录">
      <EleTableList
        resource={ApiConfig.operationLog}
        columns={columns}
        options={false}
        toolBarRender={false}
        lineActionList={false}
        scroll={{ x: 1300 }}
      />
    </BasePage>
  );
};
