import * as echarts from "echarts";

export const slot1 = {
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    tooltip: {
        trigger: 'item'
    },
    legend: {
        orient: 'vertical',
        left: 'left',
        textStyle: {
            color: "#fff"
        }
    },
    series: [
        {
            name: 'Access From',
            type: 'pie',
            radius: '50%',
            center: ['60%', '50%'],
            label: {
                normal: {
                    color: "#fff",
                    borderColor: "red",
                    formatter: '{b}:  {c}' + '\n\r' + '({d}%)'
                },
            },
            data: [
                {value: 1048, name: '气瓶'},
                {value: 735, name: '杜瓦'},
                {value: 580, name: '集装格'},
                {value: 484, name: '生物质容器'},
            ],
        }
    ]
};

export const slot2 = {
    calculable: true,
    legend: {
        show: true,
        icon: 'circle',
        x: 'center',
        data: [
            '医疗氧气',
            '工业氧气',
            '氮气',
            '氩气',
            '氢气',
            '二氧化碳',
            '液氧',
            '液氮'
        ],
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
                normal: {
                    show: true,
                    formatter: '{c}',
                },
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
                {
                    value: 1.7,
                    name: '医疗氧气',
                    itemStyle: {
                        normal: {
                            color: '#FE4441',
                        },
                    },
                    label: {
                        color: '#FE4441',
                    },
                },
                {
                    value: 1.8,
                    name: '工业氧气',
                    itemStyle: {
                        normal: {
                            color: '#F89747',
                        },
                    },
                    label: {
                        color: '#F89747',
                    },
                },
                {
                    value: 2.1,
                    name: '氮气',
                    itemStyle: {
                        normal: {
                            color: '#EBCD49',
                        },
                    },
                    label: {
                        color: '#EBCD49',
                    },
                },
                {
                    value: 2.3,
                    name: '氩气',
                    itemStyle: {
                        normal: {
                            color: '#45DAF5',
                        },
                    },
                    label: {
                        color: '#45DAF5',
                    },
                },
                {
                    value: 2.4,
                    name: '氢气',
                    itemStyle: {
                        normal: {
                            color: '#43ABEC',
                        },
                    },
                    label: {
                        color: '#43ABEC',
                    },
                },
                {
                    value: 2.5,
                    name: '二氧化碳',
                    itemStyle: {
                        normal: {
                            color: '#4573EF',
                        },
                    },
                    label: {
                        color: '#4573EF',
                    },
                },
                {
                    value: 2.7,
                    name: '液氧',
                    itemStyle: {
                        normal: {
                            color: '#A03FE2',
                        },
                    },
                    label: {
                        color: '#A03FE2',
                    },
                },
                {
                    value: 3,
                    name: '液氮',
                    itemStyle: {
                        normal: {
                            color: '#ED40E5',
                        },
                    },
                    label: {
                        color: '#ED40E5',
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

export const slot3 = {
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        top: '10%',
        containLabel: true
    },
    legend: {
        icon: 'circle',
        textStyle: {
            color: "#fff"
        }
    },
    xAxis: {
        axisLabel: {
            textStyle: {
                color: '#fff',
            }
        },
        axisLine: {
            lineStyle: {
                color: '#fff',
            }
        },
        type: 'category',
        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
    },
    yAxis: {
        axisLabel: {
            show: true,
            textStyle: {
                color: '#fff',
            }
        },
        axisLine: {
            lineStyle: {
                color: '#fff',
            }
        },
        type: 'value'
    },
    series: [

        {
            name: "上周",
            data: [138, 142, 111, 144, 160, 158, 139],
            type: 'bar',
            color: '#ffc107',
        },
        {
            name: "本周",
            data: [128, 132, 101, 134, 150, 148, 129],
            type: 'bar',
            color: '#DD686E',
        },
    ]
};

export const slot7 = {
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        top: '20%',
        containLabel: true
    },
    legend: {
        icon: 'circle',
        textStyle: {
            color: "#fff"
        }
    },
    xAxis: {
        axisLabel: {
            textStyle: {
                color: '#fff',
            }
        },
        axisLine: {
            lineStyle: {
                color: '#fff',
            }
        },
        type: 'category',
        data: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']
    },
    yAxis: {
        axisLabel: {
            show: true,
            textStyle: {
                color: '#fff',
            }
        },
        axisLine: {
            lineStyle: {
                color: '#fff',
            }
        },
        type: 'value'
    },
    series: [

        {
            name: "去年",
            data: [12338, 13342, 11331, 14344, 16440, 15558, 13669, 12169, 12169, 14269, 16269, 18269],
            type: 'bar',
            color: '#E79551',
        },
        {
            name: "今年",
            data: [14338, 14342, 12331, 15344, 17440, 16558, 14669, 12333, 0, 0, 0, 0],
            type: 'bar',
            color: '#40D4F2',
        },
    ]
};

export const slot8 = {
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        top: '10%',
        containLabel: true
    },
    xAxis: {
        axisLabel: {
            textStyle: {
                color: '#fff',
            }
        },
        axisLine: {
            lineStyle: {
                color: '#fff',
            }
        },
        boundaryGap: false,
        type: 'category',
        data: ['06/20', '06/21', '06/22', '06/23', '06/24', '06/25', '06/26', '06/27', '06/28', '06/29']
    },
    yAxis: {
        axisLabel: {
            show: true,
            textStyle: {
                color: '#fff',
            }
        },
        axisLine: {
            lineStyle: {
                color: '#fff',
            }
        },
        // name: '单位：单',
        type: 'value'
    },
    series: [
        {
            data: [128, 132, 101, 134, 150, 148, 129, 234, 205, 262],
            type: 'line',
            smooth: true,
            itemStyle: {
                normal: {
                    color: '#fff',
                    fontSize: 14,
                    lineStyle: {
                        width: 3, //折线宽度
                        //折线颜色渐变
                        color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                            offset: 0,
                            color: 'rgba(45,105,249,1)'
                        },
                            {
                                offset: 1,
                                color: 'rgba(89,205,253,1)'
                            }])
                    }
                },
                emphasis: {   //鼠标经过时折点小圆圈样式
                    borderColor: 'rgba(0,196,132,0.2)',
                    borderWidth: 10
                }
            },
            areaStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    {
                        offset: 0,
                        color: '#018FCD'
                    },
                    {
                        offset: 1,
                        color: 'rgba(58,77,233)'
                    }
                ])
            }
        }
    ]
};

export const slot9 = {
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        top: '10%',
        containLabel: true
    },
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'shadow'
        }
    },
    legend: {
        icon: 'circle',
        textStyle: {
            color: "#fff"
        }
    },
    xAxis: [
        {
            axisLabel: {
                show: true,
                interval: 0,
                textStyle: {
                    color: '#fff',
                }
            },
            type: 'category',
            data: [
                '医疗氧气',
                '工业氧气',
                '氮气',
                '氩气',
                '氢气',
                '二氧化碳',
                '液氧',
                '液氮'
            ]
        }
    ],
    yAxis: [
        {
            axisLabel: {
                show: true,
                textStyle: {
                    color: '#fff',
                }
            },
            type: 'value'
        }
    ],
    series: [
        {
            barWidth: 25,
            type: 'bar',
            color: '#91FF8D',
            emphasis: {
                focus: 'series'
            },
            data: [1120, 1132, 1101, 1134, 2190, 1230, 1220, 1322]
        }

    ]
};


