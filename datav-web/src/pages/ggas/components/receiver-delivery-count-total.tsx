import styles from './styles.less'
import useData from "@/util/use-data";
import _ from 'lodash'
import SlotBox from "@/components/slot-box";

import  circle1 from '../../../assets/circle1.svg'
import  circle2 from '../../../assets/circle2.svg'

function HistoryTotal(props: any) {
    const {title, value} = props

    return (
        <div className={styles.historyTotal}>
            <img className={styles.historyTotalImage} src={'/images/circle1.svg'}/>
            <img className={styles.historyTotalImage} src={'/images/circle2.svg'}/>
            <div className={styles.historyTotalTitle}>{title}</div>
            <div className={styles.historyTotalValue}>{value}</div>
        </div>
    );
};


export default function ReceiverDeliveryCountTotal({url}: { url: string }) {
    const data = useData(url)
    const {receiveTotal, deliveryTotal} = data || mockData
    return (
        <SlotBox style={{marginRight: 5, marginTop: 10}}>
            <div className={styles.orderTotalHistory}>
                <HistoryTotal title='月收货数量' value={receiveTotal}/>
                <HistoryTotal title='月配送数量' value={deliveryTotal}/>
            </div>
        </SlotBox>

    );
};
const mockData = {
    receiveTotal: _.random(100000, 999999),
    deliveryTotal: _.random(100000, 999999),
}
