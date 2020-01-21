import React from 'react';

import { Typography, Button, Divider, Icon, Tooltip } from 'antd';
import {
  IChangedValues,
  ThemeMode,
  EUserPrefStore,
  EAppColor
} from '../../../constants/persistent-data-store';
import ChangeColorButton from './ChangeColorButton/ChangeColorButton';
const { Title, Paragraph, Text } = Typography;

import styles from './InterfaceSettings.css';

declare global {
  interface Window {
    less: any;
  }
}
window.less = window.less || {};

type Props = {
  themeMode: ThemeMode;
  changePersistentValues: (changedValues: IChangedValues) => void;
};

const InterfaceSettings: React.FC<Props> = (props: Props) => {
  const { themeMode, changePersistentValues } = props;

  const changeThemeMode = (): void => {
    changePersistentValues({
      [EUserPrefStore.THEME_MODE]: themeMode === ThemeMode.LIGHT ? ThemeMode.DARK : ThemeMode.LIGHT
    });
  };

  const changeAppColor = (colorCode: EAppColor): void => {
    window.less.modifyVars({
      '@primary-color': colorCode
    });

    changePersistentValues({
      [EUserPrefStore.APP_COLOR]: colorCode
    });
  };

  return (
    <React.Fragment>
      <Title level={4}>Theme mode </Title>
      <Paragraph>Toggle between light and dark theme</Paragraph>
      <Button onClick={changeThemeMode}>
        {themeMode === ThemeMode.LIGHT ? 'DARK THEME ' : 'LIGHT THEME'}
      </Button>

      <Divider />

      <Title level={4}>
        Application color <Icon type="exclamation-circle" />
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
    </React.Fragment>
  );
};

export default InterfaceSettings;
