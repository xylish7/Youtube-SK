import React from 'react';

import { Redirect, Route } from 'react-router-dom';
import { AnimatedSwitch } from 'react-router-transition';

import styles from './Features.css';

import routes from '../../../constants/routes';
import DownloadContainer from '../../../containers/DownloadContainer';
import Convert from './Convert/Convert';
import Cut from './Cut/Cut';
import Player from './Player/Player';

const Features: React.FC = () => {
  return (
    <div className={styles.container}>
      <AnimatedSwitch
        atEnter={{ opacity: 0 }}
        atLeave={{ opacity: 0 }}
        atActive={{ opacity: 1 }}
        className="switch-wrapper"
      >
        <Route path={routes.DOWNLOAD} component={DownloadContainer} />
        <Route path={routes.CONVERT} component={Convert} />
        <Route path={routes.CUT} component={Cut} />
        <Route path={routes.PLAYER} component={Player} />

        <Redirect to={routes.DOWNLOAD} />
      </AnimatedSwitch>
    </div>
  );
};

export default Features;
