import React from 'react'
import { isEmpty, isNotEmpty } from '@/nice-router/nice-router-util'
import { StyleSheet, Text, View } from 'react-native'
import ActionIcon from '@/components/action-icon'
import colors from '@/utils/colors'
import PopupMessage from '@/nice-router/popup-message'

type FormItemLabelTips = {
  title?: string;
  brief: string;
};

type FormItemLabelProps = {
  required?: boolean;
  tips?: string | FormItemLabelTips;
  layout?: 'vertical' | 'horizontal';
  tail?: React.ReactNode;
  children?: React.ReactNode;
  style?: any;
};

function FormItemLabel(props: FormItemLabelProps) {
  const { required = true, style, tips, tail } = props


  const handleShowTips = () => {
    // @ts-ignore
    PopupMessage.show({ title: '提示信息', text: tips })
  }

  return (
    <View style={[styles.container, style]}>
      <View style={styles.title} onPress={handleShowTips} disabled={isEmpty(tips)}>
        {required && <Text style={styles.required}>*</Text>}
        {props.children}
        {isNotEmpty(tips) && <View style={styles.tipsIcon}><ActionIcon icon='iconfont-question-circle' /></View>}
      </View>
      {tail}
    </View>
  )
}

export default FormItemLabel

const styles = StyleSheet.create({
  container: {
    paddingRight: 4,
    overflow: 'hidden',
    alignItems: 'center',
  },
  content: {
    flexDirection: 'row',
    width: '100%',
  },
  error: {},
  bordered: {},
  formItem: {},
  field: {},

  title: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },

  required: {
    paddingRight: 5,
    color: colors.orange,
    fontSize: 22,
    height: 22,
  },
  tipsIcon: {
    paddingLeft: 4,
  },
})
