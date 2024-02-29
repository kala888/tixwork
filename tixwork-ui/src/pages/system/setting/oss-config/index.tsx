import ProEditForm from '@/components/form/pro-edit-form';
import TableList from '@/components/table-list';
import type { EleValueType } from '@/components/value-type';
import { CommonRule } from '@/components/value-type/common-column';
import ObjectLink from '@/components/value-type/object/object-link';
import ApiConfig from '@/http/api-config';
import type { API } from '@/http/api-types';
import type { ProColumnType } from '@ant-design/pro-components';
import { ProFormGroup, ProFormRadio, ProFormText, ProFormTextArea } from '@ant-design/pro-components';
import { history } from '@umijs/max';

const columns: ProColumnType<API.OssConfig, EleValueType>[] = [
  {
    title: '配置名',
    dataIndex: 'configKey',
    width: 120,
    align: 'center',
    render: (text, record) => {
      const linkToUrl = '/system/oss-config/' + record.id;
      return <ObjectLink displayName={text as any} linkToUrl={linkToUrl} />;
    },
  },
  {
    title: 'Bucket',
    dataIndex: 'bucketName',
  },
  {
    title: 'Status',
    width: 120,
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
    align: 'center',
  },
  {
    title: '最后修改时间',
    dataIndex: 'updateTime',
    valueType: 'dateTime',
    width: 142,
  },
];

const EditForm = (props) => {
  return (
    <ProEditForm {...props} size="large">
      <ProFormText name={'id'} hidden={true} />
      <ProFormGroup>
        <ProFormText name="configKey" label="配置名" disabled width="xl" />
      </ProFormGroup>

      <ProFormGroup>
        <ProFormText name="accessKey" label="AccessKey" width="md" />
        <ProFormText name="secretKey" label="SecretKey" width="md" />
      </ProFormGroup>

      <ProFormGroup>
        <ProFormText name="bucketName" label="Bucket" width="sm" />
        <ProFormText name="prefix" label="Prefix" width="sm" />
        <ProFormText name="endpoint" label="Endpoint" width="sm" />
      </ProFormGroup>

      <ProFormGroup>
        {/*<ProFormSwitch name="isHttps" label="Https?" checkedChildren="是" unCheckedChildren="否" />*/}
        <ProFormText name="domain" label="自定义域名" />
        <ProFormText name="region" label="Region" />
        <ProFormRadio.Group
          label="状态"
          name="status"
          valueType="radioButton"
          fieldProps={{
            buttonStyle: 'solid',
          }}
          options={[
            { value: '0', label: '正常' },
            { value: '1', label: '停用' },
          ]}
          rules={[CommonRule.required]}
          {...props}
        />
      </ProFormGroup>
      <ProFormTextArea name="accessPolicy" label="AccessPolicy" />
      <ProFormTextArea name="remark" label="备注" />
    </ProEditForm>
  );
};

export default () => {
  const actionList = [
    {
      code: 'view',
      title: '详情',
      onClick: (item) => history.push('/system/oss-config/' + item.id),
    },
    { code: 'edit' },
  ];
  return (
    <TableList<API.OssConfig>
      search={false}
      resource={ApiConfig.ossConfig}
      columns={columns}
      actionList={false}
      lineActionList={actionList}
      editForm={EditForm}
    />
  );
};
