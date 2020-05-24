import React from 'react';

import { Link, useRouteMatch } from 'react-router-dom';

import { Layout, Menu } from 'antd';
import {
  HighlightOutlined,
  DownloadOutlined,
  SyncOutlined,
  ScissorOutlined,
  PlayCircleOutlined,
} from '@ant-design/icons';
const { Sider } = Layout;

import styles from './SettingsNavigation.css';
import routes from '../../../constants/routes';

import { PropsFromRedux } from '../../../containers/SettingsNavigationContainer';

type Props = PropsFromRedux;

const SettingsNavigation: React.FC<Props> = (props: Props) => {
  const { settingsRoute, changeSelectedRoute } = props;

  let { url } = useRouteMatch();

  // Set which route is selected (required for <Menu> component)
  let defaultSelectedKeys: string = '1';
  switch (settingsRoute) {
    case `/settings${routes.INTERFACE_SETTINGS}`:
      defaultSelectedKeys = '1';
      break;
    case `/settings${routes.DOWNLOAD}`:
      defaultSelectedKeys = '2';
      break;
    case `/settings${routes.CONVERT}`:
      defaultSelectedKeys = '3';
      break;
    case `/settings${routes.CUT}`:
      defaultSelectedKeys = '4';
      break;
    case `/settings${routes.PLAYER}`:
      defaultSelectedKeys = '5';
      break;
    default:
      break;
  }

  return (
    <Sider width={170} theme="light">
      <div className={styles.menuContainer}>
        <Menu defaultSelectedKeys={[defaultSelectedKeys]} mode="inline">
          {/* INTERFACE SETTINGS */}
          <Menu.Item key="1">
            <Link
              onClick={() =>
                changeSelectedRoute({ settingsRoute: `/settings${routes.INTERFACE_SETTINGS}` })
              }
              to={`${url}${routes.INTERFACE_SETTINGS}`}
            >
              <HighlightOutlined />
              <span>Interface</span>
            </Link>
          </Menu.Item>

          {/* DOWNLOAD SETTINGS */}
          <Menu.Item key="2">
            <Link
              onClick={() => changeSelectedRoute({ settingsRoute: `/settings${routes.DOWNLOAD}` })}
              to={`${url}${routes.DOWNLOAD}`}
            >
              <DownloadOutlined />
              <span>Download</span>
            </Link>
          </Menu.Item>

          {/* CONVERT SETTINGS */}
          <Menu.Item key="3">
            <Link
              onClick={() => changeSelectedRoute({ settingsRoute: `/settings${routes.CONVERT}` })}
              to={`${url}${routes.CONVERT}`}
            >
              <SyncOutlined />
              <span>Convert</span>
            </Link>
          </Menu.Item>

          {/* CUT SETTINGS */}
          <Menu.Item key="4">
            <Link
              onClick={() => changeSelectedRoute({ settingsRoute: `/settings${routes.CUT}` })}
              to={`${url}${routes.CUT}`}
            >
              <ScissorOutlined />
              <span>Cut</span>
            </Link>
          </Menu.Item>

          {/* PLAYER SETTINGS */}
          <Menu.Item key="5">
            <Link
              onClick={() => changeSelectedRoute({ settingsRoute: `/settings${routes.PLAYER}` })}
              to={`${url}${routes.PLAYER}`}
            >
              <PlayCircleOutlined />
              <span>Player</span>
            </Link>
          </Menu.Item>
        </Menu>
      </div>
    </Sider>
  );
};

export default SettingsNavigation;
