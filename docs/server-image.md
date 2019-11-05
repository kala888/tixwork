### ServiceImage

 对于中小型项目，服务器带宽真的挺贵的，以aliyun为例开个10M带宽，也几大千。所以需要尽量使用静态cdn资源。

目前比较推荐使用aliyun oss之类的对象存储。优点是不占用应用服务器带宽，提供默认的水印，image-resize的服务。移动端直接上传/下载图片到OSS。

 ServerImage 组件通过提供不同size属性，拼装OSS的style到URL。例如

```
 <ServerImage src='https://..../test.jpg' size='small'/>
```

 图片组件将会请求 "https://..../test.jpg?x-oss-process=style/small"

 请确保阿里云OSS已经配置了相应的style。

- [ ] TODO 增加thumbnail的优化访问速度（访问大图，先访问thumbnail获取一个小的模糊图，然后请求大图，大图请求下来后再替换）

| 参数        | 样例                                 | 解释                                                                                                                                                                         |
| --------- | ---------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| src       | src = {imageUrl}                   | 图片的网络地址, 如果图片的地址不止"https://"开头，url将会拼接Config.oss.staticURL到src的前面。例如 src = "test/test.jpg" 实际访问路径是 ``` ${Config.oss.staticURL}/test/test.jpg?x-oss-process=style/normal `` |
| uri       | uri = {imageUrl}                   | 同src                                                                                                                                                                       |
| size      | size = 'small'                     | OSS中图片的大小，默认值'normal'. 可选值：thumbnail, tiny, small, middle, normal, large, xlarge，origin依赖于阿里云OSS中的配置                                                                       |
| mode      | mode = 'scaleToFill'               | 参考小程序的mode                                                                                                                                                                 |
| style     | style = {{border:'1px solid red'}} | 注意这里和RN写法不太一样哦，特别是涉及到数值的位置，RN中可以写width:100, 这里需要带上单位width:'100px'                                                                                                          |
| className | className = 'test-image'           | Image的className                                                                                                                                                            |
