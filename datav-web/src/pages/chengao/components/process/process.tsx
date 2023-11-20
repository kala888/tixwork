import TimeLine from '@/components/time-line'
import moment from "moment";
import SlotBox, {SlotBoxType} from "@/components/slot-box";
import styles from './styles.less'

export default function Process(props: SlotBoxType) {
  const now = moment().format('YYYY.MM.DD')

  const colorOption = [
    {color: '#67D9FF', step: 0},
    {color: '#61CDF8', step: 82},
    {
      color: '#484075',
      step: 95,
    },
    {color: '#7E74AD', step: 100}
  ]

  const breakOption = [
    {
      topText: '计划开始',
      bottomText: '2021.07.07',
      step: 5,
      active: true,
    },
    {
      topText: '完成总结构图',
      bottomText: '2021.07.30',
      step: 15,
      active: true
    },
    {
      topText: '完成装配图',
      bottomText: '2021.08.30',
      step: 28,
      active: true,
    },
    {
      topText: '设计评审',
      bottomText: '2021.09.30',
      step: 43,
      active: true
    },
    {
      topText: '试验器试制',
      bottomText: '2022.01.01',
      step: 53,
      active: true
    },
    {
      topText: '安装调试',
      bottomText: '2022.6.30',
      step: 65,
      active: true
    },
    {
      topText: '完成',
      bottomText: '2022.07.31',
      step: 75,
      active: true
    },
    {
      topText: '持续试验',
      bottomText: now,
      step: 85,
      active: false
    },
    {
      topText: '',
      step: 100,
      active: true
    }
  ]


  return (
      <SlotBox title='项目进度' {...props}>
        <div className={styles.process}>
          <TimeLine colorOption={colorOption} breakOption={breakOption}/>
        </div>
      </SlotBox>
  );
};
