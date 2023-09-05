### Tixwork ui

自定义 ProComponent 例子: ObjectPicker

Umi 删除缓存

```shell
rm -rf node_modules/.cache
```

##### ValueType 有时会有诡异出错

错误信息：

```text
  Objects are not valid as a React child (found: object with keys {id, displayName, createBy, createTime, updateBy, updateTime, params, visitDate, companyName, visitUser, visitCity, companyType, industryChain, industryChainLevel, processState, contactType, contactResult, projectInfo, bigProject, leaderType, leaderName, pushStatus, delFlag}). If you meant to render a collection of children, use an array instead.
```

再测试一下，是否正常使用：

```javascript
<EleProProvider>
  <ProDescriptions
    dataSource={{
      mobile: '13880964614',
    }}
    columns={[{ dataIndex: 'mobile', label: 'mobile', valueType: 'Mobile' }]}
  />
</EleProProvider>
```

解决方法：要彻底清理缓存

```shell
rm yarn.lock
rm -rf node_modules
yarn cache clean
yarn
```

### antd token 设置

0. 对于 colorPrimary，在 defaultSettings.ts 中配置的优先级最高

1. config/config.ts

```javascript
antd: {
  // shortcut of `configProvider.theme`
  // use to configure theme token, antd v5 only
  theme: {
    // Theme for antd: https://ant.design/docs/react/customize-theme-cn
    // algorithm: theme.compactAlgorithm,
    token: {
      colorPrimary: 'pink';
    }
  }
  // appConfig: {},
}
```

2. 运行时刻设置 app.tsx 高于 config.ts

```javascript
export const antd: RuntimeAntdConfig = (memo) => {
  const theTheme = memo.theme || {};
  const theToken = theTheme.token || {};
  memo.theme = {
    ...theTheme,
    // algorithm: theme.compactAlgorithm, // 配置 antd5 的预设 dark 算法
    token: {
      ...theToken,
      // colorPrimary: '#2088cc',
      colorPrimary: 'red',
    },
  };
  // memo.appConfig = {
  //   message: {
  //     // 配置 message 最大显示数，超过限制时，最早的消息会被自动关闭
  //     maxCount: 3,
  //   },
  // };
  return memo;
};
```

### ProComponent token

0. defaultSettings.ts 中 token

```javascript
token: {
  colorTextAppListIcon: 'red';
}
```
