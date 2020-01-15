import React from 'react';

import { Route, Redirect, useHistory, useRouteMatch } from 'react-router-dom';
import { AnimatedSwitch } from 'react-router-transition';

import routes from '../../constants/routes';

import { Layout, Button } from 'antd';
const { Content } = Layout;

import styles from './Settings.css';

import SettingsNavigation from './SettingsNavigation/SettingsNavigation';
import InterfaceSettings from './InterfaceSettings/InterfaceSettings';
import DownloadSettings from './DownloadSettings/DownloadSettings';
import CutSettings from './CutSettings/CutSettings';
import ConvertSettings from './ConvertSettings/ConvertSettings';
import PlayerSettings from './PlayerSettings/PlayerSettings';

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
      <SettingsNavigation />

      <Content>
        {/* Close settings link */}
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
          <Route path={`${path}${routes.INTERFACE_SETTINGS}`} component={InterfaceSettings} />
          <Route path={`${path}${routes.DOWNLOAD}`} component={DownloadSettings} />
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
