import React, {forwardRef, useMemo} from 'react'

import classnames from 'classnames'
import {useAutoResize} from '@/util'
import './style.less'
import _ from "lodash";

const defaultColor = ['#3faacb', '#fff']

const Decoration2 = forwardRef((props: DecorationProps & { reverse?: boolean, dur?: number }, ref) => {
    const {className, style, color = [], reverse = false, dur = 6,} = props
    const {width, height, domRef} = useAutoResize(ref)

    function calcSVGData() {
        return reverse
            ? {w: 1, h: height, x: width / 2, y: 0}
            : {w: width, h: 1, x: 0, y: height / 2}
    }

    const mergedColor = useMemo(() => _.merge(_.cloneDeep(defaultColor), color || []), [color])
    const {x, y, w, h} = useMemo(calcSVGData, [reverse, width, height])

    const classNames = useMemo(() => classnames('dv-decoration-2', className), [
        className
    ])

    return (
        <div className={classNames} style={style} ref={domRef}>
            <svg width={`${width}px`} height={`${height}px`}>
                <rect x={x} y={y} width={w} height={h} fill={mergedColor[0]}>
                    <animate
                        attributeName={reverse ? 'height' : 'width'}
                        from='0'
                        to={reverse ? height : width}
                        dur={`${dur}s`}
                        calcMode='spline'
                        keyTimes='0;1'
                        keySplines='.42,0,.58,1'
                        repeatCount='indefinite'
                    />
                </rect>

                <rect x={x} y={y} width='1' height='1' fill={mergedColor[1]}>
                    <animate
                        attributeName={reverse ? 'y' : 'x'}
                        from='0'
                        to={reverse ? height : width}
                        dur={`${dur}s`}
                        calcMode='spline'
                        keyTimes='0;1'
                        keySplines='0.42,0,0.58,1'
                        repeatCount='indefinite'
                    />
                </rect>
            </svg>
        </div>
    )
})

export default Decoration2
