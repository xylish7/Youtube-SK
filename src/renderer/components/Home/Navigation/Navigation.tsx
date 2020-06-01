import React from 'react';
import { Link, NavLink } from 'react-router-dom';

import {
  DownloadOutlined,
  SyncOutlined,
  ScissorOutlined,
  PlayCircleOutlined,
  SettingOutlined,
} from '@ant-design/icons';

import routes from '../../../constants/routes';
import styles from './Navigation.css';

import { PropsFromRedux } from '../../../containers/NavigationContainer';

type Props = PropsFromRedux;

const Navigation: React.FC<Props> = (props: Props) => {
  const { appColor, settingsRoute, changeSelectedRoute } = props;

  return (
    <div className={styles.container}>
      {/* DOWNLOAD LINK */}
      <NavLink
        style={{ color: '#555555' }}
        activeStyle={{ color: appColor }}
        to={routes.DOWNLOAD}
        activeClassName={styles.isActive}
      >
        <div
          onClick={() => changeSelectedRoute({ mainRoute: routes.DOWNLOAD })}
          className={`${styles.iconContainer} ${styles.ripple}`}
          title="Download"
        >
          <DownloadOutlined className={styles.icon} />
        </div>
      </NavLink>

      {/* CONVERT LINK */}
      {/* <NavLink
        style={{ color: '#555555' }}
        activeStyle={{ color: appColor }}
        to={routes.CONVERT}
        activeClassName={styles.isActive}
      >
        <div
          onClick={() => changeSelectedRoute({ mainRoute: routes.CONVERT })}
          className={`${styles.iconContainer} ${styles.ripple}`}
          title="Convert"
        >
          <SyncOutlined className={styles.icon} />
        </div>
      </NavLink> */}

      {/* CUT LINK */}
      {/* <NavLink
        style={{ color: '#555555' }}
        activeStyle={{ color: appColor }}
        onClick={() => changeSelectedRoute({ mainRoute: routes.CUT })}
        to={routes.CUT}
        activeClassName={styles.isActive}
      >
        <div className={`${styles.iconContainer} ${styles.ripple}`} title="Cut">
          <ScissorOutlined className={styles.icon} />
        </div>
      </NavLink> */}

      {/* PLAYER LINK */}
      {/* <NavLink
        style={{ color: '#555555' }}
        activeStyle={{ color: appColor }}
        onClick={() => changeSelectedRoute({ mainRoute: routes.PLAYER })}
        to={routes.PLAYER}
        activeClassName={styles.isActive}
      >
        <div className={`${styles.iconContainer} ${styles.ripple}`} title="Player">
          <PlayCircleOutlined className={styles.icon} />
        </div>
      </NavLink> */}

      {/* Spacer between other links and settings link */}
      <div style={{ height: '100%' }} />

      {/* SETTINGS LINK */}
      <Link style={{ color: '#555555' }} to={settingsRoute}>
        <div className={`${styles.iconContainer} ${styles.ripple}`} title="Settings">
          <SettingOutlined className={styles.icon} />
        </div>
      </Link>

      {/* Spacer used to avoid overflow  of settings tooltip icon */}
      <div style={{ height: 7 }} />
    </div>
  );
};

export default Navigation;
