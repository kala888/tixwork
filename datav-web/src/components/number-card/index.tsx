import _ from "lodash";
import styles from './styles.less'

type NumberCardType = {
    value: number,
    paddingLength: number,
}
export default function NumberCard(props: NumberCardType) {
    const {value, paddingLength = 0} = props
    let str = _.toString(value)
    if (value > 0) {
        str = _.padStart(str, paddingLength, '0');
    }
    const list = str.split('')

    return (
        <div className={styles.numberCard}>
            {
                list.map((it, idx) => (
                    <div className={styles.numberCardItem} key={idx + "_" + it}>{it}</div>
                ))
            }
        </div>
    );
};
