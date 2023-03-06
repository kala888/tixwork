import { ActionListLike, EleObject, ImageLike, TitleValue } from '@/nice-router/nice-router-types'

import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import StatusFlag from '@/components/elements/ele-card/status-flag'
import ListofUtil from '@/listof/listof-util'
import ServerImage from '@/server-image/server-image'
import EleActionList from '@/components/elements/ele-action-list'
import colors from '@/utils/colors'
import CardInfoTable from '@/components/elements/ele-table/card-info-table'
import _ from 'lodash'
import { isEmpty } from '@/nice-router/nice-router-util'

type AutoItemProps = {
  status: string;
  infoList?: TitleValue[];
  mode?: 'only-title' | 'image-on-bottom' | 'small';
} & ActionListLike &
  EleObject;

type AutoTemplateProps = {
  item: AutoItemProps;
  showImageCount?: number;
  mode?: 'only-title' | 'image-on-bottom' | 'small';
};

function AutoTemplate(props: AutoTemplateProps) {

  const { item, showImageCount = 3, mode } = props
  const { title, brief, infoList = [], status, actionList } = item

  let list: ImageLike[] = []
  if (showImageCount > 0) {
    const tempList = ListofUtil.getImageList(item)
    const size = Math.min(showImageCount, tempList.length)
    list = tempList.slice(0, size)
  }


  const rootClass = [
    styles.container, styles[_.camelCase(mode)], isEmpty(brief) ? styles.onlyTitle : {},
  ]

  return (
    <View style={rootClass}>
      <StatusFlag title={status} size='normal' />
      {list.length > 0 && (
        <View style={styles.imageList}>
          {list.map((it: any, index) => {
            const key = `auto-${index}-${item.id}`
            return (
              <View key={key} style={[styles.imageListItem, { marginLeft: index === 0 ? 0 : 2 }]}>
                <ServerImage style={{ flex: 1 }} src={it.imageUrl} />
              </View>
            )
          })}
        </View>
      )}

      <View style={styles.autoInfo}>
        <Text numberOfLines={1} style={styles.title}>{title}</Text>
        {brief && <Text numberOfLines={1} style={styles.brief}>{brief}</Text>}
        {infoList.length > 0 && <CardInfoTable data={infoList} />}
      </View>
      <EleActionList mode={['right', 'small']} style={styles.actionList} items={actionList} />
    </View>
  )
}

AutoTemplate.defaultProps = {
  item: {},
  showImageCount: 3,
}

export default AutoTemplate

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    overflow: 'hidden',
    backgroundColor: '#fff',
    flexDirection: 'column',
    justifyContent: 'center',
    borderRadius: 4,
    color: colors.textColor,
    marginBottom: 10,
    paddingBottom: 10,
    marginHorizontal: 10,
  },
  imageList: {
    flexDirection: 'row',
    width: '100%',
    height: 100,
  },
  imageListItem: {
    flex: 1,
    borderWidth: 0.5,
    borderColor: colors.borderColor,
  },
  autoInfo: {
    padding: 4,
    flexDirection: 'column',
  },
  title: {
    fontSize: 18,
    fontWeight: '500',
    margin: 10,
  },

  brief: {
    fontSize: 14,
    color: colors.textColorLight,
    marginLeft: 10,
    marginBottom: 5,
    height: 16,
  },
  imageOnBottom: {
    flexDirection: 'column-reverse',
  },
  onlyTitle: {
    paddingBottom: 0,
  },
})
