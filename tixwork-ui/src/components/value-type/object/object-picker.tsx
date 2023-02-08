import ClickableItem from '@/components/form/fields/clickable-item';
import type { FieldSearchOptionType } from '@/components/value-type/object/field-search';
import FieldSearch from '@/components/value-type/object/field-search';
import ObjectInfoList from '@/components/value-type/object/object-info-list';
import Q from '@/http/http-request/q';
import { useVisible } from '@/services/use-service';
import { guessTitle } from '@/utils';
import { SearchOutlined } from '@ant-design/icons';
import type { ProFormFieldProps } from '@ant-design/pro-components';
import { ProCard, ProForm } from '@ant-design/pro-components';
import ProFormItem from '@ant-design/pro-form/es/components/FormItem';
import { useAsyncEffect } from 'ahooks';
import { message, Modal } from 'antd';
import _ from 'lodash';
import { useState } from 'react';

type ObjectPickerFieldType = {
  linkToUrl: string;
  searchUrl: string;
  fields?: FieldSearchOptionType | FieldSearchOptionType[];
  placeholder?: string;
  width: ProFormFieldProps['width'];
  disabled?: boolean;
  value?: any;
  onChange?: (obj: any) => void;
};

type ObjectPickerType = Record<string, any> & Partial<ObjectPickerFieldType>;

function ObjectPickerField(props: ObjectPickerFieldType) {
  const { visible, show, close } = useVisible();
  const [searchedField, setSearchedField] = useState<any>({});
  const [items, setItems] = useState<any[]>([]);
  const { width, disabled, linkToUrl, searchUrl, fields = [], onChange } = props;
  const url = searchUrl || linkToUrl;

  useAsyncEffect(
    async function* () {
      //1.首先根据linkToUrl获取到对应的初始化数据
      if (visible) {
        const resp = await Q.post<API.TableDataInfo<any>>(url);
        const theItems = _.slice(resp?.data.rows, 0, 100);
        setItems(theItems);
      }
    },
    [searchUrl, linkToUrl, visible],
  );

  const fieldList = Array.isArray(fields) ? fields : [fields];

  const handleSearch = async (values) => {
    //1.点击search后向linkToUrl搜索数据
    const resp = await Q.post<API.TableDataInfo<any>>(url, {
      [values.fieldName]: values.fieldValue,
    });
    const col = _.find(fieldList, { fieldName: values.fieldName });
    setSearchedField(col);
    const rows = resp.data.rows || [];
    if (rows.length === 0) {
      message.info('没找到更多的数据');
      setItems([]);
      return;
    }
    if (rows.length > 100) {
      message.info('数据太多了，请修改输入搜索条件');
      setItems(_.slice(rows, 0, 100));
      return;
    }
    setItems(rows);
  };

  const handleSelect = (v) => {
    if (onChange) {
      onChange(v);
      close();
    }
  };

  const title = guessTitle(props.value);
  return (
    <div>
      <ClickableItem
        onClick={show}
        value={title}
        width={width}
        disabled={disabled}
        suffix={<SearchOutlined />}
      />
      <Modal
        open={visible}
        closable
        onCancel={close}
        okButtonProps={{ style: { display: 'none' } }}
        cancelButtonProps={{ style: { display: 'none' } }}
        width="60vw"
      >
        <ProCard>
          <ProForm
            onFinish={handleSearch}
            layout={'inline'}
            submitter={{
              searchConfig: {
                submitText: '搜索',
              },
            }}
          >
            <FieldSearch fields={fieldList} />
          </ProForm>
        </ProCard>
        <ObjectInfoList items={items} onSelect={handleSelect} searchedField={searchedField} />
      </Modal>
    </div>
  );
}

/**
 * 自定义ProComponent例子, fieldProps，可以展开也可以不展开,里面自动注入了value和onChange
 */
export default function ObjectPicker(props: ObjectPickerType) {
  const { label, fields, searchUrl, linkToUrl, width, ...rest } = props;
  return (
    <ProFormItem label={label} {...rest}>
      <ObjectPickerField {...props} {...props.fieldProps} width={width} />
    </ProFormItem>
  );
}
