import BoxWrapper from '@/components/box-wrapper/box-wrapper';
import { ProCard } from '@ant-design/pro-components';
import { useEmotionCss } from '@ant-design/use-emotion-css';
import { Checkbox, Col, Row } from 'antd';
import _ from 'lodash';
import React from 'react';

type GroupedCheckboxFieldType = {
  label: string;
  name: string;
  value: any;
  onChange: (checkedList: any[] | null) => void;
  options: GroupItemType[];
  placeholder?: string;
  disabled?: boolean;
};

type GroupItemType = {
  id: React.Key;
  title?: string;
  children: {
    id: React.Key;
    title?: string;
  }[];
};

const getValue = (value) => {
  if (!Array.isArray(value)) {
    return value;
  }
  return value.map((it) => it.id || it);
};

const getOptionValues = (options) => _.flatten(options.map((it) => it.children));

export default (props: GroupedCheckboxFieldType) => {
  const { value, disabled, options = [], onChange, ...rest } = props;

  const handleChange = (checkedList) => {
    const optionValues = getOptionValues(options);
    const result = checkedList.map((it) => _.find(optionValues, { id: it }) || { id: it });
    onChange(result);
  };

  const theValue = getValue(value);

  const rootCls = useEmotionCss(({ token }) => {
    return {
      width: '100%',
      '.ant-checkbox-wrapper': {
        minWidth: 100,
        color: token.colorTextLabel,
      },
    };
  });

  return (
    <Checkbox.Group {...rest} defaultValue={theValue} onChange={handleChange} className={rootCls}>
      <ProCard ghost direction={'row'} gutter={[16, 16]} wrap>
        {options.map((group) => {
          const key = group.title + '_' + group.id;
          const items = group.children || [];
          const colSpan = items.length > 10 ? '100%' : '50%';
          return (
            <BoxWrapper key={key} title={group.title} colSpan={colSpan}>
              <Row>
                {items.map((it) => {
                  return (
                    <Col key={it.id} span={8}>
                      <Checkbox value={it.id} disabled={disabled}>
                        {it.title}
                      </Checkbox>
                    </Col>
                  );
                })}
              </Row>
            </BoxWrapper>
          );
        })}
      </ProCard>
    </Checkbox.Group>
  );
};
