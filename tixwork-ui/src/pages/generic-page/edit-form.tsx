import { BaseFormType } from '@/components/form/popup-form-wrapper';
import ProEditForm from '@/components/form/pro-edit-form';
import useResource from '@/http/use-resource';
import React from 'react';

export default React.memo((props: { schema: any } & BaseFormType) => {
  const { title, schema, values, ...rest } = props;
  const resource = useResource(schema.linkToUrl);
  const formTitle = `${values?.id ? '编辑' : '创建'} ${title || schema.label}`;
  return (
    <ProEditForm values={values} columns={schema.columns} onUpdate={resource.update} {...rest} title={formTitle} />
  );
});
