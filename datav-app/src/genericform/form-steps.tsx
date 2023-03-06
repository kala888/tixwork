import { CandidateValue } from '@/nice-router/nice-router-types'
import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ActionIcon from '@/components/action-icon'
import colors from '@/utils/colors'

type StepStatus = 'success' | 'processing' | 'waiting_process' | 'error'

type FormStepsProps = {
  steps: CandidateValue[];
};

function getStatus(currentIdx, idx): StepStatus {
  if (idx < currentIdx) {
    return 'success'
  }
  if (idx === currentIdx) {
    return 'processing'
  }
  return 'waiting_process'
}

function Step({ index, title, brief, icon, status }) {

  return (
    <>
      {index > 0 && <View style={styles.line} />}
      <View style={styles.step}>
        <View style={[styles.icon, styles[status]]}>
          {icon ? <ActionIcon icon={icon} /> :
            <Text style={[styles.iconText, styles[status + 'Text']]}>{index}</Text>}
        </View>
        <Text numberOfLines={1} style={styles.title}>{title}</Text>
        <Text numberOfLines={2} style={styles.brief}>{brief}</Text>
      </View>
    </>
  )
}

function FormSteps({ steps }: FormStepsProps) {

  // const handleChange = (current) => {
  //   NavigationService.view(
  //     steps[current],
  //     {},
  //     {
  //       navigationMethod: 'replace',
  //     },
  //   )
  // }


  let selectedIdx = steps.findIndex((it) => it.selected)

  return (
    <View style={styles.container}>
      {
        steps.map((it, idx) => {
            const status = getStatus(selectedIdx, idx)
            return (
              // @ts-ignore
              <Step key={idx} status={status} index={idx} {...it} />
            )
          },
        )
      }
    </View>
  )
}

FormSteps.defaultProps = {
  steps: [],
}
export default FormSteps


const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    paddingHorizontal: 20,
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  step: {
    flexDirection: 'column',
    width: 60,
    alignItems: 'center',
  },
  icon: {
    height: 40,
    width: 40,
    borderRadius: 60,
    backgroundColor: '#ccc',
    borderWidth: 0.5,
    borderColor: colors.borderColor,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '800',
  },
  title: {
    paddingTop: 5,
    fontSize: 16,
    color: colors.textColor,
  },
  brief: {
    paddingTop: 3,
    fontSize: 12,
    color: colors.textColorLight,
  },
  success: {
    backgroundColor: '#ccc',
  },
  error: {
    backgroundColor: colors.orange,
  },
  waiting_process: {
    backgroundColor: '#fff',
    color: 'red',
  },
  waiting_processText: {
    color: colors.textColorLighter,
  },
  processing: {
    backgroundColor: colors.primaryColor,
  },
  line: {
    height: 2,
    backgroundColor: colors.primaryColor,
    minWidth: 40,
    marginTop: 20,
    marginHorizontal: -10,
    flex: 1,
  },
})
