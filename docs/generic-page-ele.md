### 内置的Genericpage UI Elements

所以的可以供genericpage 使用的组件都应该注册到./src/genericpage/container/ele-flex.js中，包含自定义组件。

这些组件可以在其他页面使用，就是普通UI组件。

组件中的一些约定：

- 1. className 样式名称（自定义和内置的OOTB）
- 2. customStyle css属性就是组件内部根节点的style（由于style会被组件占用，传不到组件内部，所有这里用了一个customStyle代替）
- 3. type，每个组件都应在ele-flex找到对应的组件
- 4. id，由于用的是循环，id是不可少的
- 5. 每个组件的实现都略微不同，详细的属性需要参考代码

本页由于篇幅所限，可能没有包含最新的以及所有UI element属性和用法，大家多逛逛源代码部分。（要写的东西太多了，大家也可以优化补充）

###### 文字 EleText

type=text

|        | 样例                            | 描述                  |
|:------ | ----------------------------- | ------------------- |
| text   | text='Hello world'            |                     |
| action | action={{linkToUrl:'/hello'}} | Action对象，用来点击时候页面跳转 |

```javascript
 <EleText text="hello daas" customStyle={{ color: 'red' }} />
```

![](/docs/assets/ele-text.jpg)

###### 图片 EleImage

type=image

|          | 样例               | 描述              |
| -------- | ---------------- | --------------- |
| imageUrl | src = {imageUrl} | 实际调用ServerImage |
| src      | src = {imageUrl} | 实际调用ServerImage |
| mode     | mode='widthFix'  | 实际调用ServerImage |

```javascript
    <EleImage
          imageUrl={defaultImage}
          customStyle={{ width: '200px', height: '400px' }}
          mode='widthFix'
          size='normal'
    />
```

![](/docs/assets/ele-image.jpg)

###### 按钮 EleButton

type=button
这个组件功能比较多，还可以更丰富, 使用的是TaroUI的AtButton

|           | 样例                              | 描述                                                                               |
| --------- | ------------------------------- | -------------------------------------------------------------------------------- |
| title     | button='提交'                     | 展示的文字，也可以通过children来包装其他组件                                                       |
| btnType   | btnType=’share‘                 | 可选值：share，getPhoneNumber，getUserInfo，submit，reset，open-document，download，scanner |
| size      | size='small'                    | TaroUI中Button的size属性                                                             |
| uiType    | uiType='primary'                | TaroUI中Button的type属性                                                             |
| full      | full='false'                    | TaroUI中Button的full属性                                                             |
| circle    | circle='false'                  | TaroUI中Button的circle属性                                                           |
| linkToUrl | linkToUrl='/m/view/'            | 当btnType是空的时候，默认执行Navigation.view(linkToUrl)                                     |
| onClick   | onClick={()=>console.log("11")} | EleButton优先执行传入的onClick事件                                                        |

- btnType='share' 实际调用 Taro button的openType='share'

- btnType='getPhoneNumber' 实际调用 Taro button的openType='getPhoneNumber'

- btnType='getUserInfo' 实际调用 Taro button的openType='getUserInfo'

- btnType='submit' 实际调用 Taro button的openType='submit'

- btnType='submit' 实际调用 Taro button的openType='reset'

- btnType='open-document'  ，下载linkToUrl对应的文档文件并打开

- btnType='download' ，下载linkToUrl对应的文件

- btnType='scanner' ，调用摄像头扫描二维码，并将扫描到的参数作为参数拼接到linkToUrl上。

```javascript
<EleButton
      title='Go Baidu'
      uiType='primary'
      linkToUrl='https://www.baidu.com/'
/>

<View style={{ padding: '10px' }} />

<EleButton
      type='download'
      size='small'
      linkToUrl='https://www.baidu.com/'
>
    <ActionIcon value='download-cloud' />
</EleButton>
```

![](/docs/assets/ele-button2.jpg)

###### 跑马灯 EleCarousel

type=carousel

