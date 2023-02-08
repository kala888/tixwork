import ReactECharts from 'echarts-for-react';

export default function VisitTimesChart(props) {
  const { items = [] } = props;
  const regionList = items.map((it) => it.title);
  const dataList = items.map((it) => it.value);
  const theOptions = {
    title: { text: '拜访统计' },
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
      },
    ],
  };
  return <ReactECharts option={theOptions} style={{ height: '60%', width: '100%' }} />;
}
