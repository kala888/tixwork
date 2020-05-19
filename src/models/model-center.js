// https://github.com/Meituan-Dianping/mpvue/issues/736
import niceRouter from '@/nice-router/nice-router.model'
import _ from 'lodash'
import listof from '../listof/listof.model'
import app from './app.model'

import ModelTools from './model-tools'

const modelListOOTB = [
  niceRouter,
  app,
  listof,
  'home',
  'me',
  'navigationList',
  'H5',

  'genericform',

  'genericpage',
  'genericpage2',

  'listofpage',
  'listofpage2',
  'listofpage3',
  'listofpage4',
  //biz
]

const customizedModelList = []

let modelList = []
modelList = modelList.concat(modelListOOTB.filter((it) => _.isString(it)))
modelList = modelList.concat(customizedModelList.filter((it) => _.isString(it)))

modelList = modelList.concat(modelListOOTB.filter((it) => _.isObject(it)))
modelList = modelList.concat(customizedModelList.filter((it) => _.isObject(it)))

const modelContainer = {}
console.log('prepare to initial models from modelList', modelList)

_.forEach(modelList, (it) => {
  const nameSpace = _.isString(it) ? it : it.namespace

  let modelObj = ModelTools.createDefault(nameSpace)
  if (!_.isString(it)) {
    modelObj = _.merge(modelObj, it)
  }
  modelContainer[nameSpace] = modelObj
})
const models = _.values(modelContainer)
console.log('models of list:', models)

export default models
