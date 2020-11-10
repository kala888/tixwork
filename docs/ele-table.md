# EleTable

   一个简单的table组件

#### 设计目标

  ```

  const tableData = [
    { items: [{ title: '姓名' }, { title: '年龄' }, { title: '性别' }], header: true },
    { items: [{ title: 'kala' }, { title: '118' }, { title: '男' }] },
    { items: [{ title: '地址' }, { title: '成都市高新区天府软件园XXX栋XXX楼', colspan: 2 }] },
  ]

return (
    <View>
        <CardInfoTable
            data={[
             { title: '姓名', value: '溜溜' },
             { title: '年龄', value: '29' },
             { title: '地址', value: '成都市高新区天府软件园XXX栋XXX楼' },
             null,
             { value: '吃葡萄不吐葡萄皮，不吃葡萄到吐葡萄皮' },
         ]}
       />

      <EleTable title='我是谁' data={tableData} />

      <EleTable title='我是title'>
        <EleTableRow>
          <EleTableCell title='hello' />
          <EleTableCell title='hello' colspan={3} />
        </EleTableRow>

        <EleTableRow>
          <EleTableCell title='world' mode='left' />
          <EleTableCell title='nia' />
          <EleTableCell title='我是谁' />
          <EleTableCell title='我是ta我是ta我是ta我是ta我是ta' />
        </EleTableRow>
      </EleTable>

    </View>
)



```

#### 如何使用 welcome
