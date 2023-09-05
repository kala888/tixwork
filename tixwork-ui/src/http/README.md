## 如何请求一个数据。

这里有三种方式。

#### 1. 使用 Q

```javascript
const res = (await Q.get) < API.CaptchaImage > ApiConfig.getCode;
setCaptcha(res.data);
```

#### 2. useHttp

```javascript
const { data = {}, loading, refresh } = useGet < any > `${schema.linkToUrl}/${id}`;
```

#### 3. useResource

```javascript
const { loading, ...api } = useResource < T > resource;
const data = await api.get(id);
```
