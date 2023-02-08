import EleProProvider from '@/components/value-type/ele-pro-provider';
import type { EleSizeType } from '@/components/value-type/style-utils';
import StyleUtils from '@/components/value-type/style-utils';
import { isNotEmpty } from '@/utils/object-utils';
import type { ProFormInstance } from '@ant-design/pro-components';
import { BetaSchemaForm, ModalForm, ProForm } from '@ant-design/pro-components';
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
  size?: EleSizeType;
  layout?: 'horizontal' | 'vertical';
};

// function getWidth(size, columns: any[]) {
//   if (!_.isNil(size)) {
//     return StyleUtils.getSize(size);
//   }
//   // 1-8返回2列，9-12返回3，13-16返回4，大于16返回5列
//   const formColumnLength = columns.filter((it) => !it.hideInForm).length;
//   const defaultValue = _.clamp(_.ceil(formColumnLength / 4), 2, 5);
//   return StyleUtils.getSize(defaultValue);
// }
// "xs" | "sm" | "md" | "lg" | "xl"
function smartLayout(props) {
  const { columns = [], layout } = props;
  const colSize = columns.length;
  //如果不是schema form的话，就返回空
  if (colSize === 0 || isNotEmpty(layout)) {
    return {};
  }
  if (colSize > 10) {
    return {
      popupWidth: StyleUtils.getSize(4),
      defaultItemWidth: 'sm',
      layout: 'vertical' as any,
    };
  }

  return {
    popupWidth: StyleUtils.getSize(2),
    defaultItemWidth: 'xl',
    labelCol: { span: 4 },
    wrapperCol: { span: 20 },
    layout: 'horizontal' as any,
  };
}

const BaseForm = (props: BaseFormType) => {
  const formRef = useRef<ProFormInstance>();

  const { values = {}, columns = [], size, children, ...rest } = props;

  useEffect(() => {
    if (isNotEmpty(values)) {
      formRef?.current?.setFieldsValue(values);
    } else {
      formRef?.current?.resetFields();
    }
  }, [values]);

  const { defaultItemWidth, popupWidth, ...layout } = smartLayout(props);

  const theColumns = [
    {
      valueType: 'group',
      columns: columns.map((it) => ({
        ...it,
        width: it.formItemProps?.width || it.width || defaultItemWidth,
      })),
    },
  ];

  return (
    <EleProProvider>
      <ModalForm
        modalProps={{
          maskClosable: false,
          width: popupWidth,
        }}
        formRef={formRef}
        {...layout}
        {...rest}
        // title={popupWidth}
      >
        <BetaSchemaForm layoutType="Embed" columns={theColumns} />
        {!!children && <ProForm.Group>{children}</ProForm.Group>}
      </ModalForm>
    </EleProProvider>
  );
};

export default BaseForm;
