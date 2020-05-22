const mockForm2Data = {
  id: 'test-form2',
  pageTitle: '测试form2222222',
  stepList: [
    {
      title: '选货',
      status: 'success',
    },
    {
      title: '买单',
    },
    { title: '走人', selected: true },
  ],
  actionList: [
    { code: 'preStep', title: '上一步' },
    { code: 'nextStep', title: '下一步' },
  ],
  groupList: [
    {
      name: 'fist-group222',
      title: '非常足',

      fieldList: [
        {
          name: '2-0-phone',
          label: '手机号2222',
          type: 'phone',
          placeholder: '输入手机号',
          value: 13880964618,
          rules: [
            {
              required: true,
              message: '要填写手机号哦',
            },
            {
              pattern: /^1\d{10}$/,
              message: '手机号码格式不对',
            },
          ],
        },
        {
          name: '2-1-favorite',
          label: '爱好222222',
          type: 'multi-select',
          placeholder: '请选择你的最爱',
          tips: '不能填写男女关系',
          value: ['sleep'],
          candidateValues: [
            { title: '吃饭', value: 'eat' },
            { title: '睡觉', value: 'sleep' },
            { title: '打豆豆', value: 'pia-pia' },
            { title: '唱歌', value: 'sing-song' },
          ],
          rules: [
            {
              required: true,
              message: '还没选择你的最爱哦',
            },
          ],
        },
      ],
    },
  ],
}
export default mockForm2Data
