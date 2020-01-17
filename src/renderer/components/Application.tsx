import React, { useEffect } from 'react';
import { hot } from 'react-hot-loader/root';
import { Titlebar, Color } from 'custom-electron-titlebar';

import { Route, Redirect } from 'react-router-dom';
import { AnimatedSwitch } from 'react-router-transition';
import routes from '../constants/routes';

import styles from './Application.css';

import Home from './Home/Home';
import SettingsContainer from '../containers/SettingsContainer';
import { ThemeMode } from '../constants/persistent-data-store';

type Props = {
  themeMode: string;
  getAllPersistentData: () => void;
};

const Application: React.FC<Props> = (props: Props) => {
  const { themeMode, getAllPersistentData } = props;

  useEffect(() => {
    const titlebar = new Titlebar({
      backgroundColor: Color.fromHex(themeMode === ThemeMode.LIGHT ? '#e8e8e8' : '#000000'),
      maximizable: false
    });
    return () => {
      titlebar.dispose();
    };
  }, [themeMode]);

  useEffect(() => {
    getAllPersistentData();
  }, []);

  return (
    <div className={styles.container}>
      <AnimatedSwitch
        atEnter={{ opacity: 0 }}
        atLeave={{ opacity: 0 }}
        atActive={{ opacity: 1 }}
        className="switch-wrapper"
      >
        <Route path={routes.SETTINGS} component={SettingsContainer} />
        <Route path={routes.HOME} component={Home} />

        <Redirect to={routes.HOME} />
      </AnimatedSwitch>
    </div>
  );
};

export default hot(Application);
