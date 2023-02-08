import BaseForm from '@/components/form/base-form';
import { CommonRule } from '@/components/value-type/common-column';
import { RemoteSelect } from '@/components/value-type/remote-enum';
import {
  ProFormDigit,
  ProFormRadio,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-components';

export default function SubItemEditForm(props) {
  const { parent, initialValues = {}, ...rest } = props;

  const values = {
    parent: {
      id: parent.id,
    },
    dataScope: 'PUBLIC',
    sortOrder: 10,
    isDefault: 'N',
    status: 'ENABLED',
    type: 'VALUE',
    ...initialValues,
  };
  const isEnumValue = parent.type === 'ENUMS';

  return (
    <BaseForm {...rest} initialValues={values}>
      <ProFormText name={'id'} hidden={true} />
      <ProFormText name={['parent', 'id']} hidden={true} />
      <ProFormText name="type" hidden={true} />
      <ProFormText name="dataScope" hidden={true} />

      <ProFormText name="code" label={'编码'} width="sm" rules={[CommonRule.required]} />
      <ProFormText
        name="label"
        label={'名称'}
        width="sm"
        tooltip={'一般是中文名称'}
        rules={[CommonRule.required]}
      />

      <ProFormText
        name="value"
        label="参数值"
        width="sm"
        tooltip="Group的子对象，可以填写value"
        disabled={isEnumValue}
      />
      <ProFormDigit name="sortOrder" label={'排序'} width="sm" />

      <ProFormRadio.Group
        label="是否默认值"
        name="isDefault"
        //@ts-ignore
        valueType="radioButton"
        fieldProps={{
          buttonStyle: 'solid',
        }}
        options={[
          { value: 'Y', label: '是' },
          { value: 'N', label: '否' },
        ]}
        rules={[CommonRule.required]}
      />
      <RemoteSelect
        label="状态"
        name="status"
        allowClear={false}
        types="Status"
        rules={[CommonRule.required]}
      />
      <RemoteSelect label="展示Level" name="configLevel" types="ConfigLevel" />

      <ProFormTextArea name="remark" label={'备注'} width="xl" />
    </BaseForm>
  );
}
