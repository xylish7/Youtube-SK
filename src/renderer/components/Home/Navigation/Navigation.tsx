import React from 'react';

import { Link, NavLink } from 'react-router-dom';
import routes from '../../../constants/routes';

import styles from './Navigation.css';
import { Icon } from 'antd';

type Props = {
  changeMainRoute: (route: string) => void;
};

const Navigation: React.FC<Props> = (props: Props) => {
  const { changeMainRoute } = props;

  return (
    <div className={styles.container}>
      {/* DOWNLOAD LINK */}
      <NavLink to={routes.DOWNLOAD} activeClassName={styles.isActive}>
        <div
          onClick={() => changeMainRoute(routes.DOWNLOAD)}
          className={`${styles.iconContainer} ${styles.ripple}`}
          title="Download"
        >
          <Icon className={styles.icon} type="download" />
        </div>
      </NavLink>

      {/* CONVERT LINK */}
      <NavLink to={routes.CONVERT} activeClassName={styles.isActive}>
        <div
          onClick={() => changeMainRoute(routes.CONVERT)}
          className={`${styles.iconContainer} ${styles.ripple}`}
          title="Convert"
        >
          <Icon className={styles.icon} type="sync" />
        </div>
      </NavLink>

      {/* CUT LINK */}
      <NavLink
        onClick={() => changeMainRoute(routes.CUT)}
        to={routes.CUT}
        activeClassName={styles.isActive}
      >
        <div className={`${styles.iconContainer} ${styles.ripple}`} title="Cut">
          <Icon className={styles.icon} type="scissor" />
        </div>
      </NavLink>

      {/* PLAYER LINK */}
      <NavLink
        onClick={() => changeMainRoute(routes.PLAYER)}
        to={routes.PLAYER}
        activeClassName={styles.isActive}
      >
        <div className={`${styles.iconContainer} ${styles.ripple}`} title="Player">
          <Icon className={styles.icon} type="play-circle" />
        </div>
      </NavLink>

      {/* Spacer between other links and settings link */}
      <div style={{ height: '100%' }} />

      {/* SETTINGS LINK */}
      <Link to={routes.SETTINGS}>
        <div className={`${styles.iconContainer} ${styles.ripple}`} title="Settings">
          <Icon className={styles.icon} type="setting" />
        </div>
      </Link>

      {/* Spacer used to avoid overflow  of settings tooltip icon */}
      <div style={{ height: 7 }} />
    </div>
  );
};

export default Navigation;
