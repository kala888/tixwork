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
        barMaxWidth: '100',
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
  return <ReactECharts option={theOptions} style={{ height: '80%', width: '100%' }} />;
}
