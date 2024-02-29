import React from 'react';
import { getExtMode } from '@/nice-router/nice-router-utils';
import ObjectUtils from '@/utils/object-utils';
import { View } from '@tarojs/components';
import _ from 'lodash';
import classNames from 'classnames';
import { noop } from '@/utils';
import './action-field.less';

type ActionFieldProps = {
  value: string | { title: string };
  placeholder?: string;
  disabled?: boolean;
  onClick?: Function;
  className?: string;
  toggleStatus?: boolean;
  children?: React.ReactNode;
};

function ActionField(props: ActionFieldProps) {
  const { value, placeholder, disabled, onClick = noop, className, toggleStatus } = props;

  const handleClick = () => {
    if (!disabled) {
      onClick();
    }
  };

  const theValue = _.isObject(value) ? value?.title : value;

  const contentClass = getExtMode({
    placeholder: ObjectUtils.isEmpty(theValue),
    disabled,
  }).classNames('action-field-content');

  const rootClass = classNames('action-field', className);
  return (
    <View className={rootClass}>
      <View className={contentClass} onClick={handleClick}>
        {theValue || placeholder}
      </View>

      {!_.isNil(toggleStatus) && (
        <View
          className={`iconfont iconfont-${toggleStatus ? 'down' : 'right'} action-field-picker-icon`}
          onClick={handleClick}
        />
      )}

      {!disabled && props.children}
    </View>
  );
}

ActionField.defaultProps = {
  disabled: false,
  onClick: noop,
};
export default ActionField;
