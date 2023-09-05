import { BetaSchemaForm, ProForm } from '@ant-design/pro-components';
import React from 'react';
import PopupWrapper, { BaseFormType } from './popup-form-wrapper';

const TheForm = (props) => {
  const { appendBefore, children, columns, ...rest } = props;
  const submitter = {
    resetButtonProps: {
      style: {
        display: 'none',
      },
    },
    submitButtonProps: {
      style: {
        display: 'none',
      },
    },
  };
  return (
    <ProForm {...rest} submitter={submitter}>
      {appendBefore}
      <BetaSchemaForm layoutType="Embed" columns={columns} />
      {children}
    </ProForm>
  );
};

const ProEditForm = (props: BaseFormType) => {
  const { appendBefore, children, ...rest } = props;

  return (
    <PopupWrapper {...rest}>
      <TheForm appendBefore={appendBefore}>{children}</TheForm>
    </PopupWrapper>
  );
};

export default React.memo(ProEditForm);
