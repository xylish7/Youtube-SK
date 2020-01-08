import React from 'react';

import styles from './Navigation.css';
import { Icon } from 'antd';

const Navigation: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={`${styles.iconContainer} ${styles.ripple}`}>
        <Icon twoToneColor="#993434" className={styles.icon} type="download" title="Download" />
      </div>
      <div className={`${styles.iconContainer} ${styles.ripple}`}>
        <Icon className={styles.icon} type="sync" title="Convert" />
      </div>
      <div className={`${styles.iconContainer} ${styles.ripple}`}>
        <Icon className={styles.icon} type="scissor" title="Cut" />
      </div>
      <div className={`${styles.iconContainer} ${styles.ripple}`}>
        <Icon className={styles.icon} type="play-circle" title="Player" />
      </div>
      <div style={{ height: '100%' }} />
      <div className={`${styles.iconContainer} ${styles.ripple}`}>
        <Icon className={styles.icon} type="setting" title="Settings" />
      </div>
      <div style={{ height: 7 }} />
    </div>
  );
};

export default Navigation;
