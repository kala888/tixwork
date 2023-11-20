import ScrollBoard from "@/components/scroll-board";
import useData from "@/util/use-data";
import SlotBox from "@/components/slot-box";

export default function InfoTable(props: { url: string }) {
    const data = useData(props.url)
    const config = {
        oddRowBGC: '#104377',
        evenRowBGC: '#F3C6E',
        data: data || mockData
    }
    return (
        <SlotBox style={{marginRight: 5, marginTop: 10}}>
            <ScrollBoard config={config} style={{width: '100%', height: '100%'}}/>
        </SlotBox>
    );
};

const mockData = [
    ['2021年10月10日', '深圳市第三人民医院', 'XSDD1842223'],
    ['2021年10月10日', '广东东升医院', 'XSDD231233'],
    ['2021年10月10日', '西门子共振有限公司', 'XSDD244223'],
    ['2021年10月10日', '深圳航空有限公司', 'XSDD1443423'],
    ['2021年10月10日', '广州丰田汽车', 'XSDD20003'],
    ['2021年10月10日', '广州标记包装', 'XSDD44433901'],
    ['2021年10月10日', '广州医科大学附属医院', 'XSDD000833'],
]
