import {useParams} from "@umijs/max";
import useData from "@/util/use-data";
import LinearGradient from "@/components/linear-gradient";

export default function Test() {
    const params = useParams();
    const data = useData("/time")
    return (
        <div style={{height: 100}}>
            111
            <LinearGradient>2323</LinearGradient>
            <div> params:{params?.scene}</div>
            <div> data:{JSON.stringify(data)}</div>
        </div>

    )
};
