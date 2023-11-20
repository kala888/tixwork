import ReactECharts from "echarts-for-react";
import useData from "@/util/use-data";
import _ from 'lodash'
import SlotBox from "@/components/slot-box";

type RemoteChart = {
    title?: any,
    brief?: any,
    className?: any,
    style?: any,
    url?: any,
    options?: any,
    interval?: any,
}
type ResponseType = {
    title?: string
    replace?: boolean //replace the default options
    options?: any
}
export default function RemoteChart(props: RemoteChart) {
    const {title, brief, className, style, url, options = {}, interval} = props;
    let theTitle = title
    let theOptions = options
    if (url) {
        const data: ResponseType = useData(url, interval);
        theTitle = data?.title || title
        theOptions = _.merge(data?.replace ? {} : options, data?.options)
    }
    return (
        <SlotBox title={theTitle} className={className} brief={brief} style={style}>
            <div className="flex-center">
                <ReactECharts option={theOptions} style={{height: '100%', width: '100%'}}/>
            </div>
        </SlotBox>
    );
};
