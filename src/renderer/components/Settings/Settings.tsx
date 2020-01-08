import React from 'react';

import { Link, useHistory } from 'react-router-dom';

import { Layout, Menu, Icon, Button } from 'antd';
const { Content, Sider } = Layout;

import routes from '../../constants/routes';

import styles from './Settings.css';

const Settings: React.FC = () => {
  let history = useHistory();

  return (
    <Layout className={styles.layout}>
      <Sider width={170} theme="light">
        <div className={styles.menuContainer}>
          <Menu defaultSelectedKeys={['1']} mode="inline">
            <Menu.Item key="1">
              <Icon type="download" />
              <span>Download</span>
            </Menu.Item>

            <Menu.Item key="2">
              <Icon type="sync" />
              <span>Convert</span>
            </Menu.Item>

            <Menu.Item key="3">
              <Icon type="scissor" />
              <span>Cut</span>
            </Menu.Item>

            <Menu.Item key="4">
              <Icon type="play-circle" />
              <span>Player</span>
            </Menu.Item>

            <Menu.Item key="5">
              <Icon type="highlight" />
              <span>Interface</span>
            </Menu.Item>
          </Menu>
        </div>
      </Sider>

      <Content>
        {/* Close settings link */}
        <Button
          className={styles.closeButton}
          icon="close"
          shape="circle"
          onClick={() => history.goBack()}
        />
      </Content>
    </Layout>
  );
};

export default Settings;
