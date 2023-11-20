import React, {useMemo} from 'react'

import classnames from 'classnames'

import _ from 'lodash'
import {useAutoResize} from '@/util'

import './style.less'

const defaultColor = ['#2862b7', '#2862b7']

const BorderBox3 = React.forwardRef((props: BorderBoxProps, ref) => {
    const {className, style, color = [], backgroundColor = 'transparent'} = props
    const {width, height, domRef} = useAutoResize(ref)

    const mergedColor = useMemo(() => _.merge(_.cloneDeep(defaultColor), color || []), [color])

    const classNames = useMemo(() => classnames('dv-border-box-3', className), [
        className
    ])

    return (
        <div className={classNames} style={style} ref={domRef}>
            <svg className='dv-border-svg-container' width={width} height={height}>
                <polygon fill={backgroundColor} points={`
          23, 23 ${width - 24}, 23 ${width - 24}, ${height - 24} 23, ${height - 24}
        `}/>
                <polyline
                    className='dv-bb3-line1'
                    stroke={mergedColor[0]}
                    points={`4, 4 ${width - 22} ,4 ${width - 22}, ${height -
                    22} 4, ${height - 22} 4, 4`}
                />
                <polyline
                    className='dv-bb3-line2'
                    stroke={mergedColor[1]}
                    points={`10, 10 ${width - 16}, 10 ${width - 16}, ${height -
                    16} 10, ${height - 16} 10, 10`}
                />
                <polyline
                    className='dv-bb3-line2'
                    stroke={mergedColor[1]}
                    points={`16, 16 ${width - 10}, 16 ${width - 10}, ${height -
                    10} 16, ${height - 10} 16, 16`}
                />
                <polyline
                    className='dv-bb3-line2'
                    stroke={mergedColor[1]}
                    points={`22, 22 ${width - 4}, 22 ${width - 4}, ${height -
                    4} 22, ${height - 4} 22, 22`}
                />
            </svg>

            <div className='border-box-content'>{props.children}</div>
        </div>
    )
})

export default BorderBox3
