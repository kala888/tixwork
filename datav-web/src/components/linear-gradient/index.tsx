import classnames from "classnames";
import styles from "./styles.less";

type LinearGradientType = {
    className?: string
    line?: string
    children?: any
}
export default function LinearGradient(props: LinearGradientType) {
    const {className, line} = props
    const rootCls = classnames(styles.linearGradient, className)
    // const line = "90deg, red 0%, red 0%, rgba(2, 119, 198, 1) 100%, rgba(2, 119, 198, 1) 100%"
    const style = line ? {background: `linear-gradient(${line})`} : {}
    return (
        <div className={rootCls} style={style}>
            {props.children}
        </div>
    )
};
