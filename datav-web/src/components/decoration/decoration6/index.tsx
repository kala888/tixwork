import React, {forwardRef, useMemo} from 'react'

import classnames from 'classnames'
import _ from "lodash";

import './style.less'

const defaultColor = ['#1dc1f5', '#1dc1f5']

const Decoration6 = forwardRef((props: DecorationProps, ref) => {
    const {className, style, color = []} = props
    const mergedColor = useMemo(() => _.merge(_.cloneDeep(defaultColor), color || []), [color])

    const classNames = useMemo(() => classnames('dv-decoration-7', className), [
        className
    ])

    return (
        <div className={classNames} style={style}>
            <svg width='21px' height='20px'>
                <polyline
                    strokeWidth='4'
                    fill='transparent'
                    stroke={mergedColor[0]}
                    points='10, 0 19, 10 10, 20'
                />
                <polyline
                    strokeWidth='2'
                    fill='transparent'
                    stroke={mergedColor[1]}
                    points='2, 0 11, 10 2, 20'
                />
            </svg>
            {props.children}
            <svg width='21px' height='20px'>
                <polyline
                    strokeWidth='4'
                    fill='transparent'
                    stroke={mergedColor[0]}
                    points='11, 0 2, 10 11, 20'
                />
                <polyline
                    strokeWidth='2'
                    fill='transparent'
                    stroke={mergedColor[1]}
                    points='19, 0 10, 10 19, 20'
                />
            </svg>
        </div>
    )
})

export default Decoration6
