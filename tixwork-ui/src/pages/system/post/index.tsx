import BasePage from '@/components/layout/base-page';
import TableList from '@/components/table-list';
import type { EleValueType } from '@/components/value-type';
import CommonColumn from '@/components/value-type/common-column';
import ApiConfig from '@/http/api-config';
import type { API } from '@/http/api-types';
import type { ProColumnType } from '@ant-design/pro-components';
import Text from 'antd/es/typography/Text';
import EditForm from './edit-form';

const columns: ProColumnType<API.Post, EleValueType>[] = [
  {
    title: 'ID',
    dataIndex: 'id',
    align: 'center',
    width: 50,
    hideInForm: true,
  },
  {
    title: '职务编码',
    dataIndex: 'postCode',
    align: 'center',
  },
  {
    title: '职务名称',
    dataIndex: 'postName',
    ellipsis: true,
    align: 'center',
  },
  {
    title: '排序',
    dataIndex: 'sortOrder',
    align: 'center',
  },
  CommonColumn.status,
  CommonColumn.createTime,
];

export default () => {
  return (
    <BasePage>
      <Text>TODO 实际上这里叫岗位有问题，这个职务信息。岗位应该是和人绑定的。</Text>
      <Text>
        例如，公司可以有两个开发岗，开发1和开发2。铁打的岗位，流水的人。再例如，管理员应该是个岗位，而不是个账号。因为人是有变更需求的。
      </Text>
      <Text>
        岗位起到连接组织架构和权限的作用。一个人可以有多个岗位。
        {`人 <--1----n-->岗位<--n----n-->角色`}
      </Text>
      <TableList<API.Post>
        resource={ApiConfig.post}
        title="职务管理"
        columns={columns}
        editForm={EditForm}
        pagination={false}
        search={false}
      />
    </BasePage>
  );
};
