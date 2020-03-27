import Taro from '@tarojs/taro'
import { Picker } from '@tarojs/components'
import { isEmpty, noop } from '@/nice-router/nice-router-util'
import { AtActionSheet, AtActionSheetItem, AtCalendar } from 'taro-ui'
import { formatTime } from '@/utils/index'
import ActionField from './action-field'

export default class EleCalendar extends Taro.PureComponent {
  static defaultProps = {
    placeholder: '请选择',
    onChange: noop,
    mode: 'date',
    // mode: 'date-time',
    value: '',
    disabled: false,
  }

  state = {
    date: '',
    visible: false,
    isCalendarVisible: true,
  }

  show = () => {
    this.setState({
      visible: true,
      isCalendarVisible: true,
    })
  }

  close = () => {
    this.setState({
      visible: false,
      isCalendarVisible: true,
    })
  }

  handleDateSelected = ({ value }) => {
    const { mode } = this.props
    const { start: date } = value
    this.close()

    if (mode === 'date') {
      this.props.onChange(date)
      return
    }
    this.setState({
      date,
    })
  }

  handleTimeChange = (e) => {
    const { date } = this.state
    const {
      detail: { value: time },
    } = e
    this.props.onChange(`${date} ${time}`)
  }

  getDateTime = (value) => {
    const { mode } = this.props
    let [date, time] = value.split(' ')
    if (mode === 'date-time' && isEmpty(value)) {
      time = formatTime(Date.now(), 'HH:mm')
    }
    return {
      date,
      time,
    }
  }

  render() {
    const { isCalendarVisible, visible } = this.state
    const { placeholder, label, value, mode, disabled } = this.props
    const { date, time } = this.getDateTime(value)

    return (
      <ActionField onClick={this.show} disabled={disabled} value={value} placeholder={placeholder}>
        <AtActionSheet title={label} onClose={this.close} isOpened={visible} cancelText='取消'>
          <AtActionSheetItem>
            {mode === 'date' && <AtCalendar isVertical currentDate={date} onSelectDate={this.handleDateSelected} />}

            {mode === 'date-time' && (
              <Picker mode='time' value={time} onChange={this.handleTimeChange} onCancel={this.close}>
                {isCalendarVisible && (
                  <AtCalendar isVertical currentDate={date} onSelectDate={this.handleDateSelected} />
                )}
              </Picker>
            )}
          </AtActionSheetItem>
        </AtActionSheet>
      </ActionField>
    )
  }
}
