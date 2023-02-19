import FormUtils from '@/components/form/form-utils';
import EleProProvider from '@/components/value-type/ele-pro-provider';
import { isNotEmpty } from '@/utils/object-utils';
import type { ProFormInstance } from '@ant-design/pro-components';
import { BetaSchemaForm, ModalForm } from '@ant-design/pro-components';
import type { ModalProps } from 'antd';
import { useEffect, useRef } from 'react';

export type BaseFormType = {
  title?: ModalProps['title'];
  onFinish: (values) => Promise<void>;
  onVisibleChange: (visible: boolean) => void;
  visible: boolean;
  values: any;
  children?: any;
  columns?: any[];
  initialValues?: any;
  size?: 'large' | 'small';
  layout?: 'horizontal' | 'vertical';
  appendBefore?: any;
};

const BaseForm = (props: BaseFormType) => {
  const formRef = useRef<ProFormInstance>();

  const { values = {}, columns = [], size, appendBefore, children, ...rest } = props;

  useEffect(() => {
    if (isNotEmpty(values)) {
      formRef?.current?.resetFields();
      formRef?.current?.setFieldsValue(values);
    } else {
      formRef?.current?.resetFields();
    }
  }, [values]);

  const { popupWidth, ...layout } = FormUtils.smartLayout(props);

  const theColumns = FormUtils.groupColumns(props);

  return (
    <EleProProvider>
      <ModalForm
        modalProps={{
          maskClosable: false,
          width: popupWidth,
        }}
        // size='small'
        formRef={formRef}
        {...layout}
        {...rest}
        // title={popupWidth}
      >
        {appendBefore}
        <BetaSchemaForm layoutType="Embed" columns={theColumns} />
        {children}
      </ModalForm>
    </EleProProvider>
  );
};

export default BaseForm;
