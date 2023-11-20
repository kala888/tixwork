import {useRequest} from "ahooks";
import {request, useParams} from '@umijs/max';


export default function useData(url: string, interval: number = 10000) {
    const params = useParams()

    const fetchData = async () => await request(url);
    const {data} = useRequest(fetchData, {
        pollingInterval: interval,
    });
    console.log("fetchdata", params.scene)
    return data
}
