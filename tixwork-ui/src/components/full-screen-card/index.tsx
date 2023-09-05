import { ensureArray } from '@/utils';
import { FullscreenExitOutlined, FullscreenOutlined } from '@ant-design/icons';
import { ProCard } from '@ant-design/pro-components';
import { useFullscreen } from 'ahooks';
import { Popover, Typography } from 'antd';
import { useRef } from 'react';
import { FullScreenContext } from './full-screen-context';

function FullScreenCard(props) {
  const ref = useRef(null);
  const [isFullscreen, { toggleFullscreen, enterFullscreen, exitFullscreen }] = useFullscreen(ref);
  const { title, extra, style = {}, ...rest } = props;
  const actionList = ensureArray(extra);
  if (isFullscreen) {
    actionList.push(
      <Popover key="exit" content={'退出全屏模式'} trigger="hover">
        <FullscreenExitOutlined style={{ fontSize: 20 }} onClick={exitFullscreen} />
      </Popover>,
    );
  } else {
    actionList.push(<FullscreenOutlined key={'enter'} style={{ fontSize: 14 }} onClick={enterFullscreen} />);
  }
  const theStyle = { ...style, height: isFullscreen ? '100vh' : style.height };
  const theTitle = isFullscreen ? <Typography.Title>{title} </Typography.Title> : title;
  return (
    <FullScreenContext.Provider value={{ isFullscreen, toggleFullscreen, enterFullscreen, exitFullscreen }}>
      <ProCard title={theTitle} extra={actionList} {...rest} style={theStyle} ref={ref}>
        {props.children}
      </ProCard>
    </FullScreenContext.Provider>
  );
}

FullScreenCard.isProCard = true;

export default FullScreenCard;
