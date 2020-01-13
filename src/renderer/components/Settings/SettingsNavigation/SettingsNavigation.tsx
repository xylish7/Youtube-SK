import React from 'react';

import { Link, useRouteMatch } from 'react-router-dom';

import { Layout, Menu, Icon } from 'antd';
const { Sider } = Layout;

import styles from './SettingsNavigation.css';
import routes from '../../../constants/routes';

const SettingsNavigation: React.FC = () => {
  let { url } = useRouteMatch();

  return (
    <Sider width={170} theme="light">
      <div className={styles.menuContainer}>
        <Menu defaultSelectedKeys={['1']} mode="inline">
          <Menu.Item key="1">
            <Link to={`${url}${routes.INTERFACE_SETTINGS}`}>
              <Icon type="highlight" />
              <span>Interface</span>
            </Link>
          </Menu.Item>

          <Menu.Item key="2">
            <Link to={`${url}${routes.DOWNLOAD}`}>
              <Icon type="download" />
              <span>Download</span>
            </Link>
          </Menu.Item>

          <Menu.Item key="3">
            <Link to={`${url}${routes.CONVERT}`}>
              <Icon type="sync" />
              <span>Convert</span>
            </Link>
          </Menu.Item>

          <Menu.Item key="4">
            <Link to={`${url}${routes.CUT}`}>
              <Icon type="scissor" />
              <span>Cut</span>
            </Link>
          </Menu.Item>

          <Menu.Item key="5">
            <Link to={`${url}${routes.PLAYER}`}>
              <Icon type="play-circle" />
              <span>Player</span>
            </Link>
          </Menu.Item>
        </Menu>
      </div>
    </Sider>
  );
};

export default SettingsNavigation;
