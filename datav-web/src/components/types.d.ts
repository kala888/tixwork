type BorderBoxProps = {
    className?: any,
    style?: any
    color?: string []
    backgroundColor?: string
    children?: any
}
type DecorationProps = {
    className?: any,
    style?: any
    color?: string [],
    children?: any
}

type LoadingProps = {
    className?: any,
    style?: any
    children?: any
}

type ScrollBoardProps = {
    config: any
    onClick: any
    onMouseOver: any
    className: any
    style: any
}

declare module '@jiaminghi/color' {
    export function fade(color: any, percent: number): any
}

