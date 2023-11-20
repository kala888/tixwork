import ReactHlsPlayer from "react-hls-player";
import {useEffect, useRef} from "react";
import styles from './styles.less'
import SlotBox, {SlotBoxType} from "@/components/slot-box";

export default function LiveVideo(props: SlotBoxType) {
  const playerRef = useRef<any>();

  // const source = "http://139.186.155.122:8080/live/test.m3u8"
  // const source = "http://localhost:8080/stream/test.m3u8"
  // const source = "http://localhost:8080/live/test.m3u8"
  const source = "http://localhost:8080/live/camera.m3u8"

  useEffect(() => {
    setTimeout(() => {
      playerRef.current.play();
    }, 3000)
  }, [])

  return (
      <SlotBox title='实施现场' {...props} >
        <div className={styles.liveVideo}>
          <ReactHlsPlayer
              src={source}
              autoPlay={true}
              controls={true}
              width="auto"
              height="100%"
              playerRef={playerRef}
          />
        </div>
      </SlotBox>
  );
};
