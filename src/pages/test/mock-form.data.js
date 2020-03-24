export default [
  {
    id: '1-favorite',
    name: 'favorite',
    label: '爱好',
    type: 'multi-select',
    placeholder: '请选择你的最爱',
    tips: '不能填写男女关系',
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
  {
    id: '11-your-favorite',
    name: '-your-favorite',
    label: '爱好222',
    type: 'multi-select',
    placeholder: '请选择你的最爱22222',
    tips: '不能填写男女关系222222',
    candidateValues: [
      { title: '吃饭2', value: 'eat3' },
      { title: '睡觉3', value: 'sleep2' },
      { title: '打豆豆4', value: 'pia-pia2' },
      { title: '唱歌5', value: 'sing-song3' },
    ],
    rules: [
      {
        required: true,
        message: '还没选择你的最爱哦',
      },
    ],
  },
  {
    id: '2-real-name',
    name: 'real-name',
    label: '姓名',
    type: 'text',
    placeholder: '请输入您的真实姓名',
    tips: '这里需要填写你的真实姓名哦',

    rules: [
      {
        required: true,
        type: 'text',
        message: '真实姓名不能为空',
      },
      {
        max: 32,
        message: '真实姓名长度不能超过32位',
      },
    ],
  },
  {
    id: '3-age',
    name: 'age',
    label: '年龄',
    type: 'integer',
    placeholder: '请输入您的年龄',

    rules: [
      {
        required: true,
        message: '年龄必填',
      },
      {
        max: 180,
        message: '最大年纪为180',
      },
      {
        min: 0,
        message: '最小年纪为0',
      },
    ],
  },
  {
    id: '4-gender',
    name: 'gender',
    label: '性别',
    type: 'boolean',

    candidateValues: [
      {
        id: 1,
        title: '男',
        value: true,
      },
      {
        id: 2,
        title: '女',
        value: false,
      },
    ],
  },

  {
    id: '5-height',
    name: 'height',
    label: '身高（cm）',
    type: 'double',
    placeholder: '输入身高',

    rules: [
      {
        min: 20,
        message: '不能低于一个尺子的长度哦',
      },
      {
        max: 300,
        message: '不能比楼房的层高还高',
      },
      {
        precision: 2,
        message: '精确两位即可',
      },
    ],
  },
  {
    id: '6-deposit',
    name: 'deposit',
    label: '存款',
    type: 'money',
    placeholder: '输入存款余额',
    rules: [
      {
        required: true,
        message: '必填',
      },
    ],
  },
  {
    id: '7-start-date',
    name: 'start-date',
    label: '开始日期',

    type: 'date',
    placeholder: '应该填写开始日期',
    rules: [
      {
        required: true,
        message: '开始日期是必须的',
      },
    ],
  },
  {
    id: '8-date-time',
    name: 'plan-time',
    label: '约会时间',
    type: 'datetime',
    placeholder: '请选择约会时间',
    rules: [
      {
        required: true,
        message: '约会时间是必须的',
      },
    ],
  },
  {
    id: '9-avatar',
    name: 'avatar',
    label: '头像',
    type: 'image',
    placeholder: '这里是你的头像',
    maxLength: 3,
  },
  {
    id: '10-photos',
    name: 'photos',
    label: '生活照',

    type: 'image',
    placeholder: '请详细描述一下你所有的学习经历',
    maxLength: 8,
    rules: [
      {
        required: true,
        message: '怎么着也得上传一张生活照吧',
      },
    ],
  },
  {
    id: '11-job-title',
    name: 'job-title',
    label: '工种',

    type: 'single-select',
    placeholder: '请选择职位',
    candidateValues: [
      { title: '铲墙工', value: 'role1' },
      { title: '木工', value: 'role2' },
      { title: '水电工', value: 'role3' },
    ],
  },
  {
    id: '12-description',
    name: '12-description',
    label: '详细描述',

    type: 'longtext',
    placeholder: '请详细描述一下你所有的学习经历',

    rules: [
      {
        min: 500,
        max: 10,
        message: '这玩意最多填500字,最少10个字',
      },
    ],
  },
  {
    id: '13-user-selector',
    name: '13-user-selector',
    label: '选工长',

    type: 'object-picker',
    placeholder: '快点选个工长',
    linkToUrl: '/find/user/:id/',
  },
]
