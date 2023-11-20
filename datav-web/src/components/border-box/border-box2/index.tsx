import React, {useMemo} from 'react'


import classnames from 'classnames'

import _ from 'lodash'
import {useAutoResize} from '@/util'

import './style.less'

const defaultColor = ['#fff', 'rgba(255, 255, 255, 0.6)']

const BorderBox2 = React.forwardRef((props: BorderBoxProps, ref) => {
    const {className, style, color = [], backgroundColor = 'transparent'} = props
    const {width, height, domRef,} = useAutoResize(ref)

    const mergedColor = useMemo(() => _.merge(_.cloneDeep(defaultColor), color || []), [color])

    const classNames = useMemo(() => classnames('dv-border-box-2', className), [
        className
    ])

    return (
        <div className={classNames} style={style} ref={domRef}>
            <svg className='dv-border-svg-container' width={width} height={height}>
                <polygon fill={backgroundColor} points={`
          7, 7 ${width - 7}, 7 ${width - 7}, ${height - 7} 7, ${height - 7}
        `}/>
                <polyline
                    stroke={mergedColor[0]}
                    points={`2, 2 ${width - 2} ,2 ${width - 2}, ${height -
                    2} 2, ${height - 2} 2, 2`}
                />
                <polyline
                    stroke={mergedColor[1]}
                    points={`6, 6 ${width - 6}, 6 ${width - 6}, ${height -
                    6} 6, ${height - 6} 6, 6`}
                />
                <circle fill={mergedColor[0]} cx='11' cy='11' r='1'/>
                <circle fill={mergedColor[0]} cx={width - 11} cy='11' r='1'/>
                <circle fill={mergedColor[0]} cx={width - 11} cy={height - 11} r='1'/>
                <circle fill={mergedColor[0]} cx='11' cy={height - 11} r='1'/>
            </svg>
            <div className='border-box-content'>{props.children}</div>
        </div>
    )
})

export default BorderBox2
