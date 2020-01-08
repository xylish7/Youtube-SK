import React from 'react';

import styles from './Navigation.css';
import { Icon } from 'antd';

const Navigation: React.FC = () => {
  return (
    <div className={styles.container}>
      <Icon className={styles.icon} type="download" title="Download" />
      <Icon className={styles.icon} type="sync" title="Convert" />
      <Icon className={styles.icon} type="scissor" title="Cut" />
      <Icon className={styles.icon} type="play-circle" title="Player" />
      <div style={{ height: '100%' }} />
      <Icon className={styles.icon} type="setting" title="Settings" />
      <div style={{ height: 7 }} />
    </div>
  );
};

export default Navigation;
