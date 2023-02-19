import type { CandidateValue } from '@/utils/nice-router-types';
import { ProCard } from '@ant-design/pro-components';
import { useTimeout } from 'ahooks';
import { Row } from 'antd';
import ReactECharts from 'echarts-for-react';
import { useRef } from 'react';

type getOption = (title: string, items: CandidateValue[]) => any;
const getPipeOption: getOption = (title, items = []) => {
  const data = items.map((it) => ({
    name: it.title,
    value: it.value,
  }));
  return {
    title: {
      text: title,
      left: 'left',
    },
    tooltip: {
      trigger: 'item',
    },
    legend: {
      orient: 'vertical',
      top: '15%',
      left: 'left',
    },
    series: [
      {
        type: 'pie',
        radius: '80%',
        clockwise: true,
        startAngle: 45,
        endAngle: 45,
        data: data,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
          },
        },
      },
    ],
  };
};
const getCityOption: getOption = (title, items) => {
  const regionList = items.map((it) => it.title);
  const dataList = items.map((it) => it.value);
  return {
    title: { text: title },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      top: '20%',
      containLabel: true,
    },
    legend: {
      icon: 'circle',
    },
    xAxis: {
      axisLabel: {
        show: true,
        interval: 0,
      },
      type: 'category',
      data: regionList,
    },
    yAxis: {
      axisLabel: {
        show: true,
      },
      type: 'value',
    },
    series: [
      {
        data: dataList,
        type: 'bar',
        label: {
          normal: {
            show: true,
            position: 'top',
          },
        },
        itemStyle: {
          normal: {
            // 定制显示（按顺序）
            color: function (params) {
              const colorList = [
                '#C33531',
                '#EFE42A',
                '#64BD3D',
                '#EE9201',
                '#29AAE3',
                '#B74AE5',
                '#0AAF9F',
                '#E89589',
                '#16A085',
                '#4A235A',
                '#C39BD3 ',
                '#F9E79F',
                '#BA4A00',
                '#ECF0F1',
                '#616A6B',
                '#EAF2F8',
                '#4A235A',
                '#3498DB',
              ];
              return colorList[params.dataIndex];
            },
          },
        },
      },
    ],
  };
};

export default function CompanyContactStatics(props) {
  const { total = 0, seniorManager = 0, provinces = [], cities = [] } = props;
  const ref = useRef<any>();
  const ref2 = useRef<any>();
  const ref3 = useRef<any>();
  useTimeout(() => {
    ref.current.resize();
    ref2.current.resize();
    ref3.current.resize();
  }, 100);
  const totalItems = [
    { title: '高管', value: seniorManager },
    { title: '其他', value: total - seniorManager },
  ];
  const totalOption = getPipeOption('高管分析', totalItems);
  const provinceOption = getPipeOption('按省份分布(Top10)', provinces.slice(0, 8));
  const cityOption = getCityOption('按城市分布(Top16)', cities.slice(0, 15));
  return (
    <ProCard bordered={false}>
      <Row style={{ height: '30vh' }}>
        <ReactECharts ref={ref} option={totalOption} style={{ height: '100%', width: '50%' }} />
        <ReactECharts ref={ref2} option={provinceOption} style={{ height: '100%', width: '50%' }} />
      </Row>
      <Row style={{ height: '30vh' }}>
        <ReactECharts ref={ref3} option={cityOption} style={{ height: '100%', width: '100%' }} />
      </Row>
    </ProCard>
  );
}
