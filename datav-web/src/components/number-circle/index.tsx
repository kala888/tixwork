import styles from './styles.less'

type NumberCircleType = {
    title: string,
    value: string,
    brief: string
    unit: string
}

export default function NumberCircle(props: NumberCircleType) {
    const {title, value, brief, unit} = props;

    return (
        <div className={styles.numberCircle}>
            <div className={styles.numberCircleBox}>
                <div className={styles.numberCircleValue}>
                    {value}
                    <span className={styles.numberCircleUnit}>{unit}</span>
                </div>
                <div className={styles.numberCircleTitle}>{title}</div>
            </div>
            <div className={styles.numberCircleBrief}>
                {brief}
            </div>
        </div>
    )
}
