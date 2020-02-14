import React from 'react';

import { Route, Redirect, useHistory, useRouteMatch } from 'react-router-dom';
import { AnimatedSwitch } from 'react-router-transition';

import { Layout, Button } from 'antd';
const { Content } = Layout;

import SettingsNavigationContainer from '../../containers/SettingsNavigationContainer';
import InterfaceSettingsContainer from '../../containers/InterfaceSettingsContainer';
import DownloadSettingsContainer from '../../containers/DownloadSettingsContainer';
import CutSettings from './CutSettings/CutSettings';
import ConvertSettings from './ConvertSettings/ConvertSettings';
import PlayerSettings from './PlayerSettings/PlayerSettings';

import routes from '../../constants/routes';
import styles from './Settings.css';

type Props = {
  mainRoute: string;
};

const Settings: React.FC<Props> = (props: Props) => {
  const { mainRoute } = props;

  let history = useHistory();
  let { path } = useRouteMatch();

  return (
    <Layout className={styles.layout}>
      {/* SETTINGS NAVIGATION COMPONENT */}
      <SettingsNavigationContainer />

      <Content className={styles.settingsContent}>
        {/* CLOSE SETTINGS BUTTON */}
        <Button
          className={styles.closeButton}
          icon="close"
          shape="circle"
          onClick={() => history.push(mainRoute)}
        />
        <AnimatedSwitch
          atEnter={{ opacity: 0 }}
          atLeave={{ opacity: 0 }}
          atActive={{ opacity: 1 }}
          className="switch-wrapper"
        >
          <Route
            path={`${path}${routes.INTERFACE_SETTINGS}`}
            component={InterfaceSettingsContainer}
          />
          <Route path={`${path}${routes.DOWNLOAD}`} component={DownloadSettingsContainer} />
          <Route path={`${path}${routes.CONVERT}`} component={ConvertSettings} />
          <Route path={`${path}${routes.CUT}`} component={CutSettings} />
          <Route path={`${path}${routes.PLAYER}`} component={PlayerSettings} />

          <Redirect to={`${path}${routes.INTERFACE_SETTINGS}`} />
        </AnimatedSwitch>
      </Content>
    </Layout>
  );
};

export default Settings;
