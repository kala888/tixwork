### 使用后端驱动Popup

有时候就是需要在某个操作之后（不可预知，紧急需求变更）, 需要进行弹出确认/警告/选择之类的Popup。比toast更重的操作

举个栗子：发现某些用户行为存在风险（取消订单，删除记录，扣钱，连续非正常人为操作），弹出二次确认的popup

再举个栗子：用户长时间没有登录后首次登录让他查看或者同意“XXX条款”

服务端可以根据具体情况动态的做一个popup，和后端驱动的toast类似，这里只需要返回popup对象就行了

```javascript
{
    popup:{
        title: '你是机器人么？', 
        text：'如果不是，请点击 滚',
        actionList: [{
            title: '滚',
            linkToUrl:'/i/am/not/a/robot'
            ajax: true
        }], 
        closeActionText = '是'
    }
}
```

> title: Taro.showModal title
> 
> text: Taro.showModal center
> 
> closeActionText: Taro.showModal cancelText
> 
> actionList[0].title: Taro.showModal confirmText
> 
> actionList[0].linkToUrl: 点击这个action时候要发送的请求
> 
> actionList[0].ajax：这个请求是否是ajax（保持页面）



这里由于小程序限制，actionList只支持一个action，在RN中可以支持一排。。。。



综合Popup和Toast，我来举个小栗子(可能不太合适)：

1. 首页有一个签到的button，每2小时可以签到一次。状态

2. 点击签到


