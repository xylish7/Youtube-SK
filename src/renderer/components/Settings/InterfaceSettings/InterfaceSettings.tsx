import React from 'react';

import { Typography, Button, Divider } from 'antd';
import {
  IChangedValues,
  ThemeMode,
  EUserPrefStore
} from '../../../constants/persistent-data-store';
const { Title, Paragraph } = Typography;

type Props = {
  themeMode: string;
  changePersistentValues: (changedValues: IChangedValues) => void;
};

const InterfaceSettings: React.FC<Props> = (props: Props) => {
  const { themeMode, changePersistentValues } = props;

  const changeThemeMode = () => {
    changePersistentValues({
      [EUserPrefStore.THEME_MODE]: themeMode === ThemeMode.LIGHT ? ThemeMode.DARK : ThemeMode.LIGHT
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
      <Title level={4}>Application color</Title>
      <Paragraph>Primary color of the application</Paragraph>
    </React.Fragment>
  );
};

export default InterfaceSettings;
