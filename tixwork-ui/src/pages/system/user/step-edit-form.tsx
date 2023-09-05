import type { BaseFormType } from '@/components/form/popup-form-wrapper';
import ProStepEditForm from '@/components/form/pro-step-edit-form';
import ObjectPicker from '@/components/value-type/object/object-picker';
import { ProFormGroup, ProFormText } from '@ant-design/pro-components';
import FormFields from './form-fields';

const EditForm = (props: BaseFormType) => {
  // const isNew = ObjectUtils.isEmpty(props.values?.userId);
  const steps = [
    {
      title: '基本信息',
      name: 'base',
      children: <FormFields />,
    },
    {
      title: '扩展设置',
      name: 'extra',
      children: (
        <ProFormGroup>
          <ProFormText label={'部门名称'} name={['customer', 'orgCode']} />
          <ObjectPicker label={'账本'} name={['customer', 'accountBook']} />
        </ProFormGroup>
      ),
    },
  ];
  return (
    <ProStepEditForm
      {...props}
      steps={steps}
      title="用户信息"
      initialValues={{ status: '0', gender: '0' }}
      size={'large'}
    />
  );
};
export default EditForm;
