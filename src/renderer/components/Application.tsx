import { hot } from 'react-hot-loader/root';
import * as React from 'react';

import styles from './Application.css';
import Home from './Home/Home';

const Application = () => (
  <div className={styles.root}>
    <Home />
  </div>
);

export default hot(Application);
