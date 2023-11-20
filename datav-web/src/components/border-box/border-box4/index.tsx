import React, {useMemo} from 'react'

import classnames from 'classnames'

import _ from 'lodash'

import {useAutoResize} from '@/util'

import './style.less'

const defaultColor = ['rgba(255, 255, 255, 0.35)', 'rgba(255, 255, 255, 0.20)']

const BorderBox4 = React.forwardRef((props: BorderBoxProps & { reverse?: boolean }, ref) => {
    const {className, style, color = [], backgroundColor = 'transparent', reverse = false,} = props
    const {width, height, domRef} = useAutoResize(ref)

    const mergedColor = useMemo(() => _.merge(_.cloneDeep(defaultColor), color || []), [color])

    const classNames = useMemo(() => classnames('dv-border-box-5', className), [
        className
    ])

    return (
        <div className={classNames} style={style} ref={domRef}>
            <svg
                className={`dv-border-svg-container  ${reverse && 'dv-reverse'}`}
                width={width}
                height={height}
            >
                <polygon fill={backgroundColor} points={`
          10, 22 ${width - 22}, 22 ${width - 22}, ${height - 86} ${width - 84}, ${height - 24} 10, ${height - 24}
        `}/>
                <polyline
                    className='dv-bb5-line-1'
                    stroke={mergedColor[0]}
                    points={`8, 5 ${width - 5}, 5 ${width - 5}, ${height - 100}
          ${width - 100}, ${height - 5} 8, ${height - 5} 8, 5`}
                />
                <polyline
                    className='dv-bb5-line-2'
                    stroke={mergedColor[1]}
                    points={`3, 5 ${width - 20}, 5 ${width - 20}, ${height - 60}
          ${width - 74}, ${height - 5} 3, ${height - 5} 3, 5`}
                />
                <polyline
                    className='dv-bb5-line-3'
                    stroke={mergedColor[1]}
                    points={`50, 13 ${width - 35}, 13`}
                />
                <polyline
                    className='dv-bb5-line-4'
                    stroke={mergedColor[1]}
                    points={`15, 20 ${width - 35}, 20`}
                />
                <polyline
                    className='dv-bb5-line-5'
                    stroke={mergedColor[1]}
                    points={`15, ${height - 20} ${width - 110}, ${height - 20}`}
                />
                <polyline
                    className='dv-bb5-line-6'
                    stroke={mergedColor[1]}
                    points={`15, ${height - 13} ${width - 110}, ${height - 13}`}
                />
            </svg>

            <div className='border-box-content'>{props.children}</div>
        </div>
    )
})


export default BorderBox4
