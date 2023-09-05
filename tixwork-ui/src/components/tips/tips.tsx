import { QuestionCircleOutlined } from '@ant-design/icons';
import { useEmotionCss } from '@ant-design/use-emotion-css';
import { Space, Tooltip } from 'antd';
import classNames from 'classnames';
import React from 'react';

type TipsType = {
  title: string;
  className?: string;
  children?: React.ReactNode;
};
export default function Tips(props: TipsType) {
  const { title, className } = props;
  const css = useEmotionCss(({ token }) => ({
    color: token.colorTextLabel,
    '.anticon': {
      fontSize: 12,
      color: token.colorWarning,
    },
  }));

  return (
    <Space className={classNames('tips', css, className)}>
      {props.children}
      <Tooltip title={title}>
        <QuestionCircleOutlined />
      </Tooltip>
    </Space>
  );
}
