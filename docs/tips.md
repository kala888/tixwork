# NiceRouter 开发Tips

1. nice-router很多功能都是基于后端数据驱动的。

2. 使用Taro作为基础框架，理论上多端统一。目前NiceRouter内置组件只做了微信小程序的兼容。

3. nice-router内部使用了dva，所有dva的所有开发方式这里都合适。

4. 文件上传尽量上传到阿里云OSS等对象存储服务上，可以降低图片访问对服务端带宽压力。

5. 交互性强的页面，还是沿用你最熟悉的开发方式，这样可以提高UX感受。

6. 绝大部分list页面，可以使用listof来开发，套路满满的，开发成本很低。

7. Genericpage，是通过数据来动态渲染，配合GUI的编辑器，可以实现运营同学自助构建小程序的页面，尤其是促销活动页面。

8. 因为loadash包，太大了，使用的lodash函数的地方，需要单独引入，而不应该使用 import _ from 'lodash'， 例如在m_.js统一引入。

9. CSS部分使用SCSS和css就好了，这也不需要纠结。

10. idea 格式化和format不一致：打开.prettierrc文件，点击右键，Apply Prettier Style Rules 或者修改rule后，接受提示"Use code style base on Prettier for this project?"
 如果idea中格式化还报jsx/react-tag-spacing错误设置idea：Code Style -> HTML -> Other -> Spaces -> In empty tag

11. Taro2.0 中组件如果引用公共的SCSS文件，需要添加addGlobalClass,CSS会被打到vendors.wxss
```$javascript
static options = {
    addGlobalClass: true,
  }
```

