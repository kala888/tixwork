import { MobileTwoTone } from '@ant-design/icons';
import { ProFormText } from '@ant-design/pro-components';
import Paragraph from 'antd/es/typography/Paragraph';

const formatMobile = (mobile: string) => {
  const purePhone = mobile.replace(/\D/g, '');
  const { length } = purePhone;
  if (length <= 3) {
    return purePhone;
  } else if (length <= 7) {
    return purePhone.replace(/(\d{3})(\d{0,4})/, '$1 $2');
  } else {
    return purePhone.replace(/(\d{3})(\d{4})/, '$1 $2 ');
  }
};

const MobileValueType = {
  render: (mobile) => (
    <Paragraph
      copyable={{ icon: [<MobileTwoTone key="copy" />], text: mobile }}
      style={{ marginBottom: 0 }}
    >
      {formatMobile(mobile)}
    </Paragraph>
  ),
  renderFormItem: (__, props) => (
    <ProFormText
      formItemProps={{ className: 'customized-form-item' }}
      {...props}
      fieldProps={{ maxLength: 11, ...props.fieldProps }}
    />
  ),
};
export default MobileValueType;
