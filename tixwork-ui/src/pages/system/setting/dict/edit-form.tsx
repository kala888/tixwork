import ProEditForm from '@/components/form/pro-edit-form';

export default function EditForm(props) {
  const convertValues = (values) => ({
    ...values,
    type: 'DICT',
  });

  return <ProEditForm {...props} convertValues={convertValues} />;
}
