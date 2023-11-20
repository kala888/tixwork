import _ from "lodash";
import styles from './styles.less'
import useData from "@/util/use-data";
import NumberCard from "@/components/number-card";
import SlotBox from "@/components/slot-box";


function InfoItem(props: any) {
    const {name, value, label} = props
    return (
        <div className={styles.infoItem}>
            <div className={styles.infoItemName}>{name}</div>
            <div className={styles.infoItemText}>
                <span>{`${label}:   `}</span>
                <span className={styles.infoItemValue}>{value}</span>
            </div>
        </div>
    )
}

type AnnualTotalType = {
    title?: string
    className?: string
    url: string
}
export default function AnnualTotal(props: AnnualTotalType) {
    const {title, url, className} = props
    const data = useData(url)
    const {producedTotal, producedTotalList, deliveryTotal, deliveryTotalList} = data || mockData

    return (
        <SlotBox title={title} className={className}>
            <div className={styles.annualTotal}>
                <div className={styles.annualTotalCard}>
                    <div className={styles.annualTotalCardTitle}>年度产量（瓶）</div>
                    <NumberCard value={producedTotal} paddingLength={5}/>
                    {
                        producedTotalList.map((it: any) => (
                            <InfoItem key={it.title} name={it.title} value={it.value} label='产量'/>
                        ))
                    }
                </div>
                <div className={styles.annualTotalCard}>
                    <div className={styles.annualTotalCardTitle}>年累配送（瓶）</div>
                    <NumberCard value={deliveryTotal} paddingLength={5}/>
                    {
                        deliveryTotalList.map((it: any) => (
                            <InfoItem key={it.title} name={it.title} value={it.value} label='配送'/>
                        ))
                    }
                </div>
            </div>
        </SlotBox>
    );
};

const mockData = {
    producedTotal: _.random(10000, 99999),
    deliveryTotal: _.random(10000, 99999),
    producedTotalList: [
        {title: '珠江气体', value: _.random(1000, 9999)},
        {title: '南沙工厂', value: _.random(1000, 9999)},
        {title: '武汉工厂', value: _.random(1000, 9999)},
    ],
    deliveryTotalList: [
        {title: '珠江气体', value: _.random(1000, 9999)},
        {title: '南沙工厂', value: _.random(1000, 9999)},
        {title: '武汉工厂', value: _.random(1000, 9999)},
    ]
}
