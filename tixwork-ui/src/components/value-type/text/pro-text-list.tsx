import ObjectUtils from '@/utils/object-utils';
import { CloseCircleOutlined, PlusCircleFilled, VerticalAlignTopOutlined } from '@ant-design/icons';
import { ProFormField, ProFormFieldProps } from '@ant-design/pro-components';
import { useEmotionCss } from '@ant-design/use-emotion-css';
import { Button, Input, Popconfirm, Space, Tooltip } from 'antd';
import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

type LineItem = {
  id: string;
  value: string;
};

type ProTextListType = ProFormFieldProps<any>;

const AfterActions = (props: { onRemove: () => void; onMoveToTop: () => void; value: string }) => {
  const { onRemove, onMoveToTop, value } = props;
  return (
    <Space>
      <Popconfirm title={'确认是否删除'} description={value} onConfirm={onRemove}>
        <CloseCircleOutlined />
      </Popconfirm>
      <Tooltip color={'orange'} title={`置顶`}>
        <VerticalAlignTopOutlined onClick={onMoveToTop} />
      </Tooltip>
    </Space>
  );
};

function _MultipleLineText(props) {
  const { value, onChange } = props;
  const [items, setItems] = useState<LineItem[]>([] as any);
  useEffect(() => {
    if (value) {
      const theItem: LineItem[] = ObjectUtils.parseToArray(value).map((it) => ({
        id: uuidv4(),
        value: it,
      }));
      setItems(theItem);
    }
  }, [value]);

  const css = useEmotionCss(() => ({
    display: 'flex',
    flexDirection: 'column',
    '.line-item': {
      marginBottom: 10,
    },
  }));

  const handleChange = (theItems: LineItem[] = []) => {
    setItems([...theItems]);
    if (onChange) {
      onChange(theItems.map((it) => it.value));
    }
  };

  const handleItemChange = (id, detail) => {
    const theItem = items?.find((it) => it.id === id);
    if (theItem) {
      theItem.value = detail;
      setItems([...items]);
    }
  };

  const handleAdd = () => {
    setItems([...items, { id: uuidv4(), value: '' }]);
  };

  const remove = (item: LineItem) => {
    const theItems = items.filter((it) => it.id !== item.id);
    handleChange(theItems);
  };
  const moveToTop = (item: LineItem) => {
    console.log('11');
    const theItems = items.filter((it) => it.id !== item.id);
    handleChange([item, ...theItems]);
  };

  return (
    <div className={css}>
      {items.map((it, idx) => {
        const index = idx + 1;
        return (
          <Input
            className={'line-item'}
            key={it.id}
            addonBefore={<div style={{ width: 20 }}>{index}</div>}
            addonAfter={<AfterActions value={it.value} onRemove={() => remove(it)} onMoveToTop={() => moveToTop(it)} />}
            value={it.value}
            onChange={(e) => handleItemChange(it.id, e.target.value)}
            onBlur={() => handleChange(items)}
          />
        );
      })}
      <Button className={'add-new-line'} onClick={handleAdd} type="dashed">
        <PlusCircleFilled />
        添加一行
      </Button>
    </div>
  );
}

export default function ProTextList(props: ProTextListType) {
  const { name, label, tooltip, rules, fieldProps = {}, ...rest } = props;
  return (
    <ProFormField name={name} label={label} rules={rules} tooltip={tooltip}>
      <_MultipleLineText {...rest} {...fieldProps} />
    </ProFormField>
  );
}
