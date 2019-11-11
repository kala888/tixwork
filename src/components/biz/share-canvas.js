import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtMessage } from 'taro-ui'
import { TaroCanvasDrawer } from 'taro-plugin-canvas'
import EleButton from '@/genericpage/elements/ele-button'
import '../../pages/biz/exam/question-detail.scss'

export default class ShareCanvas extends Component {
  constructor(props) {
    super(props)
    this.state = {
      config: null,
      canvasStatus: false,
    }
  }

  // 调用绘画 => canvasStatus 置为true、同时设置config
  canvasDrawFunc = () => {
    const { question, name, worldRanking = 888, totalScore = 987 } = this.props
    const config = {
      width: 750,
      height: 200,
      backgroundColor: '#fff',
      debug: false,
      blocks: [
        {
          x: 0,
          y: 0,
          width: 750,
          height: 650,
          paddingLeft: 0,
          paddingRight: 0,
          borderWidth: 0,
          // borderColor: '#ccc',
          backgroundColor: '#EFF3F5',
          borderRadius: 0,
        },
        {
          x: 40,
          y: 40,
          width: 670,
          height: 570,
          paddingLeft: 0,
          paddingRight: 0,
          borderWidth: 0,
          // borderColor: '#ccc',
          backgroundColor: '#fff',
          borderRadius: 12,
        },
      ],
      texts: [
        {
          x: 80,
          y: 100,
          text: `恭喜${name}，以总成绩${totalScore}分，暂列`,
          fontSize: 28,
          color: '#999',
          opacity: 1,
          baseLine: 'middle',
          lineHeight: 36,
          lineNum: 2,
          textAlign: 'left',
          width: 580,
          zIndex: 999,
        },
        {
          x: 185,
          y: 230,
          text: `全球第${worldRanking}名`,
          fontSize: 70,
          color: '#ee620a',
          opacity: 1,
          baseLine: 'middle',
          lineHeight: 36,
          lineNum: 1,
          textAlign: 'left',
          width: 580,
          zIndex: 999,
        },
        {
          x: 80,
          y: 360,
          text: question,
          fontSize: 30,
          color: '#000',
          opacity: 1,
          baseLine: 'middle',
          lineHeight: 48,
          lineNum: 3,
          textAlign: 'left',
          width: 580,
          zIndex: 999,
        },
        {
          x: 80,
          y: 490,
          text: '挑战区块知识，长按描码，不服来战！',
          fontSize: 24,
          color: '#666',
          opacity: 1,
          baseLine: 'middle',
          textAlign: 'left',
          lineHeight: 36,
          lineNum: 1,
          zIndex: 999,
        },
        {
          x: 80,
          y: 540,
          text: '分享来自 「 链问链答 」',
          fontSize: 24,
          color: '#666',
          opacity: 1,
          baseLine: 'middle',
          textAlign: 'left',
          lineHeight: 36,
          lineNum: 1,
          zIndex: 999,
        },
      ],
      images: [
        {
          url: 'https://doublechain.oss-cn-hangzhou.aliyuncs.com/chainqa/chainqa-wechat.jpg',
          width: 150,
          height: 150,
          y: 450,
          x: 520,
          borderRadius: 100,
          borderWidth: 0,
          zIndex: 10,
        },
      ],
      lines: [
        {
          startY: 440,
          startX: 80,
          endX: 670,
          endY: 441,
          width: 2,
          color: '#eee',
        },
      ],
    }
    this.setState({
      canvasStatus: true,
      config: config,
    })
    Taro.showLoading({
      title: '绘图中...',
    })
  }

  // 绘制成功回调函数 （必须实现）=> 接收绘制结果、重置 TaroCanvasDrawer 状态
  onCreateSuccess = (result) => {
    const { tempFilePath, errMsg } = result
    Taro.hideLoading()
    if (errMsg === 'canvasToTempFilePath:ok') {
      this.setState({
        canvasStatus: false,
        config: null,
      })
    } else {
      // 重置 TaroCanvasDrawer 状态，方便下一次调用
      this.setState({
        canvasStatus: false,
        config: null,
      })
      Taro.showToast({ icon: 'none', title: errMsg || '出现错误' })
      console.log(errMsg)
    }
    this.saveToAlbum(tempFilePath)
  }

  // 绘制失败回调函数 （必须实现）=> 接收绘制错误信息、重置 TaroCanvasDrawer 状态
  onCreateFail = (error) => {
    Taro.hideLoading()
    // 重置 TaroCanvasDrawer 状态，方便下一次调用
    this.setState({
      canvasStatus: false,
      config: null,
    })
    console.log(error)
  }

  saveToAlbum = async (filePath) => {
    console.log('this.state.shareImage', filePath)
    const res = await Taro.saveImageToPhotosAlbum({ filePath })
    if (res.errMsg === 'saveImageToPhotosAlbum:ok') {
      Taro.atMessage({
        message: '图片已经保存到相册, 可以分享 图片 到朋友圈了',
        type: 'success',
        duration: 10000,
      })
    }
  }

  render() {
    return (
      <View>
        <AtMessage />
        <EleButton uiType='secondary' className='share-button' onClick={this.canvasDrawFunc}>
          分享到朋友圈
        </EleButton>
        {// 由于部分限制，目前组件通过状态的方式来动态加载
        this.state.canvasStatus && (
          <TaroCanvasDrawer
            config={this.state.config} // 绘制配置
            onCreateSuccess={this.onCreateSuccess} // 绘制成功回调
            onCreateFail={this.onCreateFail} // 绘制失败回调
          />
        )}
        {/*<Image*/}
        {/*  className='shareImage'*/}
        {/*  src={this.state.shareImage}*/}
        {/*  mode='widthFix'*/}
        {/*  lazy-load*/}
        {/*/>*/}
      </View>
    )
  }
}
