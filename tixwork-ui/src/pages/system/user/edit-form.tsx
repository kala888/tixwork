import type { BaseFormType } from '@/components/form/popup-form-wrapper';
import ProEditForm from '@/components/form/pro-edit-form';
import FormFields from './form-fields';

const EditForm = (props: BaseFormType) => {
  return (
    <ProEditForm title="用户信息" initialValues={{ status: '0', gender: '0' }} size={'large'} {...props}>
      <FormFields />
    </ProEditForm>
  );
};
export default EditForm;
