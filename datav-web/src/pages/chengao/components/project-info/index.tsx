import _ from "lodash";
import styles from './styles.less'
import SlotBox, {SlotBoxType} from "@/components/slot-box";

const Item = (props: any) => {
    return (
        <>
            <li className={styles.label}>{props.title}</li>
            <li className={styles.value}>{props.value}</li>
        </>
    )
}

export default function ProjectInfo(props: SlotBoxType) {

    const data = {
        "": "",
        "名称": "密封实验室",
        "类型": "基础实验",
        "工程状态": "正在实施",
        "业主单位": "成都承奥科技有限公司",
        "计划开始时间": "2021-07-07",
        "实际开始时间": "2021-07-07",
        "计划完成时间": "2022-07-31",
    }

    return (
        <SlotBox  title='项目概况' {...props}>
            <div className={styles.projectInfo}>
                <ul>
                    {
                        Object.keys(data).map((key, idx) => {
                            const value = _.get(data, key)
                            return (<Item key={idx} title={key} value={value}/>)
                        })
                    }
                </ul>
            </div>
        </SlotBox>
    );
};
