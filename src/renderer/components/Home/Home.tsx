import React from 'react';

import { Layout } from 'antd';
const { Content, Sider } = Layout;
import styles from './Home.css';

import Navigation from './Navigation/Navigation';
import Features from './Features/Features';

const Home: React.FC = () => {
  return (
    <div className={styles.container}>
      <Layout>
        <Sider theme="light" collapsed collapsedWidth="60">
          <Navigation />
        </Sider>
        <Content>
          <Features />
        </Content>
      </Layout>
    </div>
  );
};

export default Home;
