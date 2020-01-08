import React, { useEffect } from 'react';
import { hot } from 'react-hot-loader/root';
import { Titlebar, Color } from 'custom-electron-titlebar';

import styles from './Application.css';
import Home from './Home/Home';

const Application = () => {
  useEffect(() => {
    const titlebar = new Titlebar({
      backgroundColor: Color.fromHex('#e8e8e8'),
      maximizable: false
    });

    return () => {
      titlebar.dispose();
    };
  }, []);

  return (
    <div className={styles.container}>
      <Home />
    </div>
  );
};

export default hot(Application);
