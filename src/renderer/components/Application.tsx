import React, { useEffect } from 'react';
import { hot } from 'react-hot-loader/root';
import { Titlebar, Color } from 'custom-electron-titlebar';

import { Switch, Route, Redirect } from 'react-router-dom';
import { AnimatedSwitch } from 'react-router-transition';
import routes from '../constants/routes';

import styles from './Application.css';

import Home from './Home/Home';
import Settings from './Settings/Settings';

type Props = {
  getPersistentData: () => void;
};

const Application: React.FC<Props> = (props: Props) => {
  const { getPersistentData } = props;

  useEffect(() => {
    const titlebar = new Titlebar({
      backgroundColor: Color.fromHex('#e8e8e8'),
      maximizable: false
    });

    getPersistentData();

    return () => {
      titlebar.dispose();
    };
  }, []);

  return (
    <div className={styles.container}>
      <AnimatedSwitch
        atEnter={{ opacity: 0 }}
        atLeave={{ opacity: 0 }}
        atActive={{ opacity: 1 }}
        className="switch-wrapper"
      >
        <Route path={routes.SETTINGS} component={Settings} />
        <Route path={routes.HOME} component={Home} />

        <Redirect to={routes.HOME} />
      </AnimatedSwitch>
    </div>
  );
};

export default hot(Application);
