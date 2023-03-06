import _ from 'lodash'
import app from './app.model'

import ModelTools from './model-tools'
import objectPicker from './object-picker.model'
import niceRouter from '../nice-router/nice-router.model'
import { isString } from '@/utils'

const modelList = [
  niceRouter,
  app,
  objectPicker,
  'deliveryOrder',
  'home',
  'me',
  'serviceCenter',
  'resultPage',

  'genericform',

  'listofpage',
  'listofpage2',
  'listofpage3',
  'listofpage4',
]

const modelContainer = {}
console.log('prepare to initial models from modelList', modelList)

_.forEach(modelList, (it) => {
  const nameSpace = typeof it === 'string' ? it : it.namespace

  let modelObj = ModelTools.createDefault(nameSpace)
  if (!isString(it)) {
    modelObj = _.merge(modelObj, it)
  }
  modelContainer[nameSpace] = modelObj
})
const models = _.values(modelContainer)
console.log('models of list:', models)

export default models
