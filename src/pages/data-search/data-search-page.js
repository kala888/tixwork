import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import NavigationService from '@/nice-router/navigation.service'
import Config from '@/utils/config'
import StorageTools from '@/nice-router/storage-tools'
import { AtDrawer, AtIcon, AtSearchBar } from 'taro-ui'
import Chart from 'taro-echarts'
import { LoadingType } from '@/nice-router/nice-router-util'
import './data-search.scss'

const defaultAppId = 'DA000008'

function formatTitle(name = '') {
  if (name.length > 20) {
    return name.substr(1, 15) + '\n' + name.substr(16)
  }
  return name
}

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
    text: formatTitle(candidateDataSet.name),
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

  const radius = ['20%', '35%']
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
    dataAppList: [],
    showDraw: false,
  }

  componentDidMount() {
    NavigationService.ajax(
      'dataAppUserManager/view/DAU000004/',
      {},
      {
        onSuccess: (resp) => {
          const { dataApplicationList } = resp
          this.setState({
            dataAppList: dataApplicationList,
          })
        },
      },
    )
    this.handleRefresh()
  }

  onPullDownRefresh() {
    this.handleRefresh()
  }

  handleRefresh = (onSuccess) => {
    this.setState({
      searchValue: '',
    })
    const dataAppUser = StorageTools.get('dataAppUser', defaultAppId)
    NavigationService.ajax(
      Config.api.SearchHome,
      {
        dataAppUser,
      },
      {
        loading: LoadingType.modal,
        onSuccess: (resp) => {
          if (onSuccess) {
            onSuccess()
          }
          this.setRespData(resp)
        },
      },
    )
  }

  setRespData = (resp = {}) => {
    const { candidateDataSetList = [] } = resp
    this.setState(
      {
        ...resp,
        candidateDataSetList,
      },
      () => Taro.setNavigationBarTitle({ title: '双链索骥' }),
    )
  }

  onChange = (searchValue) => {
    this.setState({
      searchValue,
    })
  }

  onDrawClose = () => {
    this.setState({ showDraw: false })
  }

  handleShowDraw = () => {
    console.log('show...')
    this.setState({ showDraw: true })
  }

  onDrawItemClick = (item = {}) => {
    const { id } = item
    if (id) {
      StorageTools.set('dataAppUser', id)
      this.handleRefresh(() => this.onDrawClose())
    }
  }

  handleSearch = () => {
    const dataAppUser = StorageTools.get('dataAppUser', defaultAppId)

    NavigationService.ajax(
      Config.api.Search,
      {
        dataAppUser,
        pSearchValue: this.state.searchValue,
      },
      {
        loading: LoadingType.modal,
        onSuccess: (resp) => this.setRespData(resp),
      },
    )
  }

  render() {
    const { searchValue, candidateDataSetList, dataAppList = [] } = this.state

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
        <AtDrawer show={this.state.showDraw} right mask onClose={this.onDrawClose}>
          <View className='data-search-page-draw-icon'>
            <AtIcon value='user' size={80} />
          </View>

          <View className='data-search-page-draw'>
            {dataAppList.map((it) => (
              <View key={it.id} className='data-search-page-draw-item' onClick={this.onDrawItemClick.bind(this, it)}>
                {it.name}
              </View>
            ))}
          </View>
        </AtDrawer>


        <View className='data-search-page-header'>
          <View className='data-search-page-header-draw' onClick={this.handleShowDraw}>
            <AtIcon value='analytics' size={20} color='#ddd' />
          </View>
          <AtSearchBar
            value={searchValue}
            actionName='搜一下'
            onChange={this.onChange}
            onActionClick={this.handleSearch}
          />
        </View>

        {(
          list.length > 0 &&
          !this.state.showDraw
        ) ? (
          <View className='data-search-page-body'>
            {list.map((it) => (
              <View key={it.id} className='chart'>
                <Chart option={it} height='300px' width='95%' />
              </View>
            ))}
          </View>
        ) : (
          <View className='data-search-page-loading'>没有找到相关订阅</View>
        )}
      </View>
    )
  }
}
