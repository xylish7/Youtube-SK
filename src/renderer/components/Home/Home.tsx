import React from 'react';
import Navigation from './Navigation/Navigation';

import styles from './Home.css';
import Features from './Features/Features';

const Home: React.FC = () => {
  return (
    <div className={styles.container}>
      <Navigation />
      <Features />
    </div>
  );
};

export default Home;
