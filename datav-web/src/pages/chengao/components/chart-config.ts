export const dailyPlanOptions = {
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)",
    },
    legend: {
        orient: 'vertical',
        x: 'left',
        y: 'top',
        itemWidth: 24,   // 设置图例图形的宽
        itemHeight: 18,  // 设置图例图形的高
        textStyle: {
            color: '#fff'  // 图例文字颜色
        },
        itemGap: 15,
        data: ['全部完成', '未全部完成']
    },
    calculable: true,
    color: ['#FFD479', '#FF2600'],
    series: [
        {
            name: '每日计划完成率',
            type: 'pie',
            radius: ['30%', '60%'],  // 设置环形饼状图， 第一个百分数设置内圈大小，第二个百分数设置外圈大小
            center: ['60%', '45%'],  // 设置饼状图位置，第一个百分数调水平位置，第二个百分数调垂直位置
            data: [
                {value: 78, name: '全部完成'},
                {value: 22, name: '未全部完成'},
            ],
            itemStyle: {
                emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(30, 144, 255，0.5)'
                }
            },
            // 设置值域的那指向线
            labelLine: {
                normal: {
                    show: false   // show设置线是否显示，默认为true，可选值：true ¦ false
                }
            },
            // 设置值域的标签
            label: {
                normal: {
                    position: 'inner',  // 设置标签位置，默认在饼状图外 可选值：'outer' ¦ 'inner（饼状图上）'
                    formatter: '{c}'
                }
            }
        }

    ]
};

export const deviceInfoOptions = {
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)",
    },
    legend: {
        orient: 'vertical',
        x: 'left',
        y: 'top',
        itemWidth: 24,   // 设置图例图形的宽
        itemHeight: 18,  // 设置图例图形的高
        textStyle: {
            color: '#fff'  // 图例文字颜色
        },
        itemGap: 15,
        data: ['已到场设备', '未到场设备']
    },
    calculable: true,
    color: ['#FFC27B', '#5DFF5F'],
    series: [
        {
            name: '设备到场情况',
            type: 'pie',
            radius: ['30%', '60%'],  // 设置环形饼状图， 第一个百分数设置内圈大小，第二个百分数设置外圈大小
            center: ['60%', '45%'],  // 设置饼状图位置，第一个百分数调水平位置，第二个百分数调垂直位置
            data: [
                {value: 95, name: '已到场设备'},
                {value: 5, name: '未到场设备'},
            ],
            // itemStyle 设置饼状图扇形区域样式
            itemStyle: {
                // emphasis：英文意思是 强调;着重;（轮廓、图形等的）鲜明;突出，重读
                // emphasis：设置鼠标放到哪一块扇形上面的时候，扇形样式、阴影
                emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(30, 144, 255，0.5)'
                }
            },
            // 设置值域的那指向线
            labelLine: {
                normal: {
                    show: false   // show设置线是否显示，默认为true，可选值：true ¦ false
                }
            },
            // 设置值域的标签
            label: {
                normal: {
                    position: 'inner',  // 设置标签位置，默认在饼状图外 可选值：'outer' ¦ 'inner（饼状图上）'
                    formatter: '{c}'
                }
            }
        }

    ]

};

