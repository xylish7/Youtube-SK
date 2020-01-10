import React, { useState } from 'react';
import { remote, shell } from 'electron';
const { dialog } = remote;

import { Typography, Icon, Button, Card, Tooltip } from 'antd';
const { Text } = Typography;

import styles from './Download.css';

type Props = {
  savePath: string;
  changeSavePath: (savePath: string) => void;
};

const Download: React.FC<Props> = (props: Props) => {
  const { savePath, changeSavePath } = props;

  /**
   * Open a dialog to select the folder in which the files
   * will be saved
   */
  const getSavePath = (): void => {
    const path: Array<string> = dialog.showOpenDialog({
      buttonLabel: 'Select folder',
      properties: ['openDirectory']
    });

    if (path) changeSavePath(path[0]);
  };

  /**
   * Open the folder wich coresponds to the [savePath]
   */
  const openSavePath = (): void => {
    shell.openItem(savePath);
  };

  return (
    <div>
      <Tooltip placement="right" title="Select the folder where you want to save the files">
        <Button onClick={() => getSavePath()}>Select Folder</Button>
      </Tooltip>

      {savePath !== '' && (
        <Card className={styles.cardSavePath} bodyStyle={{ display: 'flex', alignItems: 'center' }}>
          <a onClick={openSavePath} title="Open folder">
            <Icon className={styles.openFolderIcon} type="folder-open" />
          </a>
          <Text className={styles.pathText} strong>
            {savePath}
          </Text>
        </Card>
      )}
    </div>
  );
};

export default Download;
