import { hot } from 'react-hot-loader/root';
import React from 'react';

import styles from './Application.css';
import Home from './Home/Home';

const Application = () => (
  <div className={styles.container}>
    <Home />
  </div>
);

export default hot(Application);