export const processManageOptions = {
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)",
    },
    legend: {
        // orient 设置布局方式，默认水平布局，可选值：'horizontal'（水平） ¦ 'vertical'（垂直）
        orient: 'vertical',
        // x 设置水平安放位置，默认全图居中，可选值：'center' ¦ 'left' ¦ 'right' ¦ {number}（x坐标，单位px）
        x: 'left',
        // y 设置垂直安放位置，默认全图顶端，可选值：'top' ¦ 'bottom' ¦ 'center' ¦ {number}（y坐标，单位px）
        y: 'top',
        itemWidth: 24,   // 设置图例图形的宽
        itemHeight: 18,  // 设置图例图形的高
        textStyle: {
            color: '#fff'  // 图例文字颜色
        },
        // itemGap设置各个item之间的间隔，单位px，默认为10，横向布局时为水平间隔，纵向布局时为纵向间隔
        itemGap: 15,
        data: ['正常施工率', '问题出现概率']
    },
    calculable: true,
    color: ['#3CB371', '#FF9F7F', '#8B0000'],
    series: [
        {
            name: '机具状态分析',
            type: 'pie',
            radius: ['30%', '60%'],  // 设置环形饼状图， 第一个百分数设置内圈大小，第二个百分数设置外圈大小
            center: ['60%', '45%'],  // 设置饼状图位置，第一个百分数调水平位置，第二个百分数调垂直位置
            data: [
                {value: 98, name: '正常施工率'},
                {value: 2, name: '问题出现概率'},
            ],
            // itemStyle 设置饼状图扇形区域样式
            itemStyle: {
                // emphasis：英文意思是 强调;着重;（轮廓、图形等的）鲜明;突出，重读
                // emphasis：设置鼠标放到哪一块扇形上面的时候，扇形样式、阴影
                emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(30, 144, 255，0.5)'
                }
            },
            // 设置值域的那指向线
            labelLine: {
                normal: {
                    show: false   // show设置线是否显示，默认为true，可选值：true ¦ false
                }
            },
            // 设置值域的标签
            label: {
                normal: {
                    position: 'inner',  // 设置标签位置，默认在饼状图外 可选值：'outer' ¦ 'inner（饼状图上）'
                    // formatter: '{a} {b} : {c}个 ({d}%)'   设置标签显示内容 ，默认显示{b}
                    // {a}指series.name  {b}指series.data的name
                    // {c}指series.data的value  {d}%指这一部分占总数的百分比
                    formatter: '{c}'
                }
            }
        }

    ]

};

export const issueManageOptions =  {
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)",
    },
    legend: {
        // orient 设置布局方式，默认水平布局，可选值：'horizontal'（水平） ¦ 'vertical'（垂直）
        orient: 'vertical',
        // x 设置水平安放位置，默认全图居中，可选值：'center' ¦ 'left' ¦ 'right' ¦ {number}（x坐标，单位px）
        x: 'left',
        // y 设置垂直安放位置，默认全图顶端，可选值：'top' ¦ 'bottom' ¦ 'center' ¦ {number}（y坐标，单位px）
        y: 'top',
        itemWidth: 24,   // 设置图例图形的宽
        itemHeight: 18,  // 设置图例图形的高
        textStyle: {
            color: '#fff'  // 图例文字颜色
        },
        // itemGap设置各个item之间的间隔，单位px，默认为10，横向布局时为水平间隔，纵向布局时为纵向间隔
        itemGap: 15,
        data: ['已解决问题', '正在解决问题']
    },
    calculable: true,
    color: ['#00CCFF', '#CC6600', '#8B0000'],
    series: [
        {
            name: '机具状态分析',
            type: 'pie',
            radius: ['30%', '60%'],  // 设置环形饼状图， 第一个百分数设置内圈大小，第二个百分数设置外圈大小
            center: ['60%', '45%'],  // 设置饼状图位置，第一个百分数调水平位置，第二个百分数调垂直位置
            data: [
                {value: 93, name: '已解决问题'},
                {value: 7, name: '正在解决问题'}
            ],
            // itemStyle 设置饼状图扇形区域样式
            itemStyle: {
                // emphasis：英文意思是 强调;着重;（轮廓、图形等的）鲜明;突出，重读
                // emphasis：设置鼠标放到哪一块扇形上面的时候，扇形样式、阴影
                emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(30, 144, 255，0.5)'
                }
            },
            // 设置值域的那指向线
            labelLine: {
                normal: {
                    show: false   // show设置线是否显示，默认为true，可选值：true ¦ false
                }
            },
            // 设置值域的标签
            label: {
                normal: {
                    position: 'inner',  // 设置标签位置，默认在饼状图外 可选值：'outer' ¦ 'inner（饼状图上）'
                    formatter: '{c}'
                }
            }
        }
    ]
};
