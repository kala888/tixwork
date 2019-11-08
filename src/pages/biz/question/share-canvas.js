import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { TaroCanvasDrawer } from 'taro-plugin-canvas'
import EleButton from '@/genericpage/elements/ele-button'
import './question-detail.scss'

export default class ShareCanvas extends Component {
  constructor(props) {
    super(props)
    this.state = {
      config: null,
      canvasStatus: false,
      shareToTimeline: {
        width: 750,
        height: 200,
        backgroundColor: '#fff',
        debug: false,
        blocks: [
          {
            x: 0,
            y: 0,
            width: 750,
            height: 550,
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
            height: 470,
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
            text: '恭喜kala',
            fontSize: 28,
            color: '#ddd',
            opacity: 1,
            baseLine: 'middle',
            lineHeight: 36,
            lineNum: 2,
            textAlign: 'left',
            width: 580,
            zIndex: 999,
          },
          {
            x: 140,
            y: 180,
            text: '获得全球第100名',
            fontSize: 40,
            color: '#ee620a',
            opacity: 1,
            baseLine: 'middle',
            lineHeight: 36,
            lineNum: 2,
            textAlign: 'left',
            width: 580,
            zIndex: 999,
          },
          {
            x: 80,
            y: 260,
            text: '什么是区块链？',
            fontSize: 30,
            color: '#000',
            opacity: 1,
            baseLine: 'middle',
            lineHeight: 48,
            lineNum: 2,
            textAlign: 'left',
            width: 580,
            zIndex: 999,
          },
          {
            x: 80,
            y: 390,
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
            y: 440,
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
            y: 350,
            x: 520,
            borderRadius: 100,
            borderWidth: 0,
            zIndex: 10,
          },
        ],
        lines: [
          {
            startY: 340,
            startX: 80,
            endX: 670,
            endY: 341,
            width: 2,
            color: '#eee',
          },
        ],
      },
    }
  }

  // 调用绘画 => canvasStatus 置为true、同时设置config
  canvasDrawFunc = (config = this.state.shareToTimeline) => {
    this.setState({
      canvasStatus: true,
      config: config,
    })
    Taro.showLoading({
      title: '图片绘制，绘制中...',
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

  saveToAlbum = (filePath) => {
    console.log('this.state.shareImage', filePath)
    const res = Taro.saveImageToPhotosAlbum({ filePath })
    if (res.errMsg === 'saveImageToPhotosAlbum:ok') {
      Taro.hideToast()
      Taro.showToast({
        title: '保存图片成功,可以分享图片到朋友圈了',
        icon: 'none',
        duration: 4000,
      })
    }
  }

  render() {
    return (
      <View>
        <EleButton
          uiType='secondary'
          className='share-button'
          onClick={this.canvasDrawFunc.bind(this, this.state.shareToTimeline)}
        >
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
