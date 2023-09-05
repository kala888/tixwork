```typescript
type Setting = {
  id: number;
  label: string;
  code: string;
  value?: string;
  type: 'VALUE' | 'GROUP';
  dataScope: 'PRIVATE' | 'PUBLIC' | 'SYSTEM';
  status: Status;
  sortOrder: number;
  isDefault?: YesOrNo;
  remark?: string;
  parent?: Setting;
  valueList?: Setting[];
};
```

### 重要属性说明

| 属性 | 说明 | 类型 | 默认值 | 是否必须 |
| --- | --- | --- | --- | --- |
| label | 中文展示 | string | - | 是 |
| code | 系统编码，用来系统调用 | string | - | 是 |
| value | 值，作为 GROUP 或者字对象的时候，可以为空 | string | - | 否 |
| type | VALUE 和 GROUP | value | - | 是 |
| dataScope | 数据权限，PUBLIC 可以被任何人访问,SYSTEM 是一种不能被删除的 Private | 'PRIVATE','PUBLIC' , 'SYSTEM' | - | 是 |
| sortOrder | 作为子对象的时候，排序用 | number | - | 是 |
| isDefault | 作为子对象的时候，可以为父对象设置默认值 | boolean | - | 否 |
| parent | 父设置项 | Setting | - | 否 |
| valueList | 子设置项 | Setting[] | - | 否 |
