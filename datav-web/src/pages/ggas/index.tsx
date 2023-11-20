import styles from './styles.less'
import TotalPanel from "@/pages/ggas/components/total-panel";
import AnnualTotal from "@/pages/ggas/components/annual-total";
import ReceiverDeliveryCountTotal from "@/pages/ggas/components/receiver-delivery-count-total";
import InfoTable from "@/pages/ggas/components/info-table";
import moment from "moment";
import {
    slot1,
    slot8,
    slot7,
    slot2,
    slot3,
    slot9
} from "@/pages/ggas/components/chart-config";
import RemoteChart from "@/components/remote-chart";
// import logo from "@/assets/logo/ggas.png";

export default function GGasKanban() {

    return (
        <div className={styles.main}>
            <div className={styles.mainHeader}>
                {/*<div className={styles.mainHeaderLogo}>*/}
                {/*    <img alt={""} src={logo}/>*/}
                {/*</div>*/}
                <div className={styles.mainHeaderText}>
                    气体业务分析大屏
                </div>
            </div>

            <div className={styles.mainContent}>
                {/*上层*/}
                <div className={styles.mainTop}>

                    {/*上左*/}
                    <div className={styles.mainTopLeft}>
                        <RemoteChart
                            title={"资产一览表"}
                            options={slot1}
                            className='flex-1'
                            url={"/slot1"}
                        />
                        <RemoteChart
                            title={"月周转率TOP8"}
                            options={slot2}
                            className='flex-1'
                            url={"/slot2"}
                        />
                    </div>

                    {/*上中*/}
                    <div className={styles.mainTopCenter}>
                        <RemoteChart
                            title={"周产量"}
                            brief={moment().format("YYYY-MM-DD")}
                            className='flex-6'
                            url={"/slot3"}
                            options={slot3}
                            style={{marginBottom: 5}}
                        />
                        <div className='flex-row flex-4'>
                            <ReceiverDeliveryCountTotal url={"/slot4"}/>
                            <InfoTable url={"/slot5"}/>
                        </div>
                    </div>
                    {/*上右*/}
                    <div className={styles.mainTopRight}>
                        <AnnualTotal title={"年度统计"} className='flex-1' url={"/slot6"}/>
                        <RemoteChart title={"月度统计"} className='flex-1' url={"/slot7"}
                                     options={slot7}/>
                    </div>
                </div>

                <div className={styles.mainBottom}>
                    <RemoteChart
                        title={"近10天产量"} className='flex-5' style={{marginRight: 5}}
                        url={"/slot8"} options={slot8}/>
                    <RemoteChart
                        title={"年产量TOP10"} className='flex-3' style={{marginRight: 5}}
                        url={"/slot9"} options={slot9}/>
                    <TotalPanel title={"本月数据统计"} className='flex-2' url={"/slot10"}/>
                </div>

            </div>
        </div>
    )
}