|                      | 样例                             | 描述                                        |
| -------------------- | ------------------------------ | ----------------------------------------- |
| items                | item=[{id:111,imageUrl:'...'}] | 要呈现的item的数组，item需要包含id，imageUrl或者videoUrl |
| height               | height={200}                   | 调整Carousel的高度                             |
| autoplay             | autoplay={false}               | 自动播放                                      |
| interval             |                                | 同Taro.Swiper                              |
| duration             |                                | 同Taro.Swiper                              |
| circular             |                                | 同Taro.Swiper                              |
| indicatorColor       |                                | 同Taro.Swiper                              |
| indicatorActiveColor |                                | 同Taro.Swiper                              |
| indicatorDots        |                                | 同Taro.Swiper                              |

Items中支持视频和图片

|           | 描述                 |
| --------- | ------------------ |
| linkToUrl | 点击item对象跳转的页面      |
| imageUrl  | 图片的url，属性同EleImage |
| videoUrl  | 支持视频的播放            |
| autoplay  | 视频是否自动播放           |
| id        | 必须的                |

![](/docs/assets/ele-carousel.gif)

###### EleMessageSwiper

 type=notice-bar

一个上下滚动的消息广播

|             | 样例                                                                                              | 描述                             |
| ----------- | ----------------------------------------------------------------------------------------------- | ------------------------------ |
| items       | items=[{id:'111',text:'恭喜张三获得一等奖',linkToUrl:'/m/1'},{id:'222',text:'老王中奖100万,linkToUrl:'/m/2'}] | 每个item有是三个属性，id，text，linkToUrl |
| imageUrl    |                                                                                                 | 消息前面的喇叭图片地址                    |
| imageHeight |                                                                                                 | 消息前面的喇叭图片高度                    |
| imageWidth  |                                                                                                 | 消息前面的喇叭图片宽度                    |

```javascript
   <EleMessageSwiper
          items={[{ id: 1, text: '恭喜城北旗舰店，大麦1个亿' }, { id: 2, text: '热烈庆祝优荣之星成功上市' }]}
          imageWidth={70}
          imageHeight={25}
          imageUrl='https://m.360buyimg.com/babel/jfs/t22534/23/795940699/14893/3457ee4/5b442279N1dde2af1.png'
        />
```

![](/docs/assets/message.gif)

###### EleBreakLine

type=break-line

|           | 样例               | 描述         |
| --------- | ---------------- | ---------- |
| text      | text='我们是有底线的'   | 可选，线中间可以有字 |
| height    | height={1}       | 线的高度       |
| color     | color='#ddd'     | 线的颜色       |
| fontColor | fontColor='#ddd' | 字的颜色       |

```javascript
<EleBreakLine
    text='推荐店铺'
    color='#e4b479'
    fontColor='#e4b479'
    customStyle={{  padding: '20px 100px' }}
/>

<EleBreakLine />
```

![](/docs/assets/ele-breakline.jpg)

###### EleWhiteSpace

type=white-space

|        | 样例           | 描述    |
| ------ | ------------ | ----- |
| height | height:50    | 空白的高度 |
| color  | color:'#ddd' | 空白的颜色 |

```javascript
        <EleWhiteSpace color='pink' />
        <EleWhiteSpace height={50} />
        <EleWhiteSpace color='green' />
```

![](/docs/assets/white-space.jpg)

###### EleNavigationBox

type=box-bar

|     | 样例  | 描述  |
| --- | --- | --- |
|     |     |     |
|     |     |     |
|     |     |     |

```javascript

```

###### 悬浮按钮 EleFab

type=fab

|          | 样例           | 描述                           |
| -------- | ------------ | ---------------------------- |
| imageUrl |              | 中间显示的image，自定义图标             |
| text     |              | 中间显示的文字，不常用                  |
| icon     | icon='clock' | 中间显示的Icon，TaroUI.Icon的value值 |

```javascript
 <EleFab icon='clock' />
```

![](/docs/assets/fab.jpg)

###### EleStoreLocation

type=store-location 

|             | 样例              | 描述                |
| ----------- | --------------- | ----------------- |
| imageUrl    |                 | logo图片地址          |
| phoneNumber |                 | 联系电话，用户点击可以拨打电话   |
| name        |                 | 店铺名               |
| summary     | summary="品牌形象店" | 店铺名字下面的一排字        |
| address     |                 | 地址信息，配合坐标可以点击显示地图 |
| latitude    |                 | 纬度                |
| longitude   |                 | 精度                |

```javascript
   <EleStoreLocation
          imageUrl='https://doublechain.oss-cn-hangzhou.aliyuncs.com/logo/logo_1024_no_background.png?x-oss-process=style/normal'
          phoneNumber='13880xxxxx'
          name='双链小超'
          summary='品牌形象店'
          address='成都市高新区万福路大宝村18号'
          latitude={104.06476}
          longitude={30.5702}
        />
```

![](/docs/assets/store-location.jpg)

###### ElePopup

type=popup 

这里的popup多用于GenericPage，在GenericPage页面可以外层内置一个访问就展示的popup 内容还是EleFlex

```javascript
const popup = {
  bgColor: '#fff',
  kids: [
    {
      id: '222',
      type: 'text',
      text: '快去这里',
    },
    {
      id: '333',
      type: 'image',
      imageUrl,
    },
  ],
}
```

![](/docs/assets/popup2.png)

###### EleFooterTabs

type=footer-tabs 

这里的footer和popup一样多用于GenericPage，页面可以有自定义footer. 

|      | 样例      | 描述                                                                |
| ---- | ------- | ----------------------------------------------------------------- |
| tabs | tabs=[] | tabs的每个item都是类Action. title，imageUrl，selectedImage，linkToUrl都是必须的 |

```javascript
const footer = {
  tabs: [
    {
      title: '领取中心',
      imageUrl:
        'https://img12.360buyimg.com/jdphoto/s72x72_jfs/t6160/14/2008729947/2754/7d512a86/595c3aeeNa89ddf71.png',
      selectedImage:
        'https://img14.360buyimg.com/jdphoto/s72x72_jfs/t17251/336/1311038817/3177/72595a07/5ac44618Na1db7b09.png',
      text: 'new',
      linkToUrl:'/m/1'
    },
    {
      title: '找折扣',
      imageUrl:
        'https://img20.360buyimg.com/jdphoto/s72x72_jfs/t15151/308/1012305375/2300/536ee6ef/5a411466N040a074b.png',
      selected: true,
      linkToUrl:'/m/3'
    },
    {
      title: '领会员',
      imageUrl:
        'https://img10.360buyimg.com/jdphoto/s72x72_jfs/t5872/209/5240187906/2872/8fa98cd/595c3b2aN4155b931.png',
      text: '100',
      max: '99',
      linkToUrl:'/m/2'
    },
  ],
}
```

![](/docs/assets/footer.png)

###### EleQrcode

type=qrcode 

给定文字生成二维码

|         | 样例                           | 描述                       |
| ------- | ---------------------------- | ------------------------ |
| text    | text="https://www.baidu.com" | 给定的文字。可以是连接，参数，文字，根据需求定。 |
| size    | size={150}                   | 二维码大小                    |
| bgColor | bgColor='#fff'               | 背景颜色                     |
| color   | color='#000'                 | 二维码的颜色                   |
| logo   | logo={image}                 |  中间logo的图片，网络图片需要先下载                   |
| logoSize   | logoSize={100}                 |  中间logo的图片大小                  |

```javascript
  <EleQrcode
        size={300}
        logoSize={100}
        logo={logo}
        text='第0适合后端程序员的前端小程序开发框架'
        color='#f23030'
      />
```

![](/docs/assets/qrcode.png)

###### EleMoreActions

type=more-actions 

|            | 样例                        | 描述                                            |
| ---------- | ------------------------- | --------------------------------------------- |
| text       |                           | 可选，文字描述, 例如"更多"，"操作"                          |
| imageUrl   |                           | 可选，icon图片，例如"..."的图                           |
| icon       |                           | 可选，Iconfont中的value                              |
| actionList | actionList=["取消关注","举报"}] | 一组用来展示成ActionSheet的Action                     |
| mode       |                           | 默认值auto，可选值 actionSheet，link                  |
| linkToUrl  |                           | 当配置了linkToUrl的时候，优先使用它做页面跳转（常常是跳转到ListofPage） |

- 属性imageUrl和Icon一般二选一，或者都没有

- 如果设置了linkToUrl且actionList为空，组件点击后会做页面跳转

- 否则会判断mode===‘actionSheet’且actionList多于一个，展示ActionSheet

- 如果配置了actionList且mode===‘auto’或者‘link’, 则取actionList第一item并做页面跳转

```javascript
        <View
          style={{
            flexDirection: 'row',
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            width: '100%',
          }}
        >
          <Text>推荐成功</Text>
          <EleMoreActions
            text='查看更多'
            linkToUrl='/m/2'
          />
        </View>
        <EleMoreActions
          icon='menu'
          actionList={[
            { title: '屏蔽' },
            { title: '举报' },
            { title: '取消关注', linkToUrl: '/m/2' },
          ]}
        />
```

![](/docs/assets/action-sheet.png)

###### EleListof

type=listof 

对listof的包装，常用于GenericPage，其他页面直接使用listof组件，参数参考listof

```javascript
   const shopList = {
      dataContainer: {
        shop1: {
          title: '百安居天府新区店',
          brief: '【装修旗舰店】免费测量，预定送智能家居',
          displayMode: 'auto',
          imageUrl: 'http://www.eastphoto.cn/indexImages/ep-012136603.jpg',
        },
        shop2: {
          title: '湛蓝科技',
          brief: '【空气治理专家】持牌机构，空气治理去甲醛',
          displayMode: 'image-on-left',
          imageUrl:
            'https://m.360buyimg.com/babel/s370x259_jfs/t1/20729/24/4177/80676/5c2f1aeaE062589aa/ee7cc78db75d62ed.jpg!q70.dpg',
        },
      },
      list: [{ id: 'shop1' }, { id: 'shop2' }],
    }
    return (
      <View>
        <EleListof {...shopList} />
      </View>
    )
```

![](/docs/assets/listof.png)

###### EleCheckbox

type=checkbox 

|     | 样例  | 描述  |
| --- | --- | --- |
|     |     |     |
|     |     |     |
|     |     |     |

```javascript

```

###### EleImagePicker

type=image-picker 

|     | 样例  | 描述  |
| --- | --- | --- |
|     |     |     |
|     |     |     |
|     |     |     |

```javascript

```

###### EleInput

type=input 

|     | 样例  | 描述  |
| --- | --- | --- |
|     |     |     |
|     |     |     |
|     |     |     |

```javascript

```

###### ElePicker

type=picker  

|     | 样例  | 描述  |
| --- | --- | --- |
|     |     |     |
|     |     |     |
|     |     |     |

```javascript

```

###### EleRadio

type=radio

|     | 样例  | 描述  |
| --- | --- | --- |
|     |     |     |
|     |     |     |
|     |     |     |

```javascript

```

###### EleSwitch

type=switch 

|     | 样例  | 描述  |
| --- | --- | --- |
|     |     |     |
|     |     |     |
|     |     |     |

```javascript

```

###### EleTextarea

type=textarea 

|     | 样例  | 描述  |
| --- | --- | --- |
|     |     |     |
|     |     |     |
|     |     |     |

```javascript

```

###### MobileVerifyCode

type=vcode 

|     | 样例  | 描述  |
| --- | --- | --- |
|     |     |     |
|     |     |     |
|     |     |     |

```javascript

```

###### UserCard

type=user-card 

|     | 样例  | 描述  |
| --- | --- | --- |
|     |     |     |
|     |     |     |
|     |     |     |

```javascript

```
