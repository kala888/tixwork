import BizSchema from '@/biz-model/biz-schema';
import EleTableList from '@/components/ele-table-list/ele-table-list';
import BaseForm from '@/components/form/base-form';
import BasePage from '@/components/layout/base-page';
import {CommonRule} from '@/components/value-type/common-column';
import ApiConfig from '@/http/api-config';
import Q from '@/http/http-request/q';
import CompanyContactStatics from '@/pages/company-contact/company-contact-statics';
import {Button, Modal} from 'antd';
import {PieChartOutlined} from "@ant-design/icons";

const ViewStaticsButton = (props) => {
  const {searchValues} = props;
  const handleViewStatics = async () => {
    const resp = await Q.post('/api/cdsz/company-contact/statistics', searchValues);
    console.log('searchValues', searchValues);
    console.log('searchValues resp data', resp.data);
    Modal.success({
      title: '联系人共计' + resp.data?.total,
      width: '80%',
      content: <CompanyContactStatics {...resp.data} />,
    });
  };
  return (
    <Button onClick={handleViewStatics} icon={<PieChartOutlined/>}>统计</Button>
  );
};
export default () => {
  const schema = BizSchema.get('companyContact');
  const columns = (schema?.columns || []).filter((it) => {
    return it.dataIndex !== 'addressProvince' && it.dataIndex !== 'addressCity';
  });

  columns.splice(7, 0, {
    title: '所在城市',
    valueType: 'RemoteCascade',
    key: 'addressProvinceCity',
    hideInSearch: true,
    // 不要设置dataIndex，这里有bug https://github.com/ant-design/pro-components/issues/6294
    // dataIndex: 'addressProvinceCity',
    formItemProps: {
      rules: [CommonRule.required],
    },
    fieldProps: {
      width: 'md',
      names: ['addressProvince', 'addressCity'],
      linkToUrl: ApiConfig.dataCities,
      placeholder: '请选择所在城市',
    },
  });

  columns.push({
    title: '省份',
    dataIndex: 'addressProvince',
    valueType: 'RemoteEnum',
    hideInTable: true,
    hideInSearch: false,
    hideInForm: true,
    fieldProps: {
      // @ts-ignore
      linkToUrl: ApiConfig.dataProvinces,
    },
  });

  columns.push({
    title: '城市',
    dataIndex: 'addressCity',
    valueType: 'text',
    hideInTable: true,
    hideInSearch: false,
    hideInForm: true,
    formItemProps: {
      rules: [
        // rules 定义
        {max: 100, message: '最多只能输入100个字符', type: 'string'},
      ],
    },
  });

  const editForm = (plist) => {
    const {values, onFinish, ...rest} = plist;

    const handleFinish = async (theValues) => {
      onFinish({
        ...theValues,
        addressProvince: theValues?.addressProvinceCity![0],
        addressCity: theValues?.addressProvinceCity![1],
      });
    };

    const addressProvinceCity = values?.addressProvince && [
      values?.addressProvince,
      values?.addressCity,
    ];
    const theValue = {...values, addressProvinceCity};

    return <BaseForm {...rest} values={theValue} onFinish={handleFinish}/>;
  };

  const actionList: any[] = [
    ...(schema?.actionList || []),
    <ViewStaticsButton key="view-statics"/>,
  ];

  return (
    <BasePage title={`${schema.label}`} brief={schema.brief}>
      <EleTableList
        resource={schema.linkToUrl}
        rowKey="id"
        actionList={actionList}
        title={schema.label}
        editForm={editForm}
        formProps={{columns}}
        columns={columns}
      />
    </BasePage>
  );
};
