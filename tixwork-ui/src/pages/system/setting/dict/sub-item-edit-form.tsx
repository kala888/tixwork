import ProEditForm from '@/components/form/pro-edit-form';
import RemoteRadio from '@/components/form/remote/remote-radio';
import { CommonRule } from '@/components/value-type/common-column';
import { ProFormDigit, ProFormGroup, ProFormRadio, ProFormText, ProFormTextArea } from '@ant-design/pro-components';

export default function SubItemEditForm(props) {
  const { parent, values = {}, ...rest } = props;

  const theValues = {
    parent: {
      id: parent?.id,
    },
    dataScope: 'PUBLIC',
    sortOrder: 10,
    isDefault: 'N',
    status: 'ENABLED',
    type: 'VALUE',
    ...values,
  };
  const title = `字典类型：${parent.key}(${parent.title})`;

  return (
    <ProEditForm {...rest} values={theValues} size={'large'} title={title}>
      <ProFormText name={'id'} hidden={true} width="md" />
      <ProFormText name={['parent', 'id']} hidden={true} />
      <ProFormText name="type" hidden={true} />
      <ProFormText name="dataScope" hidden={true} />

      <ProFormGroup>
        <ProFormText name="value" label="参数值" width="md" rules={[CommonRule.required]} />
        <ProFormText name="title" label={'名称'} width="md" tooltip={'一般是中文名称'} rules={[CommonRule.required]} />
      </ProFormGroup>
      <ProFormGroup>
        <ProFormRadio.Group
          label="是否默认值"
          name="isDefault"
          radioType="button"
          fieldProps={{
            buttonStyle: 'solid',
          }}
          options={[
            { value: 'Y', label: '是' },
            { value: 'N', label: '否' },
          ]}
          rules={[CommonRule.required]}
        />
        <RemoteRadio label="状态" name="status" allowClear={false} types="sys.status" rules={[CommonRule.required]} />
        <ProFormDigit name="sortOrder" label={'排序'} width={'xs'} />
      </ProFormGroup>

      <ProFormTextArea name="remark" label={'备注'} width={1024} />
    </ProEditForm>
  );
}
