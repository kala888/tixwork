import styles from './styles.less'
import useData from "@/util/use-data";
import _ from 'lodash'

import NumberCircle from "@/components/number-circle";
import SlotBox from "@/components/slot-box"

type TotalPanelType = {
    title?: string
    className?: string
    url: string
}
export default function TotalPanel(props: TotalPanelType) {
    const {title, url, className} = props
    const data = useData(url)

    const {deliveryTotal, deliveryBrief, producedTotal, producedBrief} = data || mockData

    return (
        <SlotBox title={title} className={className}>
            <div className={styles.totalPanel}>
                <NumberCircle title='本月生产量' value={deliveryTotal} brief={deliveryBrief} unit='瓶'/>
                <NumberCircle title='本月配送量' value={producedTotal} brief={producedBrief} unit='瓶'/>
            </div>
        </SlotBox>
    );
};
const mockData = {
    deliveryTotal: _.random(10000, 99999),
    deliveryBrief: '增长45%',
    producedTotal: _.random(10000, 99999),
    producedBrief: '增长55%',
}
