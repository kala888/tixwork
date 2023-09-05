import FormUtils from '@/components/form/form-utils';
import EleProProvider from '@/components/value-type/ele-pro-provider';
import { colors } from '@/components/value-type/style-utils';
import ObjectUtils from '@/utils/object-utils';
import { EditOutlined } from '@ant-design/icons';
import type { ProFormInstance } from '@ant-design/pro-components';
import { useEmotionCss } from '@ant-design/use-emotion-css';
import type { ModalProps } from 'antd';
import { App, Modal } from 'antd';
import className from 'classnames';
import _ from 'lodash';
import useMergedState from 'rc-util/es/hooks/useMergedState';
import React, { useEffect, useRef } from 'react';

export type BaseFormType = {
  title?: ModalProps['title'];
  values?: Record<string, any>;
  children?: any;
  columns?: any[];
  initialValues?: Record<string, any>;
  size?: 'large' | 'small';
  layout?: 'horizontal' | 'vertical';
  appendBefore?: any;

  onFinish?: (values) => Promise<boolean>;
  onSuccess?: () => void;
  onFail?: () => void;
  onSave?: (values: Record<string, any>) => void;
  onUpdate?: (values: Record<string, any>) => void;
  modalProps?: ModalProps;
  className?: any;

  //如果 外部控制，需要传入open和setOpen
  open?: boolean;
  setOpen?: (value: boolean) => void;
  // 否则传入trigger就行，
  trigger?: any;
  convertValues?: (values: Record<string, any>) => Record<string, any>;
  // formRef?: React.MutableRefObject<FormInstance>;
};

const emptyTitle = <EditOutlined style={{ color: colors.textColorLighter }} />;
const defaultValues = {} as any;

const PopupFormWrapper = (props: BaseFormType) => {
  const { message } = App.useApp();
  const formRef = useRef<ProFormInstance>();
  const [open, setOpen] = useMergedState<boolean>(false, {
    value: props.open,
    onChange: props.setOpen,
  });

  const {
    title = emptyTitle,
    values = defaultValues,
    columns = [],
    size,
    appendBefore,
    children,
    onFinish,
    onSuccess,
    onFail,
    onSave,
    onUpdate,
    modalProps = {},
    trigger,
    convertValues,
    ...rest
  } = props;

  useEffect(() => {
    if (ObjectUtils.isNotEmpty(values)) {
      formRef?.current?.resetFields();
      formRef?.current?.setFieldsValue(values);
    } else {
      formRef?.current?.resetFields();
    }
  }, [values]);

  const { popupWidth, defaultItemWidth, ...layout } = FormUtils.smartLayout(props);

  const theColumns = FormUtils.groupColumns(props);

  const submit = async (values) => {
    const theValues = convertValues ? convertValues(values) : values;
    if (onFinish) {
      return await onFinish(theValues);
    }
    const id = props.values?.id;
    const hide = message.loading('数据更新处理中...');
    try {
      if (ObjectUtils.isEmpty(id)) {
        if (onSave) {
          await onSave(theValues);
        } else {
          throw new Error('onSave is not defined');
        }
        message.success('添加成功');
      } else {
        if (onUpdate) {
          await onUpdate({ id, ...theValues });
        } else {
          throw new Error('onUpdate is not defined');
        }
        message.success('更新已完成');
      }
      return true;
    } catch (error) {
      return false;
    } finally {
      hide();
    }
  };

  const handleFinish = async (values) => {
    const success: any = await submit(values);
    if (success) {
      if (onSuccess) {
        onSuccess();
      }
      setOpen(false);
      return true;
    }
    if (onFail) {
      onFail();
    }
    return false;
  };

  const handleConfirm = () => formRef.current?.submit();
  const close = () => setOpen(false);
  const show = () => setOpen(true);

  const css = useEmotionCss(({ token }) => {
    return {
      '.ant-modal-content': {
        padding: '10px 16px 20px',
      },
      '.ant-modal-header': {
        padding: 4,
      },
      '.ant-modal-close-x': {
        zIndex: 9999,
        display: 'flex',
        fontSize: 16,
        justifyContent: 'center',
        lineHeight: 24,
      },
      '.ant-modal-body': {
        paddingTop: 10,
      },
      '.ant-modal-footer button': {
        height: 30,
        paddingLeft: 14,
        paddingRight: 14,
        marginInlineStart: '16px !important',
      },
    };
  });

  const formProps = {
    key: values?.id,
    initialValues: values,
    formRef: formRef,
    onFinish: handleFinish,
    ...layout,
    ..._.omit(rest, ['setOpen', 'open']),
    columns: theColumns,
  };

  const rootCls = className('pro-edit-form', css, props.className);
  return (
    <>
      <div onClick={show}>{trigger}</div>
      <Modal
        className={rootCls}
        maskClosable={false}
        width={popupWidth}
        onCancel={close}
        open={open}
        title={title}
        onOk={handleConfirm}
        okText={'确定'}
        cancelText={'取消'}
        {...modalProps}
      >
        <EleProProvider>{React.cloneElement(props.children, formProps)}</EleProProvider>
      </Modal>
    </>
  );
};
export default PopupFormWrapper;
