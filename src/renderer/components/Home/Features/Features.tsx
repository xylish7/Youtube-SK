import React from 'react';

import { Switch, Redirect, Route } from 'react-router-dom';

import styles from './Features.css';

import routes from '../../../constants/routes';
import DownloadContainer from '../../../containers/DownloadContainer';
import Convert from './Convert/Convert';
import Cut from './Cut/Cut';
import Player from './Player/Player';

const Features: React.FC = () => {
  return (
    <div className={styles.container}>
      <Switch>
        <Route path={routes.DOWNLOAD} component={DownloadContainer} />
        <Route path={routes.CONVERT} component={Convert} />
        <Route path={routes.CUT} component={Cut} />
        <Route path={routes.PLAYER} component={Player} />

        <Redirect to={routes.DOWNLOAD} />
      </Switch>
    </div>
  );
};

export default Features;
