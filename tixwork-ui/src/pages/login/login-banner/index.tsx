import BizSchema from '@/biz-models/biz-schema';
import Texty from 'rc-texty';
import 'rc-texty/assets/index.css';
import TweenOne from 'rc-tween-one';
import styles from './styles.less';

const geInterval = (e: any) => {
  switch (e.index) {
    case 0:
      return 0;
    case 1:
      return 150;
    case 2:
    case 3:
    case 4:
    case 5:
    case 6:
      return 150 + 450 + (e.index - 2) * 10;
    default:
      return 150 + 450 + (e.index - 6) * 150;
  }
};

const getEnter = (e: any) => {
  const t = {
    opacity: 0,
    scale: 0.8,
    y: '-100%',
  };
  if (e.index >= 2 && e.index <= 6) {
    return { ...t, y: '-30%', duration: 150 };
  }
  return t;
};

export default function LoginBanner() {
  const logo = BizSchema?.Root?.logo || '/logo.svg';
  const system = BizSchema?.Root?.title || 'Tixwork';
  const slogan = BizSchema?.Root?.slogan;

  return (
    <div className={styles.loginBanner}>
      <img alt="logo" className={styles.bannerLogo} src={logo} />

      <div className={styles.combined}>
        <div className={styles.combinedShape}>
          <div className={styles.shapeLeft}>
            <TweenOne
              animation={[
                { x: 158, type: 'from', ease: 'easeInOutQuint', duration: 600 },
                { x: -158, ease: 'easeInOutQuart', duration: 450, delay: -150 },
              ]}
            />
          </div>
          <div className={styles.shapeRight}>
            <TweenOne
              animation={[
                { x: -158, type: 'from', ease: 'easeInOutQuint', duration: 600 },
                { x: 158, ease: 'easeInOutQuart', duration: 450, delay: -150 },
              ]}
            />
          </div>
        </div>
        <Texty
          className={styles.title}
          type="mask-top"
          delay={400}
          enter={getEnter}
          interval={geInterval}
          component={TweenOne}
          componentProps={{
            animation: [
              { x: 130, type: 'set' },
              { x: 100, delay: 500, duration: 450 },
              {
                ease: 'easeOutQuart',
                duration: 300,
                x: 0,
              },
              {
                letterSpacing: 0,
                delay: -300,
                scale: 0.9,
                ease: 'easeInOutQuint',
                duration: 1000,
              },
              { scale: 1, width: '100%', delay: -300, duration: 1000, ease: 'easeInOutQuint' },
            ],
          }}
        >
          {system}
        </Texty>
        <TweenOne
          className={styles.combinedBar}
          animation={{ delay: 2000, width: 0, x: 158, type: 'from', ease: 'easeInOutExpo' }}
        />
        <Texty className={styles.content} delay={2200} interval={30}>
          {slogan}
        </Texty>
      </div>
    </div>
  );
}
