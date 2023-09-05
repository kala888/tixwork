import Q from '@/http/http-request/q';
import { useLoading } from '@/services/use-service';
import ObjectUtils from '@/utils/object-utils';
import { ProTable } from '@ant-design/pro-components';
import { useEmotionCss } from '@ant-design/use-emotion-css';
import { Typography } from 'antd';
import React from 'react';

const defaultFields = [{ dataIndex: 'id', label: 'ID' }];

type SearchFormType = {
  params?: Record<string, any>;
  onChange?: any;
  columns: any[];
  linkToUrl: string;
  tips?: string;
};

function SearchForm(props: SearchFormType) {
  const { loading, showLoading, hideLoading } = useLoading();
  const { tips, params = {}, onChange, columns = defaultFields, linkToUrl } = props;

  const css = useEmotionCss(() => {
    return {
      '.ant-form': {
        paddingLeft: 0,
        paddingTop: 10,
        paddingBottom: 14,
      },
      '.ant-pro-table-search': {
        borderBottom: ' 1px solid #f1f1f1',
        marginBottom: 10,
      },
    };
  });

  const theColumns = [
    ...columns,
    {
      title: '操作',
      valueType: 'option',
      width: 80,
      render: (__, record) => <Typography.Link onClick={() => onChange(record)}>选择</Typography.Link>,
    },
  ];

  const request = async (theParam, sorter, filter) => {
    showLoading();
    try {
      const resp = await Q.post(
        linkToUrl,
        { ...params, ...theParam, ...sorter, ...filter },
        {
          params: {
            pageNum: theParam?.current,
            pageSize: theParam?.pageSize,
          },
        },
      );
      return {
        ...resp,
        success: true,
        current: theParam?.current,
        pageSize: theParam?.pageSize,
      };
    } catch (e) {
      console.error('cant get data', e);
      return {
        data: [],
        success: false,
      };
    } finally {
      hideLoading();
    }
  };

  return (
    // <EleProProvider> 某种情况下会导致其他的Protable在使用dataIndex=["A","B"]的时候，报错. 应该是个antd pro的bug
    // Objects are not valid as a React child (found: object with keys {id, displayName, title, brief, tenantId, delFlag}). If you meant to render a collection of children, use an array instead.
    <div className={css}>
      {ObjectUtils.isNotEmpty(tips) && <Typography.Text type={'secondary'}>{tips}</Typography.Text>}
      <ProTable
        ghost
        style={{ minHeight: '50vh' }}
        loading={loading}
        cardProps={{
          bodyStyle: {
            padding: 0,
          },
        }}
        params={params}
        bordered
        size="small"
        columns={theColumns as any}
        rowKey="id"
        request={request}
        pagination={{
          pageSize: 15,
        }}
        options={false}
      />
    </div>
  );
}

export default React.memo(SearchForm);
