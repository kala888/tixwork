// eslint-disable-next-line import/no-extraneous-dependencies
import { createAction, noop } from '@/nice-router/nice-router-util'

function getActionUrl(listMetaInfo = {}) {
  const { actions: { nextPageAction: { linkToUrl } = {} } = {}, nextPageUrl } = listMetaInfo
  return linkToUrl || nextPageUrl || ''
}

export default {
  namespace: 'listof',
  state: {},
  effects: {
    *fetchNext({ payload }, { put }) {
      const { listMeta = {}, onSuccess = noop } = payload

      const linkToUrl = getActionUrl(listMeta)
      const { hasNextPage = true } = listMeta

      console.log('fetch next page', listMeta)
      if (!hasNextPage || !linkToUrl || linkToUrl.length === 0) {
        console.log('there is no nextpage', payload)
        return
      }

      yield put(
        createAction('niceRouter/route')({
          uri: linkToUrl,
          statInPage: true,
          arrayMerge: 'append',
          onSuccess,
        })
      )
    },
  },
  subscriptions: {},
  reducers: {},
}
