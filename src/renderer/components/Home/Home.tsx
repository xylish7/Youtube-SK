import React from 'react';

import { Layout } from 'antd';
const { Content, Sider } = Layout;
import styles from './Home.css';

import Features from './Features/Features';
import NavigationContainer from '../../containers/NavigationContainer';

const Home: React.FC = () => {
  return (
    <div className={styles.container}>
      <Layout>
        <Sider theme="light" collapsed collapsedWidth="60">
          <NavigationContainer />
        </Sider>
        <Content>
          <Features />
        </Content>
      </Layout>
    </div>
  );
};

export default Home;
