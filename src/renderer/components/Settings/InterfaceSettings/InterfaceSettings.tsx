import React from 'react';

import { Typography, Button, Divider, Icon, Tooltip } from 'antd';
import { ThemeMode, EUserPrefStore, EAppColor } from '../../../constants/persistent-data-store';
import ChangeColorButton from './ChangeColorButton/ChangeColorButton';
const { Title, Paragraph, Text } = Typography;

import { FaTint, FaMoon, FaSun } from 'react-icons/fa';

import styles from './InterfaceSettings.css';

import { PropsFromRedux } from '../../../containers/InterfaceSettingsContainer';

declare global {
  interface Window {
    less: any;
  }
}
window.less = window.less || {};

type Props = PropsFromRedux;

const InterfaceSettings: React.FC<Props> = (props: Props) => {
  const { themeMode, appColor, setPersistentGeneralSettingsData } = props;

  const changeThemeMode = (): void => {
    setPersistentGeneralSettingsData(
      {
        themeMode: ThemeMode.LIGHT ? ThemeMode.DARK : ThemeMode.LIGHT
      },
      {
        [EUserPrefStore.THEME_MODE]:
          themeMode === ThemeMode.LIGHT ? ThemeMode.DARK : ThemeMode.LIGHT
      }
    );
  };

  const changeAppColor = (colorCode: EAppColor): void => {
    window.less.modifyVars({
      '@primary-color': colorCode
    });

    setPersistentGeneralSettingsData(
      {
        appColor: colorCode
      },

      {
        [EUserPrefStore.APP_COLOR]: colorCode
      }
    );
  };

  return (
    <React.Fragment>
      <Title level={4}>
        <Icon
          component={themeMode === ThemeMode.DARK ? FaMoon : FaSun}
          style={{ color: '#fadb14' }}
        />{' '}
        Theme mode
      </Title>
      <Paragraph>
        Toggle between light and dark theme.<Text strong> At the moment only the titlebar</Text> is
        changing its color, but in future release there will be a complete dark mode.
      </Paragraph>
      <Button onClick={changeThemeMode} style={{ marginLeft: 25 }}>
        {themeMode === ThemeMode.LIGHT ? 'SWITCH TO DARK THEME ' : 'SWITCH TO LIGHT THEME'}
      </Button>
      <Divider />
      <Title level={4}>
        <Icon component={FaTint} style={{ color: appColor }} /> Application color
      </Title>
      <Paragraph>Primary color of the application</Paragraph>
      <div className={styles.colorPaletteContainer}>
        <Tooltip placement="bottom" title={'Blue'}>
          <Text>
            <ChangeColorButton
              color={EAppColor.BLUE}
              onClick={() => changeAppColor(EAppColor.BLUE)}
            />
          </Text>
        </Tooltip>
        <Tooltip placement="bottom" title="Turquoise">
          <Text>
            <ChangeColorButton
              color={EAppColor.TURQUOISE}
              onClick={() => changeAppColor(EAppColor.TURQUOISE)}
            />
          </Text>
        </Tooltip>
        <Tooltip placement="bottom" title="Red">
          <Text>
            <ChangeColorButton
              color={EAppColor.RED}
              onClick={() => changeAppColor(EAppColor.RED)}
            />
          </Text>
        </Tooltip>
      </div>
      <Divider />
    </React.Fragment>
  );
};

export default InterfaceSettings;
