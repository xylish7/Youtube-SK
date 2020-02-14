import React, { useEffect } from 'react';
import { hot } from 'react-hot-loader/root';
import { Titlebar, Color } from 'custom-electron-titlebar';

import { Route, Redirect } from 'react-router-dom';
import { AnimatedSwitch } from 'react-router-transition';
import routes from '../constants/routes';

import styles from './Application.css';

import Home from './Home/Home';
import SettingsContainer from '../containers/SettingsContainer';
import { ThemeMode, EAppColor } from '../constants/persistent-data-store';
import {
  checkYtdlForUpdatesEvent,
  initDownloadEvents,
  clearDownloadEvents
} from '../events/download-events';
import { EDownloadStatus } from '../reducers/downloadReducer';

import { IFileProgress, IFileInfo } from '../../shared/events-name/download-events-names';

const appIcon = require('../../../assets/youtube-sk.png');

declare global {
  interface Window {
    less: any;
  }
}
window.less = window.less || {};

type Props = {
  themeMode: ThemeMode;
  appColor: EAppColor;
  downloadStatus: EDownloadStatus;
  getAllPersistentData: () => void;
  changeDownloadStatus: (downloadStatus: EDownloadStatus) => void;
  updateMediaFiles: (mediaFile: Array<IFileInfo>) => void;
  updateFileProgress: (fileProgress: IFileProgress) => void;
};

const Application: React.FC<Props> = (props: Props) => {
  const {
    themeMode,
    appColor,
    downloadStatus,
    getAllPersistentData,
    changeDownloadStatus,
    updateMediaFiles,
    updateFileProgress
  } = props;

  useEffect(() => {
    // Get persistent data from the local store
    getAllPersistentData();

    // Check if yt-dl.exe has any updates
    checkYtdlForUpdatesEvent();

    // Set the status to updating while the update checks takes place
    changeDownloadStatus(EDownloadStatus.UPDATING);
  }, []);

  // Listen to download events
  useEffect(() => {
    initDownloadEvents({
      downloadStatus,
      changeDownloadStatus,
      updateMediaFiles,
      updateFileProgress
    });

    return () => {
      clearDownloadEvents();
    };
  }, [downloadStatus]);

  useEffect(() => {
    // Set titlebar color taking in consideration the theme of the App
    const titlebar = new Titlebar({
      backgroundColor: Color.fromHex(themeMode === ThemeMode.LIGHT ? '#e8e8e8' : '#000000'),
      maximizable: false,
      icon: appIcon
    });

    // Set app color
    window.less.modifyVars({
      '@primary-color': appColor
    });
    return () => {
      titlebar.dispose();
    };
  }, [themeMode, appColor]);

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
