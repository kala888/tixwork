import _ from 'lodash'
import {useCallback, useEffect, useImperativeHandle, useRef, useState} from 'react'

// @ts-ignore
function observerDomResize(dom, callback) {
    // @ts-ignore
    const MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver

    const observer = new MutationObserver(callback)

    observer.observe(dom, {
        attributes: true,
        attributeFilter: ['style'],
        attributeOldValue: true
    })

    return observer
}

export function co(gen: any) {
    let destroyed = false

    // 处理 return 之后 resume 的问题
    let stop = false

    let val: any = null

    if (typeof gen === 'function') gen = gen()

    if (!gen || typeof gen.next !== 'function') return () => ({})

    Promise.resolve().then(() => {
        destroyed || next(gen.next())
    })

    return {
        end() {
            destroyed = true

            Promise.resolve().then(() => {
                gen.return()

                gen = null
            })
        },
        pause() {
            if (!destroyed) {
                stop = true
            }
        },
        resume() {
            const oldVal = val

            if (!destroyed && stop) {
                stop = false

                Promise.resolve(val).then(function () {
                    if (!destroyed && !stop && oldVal === val) {
                        next(gen.next())
                    }
                })
            }
        }
    }

    // @ts-ignore
    function next(ret) {
        if (ret.done) return ret.value

        val = ret.value

        return Promise.resolve(ret.value).then(() => {
            (!destroyed && !stop) && next(gen.next())
        })
    }
}


// @ts-ignore
export function useAutoResize(ref) {
    const [state, setState] = useState({width: 0, height: 0})

    const domRef = useRef(null)

    const setWH = useCallback(() => {
        const {clientWidth, clientHeight} = domRef.current || {clientWidth: 0, clientHeight: 0}

        setState({width: clientWidth, height: clientHeight})

        if (!domRef.current) {
            console.warn('DataV: Failed to get dom node, component rendering may be abnormal!')
        } else if (!clientWidth || !clientHeight) {
            console.warn('DataV: Component width or height is 0px, rendering abnormality may occur!')
        }
    }, [])

    useImperativeHandle(ref, () => ({setWH}), [])

    useEffect(() => {
        const debounceSetWHFun = _.debounce(setWH, 100)

        debounceSetWHFun()

        const domObserver = observerDomResize(domRef.current, debounceSetWHFun)

        window.addEventListener('resize', debounceSetWHFun)

        return () => {
            window.removeEventListener('resize', debounceSetWHFun)

            if (!domObserver) {
                return
            }

            domObserver.disconnect()
            domObserver.takeRecords()
        }
    }, [])

    return {...state, domRef, setWH}
}

export function uuid() {
    return 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        const r = Math.random() * 16 | 0
        const v = c === 'x' ? r : (r & 0x3 | 0x8)
        return v.toString(16)
    })
}

export function randomExtend(minNum: number, maxNum: number) {
    if (arguments.length === 1) {
        return parseInt(String(Math.random() * minNum + 1), 10)
    } else {
        return parseInt(String(Math.random() * (maxNum - minNum + 1) + minNum), 10)
    }
}

