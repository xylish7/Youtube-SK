import React, { useState } from 'react';
import { remote, shell } from 'electron';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
const { dialog } = remote;

import { Typography, Icon, Button, Input, Tag, Divider, message, Checkbox } from 'antd';
const { Text } = Typography;
const { Search } = Input;

import styles from './Download.css';

import { regExpressions, globalConst } from '../../../../constants/globals';
import DownloadList from './DownloadList/DownloadList';

import { startDownloadEvent } from '../../../../events/download-events';
import { EDownloadStatus } from '../../../../reducers/downloadReducer';
import GeneralStatus from './GeneralStatus/GeneralStatus';
import DownloadButton from './DownloadButton/DownloadButton';

type Props = {
  savePath: string;
  downloadStatus: EDownloadStatus;
  changeSavePath: (savePath: string) => void;
  changeDownloadState: (downloadStatus: EDownloadStatus) => void;
};

const Download: React.FC<Props> = (props: Props) => {
  const { savePath, downloadStatus, changeSavePath, changeDownloadState } = props;

  const [downloadInput, setDownloadInput] = useState<string>('');
  const [convertOpt, setConvertOpt] = useState<boolean>(false);
  const [keepOriginalOpt, setKeepOriginalOpt] = useState<boolean>(false);

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

  /**
   * Handle conver to audio checkbox
   */
  const handleConvertCheckbox = (e: CheckboxChangeEvent) => {
    if (e.target.checked) setConvertOpt(true);
    else {
      setConvertOpt(false);
      setKeepOriginalOpt(false);
    }
  };

  /**
   * Copy the url from clipboard to the download input
   */
  const copyUrlFromClipboard = async () => {
    const url: string = await navigator.clipboard.readText();

    setDownloadInput(url);
  };

  /**
   * Handle the press of the downlaod button
   */
  const handleDownloadButton = (): void => {
    if (downloadStatus !== EDownloadStatus.DOWNLOADING) {
      if (isValid()) {
        changeDownloadState(EDownloadStatus.FETCHING);
        setTimeout(() => changeDownloadState(EDownloadStatus.DOWNLOADING), 3000);
        setTimeout(() => changeDownloadState(EDownloadStatus.DONE), 6000);
      }
    }
    if (downloadStatus === EDownloadStatus.DOWNLOADING) {
      changeDownloadState(EDownloadStatus.STOPPED);
    }
    // startDownloadEvent(downloadInput);
  };

  /**
   * Before download check different parameters to see if
   * their status is ok so that the download can start
   */
  const isValid = (): boolean => {
    const urlRegex = new RegExp(regExpressions.URL);

    if (savePath === '') {
      message.warning('Please select a folder', globalConst.MESSAGE_DURATION);
      return false;
    }

    if (downloadInput === '') {
      message.warning('Please enter an url', globalConst.MESSAGE_DURATION);
      return false;
    }
    if (!urlRegex.test(downloadInput.toString())) {
      message.warning('Please enter a valid youtube url', globalConst.MESSAGE_DURATION);
      return false;
    }

    message.success('Download started!', globalConst.MESSAGE_DURATION);
    return true;
  };

  return (
    <div>
      <div className={styles.selectFolderContainer}>
        {/* SELECT FOLDER BUTTON */}
        <Button size="small" onClick={() => getSavePath()}>
          <Icon type="folder" />
        </Button>

        {/* SAVE PATH LINK TEXT */}
        {savePath !== '' ? (
          <Text className={styles.pathText}>
            <a onClick={openSavePath}>{savePath}</a>
          </Text>
        ) : (
          <Text className={styles.pathText}>
            Select the folder where you want to save the files
          </Text>
        )}
      </div>

      {/* CHECKBOX OPTIONS */}
      <div className={styles.options}>
        <Checkbox checked={convertOpt} onChange={e => handleConvertCheckbox(e)}>
          Convert to audio
        </Checkbox>
        <br />
        <Checkbox
          checked={keepOriginalOpt}
          disabled={!convertOpt}
          onChange={e => setKeepOriginalOpt(e.target.checked)}
        >
          Save both video an audio
        </Checkbox>
      </div>

      <Divider />

      {/* GENERAL STATUS */}
      <div>
        <GeneralStatus downloadStatus={downloadStatus} />

        {/* INPUT CONTAINER */}
        <div className={styles.inputContainer}>
          <Search
            onSearch={handleDownloadButton}
            value={downloadInput}
            disabled={downloadStatus === EDownloadStatus.FETCHING}
            enterButton={<DownloadButton downloadStatus={downloadStatus} />}
            placeholder="Double click to paste the url"
            onChange={e => setDownloadInput(e.target.value)}
            onDoubleClick={copyUrlFromClipboard}
          />
        </div>
      </div>

      <DownloadList convertOpt={convertOpt} downloadStatus={downloadStatus} />
    </div>
  );
};

export default Download;
