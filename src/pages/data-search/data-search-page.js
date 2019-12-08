import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import NavigationService from '@/nice-router/navigation.service'
import Config from '@/utils/config'
import { AtSearchBar } from 'taro-ui'
import Chart from 'taro-echarts'

import './data-search.scss'

function calcOptionMapFromSource(source) {
  if (source.length === 0) {
    return
  }

  let i = 0
  let j = 0
  const months = source[0].slice(1).map((item) => item + '月')
  const daysInMonth = source.slice(1).map((item) => item[0] + '日')
  console.log(months)
  console.log(daysInMonth)

  const databody = source.slice(1).map((item) => item.slice(1))
  const result = []
  let max = 0
  for (i = 0; i < daysInMonth.length; i++) {
    const line = databody[i]
    for (j = 0; j < months.length; j++) {
      const val = line[j]
      max = Math.max(max, val)
      const showVal = val > 0 ? val : '-'
      result.push([i, j, showVal])
    }
  }

  const option = {
    tooltip: {
      position: 'top',
    },
    animation: true,
    grid: {
      height: '50%',
      y: '10%',
    },
    xAxis: {
      type: 'category',
      data: daysInMonth,
      splitArea: {
        show: true,
      },
    },

    xAxis3D: {
      type: 'category',
      data: daysInMonth,
    },
    yAxis3D: {
      type: 'category',
      data: months,
    },
    zAxis3D: {
      type: 'value',
    },
    grid3D: {
      boxWidth: 200,
      boxDepth: 80,
      viewControl: {
        // projection: 'orthographic'
      },
      light: {
        main: {
          intensity: 1.2,
          shadow: true,
        },
        ambient: {
          intensity: 0.3,
        },
      },
    },

    yAxis: {
      type: 'category',
      data: months,
      splitArea: {
        show: true,
      },
    },
    visualMap: {
      min: 0,
      max: max,
      calculable: true,
      orient: 'horizontal',
      left: 'center',
      bottom: '15%',
      inRange: {
        color: ['#FFFFFF', '#dd4400'], //From smaller to bigger value ->
      },
    },
    series: [
      {
        name: 'Punch Card',
        type: 'scatter',
        symbolSize: function(data) {
          if (data[2] === '-') {
            return 0
          }
          // console.log("data", data)
          return (data[2] / max) * 40
        },
        data: result,
        label: {
          normal: {
            show: true,
          },
        },
        itemStyle: {
          emphasis: {
            shadowBlur: 10,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
          },
        },
      },
    ],
  }
  return option
}

function renderExtraHeader(candidateDataSet) {
  let i = 0
  const optionsExpr = candidateDataSet.previewData
  const title = {
    text: candidateDataSet.name,
    // subtext: '数据来自双链科技DR引擎',
    left: 'center',
    textStyle: {
      fontSize: 15,
    },
  }

  const label = {
    formatter: '{b}:  ({c}, {d}%)',
  }

  const animation = true
  const color = ['#92cc7a', '#ee620a', '#4cabce', '#e5323e', '#d2ab66']
  const commonset = { title, label, animation, color }

  const radius = ['50%', '70%']
  const option = { ...JSON.parse(optionsExpr), ...commonset }

  if (option.series) {
    const donutsOption = { ...option, series: option.series.map((item) => ({ ...item, radius })) }
    const xAxis = { type: 'category', data: option.series.map((si) => si.name) }
    const yAxis = { type: 'value' }
    const lineOption = {
      ...option,
      xAxis,
      yAxis,
      series: option.series[0].data
        .sort((a, b) => a.value > b.value)
        .map((di) => ({
          di,
          type: 'bar',
          data: [di.value],
        })),
    }
    return [donutsOption, lineOption]

    // <ReactEcharts option={donutsOption}   height={400}  style={{ height: '400px' }}/>
    // <ReactEcharts option={lineOption}   height={400}  style={{ height: '400px' }}/>
  }

  if (!option.source) {
    return null
  }
  const { source } = option
  const dataset = { source }
  const series = []

  for (i = 0; i < 12; i += 1) {
    const style = { type: 'line', smooth: true }
    series.push(style)
  }
  const xAxis = { type: 'category' }
  const legend = { top: 75 }
  const tooltip = {}
  const yAxis = {}
  const datasetOptions = { dataset, series, xAxis, yAxis, legend, tooltip, ...commonset }
  return [datasetOptions, calcOptionMapFromSource(option.source)]
}

@connect(({ dataSearch }) => ({ dataSearch }))
export default class DataSearchPage extends Taro.PureComponent {
  state = {
    searchValue: '',
    candidateDataSetList: [],
  }

  componentDidMount() {
    NavigationService.ajax(
      Config.api.SearchHome,
      {},
      {
        onSuccess: (resp) => this.setRespData(resp),
      }
    )
  }

  setRespData = (resp = {}) => {
    this.setState(
      {
        ...resp,
      },
      () => Taro.setNavigationBarTitle({ title: resp.displayName || '双链科技' })
    )
  }

  onChange = (searchValue) => {
    this.setState({
      searchValue,
    })
  }

  handleSearch = () => {
    NavigationService.ajax(
      Config.api.Search,
      {
        pSearchValue: this.state.searchValue,
      },
      {
        onSuccess: (resp) => this.setRespData(resp),
      }
    )
  }

  render() {
    const { searchValue, candidateDataSetList } = this.state

    let list = []
    candidateDataSetList.map((it) => {
      renderExtraHeader(it).map((subIt, idx) => {
        list.push({
          ...subIt,
          id: it.id + '_' + idx,
        })
      })
    })

    return (
      <View className='data-search-page'>
        <View className='data-search-page-header'>
          <AtSearchBar
            value={searchValue}
            actionName='搜一下'
            onChange={this.onChange}
            onActionClick={this.handleSearch}
          />
        </View>

        <View className='data-search-page-body'>
          {list.map((it) => (
            <View key={it.id} className='chart'>
              <Chart option={it} height='250px' width='95%' />
            </View>
          ))}
        </View>
      </View>
    )
  }
}
