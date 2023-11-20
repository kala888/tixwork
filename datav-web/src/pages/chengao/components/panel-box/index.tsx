import styles from './styles.less'
import classNames from "classnames";

type PanelBoxType = {
    title: string,
    children?: any
    className?: any
    height?: string
    longTitle?: boolean
}

export default function PanelBox(props: PanelBoxType) {
    const {title, className, height, longTitle} = props

    const rootCls = classNames(
        "panelBox",
        styles.panelBox,
        className
    )

    const titleCls = classNames(
        "panelTitle",
        styles.title,
        {
            [styles.long]: longTitle
        })

    return (
        <div className={rootCls} style={{height: height}}>
            <div className={styles.panel}>
                <div className={titleCls}>{title}</div>
                <div className={styles.content}>
                    {props.children}
                </div>
            </div>
        </div>
    );
};
