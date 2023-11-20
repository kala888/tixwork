import React from 'react'
import styles from './styles.less'
import _ from 'lodash'


type TimeLineType = {
    style?: any,
    lineStyle?: any,
    colorOption?: any[]
    angle?: number //渐变颜色旋转角
    breakOption?: any[]
    topTextStyle?: any//上文本样式
    bottomTextStyle?: any,//下文本样式
}

/**
 *  自定义 带渐变时间轴组件
 */
export default function TimeLine(props: TimeLineType) {
    const {
        style = {},
        lineStyle = {},
        colorOption = [],
        angle = 45,
        breakOption = [],
        topTextStyle = {},
        bottomTextStyle = {}
    } = props
    //line style
    let linearStyle = `linear-gradient(${angle}deg,`
    const lineStyleClone = _.cloneDeep(lineStyle)
    if (colorOption) {
        colorOption.forEach((it) => {
            linearStyle += `${it.color} ${it.step}%,`
        })
        lineStyleClone.background = linearStyle.substring(0, linearStyle.length - 1)
    }

    return (
        <div className={styles.timeLineContainer} style={style}>
            <span className={styles.timeLine} style={lineStyleClone}></span>
            {
                breakOption.map((item, index) => {
                    return <div key={index}>
                        <div className={`${styles.point} ${item.active === true ? styles.activePoint : ''}`}
                             style={{left: `${item.step ? item.step : 0}%`}}></div>
                        {
                            (() => {
                                let top = _.cloneDeep(topTextStyle)
                                top.left = (item.step ? item.step : 0) + '%'
                                return <div className={styles.topText}
                                            style={top}
                                >{item.topText ? item.topText : ''}</div>
                            })()
                        }
                        {
                            (() => {
                                let bottom = _.cloneDeep(bottomTextStyle)
                                bottom.left = (item.step ? item.step : 0) + '%'
                                return <div className={styles.bottomText}
                                            style={bottom}
                                >{item.bottomText ? item.bottomText : ''}</div>
                            })()
                        }
                    </div>
                })
            }

        </div>
    )
}
