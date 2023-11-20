import styles from './styles.less'
import ProjectInfo from "@/pages/chengao/components/project-info";
import RemoteChart from "@/components/remote-chart";
import {
    dailyPlanOptions,
    deviceInfoOptions,
    issueManageOptions,
    processManageOptions
} from "@/pages/chengao/components/chart-config";
import LiveVideo from "@/pages/chengao/components/live-video";
import Process from "@/pages/chengao/components/process/process";

export default function ChengAoKanban() {

    return (
        <div className={styles.main}>
            <div className={styles.mainHeader}>
                <div className={styles.mainHeaderText}>
                    密封实验室实时大屏
                </div>
            </div>

            <div className={styles.mainContent}>
                <div className={styles.mainTop}>
                    <ProjectInfo className='flex-3'/>
                    <LiveVideo className='flex-8' style={{margin: '10px 10px 0'}}/>
                    <div className='flex-column flex-3'>
                        <RemoteChart className='flex-1' title='建设过程管控' options={processManageOptions}/>
                        <RemoteChart className='flex-1' title='问题解决率' options={issueManageOptions}/>
                    </div>
                </div>

                <div className={styles.mainBottom}>
                    <RemoteChart className='flex-3' title='每日计划完成率' options={dailyPlanOptions}/>
                    <Process className='flex-8' style={{margin: '0 10px'}}/>
                    <RemoteChart className='flex-3' title='设备到场情况' options={deviceInfoOptions}/>
                </div>

            </div>
        </div>
    )
}
