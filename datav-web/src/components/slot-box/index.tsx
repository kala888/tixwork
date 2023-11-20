import classnames from "classnames";
import _ from 'lodash';
import LinearGradient from "@/components/linear-gradient";
import styles from './styles.less'

export type SlotBoxType = {
    title?: string
    brief?: string
    children?: any
    className?: any
    style?: any
}

export default function SlotBox(props: SlotBoxType) {
    const {title = '', brief, className, style} = props;

    const rootCls = classnames(styles.slotBox, className)
    return (
        <div className={rootCls} style={style}>
            {
                !_.isEmpty(title) && (
                    <div className={styles.slotBoxTitle}>
                        <LinearGradient className='flex-1'>{title}</LinearGradient>
                        {!!brief && <LinearGradient>{brief}</LinearGradient>}
                    </div>
                )
            }
            <div className={styles.slotBoxContent}>
                {props.children}
                <div className={styles.slotBoxMask}/>
            </div>
        </div>
    );
};
