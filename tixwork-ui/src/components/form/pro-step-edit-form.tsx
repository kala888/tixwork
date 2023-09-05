import { StepFormProps, StepsForm } from '@ant-design/pro-components';
import { useEmotionCss } from '@ant-design/use-emotion-css';
import { Space } from 'antd';
import React, { ReactElement } from 'react';
import PopupFormWrapper, { BaseFormType } from './popup-form-wrapper';

const TheForm = (props) => {
  const { steps = [] } = props;
  const css = useEmotionCss(() => ({
    '.footer-action': {
      marginTop: 20,
    },
    '.ant-pro-steps-form-container': {
      margin: '10px',
    },
  }));
  return (
    <div className={css}>
      <StepsForm
        {...props}
        stepsProps={{ style: { padding: '0 10%' } }}
        submitter={{
          render: (_, dom) => <Space className="footer-action">{dom}</Space>,
          submitButtonProps: {
            style: {
              minWidth: 150,
            },
          },
        }}
      >
        {steps.map((it) => {
          const { children, ...others } = it;
          return (
            <StepsForm.StepForm {...others} key={it.name}>
              {children}
            </StepsForm.StepForm>
          );
        })}
      </StepsForm>
    </div>
  );
};

type ProStepEditFormType = {
  steps: ({ children: ReactElement } & StepFormProps)[];
} & BaseFormType;

const ProStepEditForm = (props: ProStepEditFormType) => {
  const { steps = [], ...rest } = props;

  return (
    <PopupFormWrapper {...rest} modalProps={{ footer: false }}>
      <TheForm steps={steps} />
    </PopupFormWrapper>
  );
};

export default React.memo(ProStepEditForm);
