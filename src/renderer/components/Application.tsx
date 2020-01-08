import React, { useEffect } from 'react';
import { hot } from 'react-hot-loader/root';
import { Titlebar, Color } from 'custom-electron-titlebar';

import { Switch, Route, Redirect } from 'react-router-dom';
import routes from '../constants/routes';

import styles from './Application.css';

import Home from './Home/Home';
import Settings from './Settings/Settings';

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
      <Switch>
        <Route path={routes.SETTINGS} component={Settings} />
        <Route path={routes.HOME} component={Home} />

        <Redirect to={routes.HOME} />
      </Switch>
    </div>
  );
};

export default hot(Application);
