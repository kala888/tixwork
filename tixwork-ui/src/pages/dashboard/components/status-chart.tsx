import ReactECharts from 'echarts-for-react';

export default function StatusChart(props) {
  const { items = [] } = props;
  const dataList = items.map((it) => ({ name: it.title, value: it.value }));
  const theOptions = {
    title: { text: '进展状态分布' },
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
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 2,
        },
        label: {
          normal: {
            borderColor: 'red',
            formatter: '{b}:  {c} 亿' + '\n\r' + '({d}%)',
          },
        },
        emphasis: {
          label: {
            show: true,
            fontSize: '18',
            fontWeight: 'bold',
          },
        },
        labelLine: {
          show: false,
        },
        data: dataList,
      },
    ],
  };
  return <ReactECharts option={theOptions} style={{ height: '100%', width: '100%' }} />;
}
