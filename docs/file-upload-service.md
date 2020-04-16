### 图片上传

默认可以使用或者参考EleImagePicker的实现。

目前支持图片上传到Aliyun OSS或者七牛云 Kodo（daas也默认支持这两种方式）

只需要配置Token获取服务地址src/utils/config.js就可以用了

```javascript
  api: {
    ......
    OSSToken: 'test0ss/',
  },
```

如果使用Aliyun 返回的结果：

```javascript

  "type": 'aliyun',
  
  "accessKeyId": "xxx",
  "accessKeySecret": "xxx",
  "securityToken": "xxx",
  "bucket": "xxx"
  "expiration": "2019-11-06T11:46:19Z",
  "endpoint": "https://oss-cn-beijing.aliyuncs.com",
  
  "userHome": "upload/MoyiUser/11",
  "prefix": "https://doublechain-public.oss-cn-beijing.aliyuncs.com",
  "uploadPrefix": "https://static.doublechaintech.com",
 
```

如果使用七牛云 返回的结果：

```javascript
  "type": 'qiniu',
  "securityToken": "xxx",
  "expiration": "2019-11-06T11:46:19Z", 
  "userHome": "upload/MoyiUser/11",
  "prefix": "xxxx", 
  "uploadPrefix": "https://static.doublechaintech.com",
  
```



> 已经标准化了上传的逻辑，所以只需要在服务端控制token的生成就能自由切换文件上传
> 
> 更多细节可以参考
> 
> src/service/file-upload/upload-files.js 
> 
> src/genericpage/field/ele-image-picker.jsx


