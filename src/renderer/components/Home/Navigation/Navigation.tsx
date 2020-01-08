import React from 'react';

import { Link, NavLink } from 'react-router-dom';
import routes from '../../../constants/routes';

import styles from './Navigation.css';
import { Icon } from 'antd';

const Navigation: React.FC = () => {
  return (
    <div className={styles.container}>
      {/* DOWNLOAD LINK */}
      <NavLink to={routes.DOWNLOAD} activeClassName={styles.isActive}>
        <div className={`${styles.iconContainer} ${styles.ripple}`}>
          <Icon twoToneColor="#993434" className={styles.icon} type="download" title="Download" />
        </div>
      </NavLink>

      {/* CONVERT LINK */}
      <NavLink to={routes.CONVERT} activeClassName={styles.isActive}>
        <div className={`${styles.iconContainer} ${styles.ripple}`}>
          <Icon className={styles.icon} type="sync" title="Convert" />
        </div>
      </NavLink>

      {/* CUT LINK */}
      <NavLink to={routes.CUT} activeClassName={styles.isActive}>
        <div className={`${styles.iconContainer} ${styles.ripple}`}>
          <Icon className={styles.icon} type="scissor" title="Cut" />
        </div>
      </NavLink>

      {/* PLAYER LINK */}
      <NavLink to={routes.PLAYER} activeClassName={styles.isActive}>
        <div className={`${styles.iconContainer} ${styles.ripple}`}>
          <Icon className={styles.icon} type="play-circle" title="Player" />
        </div>
      </NavLink>

      {/* Spacer between other links and settings link */}
      <div style={{ height: '100%' }} />

      {/* SETTINGS LINK */}
      <Link to={routes.SETTINGS}>
        <div className={`${styles.iconContainer} ${styles.ripple}`}>
          <Icon className={styles.icon} type="setting" title="Settings" />
        </div>
      </Link>

      {/* Spacer used to avoid overflow  of settings tooltip icon */}
      <div style={{ height: 7 }} />
    </div>
  );
};

export default Navigation;
