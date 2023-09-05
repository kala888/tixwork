import type { ChartSlotType } from '@/pages/dashboard/components/remote-chart';
import type { CandidateValue } from '@/utils/nice-router-types';
import * as echarts from 'echarts';
import _ from 'lodash';

type getOptionType = (title: string, items: CandidateValue[]) => any;

const getPipeOption: getOptionType = (title, items = []) => {
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
const getBarOption: getOptionType = (title, items) => {
  const category = items.map((it) => it.title);
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
      data: category,
    },
    calculable: false,
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
        barWidth: 35,
        // barMaxWidth: 100,
        label: {
          show: true,
          position: 'top',
        },
        itemStyle: {
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
        markPoint: {
          data: [
            { type: 'max', name: '最大值' },
            { type: 'min', name: '最小值' },
          ],
        },
        markLine: {
          data: [{ type: 'average', name: '平均值' }],
        },
      },
    ],
  };
};
const getLineOption: getOptionType = (title, items = []) => {
  const category = items.map((it) => it.title);
  const dataList = items.map((it) => it.value);
  return {
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      top: '10%',
      containLabel: true,
    },
    xAxis: {
      axisLabel: {
        textStyle: {
          color: '#fff',
        },
      },
      axisLine: {
        lineStyle: {
          color: '#fff',
        },
      },
      boundaryGap: false,
      type: 'category',
      data: category,
    },
    yAxis: {
      axisLabel: {
        show: true,
        textStyle: {
          color: '#fff',
        },
      },
      axisLine: {
        lineStyle: {
          color: '#fff',
        },
      },
      // name: '单位：单',
      type: 'value',
    },
    series: [
      {
        data: dataList,
        type: 'line',
        smooth: true,
        itemStyle: {
          color: '#fff',
          fontSize: 14,
          lineStyle: {
            width: 3, //折线宽度
            //折线颜色渐变
            color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
              {
                offset: 0,
                color: 'rgba(45,105,249,1)',
              },
              {
                offset: 1,
                color: 'rgba(89,205,253,1)',
              },
            ]),
          },
          emphasis: {
            //鼠标经过时折点小圆圈样式
            borderColor: 'rgba(0,196,132,0.2)',
            borderWidth: 10,
          },
        },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: '#018FCD',
            },
            {
              offset: 1,
              color: 'rgba(58,77,233)',
            },
          ]),
        },
      },
    ],
  };
};
const getRoseOption: getOptionType = (title, items = []) => {
  const theItems = items.slice(0, 8);
  const category = theItems.map((it) => it.title);
  const colors = ['#FE4441', '#F89747', '#EBCD49', '#45DAF5', '#43ABEC', '#4573EF', '#A03FE2', '#ED40E5'];

  const dataList = theItems.map((it, idx) => {
    const color = _.get(colors, idx);
    return {
      value: it.value,
      name: it.title,
      itemStyle: {
        color,
      },
      label: {
        color,
      },
    };
  });
  return {
    calculable: true,
    legend: {
      show: true,
      icon: 'circle',
      x: 'center',
      data: category,
      textStyle: {
        color: '#fff',
      },
    },
    series: [
      {
        name: '总计',
        type: 'pie',
        radius: '110%',
        avoidLabelOverlap: false,
        startAngle: 0,
        center: ['50.1%', '30%'],
        roseType: 'area',
        selectedMode: 'single',
        label: {
          show: true,
          formatter: '{c}',
          emphasis: {
            show: true,
          },
        },
        labelLine: {
          normal: {
            show: true,
            smooth: false,
            length: 20,
            length2: 10,
          },
          emphasis: {
            show: true,
          },
        },
        data: [
          ...dataList,
          {
            value: 0,
            name: '',
            label: {
              show: false,
            },
            labelLine: {
              show: false,
            },
          },
          {
            value: 0,
            name: '',
            label: {
              show: false,
            },
            labelLine: {
              show: false,
            },
          },
          {
            value: 0,
            name: '',
            label: {
              show: false,
            },
            labelLine: {
              show: false,
            },
          },
          {
            value: 0,
            name: '',
            label: {
              show: false,
            },
            labelLine: {
              show: false,
            },
          },
          {
            value: 0,
            name: '',
            label: {
              show: false,
            },
            labelLine: {
              show: false,
            },
          },
          {
            value: 0,
            name: '',
            label: {
              show: false,
            },
            labelLine: {
              show: false,
            },
          },
          {
            value: 0,
            name: '',
            label: {
              show: false,
            },
            labelLine: {
              show: false,
            },
          },
          {
            value: 0,
            name: '',
            label: {
              show: false,
            },
            labelLine: {
              show: false,
            },
          },
        ],
      },
    ],
  };
};

export function getChartOption(slot: ChartSlotType) {
  const { title = '', value, type } = slot;
  if (type === 'PIE') {
    return getPipeOption(title, value as any);
  }
  if (type === 'LINE') {
    return getLineOption(title, value as any);
  }
  if (type === 'ROSE') {
    return getRoseOption(title, value as any);
  }
  // 默认返回 BAR
  return getBarOption(title, value as any);
}
